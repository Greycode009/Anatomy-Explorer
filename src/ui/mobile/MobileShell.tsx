// Phone and tablet layout (below the `lg` breakpoint): one-tap system chips, a slim tool rail,
// a bottom tab bar and draggable bottom sheets. The desktop layout is unaffected.
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { create } from 'zustand';
import {
  BookOpen, ChevronUp, Crosshair, Download, Eye, EyeOff, Focus, Info, Layers, Menu, RotateCcw, Route, Search, Tag, X,
} from 'lucide-react';
import type { SystemId } from '../../types';
import { SYSTEMS, SYSTEM_BY_ID } from '../../data/systems';
import { STRUCTURE_BY_ID } from '../../data/manifest';
import { contentFor, INFO_ONLY_BY_ID } from '../../data/content';
import { TOURS } from '../../data/tours';
import { useViewer } from '../../state/store';
import { BUNDLED } from '../../assets/repository';
import { startTour } from '../../features/navigation';
import { InfoPanelContent } from '../InfoPanel';
import { SearchBox } from '../Sidebar';
import { BodySwitch, CutControls, LayerControls, ModeSwitch } from '../ViewerControls';
import { OfflineBadge } from '../OfflineBadge';
import { Logo, SYSTEM_ICONS } from '../icons';

export type MobileTab = 'info' | 'search' | 'view' | 'tours' | 'more';
type Snap = 'peek' | 'half' | 'full';

interface MobileState {
  tab: MobileTab | null;
  snap: Snap;
  open: (tab: MobileTab, snap?: Snap) => void;
  close: () => void;
  setSnap: (snap: Snap) => void;
}

export const useMobile = create<MobileState>((set) => ({
  tab: 'info',
  snap: 'peek',
  open: (tab, snap) => set({ tab, snap: snap ?? (tab === 'info' ? 'half' : tab === 'search' ? 'full' : 'half') }),
  close: () => set({ tab: 'info', snap: 'peek' }),
  setSnap: (snap) => set({ snap }),
}));

// Keep the info sheet in step with the selection: a new selection shows its summary card.
useViewer.subscribe((s, prev) => {
  const m = useMobile.getState();
  if ((s.selectedId && s.selectedId !== prev.selectedId) || (s.infoId && s.infoId !== prev.infoId)) {
    if (m.tab !== 'info' || m.snap === 'full') useMobile.setState({ tab: 'info', snap: 'peek' });
  }
  if (s.tour && !prev.tour) useMobile.setState({ tab: 'info', snap: 'peek' });
});

/** Collapses open sheets when the user starts interacting with the 3D view. */
export function collapseSheetsForCanvas(): void {
  const m = useMobile.getState();
  if (m.tab !== 'info' || m.snap !== 'peek') m.close();
}

// ---------------------------------------------------------------------------------------------

function SystemChips() {
  const system = useViewer((s) => s.system);
  const setSystem = useViewer((s) => s.setSystem);
  const requestCamera = useViewer((s) => s.requestCamera);
  const row = useRef<HTMLDivElement>(null);

  useEffect(() => {
    row.current?.querySelector('[aria-current="true"]')?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
  }, [system]);

  const ids: (SystemId | 'all')[] = ['all', ...SYSTEMS.map((s) => s.id)];
  return (
    <div ref={row} className="no-scrollbar pointer-events-auto flex gap-1.5 overflow-x-auto px-3 pb-1" role="navigation" aria-label="Organ systems">
      {ids.map((id) => {
        const Icon = SYSTEM_ICONS[id];
        const active = id === system;
        const color = id === 'all' ? '#67e8f9' : SYSTEM_BY_ID[id].color;
        return (
          <button
            key={id}
            type="button"
            aria-current={active ? 'true' : undefined}
            onClick={() => { setSystem(id); requestCamera({ kind: 'reset' }); }}
            className={`flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3 text-[13px] font-medium backdrop-blur transition ${active ? 'border-cyan-300/60 bg-cyan-400/20 text-white' : 'border-ink-700 bg-ink-900/80 text-ink-300'}`}
          >
            <Icon className="h-4 w-4" style={{ color }} />
            {id === 'all' ? 'Full body' : SYSTEM_BY_ID[id].shortName}
          </button>
        );
      })}
    </div>
  );
}

function RailButton({ label, onClick, active, disabled, children }: { label: string; onClick: () => void; active?: boolean; disabled?: boolean; children: React.ReactNode }) {
  return (
    <button type="button" aria-label={label} title={label} aria-pressed={active} disabled={disabled} onClick={onClick}
      className={`grid h-11 w-11 place-items-center rounded-xl transition disabled:opacity-30 ${active ? 'bg-cyan-400/20 text-cyan-200' : 'text-ink-200 active:bg-ink-700'}`}>
      {children}
    </button>
  );
}

