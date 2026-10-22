// Small user preferences only. Binary assets live in IndexedDB / Cache Storage, never here.
import type { LayerId, Mode, SystemId } from '../types';

export interface Preferences {
  mode: Mode;
  system: SystemId | 'all';
  labels: boolean;
  layers: Record<LayerId, boolean>;
  firstRunDone: boolean;
}

const KEY = 'anatomy-explorer:prefs:v1';

export const DEFAULT_LAYERS: Record<LayerId, boolean> = {
  skin: false,
  'muscles-superficial': false,
  'muscles-deep': false,
  skeleton: true,
  organs: true,
  vessels: true,
  nervous: true,
};

export const DEFAULT_PREFS: Preferences = {
  mode: 'educational',
  system: 'all',
  labels: true,
  layers: DEFAULT_LAYERS,
  firstRunDone: false,
};

export function loadPreferences(): Preferences {
  try {
    const stored = JSON.parse(localStorage.getItem(KEY) ?? '{}') as Partial<Preferences>;
    return { ...DEFAULT_PREFS, ...stored, layers: { ...DEFAULT_LAYERS, ...stored.layers } };
  } catch {
    return DEFAULT_PREFS;
  }
}

export function savePreferences(prefs: Preferences): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(prefs));
  } catch {
    // Storage may be unavailable (private mode); preferences are a convenience only.
  }
}
