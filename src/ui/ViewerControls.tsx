import { useState } from 'react';
import { Eye, EyeOff, Focus, Layers, Mars, RotateCcw, Scissors, Tag, Venus, X, ZoomIn, ZoomOut } from 'lucide-react';
import type { Body, LayerId, Mode } from '../types';
import { STRUCTURES, STRUCTURE_BY_ID } from '../data/manifest';
import { useViewer, type CutAxis } from '../state/store';
import { CUT_RANGES } from '../viewer/cutPlane';

export function ModeSwitch({ compact = false }: { compact?: boolean }) {
  const mode = useViewer((s) => s.mode);
  const setMode = useViewer((s) => s.setMode);
  const btn = (m: Mode, label: string, hint: string) => (
    <button
      type="button"
      onClick={() => setMode(m)}
      aria-pressed={mode === m}
      title={hint}
      className={`rounded-full font-semibold transition ${compact ? 'px-3 py-1.5 text-xs' : 'px-3.5 py-1.5 text-xs sm:px-4 sm:text-sm'} ${mode === m ? 'bg-cyan-400 text-ink-950 shadow-[0_0_20px_rgba(34,211,238,0.35)]' : 'text-ink-300 hover:text-white'}`}
    >
      {label}
    </button>
  );
  return (
    <div role="group" aria-label="Visualization mode" className="flex rounded-full border border-ink-700 bg-ink-900/85 p-1 backdrop-blur">
      {btn('realistic', 'Realistic', 'High-detail meshes with physically based tissue materials')}
      {btn('educational', 'Educational', 'Simplified meshes with distinct colors and labels')}
    </div>
  );
}

/** Male / Female reference body. Icons plus text, so the choice never relies on color alone. */
export function BodySwitch({ compact = false }: { compact?: boolean }) {
  const body = useViewer((s) => s.body);
  const setBody = useViewer((s) => s.setBody);
  const btn = (b: Body, label: string, Icon: typeof Mars, hint: string) => (
    <button
      type="button"
      onClick={() => setBody(b)}
      aria-pressed={body === b}
      title={hint}
      className={`flex items-center gap-1 rounded-full font-semibold transition ${compact ? 'px-2.5 py-1.5 text-xs' : 'px-3 py-1.5 text-xs sm:text-sm'} ${body === b ? 'bg-fuchsia-300 text-ink-950' : 'text-ink-300 hover:text-white'}`}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
    </button>
  );
  return (
    <div role="group" aria-label="Body" className="flex rounded-full border border-ink-700 bg-ink-900/85 p-1 backdrop-blur">
      {btn('male', 'Male', Mars, 'Male body (BodyParts3D): full skeleton, muscles and organs')}
      {btn('female', 'Female', Venus, 'Female body (Human Reference Atlas): organs, reproductive system, brain, pelvis and spine')}
    </div>
  );
}

const LAYERS: { id: LayerId; label: string }[] = [
  { id: 'skin', label: 'Skin & hair' },
  { id: 'muscles-superficial', label: 'Superficial muscles' },
  { id: 'muscles-deep', label: 'Deep muscles' },
  { id: 'skeleton', label: 'Skeleton' },
  { id: 'organs', label: 'Organs' },
  { id: 'vessels', label: 'Heart & vessels' },
  { id: 'nervous', label: 'Brain & nerves' },
];
const LAYER_COUNTS = Object.fromEntries(LAYERS.map((l) => [l.id, STRUCTURES.filter((s) => s.layer === l.id).length]));

const all = (on: boolean) => Object.fromEntries(LAYERS.map((l) => [l.id, on])) as Record<LayerId, boolean>;
const PRESETS: { label: string; layers: Record<LayerId, boolean> }[] = [
  { label: 'Body surface', layers: { ...all(false), skin: true } },
  { label: 'Superficial muscles', layers: { ...all(false), 'muscles-superficial': true, 'muscles-deep': true, skeleton: true } },
  { label: 'Deep muscles', layers: { ...all(false), 'muscles-deep': true, skeleton: true } },
  { label: 'Skeleton', layers: { ...all(false), skeleton: true } },
  { label: 'Skeleton & organs', layers: { ...all(false), skeleton: true, organs: true, vessels: true, nervous: true } },
  { label: 'Organs (rib cage hidden)', layers: { ...all(false), organs: true, vessels: true } },
];

