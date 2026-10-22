import { create } from 'zustand';
import type { LayerId, Mode, SystemId } from '../types';
import { DEFAULT_LAYERS, loadPreferences, savePreferences } from './preferences';
import { STRUCTURE_BY_ID, hasModel } from '../data/manifest';
import { updateCutPlane } from '../viewer/cutPlane';

export type CameraRequest =
  | { kind: 'focus'; id: string; nonce: number }
  | { kind: 'reset'; nonce: number }
  | { kind: 'zoom'; factor: number; nonce: number };

export type CutAxis = 'none' | 'sagittal' | 'coronal' | 'transverse';

export interface Notice {
  text: string;
  tone: 'info' | 'warning' | 'error';
  actions?: { label: string; run: () => void }[];
}

export type Panel = 'downloads' | 'firstRun' | 'about' | null;

interface ViewerState {
  mode: Mode;
  system: SystemId | 'all';
  selectedId: string | null;
  /** An information-only entry (no 3D model) being shown in the info panel. */
  infoId: string | null;
  hoveredId: string | null;
  labels: boolean;
  layers: Record<LayerId, boolean>;
  hidden: Set<string>;
  /** Opacity applied to skin and superficial muscle when "see-through" is on (1 = opaque). */
  outerOpacity: number;
  cut: { axis: CutAxis; position: number };
  /** Show the skeleton faintly behind single-system views for orientation. */
  context: boolean;
  /** Fade everything except the selected structure so it is never hidden behind neighbors. */
  fadeOthers: boolean;
  camera: CameraRequest | null;
  notice: Notice | null;
  tour: { id: string; step: number } | null;
  panel: Panel;
  navOpen: boolean;
  firstRunDone: boolean;
  /** Bumped to remount models after a failed load is retried. */
  reloadNonce: number;

  setMode: (mode: Mode) => void;
  setSystem: (system: SystemId | 'all') => void;
  select: (id: string | null, opts?: { focus?: boolean }) => void;
  hover: (id: string | null) => void;
  showInfo: (id: string | null) => void;
  toggleLabels: () => void;
  setLayer: (layer: LayerId, visible: boolean) => void;
  setLayers: (layers: Partial<Record<LayerId, boolean>>) => void;
  restoreLayers: () => void;
  hide: (id: string) => void;
  showAll: () => void;
  setOuterOpacity: (v: number) => void;
  setCut: (cut: Partial<{ axis: CutAxis; position: number }>) => void;
  setContext: (context: boolean) => void;
  setFadeOthers: (fadeOthers: boolean) => void;
  requestCamera: (req: Omit<CameraRequest, 'nonce'> & Partial<CameraRequest>) => void;
  notify: (notice: Notice | null) => void;
  setTour: (tour: { id: string; step: number } | null) => void;
  openPanel: (panel: Panel) => void;
  setNavOpen: (open: boolean) => void;
  finishFirstRun: () => void;
}

const prefs = loadPreferences();
let nonce = 0;

export const useViewer = create<ViewerState>((set, get) => ({
  mode: prefs.mode,
  system: prefs.system,
  selectedId: null,
  infoId: null,
  hoveredId: null,
  labels: prefs.labels,
  layers: prefs.layers,
  hidden: new Set(),
  outerOpacity: 1,
  cut: { axis: 'none', position: 0 },
  context: true,
  fadeOthers: true,
  camera: null,
  notice: null,
  tour: null,
  panel: prefs.firstRunDone ? null : 'firstRun',
  navOpen: false,
  firstRunDone: prefs.firstRunDone,
  reloadNonce: 0,

  setMode: (mode) => {
    const { selectedId, mode: previous } = get();
    if (mode === previous) return;
    set({ mode });
    // Keep the selection if the structure exists in the destination mode; otherwise explain.
    if (selectedId) {
      const s = STRUCTURE_BY_ID.get(selectedId);
      if (s && !hasModel(s, mode)) {
        set({
          selectedId: null,
          notice: {
            tone: 'warning',
            text: `${s.name} has no ${mode} model in the installed assets.`,
            actions: [{ label: `Back to ${previous} mode`, run: () => get().setMode(previous) }],
          },
        });
      }
    }
  },
  setSystem: (system) => {
    const { selectedId } = get();
    const s = selectedId ? STRUCTURE_BY_ID.get(selectedId) : undefined;
    const keep = s && (system === 'all' || s.system === system || s.alsoIn.includes(system));
    set({ system, selectedId: keep ? selectedId : null, hidden: new Set(), navOpen: false });
  },
  select: (id, opts) => {
    set({ selectedId: id, infoId: null });
    if (id && opts?.focus !== false) get().requestCamera({ kind: 'focus', id });
  },
  hover: (id) => {
    if (get().hoveredId !== id) set({ hoveredId: id });
  },
  showInfo: (infoId) => set({ infoId, selectedId: null }),
  toggleLabels: () => set({ labels: !get().labels }),
  setLayer: (layer, visible) => set({ layers: { ...get().layers, [layer]: visible } }),
  setLayers: (layers) => set({ layers: { ...get().layers, ...layers } }),
  restoreLayers: () => set({ layers: Object.fromEntries(Object.keys(DEFAULT_LAYERS).map((k) => [k, true])) as Record<LayerId, boolean>, hidden: new Set(), outerOpacity: 1, cut: { axis: 'none', position: 0 }, system: 'all' }),
  hide: (id) => {
    const hidden = new Set(get().hidden);
    hidden.add(id);
    set({ hidden, selectedId: get().selectedId === id ? null : get().selectedId });
  },
  showAll: () => set({ hidden: new Set() }),
  setOuterOpacity: (outerOpacity) => set({ outerOpacity }),
  setCut: (cut) => {
    const next = { ...get().cut, ...cut };
    updateCutPlane(next.axis, next.position);
    set({ cut: next });
  },
  setContext: (context) => set({ context }),
  setFadeOthers: (fadeOthers) => set({ fadeOthers }),
  requestCamera: (req) => set({ camera: { ...req, nonce: ++nonce } as CameraRequest }),
  notify: (notice) => set({ notice }),
  setTour: (tour) => set({ tour }),
  openPanel: (panel) => set({ panel }),
  setNavOpen: (navOpen) => set({ navOpen }),
  finishFirstRun: () => set({ firstRunDone: true, panel: null }),
}));

// Persist the lightweight preferences.
useViewer.subscribe((s) => {
  savePreferences({ mode: s.mode, system: s.system, labels: s.labels, layers: s.layers, firstRunDone: s.firstRunDone });
});
