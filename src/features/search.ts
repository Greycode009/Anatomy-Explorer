import type { SystemId } from '../types';
import { STRUCTURES } from '../data/manifest';
import { CONTENT, INFO_ONLY } from '../data/content';

export interface SearchResult {
  kind: 'model' | 'info';
  id: string;
  name: string;
  system: SystemId;
  /** Why it matched (alias, part name…) when that is not the display name. */
  via?: string;
  score: number;
}

interface Doc {
  kind: SearchResult['kind'];
  id: string;
  name: string;
  system: SystemId;
  alsoIn: SystemId[];
  terms: { text: string; weight: number }[];
}

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]+/g, ' ').trim();

const DOCS: Doc[] = [
  ...STRUCTURES.map((s): Doc => {
    const c = CONTENT[s.contentId];
    const terms = [
      { text: s.name, weight: 1 },
      ...(c ? [{ text: c.anatomicalName, weight: 0.9 }] : []),
      ...(c?.commonName ? [{ text: c.commonName, weight: 0.95 }] : []),
      ...(c?.aliases ?? []).map((a) => ({ text: a, weight: 0.85 })),
      ...s.parts.map((p) => ({ text: p.name, weight: 0.7 })),
    ];
    return { kind: 'model', id: s.id, name: s.name, system: s.system, alsoIn: s.alsoIn, terms };
  }),
  ...INFO_ONLY.map((i): Doc => ({
    kind: 'info',
    id: i.id,
    name: i.name,
    system: i.system,
    alsoIn: [],
    terms: [
      { text: i.name, weight: 1 },
      { text: i.content.anatomicalName, weight: 0.9 },
      ...(i.content.commonName ? [{ text: i.content.commonName, weight: 0.95 }] : []),
      ...(i.content.aliases ?? []).map((a) => ({ text: a, weight: 0.85 })),
    ],
  })),
].map((d) => ({ ...d, terms: d.terms.map((t) => ({ ...t, text: norm(t.text) })) }));

function scoreTerm(term: string, q: string, qWords: string[]): number {
  if (term === q) return 100;
  if (term.startsWith(q)) return 80;
  if (term.split(' ').some((w) => w.startsWith(q))) return 65;
  if (term.includes(q)) return 50;
  if (qWords.length > 1 && qWords.every((w) => term.includes(w))) return 40;
  return 0;
}

export function search(query: string, system: SystemId | 'all' = 'all', limit = 40): SearchResult[] {
  const q = norm(query);
  if (q.length < 2) return [];
  const qWords = q.split(/\s+/);
  const out: SearchResult[] = [];
  for (const d of DOCS) {
    if (system !== 'all' && d.system !== system && !d.alsoIn.includes(system)) continue;
    let best = 0;
    let via: string | undefined;
    for (const t of d.terms) {
      const s = scoreTerm(t.text, q, qWords) * t.weight;
      if (s > best) {
        best = s;
        via = t.weight < 1 ? t.text : undefined;
      }
    }
    if (best > 0) {
      // Prefer midline/whole structures and modelled ones slightly; shorter names first.
      const score = best + (d.kind === 'model' ? 2 : 0) - d.name.length * 0.02;
      out.push({ kind: d.kind, id: d.id, name: d.name, system: d.system, via: via && via !== norm(d.name) ? via : undefined, score });
    }
  }
  return out.sort((a, b) => b.score - a.score).slice(0, limit);
}
