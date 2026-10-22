import type { Body, LayerId, Mode, Structure, SystemId } from '../types';
import { STRUCTURES } from '../data/manifest';

export interface VisibilityInput {
  body: Body;
  system: SystemId | 'all';
  layers: Record<LayerId, boolean>;
  hidden: Set<string>;
}

export function inScope(s: Structure, system: SystemId | 'all'): boolean {
  return system === 'all' || s.system === system || s.alsoIn.includes(system);
}

/**
 * Full-body view: layer toggles decide what is shown. System view: the system's own structures
 * are shown regardless of layers. Individually hidden structures are always hidden.
 */
export function isVisible(s: Structure, v: VisibilityInput): boolean {
  if (s.body !== v.body || v.hidden.has(s.id)) return false;
  if (v.system !== 'all') return inScope(s, v.system);
  return v.layers[s.layer];
}

/** Skeleton shown as a faint, non-selectable outline for orientation in single-system views. */
export function isContext(s: Structure, v: VisibilityInput, context: boolean): boolean {
  return context && s.body === v.body && v.system !== 'all' && v.system !== 'skeletal' && s.system === 'skeletal' && !inScope(s, v.system);
}

export function neededAssets(v: VisibilityInput, mode: Mode, context: boolean): string[] {
  const ids = new Set<string>();
  for (const s of STRUCTURES) {
    const asset = s.modes[mode];
    if (!asset || ids.has(asset)) continue;
    if (isVisible(s, v) || isContext(s, v, context)) ids.add(asset);
  }
  return [...ids].sort();
}
