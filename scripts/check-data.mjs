// Consistency checks between the generated manifest, educational content and tours.
// Usage: node scripts/check-data.mjs   (Node 24 loads the TypeScript data files directly)
import { readFile } from 'node:fs/promises';

const manifest = JSON.parse(await readFile('src/data/anatomy-manifest.json', 'utf8'));
const ids = new Set(manifest.structures.map((s) => s.id));
const { MUSCULAR_CONTENT } = await import('../src/data/content/muscular.ts');
const { SKELETAL_CONTENT } = await import('../src/data/content/skeletal.ts');
const { NERVOUS_CONTENT } = await import('../src/data/content/nervous.ts');
const { ORGAN_CONTENT } = await import('../src/data/content/organs.ts');
const { INFO_ONLY } = await import('../src/data/content/info-only.ts');
const content = { ...MUSCULAR_CONTENT, ...SKELETAL_CONTENT, ...NERVOUS_CONTENT, ...ORGAN_CONTENT };
const infoIds = new Set(INFO_ONLY.map((i) => i.id));
const infoNames = new Set(INFO_ONLY.map((i) => i.name.toLowerCase()));

const problems = [];
const missing = [...new Set(manifest.structures.map((s) => s.contentId))].filter((c) => !content[c]);
if (missing.length) problems.push(`structures without content: ${missing.join(', ')}`);
for (const i of INFO_ONLY) if (ids.has(i.id)) problems.push(`info-only id collides with a structure: ${i.id}`);

let linked = 0, plain = 0;
for (const [key, entry] of [...Object.entries(content), ...INFO_ONLY.map((i) => [i.id, i.content])]) {
  for (const r of entry.related ?? []) {
    if (ids.has(r) || infoIds.has(r) || infoNames.has(r.toLowerCase())) linked++;
    else if (/^[a-z0-9-]+$/.test(r)) problems.push(`${key}: related "${r}" looks like an ID but matches nothing`);
    else plain++;
  }
}

const { TOURS } = await import('../src/data/tours.ts');
for (const t of TOURS) for (const s of t.steps) if (s.structureId && !ids.has(s.structureId)) problems.push(`tour ${t.id}: unknown structure ${s.structureId}`);

const { SYSTEMS } = await import('../src/data/systems.ts').catch(() => ({ SYSTEMS: null }));
if (SYSTEMS) for (const s of SYSTEMS) if (s.focus && !ids.has(s.focus)) problems.push(`system ${s.id}: unknown focus ${s.focus}`);

console.log(`${manifest.structures.length} structures, ${Object.keys(content).length} content entries, ${INFO_ONLY.length} info-only entries`);
console.log(`related links: ${linked} resolve to a structure or info entry, ${plain} plain-text names`);
console.log(`tours: ${TOURS.length}, steps: ${TOURS.reduce((n, t) => n + t.steps.length, 0)}`);
if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log('OK');
