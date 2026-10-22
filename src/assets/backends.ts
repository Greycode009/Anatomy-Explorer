// Storage backends for downloaded anatomy assets. IndexedDB is primary; Cache Storage is a
// fallback when IndexedDB is unavailable or refuses a write. The repository asks every backend,
// so a stored copy is found regardless of which backend holds it.
import { openDB, type DBSchema, type IDBPDatabase } from 'idb';

export interface StoredAssetMeta {
  assetId: string;
  version: string;
  sha256: string;
  bytes: number;
  storedAt: number;
  backend: BackendName;
  /** 'sha256' when the hash was checked; 'size-and-format' where Web Crypto is unavailable (insecure origin). */
  integrity: 'sha256' | 'size-and-format';
}

export type BackendName = 'indexeddb' | 'cache-storage';

export interface StorageBackend {
  name: BackendName;
  get(assetId: string): Promise<{ data: ArrayBuffer; meta: StoredAssetMeta } | null>;
  getMeta(assetId: string): Promise<StoredAssetMeta | null>;
  put(meta: StoredAssetMeta, data: ArrayBuffer): Promise<void>;
  delete(assetId: string): Promise<void>;
}

/** Partially downloaded bytes kept so an interrupted download can resume with an HTTP Range request. */
export interface PartialDownload {
  assetId: string;
  sha256: string;
  received: number;
  data: Blob;
  etag: string | null;
}

interface AnatomyDB extends DBSchema {
  assetData: { key: string; value: { assetId: string; data: ArrayBuffer } };
  assetMeta: { key: string; value: StoredAssetMeta };
  partials: { key: string; value: PartialDownload };
}

let dbPromise: Promise<IDBPDatabase<AnatomyDB>> | null = null;

export function db(): Promise<IDBPDatabase<AnatomyDB>> {
  if (!dbPromise) {
    if (typeof indexedDB === 'undefined') return Promise.reject(new Error('IndexedDB is not available in this browser.'));
    dbPromise = openDB<AnatomyDB>('anatomy-explorer', 1, {
      upgrade(d) {
        d.createObjectStore('assetData', { keyPath: 'assetId' });
        d.createObjectStore('assetMeta', { keyPath: 'assetId' });
        d.createObjectStore('partials', { keyPath: 'assetId' });
      },
    });
    dbPromise.catch(() => { dbPromise = null; });
  }
  return dbPromise;
}

export const indexedDbBackend: StorageBackend = {
  name: 'indexeddb',
  async get(assetId) {
    const d = await db();
    const [meta, row] = await Promise.all([d.get('assetMeta', assetId), d.get('assetData', assetId)]);
    return meta && row ? { meta, data: row.data } : null;
  },
  async getMeta(assetId) {
    return (await (await db()).get('assetMeta', assetId)) ?? null;
  },
  async put(meta, data) {
    const d = await db();
    const tx = d.transaction(['assetData', 'assetMeta'], 'readwrite');
    await Promise.all([tx.objectStore('assetData').put({ assetId: meta.assetId, data }), tx.objectStore('assetMeta').put(meta), tx.done]);
  },
  async delete(assetId) {
    const d = await db();
    const tx = d.transaction(['assetData', 'assetMeta'], 'readwrite');
    await Promise.all([tx.objectStore('assetData').delete(assetId), tx.objectStore('assetMeta').delete(assetId), tx.done]);
  },
};

const CACHE_NAME = 'anatomy-assets-v1';
const cacheKey = (assetId: string) => `/__anatomy-asset__/${assetId}`;

export const cacheStorageBackend: StorageBackend = {
  name: 'cache-storage',
  async get(assetId) {
    if (typeof caches === 'undefined') return null;
    const res = await (await caches.open(CACHE_NAME)).match(cacheKey(assetId));
    if (!res) return null;
    const meta = JSON.parse(res.headers.get('x-asset-meta') ?? 'null') as StoredAssetMeta | null;
    return meta ? { meta, data: await res.arrayBuffer() } : null;
  },
  async getMeta(assetId) {
    if (typeof caches === 'undefined') return null;
    const res = await (await caches.open(CACHE_NAME)).match(cacheKey(assetId));
    return res ? (JSON.parse(res.headers.get('x-asset-meta') ?? 'null') as StoredAssetMeta | null) : null;
  },
  async put(meta, data) {
    if (typeof caches === 'undefined') throw new Error('Cache Storage is not available.');
    const headers = { 'content-type': 'model/gltf-binary', 'x-asset-meta': JSON.stringify(meta) };
    await (await caches.open(CACHE_NAME)).put(cacheKey(meta.assetId), new Response(data, { headers }));
  },
  async delete(assetId) {
    if (typeof caches === 'undefined') return;
    await (await caches.open(CACHE_NAME)).delete(cacheKey(assetId));
  },
};

export const BACKENDS: StorageBackend[] = [indexedDbBackend, cacheStorageBackend];

export async function getPartial(assetId: string): Promise<PartialDownload | null> {
  try {
    return (await (await db()).get('partials', assetId)) ?? null;
  } catch {
    return null;
  }
}

export async function putPartial(p: PartialDownload): Promise<void> {
  try {
    await (await db()).put('partials', p);
  } catch {
    // Resuming is best-effort; the download still completes without a saved partial.
  }
}

export async function clearPartial(assetId: string): Promise<void> {
  try {
    await (await db()).delete('partials', assetId);
  } catch {
    /* ignore */
  }
}
