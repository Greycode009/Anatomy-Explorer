import { useMemo } from 'react';
import { ChevronLeft, ChevronRight, CloudOff, LoaderCircle, RefreshCw, Route, TriangleAlert, X } from 'lucide-react';
import { ASSET_BY_ID, STRUCTURE_BY_ID, formatBytes } from '../data/manifest';
import { SYSTEM_BY_ID } from '../data/systems';
import { TOURS } from '../data/tours';
import { useViewer } from '../state/store';
import { useAssets } from '../assets/repository';
import { useLoadState } from '../viewer/modelCache';
import { neededAssets } from '../viewer/visibility';
import { usePointer } from '../viewer/AssetModel';
import { startTour } from '../features/navigation';
import { useOffline } from '../features/offline';

function retry(assetId: string) {
  useLoadState.setState((s) => {
    const loads = { ...s.loads };
    delete loads[assetId];
    return { loads };
  });
  useViewer.setState((s) => ({ reloadNonce: s.reloadNonce + 1 }));
}

/** Download, loading and error status for the models the current view needs. */
export function ViewerStatus() {
  const { mode, system, layers, hidden, context, setMode } = useViewer();
  const status = useAssets((s) => s.status);
  const loads = useLoadState((s) => s.loads);
  const online = useOffline((s) => s.online);
  const needed = useMemo(() => neededAssets({ system, layers, hidden }, mode, context), [system, layers, hidden, mode, context]);

  const rows = needed.map((id) => {
    const asset = ASSET_BY_ID.get(id)!;
    const st = status[id];
    const load = loads[id];
    const name = `${SYSTEM_BY_ID[asset.system].shortName} · ${mode}`;
    if (st?.state === 'downloading' || st?.state === 'queued') {
      const pct = st.total ? Math.round(((st.received ?? 0) / st.total) * 100) : 0;
      return { id, kind: 'busy' as const, text: `Downloading ${name} (${formatBytes(st.received ?? 0)} of ${formatBytes(asset.bytes)})`, pct };
    }
    if (st?.state === 'verifying') return { id, kind: 'busy' as const, text: `Verifying ${name}…`, pct: 100 };
    if (load?.state === 'error') return { id, kind: 'error' as const, text: `${name}: ${load.message}`, pct: 0 };
    if (load?.state === 'loading') return { id, kind: 'busy' as const, text: `Loading ${name} into the viewer…`, pct: -1 };
    if (st?.state === 'storage-unavailable') return { id, kind: 'warn' as const, text: `${name} is shown but could not be saved for offline use.`, pct: 0 };
    return null;
  }).filter((r) => r !== null);

  // Collapse many simultaneous loads into one line to keep the viewer uncluttered.
  const busy = rows.filter((r) => r.kind === 'busy');
  if (busy.length > 2) {
    const downloading = busy.filter((r) => r.pct >= 0);
    const pct = downloading.length ? Math.round(downloading.reduce((n, r) => n + r.pct, 0) / downloading.length) : -1;
    rows.splice(0, rows.length, ...rows.filter((r) => r.kind !== 'busy'), { id: 'busy', kind: 'busy', text: `Preparing ${busy.length} model packs (${needed.map((id) => SYSTEM_BY_ID[ASSET_BY_ID.get(id)!.system].shortName).join(', ')})…`, pct });
  }

  if (!rows.length) return null;
  const other = mode === 'realistic' ? 'educational' : 'realistic';
  return (
    <div className="pointer-events-auto w-[min(92vw,26rem)] space-y-1.5" aria-live="polite">
      {rows.map((r) => (
        <div key={r.id} className={`rounded-lg border px-3 py-2 text-xs shadow-lg backdrop-blur ${r.kind === 'error' ? 'border-rose-400/40 bg-rose-950/80 text-rose-100' : r.kind === 'warn' ? 'border-amber-400/40 bg-amber-950/70 text-amber-100' : 'border-ink-700 bg-ink-900/90 text-ink-200'}`}>
          <div className="flex items-center gap-2">
            {r.kind === 'busy' ? <LoaderCircle className="h-3.5 w-3.5 shrink-0 animate-spin text-cyan-300" /> : r.kind === 'error' && !online ? <CloudOff className="h-3.5 w-3.5 shrink-0" /> : <TriangleAlert className="h-3.5 w-3.5 shrink-0" />}
            <span className="flex-1">{r.text}</span>
            {r.kind === 'error' && online && (
              <button type="button" onClick={() => retry(r.id)} className="flex items-center gap-1 rounded border border-rose-300/40 px-1.5 py-0.5"><RefreshCw className="h-3 w-3" /> Retry</button>
            )}
          </div>
          {r.kind === 'error' && (
            <div className="mt-1.5 flex gap-2 text-[11px]">
              <button type="button" className="underline" onClick={() => setMode(other)}>Try {other} mode</button>
              <button type="button" className="underline" onClick={() => useViewer.getState().openPanel('downloads')}>Open downloads</button>
            </div>
          )}
          {r.kind === 'busy' && r.pct >= 0 && (
            <div className="mt-1.5 h-1 overflow-hidden rounded bg-ink-700"><div className="h-full bg-cyan-400 transition-all" style={{ width: `${r.pct}%` }} /></div>
          )}
        </div>
      ))}
    </div>
  );
}