/** Vertical tool rail. Zoom is by pinch, so it only carries the controls touch users need. */
function ToolRail() {
  const { labels, toggleLabels, requestCamera, select, fadeOthers, setFadeOthers, selectedId, hide, hidden, showAll } = useViewer();
  return (
    <div className="pointer-events-auto flex flex-col gap-0.5 rounded-2xl border border-ink-700 bg-ink-900/85 p-1 shadow-xl backdrop-blur" role="toolbar" aria-label="Viewer controls" aria-orientation="vertical">
      <RailButton label="Reset to full-body view" onClick={() => { select(null); requestCamera({ kind: 'reset' }); }}><RotateCcw className="h-5 w-5" /></RailButton>
      <RailButton label={labels ? 'Hide labels' : 'Show labels'} active={labels} onClick={toggleLabels}><Tag className="h-5 w-5" /></RailButton>
      <RailButton label={fadeOthers ? 'Stop fading surroundings of the selection' : 'Fade surroundings of the selection'} active={fadeOthers} onClick={() => setFadeOthers(!fadeOthers)}><Focus className="h-5 w-5" /></RailButton>
      {selectedId && (
        <RailButton label={`Hide ${STRUCTURE_BY_ID.get(selectedId)?.name}`} onClick={() => hide(selectedId)}><EyeOff className="h-5 w-5" /></RailButton>
      )}
      {hidden.size > 0 && (
        <RailButton label={`Show hidden structures (${hidden.size})`} onClick={showAll}>
          <span className="relative"><Eye className="h-5 w-5" /><span className="absolute -right-2 -top-2 rounded-full bg-cyan-400 px-1 text-[9px] font-bold text-ink-950">{hidden.size}</span></span>
        </RailButton>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------------------------

const TAB_BAR = 64;
const PEEK = 112;
const PEEK_COMPACT = 76;

function snapHeight(snap: Snap, available: number, compact = false): number {
  if (snap === 'peek') return compact ? PEEK_COMPACT : PEEK;
  if (snap === 'half') return Math.round(available * 0.52);
  return Math.round(available * 0.94);
}

/**
 * Bottom sheet with three snap points. Drag the handle (or header) up and down; a quick flick
 * moves one snap point, and dragging a non-info sheet below its peek closes it.
 */
function Sheet({ label, header, children, compactPeek = false }: { label: string; header: React.ReactNode; children: React.ReactNode; compactPeek?: boolean }) {
  const { tab, snap, setSnap, close } = useMobile();
  const host = useRef<HTMLDivElement>(null);
  const [available, setAvailable] = useState(600);
  const drag = useRef<{ y: number; h: number; t: number } | null>(null);
  const [dragH, setDragH] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = host.current?.parentElement;
    if (!el) return;
    const ro = new ResizeObserver(() => setAvailable(el.clientHeight - TAB_BAR));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const height = dragH ?? snapHeight(snap, available, compactPeek);
  const snaps: Snap[] = ['peek', 'half', 'full'];

  const onDown = (e: React.PointerEvent) => {
    drag.current = { y: e.clientY, h: height, t: performance.now() };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    setDragH(Math.max(56, Math.min(snapHeight('full', available), drag.current.h + (drag.current.y - e.clientY))));
  };
  const onUp = (e: React.PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    const dy = d.y - e.clientY;
    const h = d.h + dy;
    setDragH(null);
    if (Math.abs(dy) < 6) {
      // A tap on the handle toggles between peek and half.
      setSnap(snap === 'peek' ? 'half' : 'peek');
      return;
    }
    const velocity = dy / Math.max(1, performance.now() - d.t);
    if (tab !== 'info' && h < PEEK - 30) return close();
    if (Math.abs(velocity) > 0.6) {
      const i = snaps.indexOf(snap) + (velocity > 0 ? 1 : -1);
      if (i < 0 && tab !== 'info') return close();
      return setSnap(snaps[Math.max(0, Math.min(2, i))]);
    }
    const nearest = snaps.reduce((a, b) => (Math.abs(snapHeight(b, available) - h) < Math.abs(snapHeight(a, available) - h) ? b : a));
    setSnap(nearest);
  };

  return (
    <section
      ref={host}
      aria-label={label}
      className={`pointer-events-auto absolute inset-x-0 z-30 flex flex-col overflow-hidden rounded-t-2xl border-t border-ink-700 bg-ink-900/97 shadow-[0_-12px_40px_rgba(0,0,0,0.45)] backdrop-blur ${dragH === null ? 'transition-[height] duration-300 ease-out' : ''}`}
      style={{ bottom: `calc(${TAB_BAR}px + env(safe-area-inset-bottom))`, height }}
    >
      <div
        className="shrink-0 cursor-grab touch-none select-none px-4 pb-2 pt-2"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={() => { drag.current = null; setDragH(null); }}
      >
        <div className="mx-auto mb-2 h-1.5 w-10 rounded-full bg-ink-600" aria-hidden="true" />
        {header}
      </div>
      <div className="scroll-thin min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-6">{children}</div>
    </section>
  );
}

function SheetTitle({ title, subtitle, onClose }: { title: string; subtitle?: string; onClose?: () => void }) {
  return (
    <div className="flex items-center gap-2">
      <div className="min-w-0 flex-1">
        <h2 className="truncate font-display text-base font-semibold text-white">{title}</h2>
        {subtitle && <p className="truncate text-xs text-ink-400">{subtitle}</p>}
      </div>
      {onClose && (
        <button type="button" onPointerDown={(e) => e.stopPropagation()} onClick={onClose} aria-label={`Close ${title}`} className="grid h-9 w-9 place-items-center rounded-full bg-ink-800 text-ink-300">
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

/** Compact header of the info sheet: what is selected, a one-line summary and quick actions. */
function InfoHeader() {
  const selectedId = useViewer((s) => s.selectedId);
  const infoId = useViewer((s) => s.infoId);
  const system = useViewer((s) => s.system);
  const { snap, setSnap } = useMobile();
  const stop = (e: React.PointerEvent) => e.stopPropagation();
  const s = selectedId ? STRUCTURE_BY_ID.get(selectedId) : undefined;
  const info = infoId ? INFO_ONLY_BY_ID.get(infoId) : undefined;
  const sysId = s?.system ?? info?.system ?? (system === 'all' ? null : system);
  const color = sysId ? SYSTEM_BY_ID[sysId].color : '#67e8f9';
  const title = s?.name ?? info?.name ?? (system === 'all' ? 'Full body' : SYSTEM_BY_ID[system].name);
  const summary = s ? (contentFor(s)?.summary ?? '') : info ? 'Information only — no 3D model' : 'Tap any structure to identify it';

  return (
    <div className="space-y-2">
      <div className="flex items-start gap-2">
        <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: color }} aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <h2 className="truncate font-display text-base font-semibold text-white">{title}</h2>
          <p className="line-clamp-1 text-xs text-ink-400">{summary}</p>
        </div>
        {(s || info) && (
          <button type="button" onPointerDown={stop} onClick={() => (info ? useViewer.getState().showInfo(null) : useViewer.getState().select(null))} aria-label="Clear selection" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink-800 text-ink-300">
            <X className="h-4 w-4" />
          </button>
        )}
        {!s && !info && snap === 'peek' && (
          <button type="button" onPointerDown={stop} onClick={() => setSnap('half')} className="flex h-9 shrink-0 items-center gap-1 rounded-full bg-cyan-400 px-3.5 text-xs font-semibold text-ink-950">
            Overview <ChevronUp className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
      {snap === 'peek' && (s || info) && (
        <div className="flex gap-2" onPointerDown={stop}>
          {s && (
            <>
              <button type="button" onClick={() => useViewer.getState().requestCamera({ kind: 'focus', id: s.id })} className="flex h-9 items-center gap-1.5 rounded-full border border-ink-700 px-3 text-xs text-ink-200"><Crosshair className="h-3.5 w-3.5" /> Focus</button>
              <button type="button" onClick={() => useViewer.getState().hide(s.id)} className="flex h-9 items-center gap-1.5 rounded-full border border-ink-700 px-3 text-xs text-ink-200"><EyeOff className="h-3.5 w-3.5" /> Hide</button>
            </>
          )}
          <button type="button" onClick={() => setSnap('half')} className="ml-auto flex h-9 items-center gap-1 rounded-full bg-cyan-400 px-3.5 text-xs font-semibold text-ink-950">
            Details <ChevronUp className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

function ToursList() {
  return (
    <ul className="space-y-2">
      {TOURS.map((t) => (
        <li key={t.id}>
          <button type="button" onClick={() => startTour(t.id)} className="w-full rounded-xl border border-ink-700 bg-ink-850 p-3 text-left active:border-cyan-400/50">
            <span className="flex items-center gap-2 text-sm font-medium text-white"><Route className="h-4 w-4 text-cyan-300" /> {t.title}</span>
            <span className="mt-1 block text-xs text-ink-400">{t.description} · {t.steps.length} steps</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

function MoreList() {
  const openPanel = useViewer((s) => s.openPanel);
  const item = 'flex w-full items-center gap-3 rounded-xl border border-ink-700 bg-ink-850 px-3 py-3 text-left text-sm text-ink-200 active:border-cyan-400/50';
  return (
    <div className="space-y-2">
      <OfflineBadge />
      <button type="button" className={item} onClick={() => openPanel('downloads')}><Download className="h-4 w-4 text-cyan-300" /> {BUNDLED ? 'Offline models' : 'Downloads & offline storage'}</button>
      <button type="button" className={item} onClick={() => openPanel('firstRun')}><BookOpen className="h-4 w-4 text-cyan-300" /> Getting started</button>
      <button type="button" className={item} onClick={() => openPanel('about')}><Info className="h-4 w-4 text-cyan-300" /> Sources, license &amp; accuracy</button>
      <p className="pt-2 text-[11px] leading-relaxed text-ink-400">For education only. Not a diagnostic or clinical tool. Models: BodyParts3D (adult male), CC BY-SA 2.1 JP.</p>
    </div>
  );
}

function ActiveSheet() {
  const { tab, close } = useMobile();
  const tour = useViewer((s) => s.tour);
  const selectedId = useViewer((s) => s.selectedId);
  const infoId = useViewer((s) => s.infoId);
  if (tab === 'search') {
    return (
      <Sheet label="Search" header={<SheetTitle title="Search anatomy" subtitle="Anatomical or common names" onClose={close} />}>
        <div className="-mx-4"><SearchBox autoFocus onPick={close} listClassName="max-h-none" /></div>
      </Sheet>
    );
  }
  if (tab === 'view') {
    return (
      <Sheet label="Layers and cutaway" header={<SheetTitle title="Layers & cutaway" onClose={close} />}>
        <div className="space-y-5">
          <LayerControls />
          <div>
            <h3 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-300/80">Cutaway plane</h3>
            <CutControls />
          </div>
        </div>
      </Sheet>
    );
  }
  if (tab === 'tours') {
    return <Sheet label="Guided tours" header={<SheetTitle title="Guided tours" onClose={close} />}><ToursList /></Sheet>;
  }
  if (tab === 'more') {
    return <Sheet label="More" header={<SheetTitle title="More" onClose={close} />}><MoreList /></Sheet>;
  }
  if (tour) return null; // the tour card takes the info sheet's place
  return <Sheet label="Information" header={<InfoHeader />} compactPeek={!selectedId && !infoId}><div className="pt-1"><InfoPanelContent hideHeader /></div></Sheet>;
}

const TABS: { id: MobileTab; label: string; icon: typeof Info }[] = [
  { id: 'info', label: 'Info', icon: Info },
  { id: 'search', label: 'Search', icon: Search },
  { id: 'view', label: 'Layers', icon: Layers },
  { id: 'tours', label: 'Tours', icon: Route },
  { id: 'more', label: 'More', icon: Menu },
];

function TabBar() {
  const { tab, snap, open, close } = useMobile();
  return (
    <nav
      className="pointer-events-auto absolute inset-x-0 bottom-0 z-40 border-t border-ink-800 bg-ink-950/95 backdrop-blur"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-label="App sections"
    >
      <ul className="grid grid-cols-5" style={{ height: TAB_BAR }}>
        {TABS.map(({ id, label, icon: Icon }) => {
          const active = id === 'info' ? tab === 'info' && snap !== 'peek' : tab === id;
          return (
            <li key={id}>
              <button
                type="button"
                aria-pressed={active}
                onClick={() => (active ? close() : open(id))}
                className={`flex h-full w-full flex-col items-center justify-center gap-1 text-[11px] font-medium transition ${active ? 'text-cyan-300' : 'text-ink-400'}`}
              >
                <span className={`grid h-7 w-12 place-items-center rounded-full transition ${active ? 'bg-cyan-400/15' : ''}`}><Icon className="h-5 w-5" /></span>
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function MobileTopBar() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 space-y-2 pt-[max(0.5rem,env(safe-area-inset-top))]">
      <div className="pointer-events-auto flex items-center gap-1.5 px-2">
        <Logo className="h-8 w-8 shrink-0" />
        <span className="sr-only">Anatomy Explorer</span>
        <span className="flex-1" />
        <BodySwitch compact />
        <ModeSwitch compact />
      </div>
      <SystemChips />
    </div>
  );
}

/** Everything the phone layout adds on top of the 3D view. */
export function MobileShell({ tourCard }: { tourCard: React.ReactNode }) {
  return (
    <div className="pointer-events-none absolute inset-0 lg:hidden">
      <MobileTopBar />
      <div className="absolute right-2 top-[6.75rem] z-20"><ToolRail /></div>
      <div className="absolute inset-x-2 z-30 flex justify-center" style={{ bottom: `calc(${TAB_BAR + 8}px + env(safe-area-inset-bottom))` }}>{tourCard}</div>
      <ActiveSheet />
      <TabBar />
    </div>
  );
}
