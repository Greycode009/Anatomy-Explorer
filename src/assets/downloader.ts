import type { AssetEntry } from '../types';
import { clearPartial, getPartial, putPartial } from './backends';

export class AssetError extends Error {
  readonly kind: 'offline' | 'http' | 'size' | 'format' | 'integrity' | 'storage' | 'aborted' | 'network';
  constructor(kind: AssetError['kind'], message: string) {
    super(message);
    this.kind = kind;
  }
}

export interface DownloadProgress {
  received: number;
  total: number;
}

const PARTIAL_SAVE_EVERY = 2 * 1024 * 1024;

export function assetUrl(asset: AssetEntry): string {
  return new URL(asset.url, new URL(import.meta.env.BASE_URL, location.href)).href;
}

export async function sha256Hex(data: ArrayBuffer): Promise<string | null> {
  if (!globalThis.crypto?.subtle) return null;
  const digest = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** Checks the GLB container header: magic "glTF", version 2, declared length matches. */
export function validateGlb(data: ArrayBuffer): void {
  if (data.byteLength < 20) throw new AssetError('format', 'File is too small to be a GLB model.');
  const view = new DataView(data);
  if (view.getUint32(0, true) !== 0x46546c67) throw new AssetError('format', 'File is not a GLB (missing glTF header).');
  if (view.getUint32(4, true) !== 2) throw new AssetError('format', 'Unsupported glTF version.');
  if (view.getUint32(8, true) !== data.byteLength) throw new AssetError('format', 'GLB length does not match its header (truncated file).');
}

/**
 * Downloads one asset, resuming from a saved partial download when possible, and validates
 * HTTP status, byte size, GLB header and SHA-256. Resolves with the verified bytes.
 */
export async function downloadAsset(
  asset: AssetEntry,
  opts: { signal?: AbortSignal; onProgress?: (p: DownloadProgress) => void; onVerifying?: () => void } = {},
): Promise<{ data: ArrayBuffer; integrity: 'sha256' | 'size-and-format' }> {
  if (!navigator.onLine) throw new AssetError('offline', 'You are offline, so this asset cannot be downloaded right now.');

  let partial = await getPartial(asset.id);
  if (partial && (partial.sha256 !== asset.sha256 || partial.received >= asset.bytes)) {
    await clearPartial(asset.id);
    partial = null;
  }

  const headers: Record<string, string> = {};
  if (partial) {
    headers.Range = `bytes=${partial.received}-`;
    if (partial.etag) headers['If-Range'] = partial.etag;
  }

  let res: Response;
  try {
    res = await fetch(assetUrl(asset), { headers, cache: 'no-store', signal: opts.signal });
  } catch (err) {
    if (opts.signal?.aborted) throw new AssetError('aborted', 'Download cancelled.');
    throw new AssetError('network', `Network error while downloading: ${(err as Error).message}`);
  }
  if (!res.ok) throw new AssetError('http', `Server responded with HTTP ${res.status}.`);

  const resumed = partial && res.status === 206;
  const chunks: BlobPart[] = resumed ? [partial!.data] : [];
  let received = resumed ? partial!.received : 0;
  let sinceSave = 0;
  const etag = res.headers.get('etag');
  opts.onProgress?.({ received, total: asset.bytes });

  if (!res.body) throw new AssetError('network', 'Response has no body.');
  const reader = res.body.getReader();
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value as Uint8Array<ArrayBuffer>);
      received += value.byteLength;
      sinceSave += value.byteLength;
      opts.onProgress?.({ received, total: asset.bytes });
      if (received > asset.bytes) throw new AssetError('size', `Received more data than expected (${received} > ${asset.bytes} bytes).`);
      if (sinceSave >= PARTIAL_SAVE_EVERY && received < asset.bytes) {
        sinceSave = 0;
        const blob = new Blob(chunks);
        chunks.length = 0;
        chunks.push(blob);
        await putPartial({ assetId: asset.id, sha256: asset.sha256, received, data: blob, etag });
      }
    }
  } catch (err) {
    // Keep what we have so the next attempt can resume.
    if (received < asset.bytes && received > 0) {
      await putPartial({ assetId: asset.id, sha256: asset.sha256, received, data: new Blob(chunks), etag });
    }
    if (err instanceof AssetError) throw err;
    if (opts.signal?.aborted) throw new AssetError('aborted', 'Download paused.');
    throw new AssetError('network', `Connection interrupted after ${received} bytes; it will resume on retry.`);
  }

  opts.onVerifying?.();
  const data = await new Blob(chunks).arrayBuffer();
  if (data.byteLength !== asset.bytes) {
    await clearPartial(asset.id);
    throw new AssetError('size', `Expected ${asset.bytes} bytes but received ${data.byteLength}.`);
  }
  validateGlb(data);
  const hash = await sha256Hex(data);
  if (hash !== null && hash !== asset.sha256) {
    await clearPartial(asset.id);
    throw new AssetError('integrity', 'SHA-256 checksum mismatch; the file is corrupted or was changed.');
  }
  await clearPartial(asset.id);
  return { data, integrity: hash === null ? 'size-and-format' : 'sha256' };
}
