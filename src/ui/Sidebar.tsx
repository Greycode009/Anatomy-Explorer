import { useMemo, useState } from 'react';
import { BookOpen, Download, Info, Search, X } from 'lucide-react';
import type { Body, SystemId } from '../types';
import { SYSTEMS, SYSTEM_BY_ID } from '../data/systems';
import { STRUCTURES, assetFor } from '../data/manifest';
import { useViewer } from '../state/store';
import { search } from '../features/search';
import { goToStructure } from '../features/navigation';
import { useAssets } from '../assets/repository';
import { Logo, SYSTEM_ICONS } from './icons';
import { OfflineBadge } from './OfflineBadge';

const count = (system: SystemId, body: Body) => STRUCTURES.filter((x) => x.body === body && (x.system === system || x.alsoIn.includes(system))).length;

/** Anatomy search. `onPick` runs after a result is chosen (the mobile sheet closes itself). */
export function SearchBox({ autoFocus = false, onPick, listClassName = 'max-h-72' }: { autoFocus?: boolean; onPick?: () => void; listClassName?: string }) {
  const [q, setQ] = useState('');
  const pick = (id: string) => {
    goToStructure(id);
    onPick?.();
  };
  const [scoped, setScoped] = useState(false);
  const system = useViewer((s) => s.system);
  const body = useViewer((s) => s.body);
  const results = useMemo(() => search(q, scoped ? system : 'all', body), [q, scoped, system, body]);
  return (
    <div className="px-4">
      <label className="relative block">
        <span className="sr-only">Search anatomy</span>
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && results[0]) pick(results[0].id);
            if (e.key === 'Escape') setQ('');
          }}
          autoFocus={autoFocus}
          enterKeyHint="search"
          placeholder="Search: heart, femur, biceps…"
          className="w-full rounded-lg border border-ink-700 bg-ink-850 py-2.5 pl-9 pr-8 text-base lg:py-2 lg:text-sm text-ink-200 placeholder:text-ink-400 focus:border-cyan-400/60 focus:outline-none"
          aria-label="Search anatomy by anatomical or common name"
        />
        {q && (
          <button type="button" onClick={() => setQ('')} className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-ink-400 hover:text-ink-200" aria-label="Clear search">
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </label>
      {system !== 'all' && (
        <label className="mt-1.5 flex items-center gap-2 text-[11px] text-ink-400">
          <input type="checkbox" checked={scoped} onChange={(e) => setScoped(e.target.checked)} className="accent-cyan-400" />
          Only search {SYSTEM_BY_ID[system].shortName.toLowerCase()} system
        </label>
      )}
      {q.length >= 2 && (
        <ul className={`scroll-thin mt-2 overflow-y-auto rounded-lg border border-ink-700 bg-ink-900/95 ${listClassName}`} role="listbox" aria-label="Search results">
          {results.length === 0 && <li className="px-3 py-2 text-xs text-ink-400">No matching structures.</li>}
          {results.map((r) => (
            <li key={r.id}>
              <button
                type="button"
                onClick={() => pick(r.id)}
                className="flex w-full items-center gap-2 px-3 py-2.5 lg:py-1.5 text-left text-sm hover:bg-ink-800 focus:bg-ink-800 focus:outline-none"
              >
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: SYSTEM_BY_ID[r.system].color }} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-ink-200">{r.name}</span>
                  {r.via && <span className="block truncate text-[11px] text-ink-400">matches “{r.via}”</span>}
                </span>
                <span className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold ${r.kind === 'model' ? 'bg-cyan-400/15 text-cyan-300' : 'bg-amber-400/15 text-amber-300'}`}>
                  {r.kind === 'model' ? '3D' : 'Info only'}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SystemDots({ id }: { id: SystemId }) {
  const status = useAssets((s) => s.status);
  const body = useViewer((s) => s.body);
  const dot = (mode: 'realistic' | 'educational') => {
    const a = assetFor(id, mode, body);
    if (!a) return 'bg-transparent ring-1 ring-ink-600';
    const st = status[a.id]?.state;
    return st === 'stored' ? 'bg-emerald-400' : st === 'downloading' || st === 'verifying' || st === 'queued' ? 'bg-cyan-400 animate-pulse' : st === 'failed' ? 'bg-rose-400' : 'bg-ink-600';
  };
  return (
    <span className="flex gap-1" title="Offline availability: Realistic / Educational">
      <span className={`h-1.5 w-1.5 rounded-full ${dot('realistic')}`} />
      <span className={`h-1.5 w-1.5 rounded-full ${dot('educational')}`} />
    </span>
  );
}

export function Sidebar() {
  const system = useViewer((s) => s.system);
  const body = useViewer((s) => s.body);
  const setSystem = useViewer((s) => s.setSystem);
  const openPanel = useViewer((s) => s.openPanel);
  const requestCamera = useViewer((s) => s.requestCamera);

  const choose = (id: SystemId | 'all') => {
    setSystem(id);
    requestCamera({ kind: 'reset' });
  };

  return (
    <nav className="flex h-full w-full flex-col gap-4 bg-ink-900/95 py-4" aria-label="Organ systems">
      <div className="flex items-center gap-3 px-4">
        <Logo className="h-9 w-9" />
        <div>
          <h1 className="font-display text-[17px] font-semibold leading-tight tracking-tight text-white">Anatomy Explorer</h1>
          <p className="text-[11px] text-ink-400">Interactive 3D human anatomy</p>
        </div>
      </div>
      <SearchBox />
      <div className="scroll-thin min-h-0 flex-1 overflow-y-auto px-2">
        <p className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-400">Explore</p>
        <ul className="space-y-0.5">
          {(['all', ...SYSTEMS.map((s) => s.id)] as const).map((id) => {
            const Icon = SYSTEM_ICONS[id];
            const active = system === id;
            const color = id === 'all' ? '#67e8f9' : SYSTEM_BY_ID[id].color;
            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => choose(id)}
                  aria-current={active ? 'true' : undefined}
                  className={`group flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left text-sm transition ${active ? 'bg-cyan-400/10 text-white ring-1 ring-cyan-400/30' : 'text-ink-300 hover:bg-ink-800 hover:text-ink-200'}`}
                >
                  <span className="grid h-7 w-7 place-items-center rounded-md bg-ink-800" style={{ color }}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="flex-1 truncate">{id === 'all' ? 'Full body' : SYSTEM_BY_ID[id].shortName}</span>
                  {id !== 'all' && (
                    <>
                      <span className="text-[10px] tabular-nums text-ink-400">{count(id, body)}</span>
                      <SystemDots id={id} />
                    </>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="space-y-2 px-4">
        <OfflineBadge />
        <div className="grid grid-cols-2 gap-2">
          <button type="button" onClick={() => openPanel('downloads')} className="flex items-center justify-center gap-1.5 rounded-lg border border-ink-700 bg-ink-850 px-2 py-2 text-xs text-ink-200 hover:border-cyan-400/50">
            <Download className="h-3.5 w-3.5" /> Downloads
          </button>
          <button type="button" onClick={() => openPanel('about')} className="flex items-center justify-center gap-1.5 rounded-lg border border-ink-700 bg-ink-850 px-2 py-2 text-xs text-ink-200 hover:border-cyan-400/50">
            <Info className="h-3.5 w-3.5" /> Sources
          </button>
        </div>
        <button type="button" onClick={() => openPanel('firstRun')} className="flex w-full items-center justify-center gap-1.5 text-[11px] text-ink-400 hover:text-ink-200">
          <BookOpen className="h-3 w-3" /> Getting started &amp; offline setup
        </button>
      </div>
    </nav>
  );
}
