import raw from './anatomy-manifest.json';
import type { AnatomyManifest, AssetEntry, Body, Mode, Structure, SystemId } from '../types';

export const manifest = raw as unknown as AnatomyManifest;

export const STRUCTURES: Structure[] = manifest.structures;
export const STRUCTURE_BY_ID = new Map(STRUCTURES.map((s) => [s.id, s]));
export const ASSETS: AssetEntry[] = manifest.assets;
export const ASSET_BY_ID = new Map(ASSETS.map((a) => [a.id, a]));

export function assetFor(system: SystemId, mode: Mode, body: Body = 'male'): AssetEntry | undefined {
  return ASSET_BY_ID.get(`${body === 'female' ? 'female/' : ''}${mode}/${system}`);
}

/** Structures shown when a system is active: its own structures plus ones that also belong to it. */
export function structuresInSystem(system: SystemId, body: Body): Structure[] {
  return STRUCTURES.filter((s) => s.body === body && (s.system === system || s.alsoIn.includes(system)));
}

/**
 * The structure in the other body that corresponds to `s` (same educational entry, same side),
 * used to keep the selection when switching body. Null when the other body has no match.
 */
export function counterpart(s: Structure, body: Body): Structure | null {
  const same = STRUCTURES.filter((x) => x.body === body && x.contentId === s.contentId);
  return same.find((x) => x.side === s.side) ?? same[0] ?? null;
}

export function hasModel(structure: Structure, mode: Mode): boolean {
  const assetId = structure.modes[mode];
  return !!assetId && ASSET_BY_ID.has(assetId);
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
