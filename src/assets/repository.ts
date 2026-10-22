// The single entry point for asset bytes. Resolution order:
//   1. a valid local copy in any storage backend (IndexedDB, then Cache Storage)
//   2. otherwise, if online, download -> validate -> store -> confirm storage
//   3. otherwise fail with a clear "not available offline" error
// Download/storage status is tracked separately from whether a model is loaded in the scene.
import { create } from 'zustand';
import type { AssetEntry } from '../types';
import { ASSETS, ASSET_BY_ID } from '../data/manifest';
import { BACKENDS, type StoredAssetMeta } from './backends';
import { AssetError, downloadAsset, sha256Hex, validateGlb } from './downloader';

export type AssetState =
  | 'unknown' | 'not-downloaded' | 'queued' | 'downloading' | 'verifying' | 'stored'
  | 'update-available' | 'failed' | 'storage-unavailable';

export interface AssetStatus {
  state: AssetState;
  received?: number;
  total?: number;
  error?: string;
  meta?: StoredAssetMeta;
}

interface AssetStore {
  status: Record<string, AssetStatus>;
  persisted: boolean | null;
  set: (assetId: string, status: AssetStatus) => void;
}

export const useAssets = create<AssetStore>((set, get) => ({
  status: Object.fromEntries(ASSETS.map((a) => [a.id, { state: 'unknown' } as AssetStatus])),
  persisted: null,
  set: (assetId, status) => set({ status: { ...get().status, [assetId]: status } }),
}));

const setStatus = (id: string, s: AssetStatus) => useAssets.getState().set(id, s);

async function findStored(assetId: string): Promise<StoredAssetMeta | null> {
  for (const backend of BACKENDS) {
    try {
      const meta = await backend.getMeta(assetId);
      if (meta) return meta;
    } catch {
      /* backend unavailable; try the next */
    }
  }
  return null;
}

/** Reads storage and updates every asset's status (used at start-up and after changes). */
export async function refreshStatuses(): Promise<void> {
  await Promise.all(ASSETS.map(async (asset) => {
    const current = useAssets.getState().status[asset.id]?.state;
    if (current === 'downloading' || current === 'queued' || current === 'verifying') return;
    const meta = await findStored(asset.id);
    // Keep failures visible (with their error) so they can be retried; they are not "not downloaded".
    if (!meta && (current === 'failed' || current === 'storage-unavailable')) return;
    if (!meta) setStatus(asset.id, { state: 'not-downloaded' });
    else if (meta.sha256 !== asset.sha256) setStatus(asset.id, { state: 'update-available', meta });
    else setStatus(asset.id, { state: 'stored', meta });
  }));
}

async function store(asset: AssetEntry, data: ArrayBuffer, integrity: StoredAssetMeta['integrity']): Promise<StoredAssetMeta> {
  const errors: string[] = [];
  for (const backend of BACKENDS) {
    const meta: StoredAssetMeta = {
      assetId: asset.id, version: asset.version, sha256: asset.sha256, bytes: data.byteLength,
      storedAt: Date.now(), backend: backend.name, integrity,
    };
    try {
      await backend.put(meta, data);
      // Confirm the write by reading the metadata back before reporting success.
      const check = await backend.getMeta(asset.id);
      if (check?.sha256 === asset.sha256 && check.bytes === asset.bytes) return meta;
      errors.push(`${backend.name}: write could not be confirmed`);
    } catch (err) {
      const e = err as DOMException;
      errors.push(`${backend.name}: ${e.name === 'QuotaExceededError' ? 'storage quota exceeded' : e.message}`);
    }
  }
  throw new AssetError('storage', `Could not store the asset locally (${errors.join('; ')}).`);
}

const inFlight = new Map<string, Promise<ArrayBuffer>>();
const controllers = new Map<string, AbortController>();

