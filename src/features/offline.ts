import { create } from 'zustand';
import { registerSW } from 'virtual:pwa-register';

export interface OfflineState {
  online: boolean;
  /** Service worker state. 'dev' when running the Vite dev server (no service worker). */
  sw: 'unsupported' | 'dev' | 'registering' | 'active' | 'error';
  shellCached: boolean;
  installed: boolean;
  updateReady: boolean;
  storage: { usage: number; quota: number } | null;
  applyUpdate: () => void;
}

export const useOffline = create<OfflineState>(() => ({
  online: navigator.onLine,
  sw: 'serviceWorker' in navigator ? (import.meta.env.DEV ? 'dev' : 'registering') : 'unsupported',
  shellCached: false,
  installed: matchMedia('(display-mode: standalone)').matches || (navigator as { standalone?: boolean }).standalone === true,
  updateReady: false,
  storage: null,
  applyUpdate: () => {},
}));

/** True when the precache contains the app's entry document, i.e. the shell can start offline. */
export async function checkShellCached(): Promise<boolean> {
  if (typeof caches === 'undefined') return false;
  const names = await caches.keys();
  for (const name of names.filter((n) => n.includes('precache'))) {
    const keys = await (await caches.open(name)).keys();
    if (keys.some((r) => new URL(r.url).pathname.endsWith('/index.html'))) return true;
  }
  return false;
}

export async function refreshStorageEstimate(): Promise<void> {
  if (!navigator.storage?.estimate) return;
  const { usage = 0, quota = 0 } = await navigator.storage.estimate();
  useOffline.setState({ storage: { usage, quota } });
}

export function initOffline(): void {
  addEventListener('online', () => useOffline.setState({ online: true }));
  addEventListener('offline', () => useOffline.setState({ online: false }));
  matchMedia('(display-mode: standalone)').addEventListener('change', (e) => useOffline.setState({ installed: e.matches }));
  refreshStorageEstimate();

  if (!('serviceWorker' in navigator) || import.meta.env.DEV) return;
  const update = registerSW({
    immediate: true,
    onOfflineReady: async () => useOffline.setState({ shellCached: await checkShellCached() }),
    onNeedRefresh: () => useOffline.setState({ updateReady: true }),
    onRegisteredSW: async () => useOffline.setState({ sw: 'active', shellCached: await checkShellCached() }),
    onRegisterError: () => useOffline.setState({ sw: 'error' }),
  });
  useOffline.setState({ applyUpdate: () => update(true) });
}
