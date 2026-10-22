import { CircleCheck, CloudOff, HardDrive, TriangleAlert, Wifi } from 'lucide-react';
import { ASSETS } from '../data/manifest';
import { SYSTEMS } from '../data/systems';
import { useAssets } from '../assets/repository';
import { useOffline } from '../features/offline';
import { useViewer } from '../state/store';

export function useReadiness() {
  const status = useAssets((s) => s.status);
  const off = useOffline();
  const stored = ASSETS.filter((a) => status[a.id]?.state === 'stored');
  const storedIds = new Set(stored.map((a) => a.id));
  const bothModes = SYSTEMS.filter((s) => storedIds.has(`realistic/${s.id}`) && storedIds.has(`educational/${s.id}`));
  const shellReady = off.sw === 'active' && off.shellCached;
  const level =
    stored.length === ASSETS.length && shellReady ? 'all'
      : stored.length > 0 && shellReady ? 'partial'
        : shellReady ? 'shell'
          : 'none';
  return { ...off, stored: stored.length, total: ASSETS.length, bothModes: bothModes.length, shellReady, level };
}

export function OfflineBadge() {
  const r = useReadiness();
  const openPanel = useViewer((s) => s.openPanel);
  const tone = r.level === 'all' ? 'text-emerald-300 border-emerald-400/30' : r.level === 'none' ? 'text-amber-300 border-amber-400/30' : 'text-cyan-300 border-cyan-400/30';
  const title =
    r.level === 'all' ? 'Fully available offline'
      : r.level === 'partial' ? 'Partly available offline'
        : r.level === 'shell' ? 'App works offline; no models stored'
          : r.sw === 'dev' ? 'Dev server: no offline support'
            : 'Not yet ready for offline use';
  const Icon = r.level === 'all' ? CircleCheck : r.level === 'none' ? TriangleAlert : HardDrive;
  return (
    <button type="button" onClick={() => openPanel('downloads')} className={`w-full rounded-lg border bg-ink-850 px-3 py-2 text-left ${tone}`}>
      <span className="flex items-center gap-2 text-xs font-semibold">
        <Icon className="h-3.5 w-3.5" /> {title}
        <span className="ml-auto flex items-center gap-1 font-normal text-ink-400">
          {r.online ? <Wifi className="h-3 w-3" /> : <CloudOff className="h-3 w-3 text-amber-300" />}
          {r.online ? 'Online' : 'Offline'}
        </span>
      </span>
      <span className="mt-0.5 block text-[11px] text-ink-400">
        {r.stored}/{r.total} model packs stored · both modes for {r.bothModes}/11 systems
      </span>
    </button>
  );
}
