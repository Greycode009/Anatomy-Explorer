import type { ContentEntry, InfoOnlyStructure, Structure } from '../../types';
import { MUSCULAR_CONTENT } from './muscular';
import { SKELETAL_CONTENT } from './skeletal';
import { NERVOUS_CONTENT } from './nervous';
import { ORGAN_CONTENT } from './organs';
import { FEMALE_CONTENT } from './female';
import { INFO_ONLY } from './info-only';
import { SYSTEM_BY_ID } from '../systems';

export const CONTENT: Record<string, ContentEntry> = {
  ...MUSCULAR_CONTENT,
  ...SKELETAL_CONTENT,
  ...NERVOUS_CONTENT,
  ...ORGAN_CONTENT,
  ...FEMALE_CONTENT,
};

export { INFO_ONLY };
export const INFO_ONLY_BY_ID = new Map(INFO_ONLY.map((i) => [i.id, i]));
const INFO_ONLY_BY_NAME = new Map(INFO_ONLY.map((i) => [i.name.toLowerCase(), i]));

/** Resolves a `related` value that is an info-only ID or an info-only entry's display name. */
export function infoOnlyFor(ref: string): InfoOnlyStructure | undefined {
  return INFO_ONLY_BY_ID.get(ref) ?? INFO_ONLY_BY_NAME.get(ref.toLowerCase());
}

/**
 * Content for a modelled structure, or null when no educational entry has been written yet.
 * Female-body structures can point at an information-only entry (e.g. the uterus), which is then
 * backed by a real model.
 */
export function contentFor(s: Structure): ContentEntry | null {
  return CONTENT[s.contentId] ?? INFO_ONLY_BY_ID.get(s.contentId)?.content ?? null;
}

/** Fallback text used when a structure has geometry but no written entry. */
export function fallbackContent(s: Structure): ContentEntry {
  return {
    anatomicalName: s.name,
    summary: `${s.name} is part of the ${SYSTEM_BY_ID[s.system].name.toLowerCase()}. A detailed educational entry has not been written for this structure yet.`,
    location: 'See its highlighted position in the 3D model.',
    functions: [],
  };
}

export type { InfoOnlyStructure };