/** Layer toggles, presets and see-through controls (used by the desktop popover and the mobile sheet). */
export function LayerControls() {
  const { layers, setLayer, setLayers, restoreLayers, system, setSystem, outerOpacity, setOuterOpacity, context, setContext } = useViewer();
  return (
    <div className="space-y-3">
      {system !== 'all' && (
        <p className="rounded-md bg-amber-400/10 px-2 py-1.5 text-[11px] text-amber-200">
          Layers apply to the full-body view. <button type="button" className="underline" onClick={() => setSystem('all')}>Switch to full body</button>
        </p>
      )}
      <ul className="space-y-1">
        {LAYERS.map((l) => (
          <li key={l.id}>
            <label className="flex min-h-9 cursor-pointer items-center gap-2 rounded px-1.5 py-1 text-sm hover:bg-ink-800">
              <input type="checkbox" checked={layers[l.id]} onChange={(e) => setLayer(l.id, e.target.checked)} className="h-4 w-4 accent-cyan-400" />
              {layers[l.id] ? <Eye className="h-3.5 w-3.5 text-cyan-300" /> : <EyeOff className="h-3.5 w-3.5 text-ink-400" />}
              <span className={layers[l.id] ? 'text-ink-200' : 'text-ink-400'}>{l.label}</span>
              <span className="ml-auto text-[10px] text-ink-400">{LAYER_COUNTS[l.id]}</span>
            </label>
          </li>
        ))}
      </ul>
      <div>
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-400">Presets</p>
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map((p) => (
            <button key={p.label} type="button" onClick={() => { if (system !== 'all') setSystem('all'); setLayers(p.layers); }} className="rounded-full border border-ink-700 px-2.5 py-1 text-[11px] text-ink-300 hover:border-cyan-400/50 hover:text-white">
              {p.label}
            </button>
          ))}
        </div>
      </div>
      <label className="block text-xs text-ink-300">
        See-through skin &amp; superficial muscles: {Math.round((1 - outerOpacity) * 100)}%
        <input type="range" min={0.1} max={1} step={0.05} value={outerOpacity} onChange={(e) => setOuterOpacity(Number(e.target.value))} className="mt-1 w-full accent-cyan-400" style={{ direction: 'rtl' }} />
        <span className="text-[10px] text-ink-400">Transparency only — it does not dissect tissue.</span>
      </label>
      <label className="flex items-center gap-2 text-xs text-ink-300">
        <input type="checkbox" checked={context} onChange={(e) => setContext(e.target.checked)} className="h-4 w-4 accent-cyan-400" />
        Faint skeleton behind single-system views
      </label>
      <button type="button" onClick={restoreLayers} className="w-full rounded-md border border-ink-700 py-2 text-xs text-ink-200 hover:border-cyan-400/50">Restore all layers</button>
    </div>
  );
}

function LayerPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="w-72 space-y-3 rounded-xl border border-ink-700 bg-ink-900/95 p-3 shadow-2xl backdrop-blur" role="dialog" aria-label="Layers">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-sm font-semibold text-white">Layers</h3>
        <button type="button" onClick={onClose} aria-label="Close layers" className="rounded p-1 text-ink-400 hover:text-white"><X className="h-4 w-4" /></button>
      </div>
      <LayerControls />
    </div>
  );
}

/** Cutaway plane controls (used by the desktop popover and the mobile sheet). */
export function CutControls() {
  const cut = useViewer((s) => s.cut);
  const setCut = useViewer((s) => s.setCut);
  const range = cut.axis !== 'none' ? CUT_RANGES[cut.axis] : null;
  const choose = (axis: CutAxis) => {
    const r = axis !== 'none' ? CUT_RANGES[axis] : null;
    setCut({ axis, position: r ? (axis === 'transverse' ? 1.3 : 0) : 0 });
  };
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-4 gap-1">
        {(['none', 'sagittal', 'coronal', 'transverse'] as CutAxis[]).map((a) => (
          <button key={a} type="button" aria-pressed={cut.axis === a} onClick={() => choose(a)} className={`rounded-md px-1 py-1.5 text-[11px] ${cut.axis === a ? 'bg-cyan-400 text-ink-950' : 'border border-ink-700 text-ink-300'}`}>
            {a === 'none' ? 'Off' : CUT_RANGES[a].label}
          </button>
        ))}
      </div>
      {range && (
        <label className="block text-xs text-ink-300">
          {range.hint}
          <input type="range" min={range.min} max={range.max} step={0.005} value={cut.position} onChange={(e) => setCut({ position: Number(e.target.value) })} className="mt-1 w-full accent-cyan-400" />
        </label>
      )}
      <p className="text-[10px] leading-relaxed text-ink-400">Clips the real meshes along a plane. Organs are surface models, so cut organs appear hollow.</p>
    </div>
  );
}

function CutPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="w-72 space-y-3 rounded-xl border border-ink-700 bg-ink-900/95 p-3 shadow-2xl backdrop-blur" role="dialog" aria-label="Cutaway">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-sm font-semibold text-white">Cutaway plane</h3>
        <button type="button" onClick={onClose} aria-label="Close cutaway" className="rounded p-1 text-ink-400 hover:text-white"><X className="h-4 w-4" /></button>
      </div>
      <CutControls />
    </div>
  );
}

function ToolButton({ label, onClick, active, children, disabled }: { label: string; onClick: () => void; active?: boolean; disabled?: boolean; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} aria-label={label} title={label} aria-pressed={active}
      className={`grid h-10 w-10 place-items-center rounded-lg transition disabled:opacity-30 ${active ? 'bg-cyan-400/20 text-cyan-200' : 'text-ink-300 hover:bg-ink-800 hover:text-white'}`}>
      {children}
    </button>
  );
}

export function Toolbar() {
  const [open, setOpen] = useState<'layers' | 'cut' | null>(null);
  const { labels, toggleLabels, requestCamera, selectedId, hide, hidden, showAll, cut, select, fadeOthers, setFadeOthers } = useViewer();
  return (
    <div className="relative flex flex-col items-center gap-2">
      {open === 'layers' && <LayerPanel onClose={() => setOpen(null)} />}
      {open === 'cut' && <CutPanel onClose={() => setOpen(null)} />}
      <div className="flex flex-wrap items-center justify-center gap-0.5 rounded-xl border border-ink-700 bg-ink-900/90 p-1 shadow-xl backdrop-blur" role="toolbar" aria-label="Viewer controls">
        <ToolButton label="Zoom in" onClick={() => requestCamera({ kind: 'zoom', factor: 1.4 })}><ZoomIn className="h-4.5 w-4.5" /></ToolButton>
        <ToolButton label="Zoom out" onClick={() => requestCamera({ kind: 'zoom', factor: 1 / 1.4 })}><ZoomOut className="h-4.5 w-4.5" /></ToolButton>
        <ToolButton label="Reset to full-body view" onClick={() => { select(null); requestCamera({ kind: 'reset' }); }}><RotateCcw className="h-4.5 w-4.5" /></ToolButton>
        <span className="mx-1 h-6 w-px bg-ink-700" />
        <ToolButton label={labels ? 'Hide labels' : 'Show labels'} active={labels} onClick={toggleLabels}><Tag className="h-4.5 w-4.5" /></ToolButton>
        <ToolButton label={fadeOthers ? 'Stop fading surroundings of the selection' : 'Fade surroundings of the selection'} active={fadeOthers} onClick={() => setFadeOthers(!fadeOthers)}><Focus className="h-4.5 w-4.5" /></ToolButton>
        <ToolButton label={selectedId ? `Hide ${STRUCTURE_BY_ID.get(selectedId)?.name}` : 'Hide selected (select a structure first)'} disabled={!selectedId} onClick={() => selectedId && hide(selectedId)}><EyeOff className="h-4.5 w-4.5" /></ToolButton>
        <ToolButton label={`Show hidden structures (${hidden.size})`} disabled={hidden.size === 0} onClick={showAll}>
          <span className="relative"><Eye className="h-4.5 w-4.5" />{hidden.size > 0 && <span className="absolute -right-2 -top-2 rounded-full bg-cyan-400 px-1 text-[9px] font-bold text-ink-950">{hidden.size}</span>}</span>
        </ToolButton>
        <span className="mx-1 h-6 w-px bg-ink-700" />
        <ToolButton label="Layers" active={open === 'layers'} onClick={() => setOpen(open === 'layers' ? null : 'layers')}><Layers className="h-4.5 w-4.5" /></ToolButton>
        <ToolButton label="Cutaway" active={open === 'cut' || cut.axis !== 'none'} onClick={() => setOpen(open === 'cut' ? null : 'cut')}><Scissors className="h-4.5 w-4.5" /></ToolButton>
      </div>
    </div>
  );
}
