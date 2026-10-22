// Converts the downloaded BodyParts3D STL meshes (see fetch-bodyparts3d.mjs) into the app's
// asset packs and writes the anatomy manifest.
//
//   public/anatomy/realistic/<system>.glb    high-detail meshes (decimated for the web)
//   public/anatomy/educational/<system>.glb  heavily simplified meshes for Educational Mode
//   src/data/anatomy-manifest.json           structures, assets, sizes, SHA-256, licensing
//
// Each GLB node is named with the stable structure ID; each primitive carries its BodyParts3D
// source ID in `extras.source`. Coordinates are converted from BodyParts3D (mm, Z up, anterior -Y)
// to the viewer's frame (metres, Y up, anterior +Z, feet at y = 0).
//
// Usage: node scripts/prepare-assets.mjs
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { SYSTEMS, groupFor, classify, contentIdFor } from './anatomy-rules.mjs';
import { PackWriter, bbox, mergeManifest, ready, round, simplify, weld } from './mesh-utils.mjs';
import { BP3D_COMMIT, BP3D_REPO } from './bp3d-source.mjs';

const CACHE = path.resolve('.asset-cache/bp3d');
const ASSET_VERSION = '1.0.0';

/** Per-mode decimation: target triangle count = clamp(tris * ratio, min, max). */
const MODES = {
  realistic: { ratio: 0.16, min: 1500, max: 24000, maxError: 0.004, overrides: { FMA7163: 160000, FMA7274: 60000 } },
  educational: { ratio: 0.025, min: 160, max: 2600, maxError: 0.05, overrides: { FMA7163: 14000, FMA7274: 4000 } },
};

// ---------------------------------------------------------------------------------------------

function parseStl(buf) {
  const count = buf.readUInt32LE(80);
  if (84 + count * 50 !== buf.length) throw new Error('not a binary STL');
  const pos = new Float32Array(count * 9);
  for (let t = 0; t < count; t++) {
    const o = 84 + t * 50 + 12;
    for (let k = 0; k < 9; k++) pos[t * 9 + k] = buf.readFloatLE(o + k * 4);
  }
  return pos;
}

function toViewerFrame(p, origin) {
  // BodyParts3D: x = left(+), y = posterior(+), z = superior(+), millimetres.
  const out = new Float32Array(p.length);
  for (let i = 0; i < p.length; i += 3) {
    out[i] = (p[i] - origin.x) / 1000;
    out[i + 1] = (p[i + 2] - origin.z) / 1000;
    out[i + 2] = -(p[i + 1] - origin.y) / 1000;
  }
  return out;
}

// ---------------------------------------------------------------------------------------------

async function main() {
  await ready();

  const tree = JSON.parse(await readFile(path.join(CACHE, 'tree.json'), 'utf8'));
  const stlEntries = new Map(tree.filter((e) => e.path.includes('/stl/') && e.path.endsWith('.stl')).map((e) => [path.basename(e.path, '.stl'), e]));
  const names = Object.fromEntries((await readFile(path.join(CACHE, 'parts_list_e.txt'), 'utf8'))
    .split(/\r?\n/).slice(1).map((l) => l.split('\t')).filter((a) => a.length >= 2));

  // Group parts into structures.
  const structures = new Map();
  for (const source of stlEntries.keys()) {
    const raw = names[source];
    if (!raw) { console.warn(`skipping ${source}: not in parts list`); continue; }
    const g = groupFor(raw);
    const s = structures.get(g.key) ?? { ...g, parts: [] };
    s.parts.push({ source, name: raw.replace(/, nsn$/, '') });
    structures.set(g.key, s);
  }

  // The skin defines the body's frame: centred left-right and front-back, feet at y = 0.
  const skin = parseStl(await readFile(path.join(CACHE, 'stl', 'FMA7163.stl')));
  const sb = bbox(skin);
  const origin = { x: (sb.min[0] + sb.max[0]) / 2, y: (sb.min[1] + sb.max[1]) / 2, z: sb.min[2] };

  const packs = new PackWriter('');
  const out = [];
  let i = 0;
  for (const s of structures.values()) {
    const { system, alsoIn, layer } = classify(s);
    const worldMin = [Infinity, Infinity, Infinity], worldMax = [-Infinity, -Infinity, -Infinity];
    const tris = {};
    const modes = {};
    for (const part of s.parts) {
      const welded = weld(parseStl(await readFile(path.join(CACHE, 'stl', `${part.source}.stl`))));
      for (const [mode, cfg] of Object.entries(MODES)) {
        const simplified = simplify(welded, cfg, cfg.overrides[part.source]);
        const mesh = { positions: toViewerFrame(simplified.positions, origin), indices: simplified.indices };
        if (mode === 'realistic') {
          const b = bbox(mesh.positions);
          for (let k = 0; k < 3; k++) { worldMin[k] = Math.min(worldMin[k], b.min[k]); worldMax[k] = Math.max(worldMax[k], b.max[k]); }
        }
        modes[mode] = packs.add(mode, system, s.key, part.source, mesh);
        tris[mode] = (tris[mode] ?? 0) + mesh.indices.length / 3;
      }
    }
    out.push({
      id: s.key,
      body: 'male',
      name: s.name,
      system,
      alsoIn,
      side: s.side,
      layer,
      contentId: contentIdFor(s, s.parts.map((p) => p.name)),
      parts: s.parts,
      center: worldMin.map((v, k) => round((v + worldMax[k]) / 2)),
      size: worldMin.map((v, k) => round(worldMax[k] - v)),
      triangles: { realistic: tris.realistic, educational: tris.educational },
      modes,
    });
    if (++i % 50 === 0) console.log(`processed ${i}/${structures.size} structures`);
  }

  const assets = await packs.write('male', ASSET_VERSION, out);
  await mergeManifest({
    body: 'male',
    assetVersion: ASSET_VERSION,
    systems: SYSTEMS,
    structures: out,
    assets,
    source: {
      name: 'BodyParts3D 3.0 (20110915)',
      publisher: 'Database Center for Life Science (DBCLS), Japan',
      mirror: `https://github.com/${BP3D_REPO}/tree/${BP3D_COMMIT}`,
      original: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/',
      license: 'CC BY-SA 2.1 JP',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.1/jp/deed.en',
      attribution: 'BodyParts3D, © The Database Center for Life Science licensed under CC Attribution-Share Alike 2.1 Japan',
      citation: 'Mitsuhashi N, et al. BodyParts3D: 3D structure database for anatomical concepts. Nucleic Acids Res. 2009;37:D782-5. doi:10.1093/nar/gkn613',
      modifications: 'STL converted to GLB, vertices welded, decimated with meshoptimizer (two levels of detail), re-oriented and scaled to metres, grouped into structures, quantized and meshopt-compressed.',
    },
  });
  const total = (m) => assets.filter((a) => a.mode === m).reduce((n, a) => n + a.bytes, 0) / 1e6;
  console.log(`${out.length} structures. realistic ${total('realistic').toFixed(1)} MB, educational ${total('educational').toFixed(1)} MB`);
}

main().catch((err) => { console.error(err); process.exit(1); });