export function HoverTooltip() {
  const hoveredId = useViewer((s) => s.hoveredId);
  const selectedId = useViewer((s) => s.selectedId);
  const { x, y } = usePointer();
  const s = hoveredId ? STRUCTURE_BY_ID.get(hoveredId) : undefined;
  if (!s || hoveredId === selectedId) return null;
  return (
    <div className="pointer-events-none fixed z-40 hidden rounded-md border border-cyan-300/30 bg-ink-900/90 px-2 py-1 text-xs text-white shadow-lg md:block" style={{ left: x + 14, top: y + 14 }}>
      {s.name}
      <span className="ml-1.5 text-[10px] text-ink-400">click to select</span>
    </div>
  );
}

/** Always-visible status line: what is hovered or selected (not color-only feedback). */
export function StatusLine() {
  const hoveredId = useViewer((s) => s.hoveredId);
  const selectedId = useViewer((s) => s.selectedId);
  const hovered = hoveredId ? STRUCTURE_BY_ID.get(hoveredId)?.name : null;
  const selected = selectedId ? STRUCTURE_BY_ID.get(selectedId)?.name : null;
  if (!hovered && !selected) return <p className="text-[11px] text-ink-400">Drag to rotate · scroll or pinch to zoom · right-drag or two fingers to pan · click a structure to select</p>;
  return (
    <p className="text-[11px] text-ink-300" aria-live="polite">
      {selected && <>Selected: <strong className="text-cyan-200">{selected}</strong></>}
      {hovered && hovered !== selected && <span className="ml-3">Pointer: {hovered}</span>}
    </p>
  );
}

export function NoticeToast() {
  const notice = useViewer((s) => s.notice);
  const notify = useViewer((s) => s.notify);
  if (!notice) return null;
  return (
    <div role="status" className={`pointer-events-auto flex max-w-md items-start gap-2 rounded-lg border px-3 py-2 text-sm shadow-xl backdrop-blur ${notice.tone === 'error' ? 'border-rose-400/40 bg-rose-950/85' : notice.tone === 'warning' ? 'border-amber-400/40 bg-amber-950/85 text-amber-50' : 'border-cyan-400/30 bg-ink-900/90'}`}>
      <span className="flex-1">
        {notice.text}
        {notice.actions?.map((a) => (
          <button key={a.label} type="button" onClick={() => { a.run(); notify(null); }} className="ml-2 underline">{a.label}</button>
        ))}
      </span>
      <button type="button" onClick={() => notify(null)} aria-label="Dismiss" className="rounded p-0.5 opacity-70 hover:opacity-100"><X className="h-4 w-4" /></button>
    </div>
  );
}

export function TourPanel() {
  const tour = useViewer((s) => s.tour);
  const setTour = useViewer((s) => s.setTour);
  if (!tour) return null;
  const t = TOURS.find((x) => x.id === tour.id);
  const step = t?.steps[tour.step];
  if (!t || !step) return null;
  return (
    <div className="pointer-events-auto w-[min(92vw,24rem)] rounded-xl border border-cyan-400/30 bg-ink-900/95 p-3 shadow-2xl backdrop-blur" role="region" aria-label="Guided exploration">
      <div className="flex items-center gap-2 text-[11px] text-cyan-300">
        <Route className="h-3.5 w-3.5" /> {t.title} · step {tour.step + 1} of {t.steps.length}
        <button type="button" onClick={() => setTour(null)} className="ml-auto rounded p-0.5 text-ink-400 hover:text-white" aria-label="Exit guided exploration"><X className="h-4 w-4" /></button>
      </div>
      <h3 className="mt-1 font-display text-base font-semibold text-white">{step.title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-ink-300">{step.text}</p>
      <div className="mt-3 flex items-center justify-between">
        <button type="button" disabled={tour.step === 0} onClick={() => startTour(t.id, tour.step - 1)} className="flex items-center gap-1 rounded-md border border-ink-700 px-2.5 py-1 text-xs disabled:opacity-30"><ChevronLeft className="h-3.5 w-3.5" /> Previous</button>
        {tour.step < t.steps.length - 1 ? (
          <button type="button" onClick={() => startTour(t.id, tour.step + 1)} className="flex items-center gap-1 rounded-md bg-cyan-400 px-2.5 py-1 text-xs font-semibold text-ink-950">Next <ChevronRight className="h-3.5 w-3.5" /></button>
        ) : (
          <button type="button" onClick={() => setTour(null)} className="rounded-md bg-cyan-400 px-2.5 py-1 text-xs font-semibold text-ink-950">Finish</button>
        )}
      </div>
    </div>
  );
}