/** Downloads and stores one asset (or returns the stored copy). Status updates drive the UI. */
export function ensureAsset(asset: AssetEntry): Promise<ArrayBuffer> {
  const existing = inFlight.get(asset.id);
  if (existing) return existing;
  const job = (async () => {
    for (const backend of BACKENDS) {
      try {
        const hit = await backend.get(asset.id);
        if (hit && hit.meta.sha256 === asset.sha256) {
          setStatus(asset.id, { state: 'stored', meta: hit.meta });
          return hit.data;
        }
      } catch {
        /* try next backend */
      }
    }
    const controller = new AbortController();
    controllers.set(asset.id, controller);
    setStatus(asset.id, { state: 'downloading', received: 0, total: asset.bytes });
    try {
      const { data, integrity } = await downloadAsset(asset, {
        signal: controller.signal,
        onProgress: (p) => setStatus(asset.id, { state: 'downloading', received: p.received, total: p.total }),
        onVerifying: () => setStatus(asset.id, { state: 'verifying', received: asset.bytes, total: asset.bytes }),
      });
      try {
        const meta = await store(asset, data, integrity);
        setStatus(asset.id, { state: 'stored', meta });
      } catch (err) {
        // The verified bytes can still be shown this session, but they are not available offline.
        setStatus(asset.id, { state: 'storage-unavailable', error: (err as Error).message });
      }
      return data;
    } catch (err) {
      const stale = await findStored(asset.id);
      setStatus(asset.id, { state: 'failed', error: (err as Error).message, meta: stale ?? undefined });
      throw err;
    } finally {
      controllers.delete(asset.id);
    }
  })();
  inFlight.set(asset.id, job);
  job.finally(() => inFlight.delete(asset.id)).catch(() => {});
  return job;
}

/**
 * Bytes for the 3D loader. Uses a stored copy (even an outdated one when offline) and only
 * downloads when necessary.
 */
export async function loadAssetBytes(assetId: string): Promise<ArrayBuffer> {
  const asset = ASSET_BY_ID.get(assetId);
  if (!asset) throw new AssetError('format', `Unknown asset "${assetId}".`);
  if (!navigator.onLine) {
    for (const backend of BACKENDS) {
      try {
        const hit = await backend.get(assetId);
        if (hit) return hit.data;
      } catch {
        /* next */
      }
    }
    throw new AssetError('offline', `The ${asset.mode} ${asset.system} model pack has not been downloaded, and this device is offline.`);
  }
  return ensureAsset(asset);
}

// --- download manager actions -------------------------------------------------------------------

let queue: AssetEntry[] = [];
let running = 0;
const CONCURRENCY = 2;

function pump() {
  while (running < CONCURRENCY && queue.length) {
    const asset = queue.shift()!;
    running++;
    ensureAsset(asset).catch(() => {}).finally(() => {
      running--;
      pump();
    });
  }
}

export function queueDownloads(assets: AssetEntry[]): void {
  for (const asset of assets) {
    const st = useAssets.getState().status[asset.id]?.state;
    if (st === 'stored' || st === 'downloading' || st === 'verifying' || st === 'queued') continue;
    queue.push(asset);
    setStatus(asset.id, { state: 'queued' });
  }
  pump();
}

export function cancelDownloads(): void {
  for (const asset of queue) setStatus(asset.id, { state: 'not-downloaded' });
  queue = [];
  for (const c of controllers.values()) c.abort();
}

export async function removeAsset(asset: AssetEntry): Promise<void> {
  for (const backend of BACKENDS) {
    try {
      await backend.delete(asset.id);
    } catch {
      /* ignore */
    }
  }
  setStatus(asset.id, { state: 'not-downloaded' });
}

/** Re-hashes stored copies. Corrupted copies are deleted and marked failed. */
export async function verifyAsset(asset: AssetEntry): Promise<boolean> {
  for (const backend of BACKENDS) {
    let hit: Awaited<ReturnType<typeof backend.get>> = null;
    try {
      hit = await backend.get(asset.id);
    } catch {
      continue;
    }
    if (!hit) continue;
    setStatus(asset.id, { state: 'verifying', meta: hit.meta });
    try {
      validateGlb(hit.data);
      const hash = await sha256Hex(hit.data);
      const ok = hit.data.byteLength === asset.bytes && (hash === null || hash === asset.sha256);
      if (ok) {
        setStatus(asset.id, { state: 'stored', meta: hit.meta });
        return true;
      }
    } catch {
      /* fall through */
    }
    await backend.delete(asset.id);
    setStatus(asset.id, { state: 'failed', error: 'Stored copy failed the integrity check and was removed. Download it again.' });
    return false;
  }
  setStatus(asset.id, { state: 'not-downloaded' });
  return false;
}

export async function requestPersistentStorage(): Promise<boolean | null> {
  if (!navigator.storage?.persist) return null;
  const granted = await navigator.storage.persist();
  useAssets.setState({ persisted: granted });
  return granted;
}

export async function checkPersisted(): Promise<void> {
  if (!navigator.storage?.persisted) return;
  useAssets.setState({ persisted: await navigator.storage.persisted() });
}
