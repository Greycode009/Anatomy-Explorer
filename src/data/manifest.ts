import raw from './anatomy-manifest.json';
import type { AnatomyManifest, AssetEntry, Mode, Structure, SystemId } from '../types';

export const manifest = raw as unknown as AnatomyManifest;

export const STRUCTURES: Structure[] = manifest.structures;
export const STRUCTURE_BY_ID = new Map(STRUCTURES.map((s) => [s.id, s]));
export const ASSETS: AssetEntry[] = manifest.assets;
export const ASSET_BY_ID = new Map(ASSETS.map((a) => [a.id, a]));

export function assetFor(system: SystemId, mode: Mode): AssetEntry | undefined {
  return ASSET_BY_ID.get(`${mode}/${system}`);
}

/** Structures shown when a system is active: its own structures plus ones that also belong to it. */
export function structuresInSystem(system: SystemId): Structure[] {
  return STRUCTURES.filter((s) => s.system === system || s.alsoIn.includes(system));
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
