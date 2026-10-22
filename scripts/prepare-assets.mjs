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
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { Document, NodeIO } from '@gltf-transform/core';
import { EXTMeshoptCompression, KHRMeshQuantization } from '@gltf-transform/extensions';
import { quantize, meshopt } from '@gltf-transform/functions';
import { MeshoptEncoder, MeshoptSimplifier } from 'meshoptimizer';
import { SYSTEMS, groupFor, classify, contentIdFor } from './anatomy-rules.mjs';
import { BP3D_COMMIT, BP3D_REPO } from './bp3d-source.mjs';

const CACHE = path.resolve('.asset-cache/bp3d');
const OUT = path.resolve('public/anatomy');
const MANIFEST = path.resolve('src/data/anatomy-manifest.json');
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

/** Merges bit-identical vertices (STL stores every triangle corner separately). */
function weld(soup) {
  const n = soup.length / 3;
  const bits = new Uint32Array(soup.buffer, soup.byteOffset, soup.length);
  let size = 1;
  while (size < n * 2) size <<= 1;
  const table = new Int32Array(size).fill(-1);
  const verts = new Float32Array(soup.length);
  const indices = new Uint32Array(n);
  let count = 0;
  for (let i = 0; i < n; i++) {
    const a = bits[i * 3], b = bits[i * 3 + 1], c = bits[i * 3 + 2];
    let h = (Math.imul(a, 73856093) ^ Math.imul(b, 19349663) ^ Math.imul(c, 83492791)) & (size - 1);
    for (;;) {
      const slot = table[h];
      if (slot === -1) {
        table[h] = count;
        verts[count * 3] = soup[i * 3]; verts[count * 3 + 1] = soup[i * 3 + 1]; verts[count * 3 + 2] = soup[i * 3 + 2];
        indices[i] = count++;
        break;
      }
      const vb = new Uint32Array(verts.buffer, slot * 12, 3);
      if (vb[0] === a && vb[1] === b && vb[2] === c) { indices[i] = slot; break; }
      h = (h + 1) & (size - 1);
    }
  }
  return { positions: verts.slice(0, count * 3), indices };
}

/** Drops unused vertices after simplification. */
function compact(positions, indices) {
  const remap = new Int32Array(positions.length / 3).fill(-1);
  let count = 0;
  const out = new Uint32Array(indices.length);
  for (let i = 0; i < indices.length; i++) {
    const v = indices[i];
    if (remap[v] === -1) remap[v] = count++;
    out[i] = remap[v];
  }
  const pos = new Float32Array(count * 3);
  for (let v = 0; v < remap.length; v++) {
    const r = remap[v];
    if (r >= 0) { pos[r * 3] = positions[v * 3]; pos[r * 3 + 1] = positions[v * 3 + 1]; pos[r * 3 + 2] = positions[v * 3 + 2]; }
  }
  return { positions: pos, indices: out };
}

function smoothNormals(positions, indices) {
  const nrm = new Float32Array(positions.length);
  for (let i = 0; i < indices.length; i += 3) {
    const a = indices[i] * 3, b = indices[i + 1] * 3, c = indices[i + 2] * 3;
    const e1x = positions[b] - positions[a], e1y = positions[b + 1] - positions[a + 1], e1z = positions[b + 2] - positions[a + 2];
    const e2x = positions[c] - positions[a], e2y = positions[c + 1] - positions[a + 1], e2z = positions[c + 2] - positions[a + 2];
    const nx = e1y * e2z - e1z * e2y, ny = e1z * e2x - e1x * e2z, nz = e1x * e2y - e1y * e2x;
    for (const v of [a, b, c]) { nrm[v] += nx; nrm[v + 1] += ny; nrm[v + 2] += nz; }
  }
  for (let v = 0; v < nrm.length; v += 3) {
    const l = Math.hypot(nrm[v], nrm[v + 1], nrm[v + 2]) || 1;
    nrm[v] /= l; nrm[v + 1] /= l; nrm[v + 2] /= l;
  }
  return nrm;
}

function simplifyFor(mode, source, mesh) {
  const cfg = MODES[mode];
  const tris = mesh.indices.length / 3;
  const target = cfg.overrides[source] ?? Math.round(Math.min(cfg.max, Math.max(cfg.min, tris * cfg.ratio)));
  if (target >= tris) return mesh;
  const [idx] = MeshoptSimplifier.simplify(mesh.indices, mesh.positions, 3, target * 3, cfg.maxError);
  return compact(mesh.positions, idx);
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

function bbox(p) {
  const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < p.length; i += 3) {
    for (let k = 0; k < 3; k++) { if (p[i + k] < min[k]) min[k] = p[i + k]; if (p[i + k] > max[k]) max[k] = p[i + k]; }
  }
  return { min, max };
}

const round = (v) => Math.round(v * 1000) / 1000;

// ---------------------------------------------------------------------------------------------

async function main() {
  await MeshoptSimplifier.ready;
  await MeshoptEncoder.ready;

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

  const docs = {};
  const io = new NodeIO().registerExtensions([EXTMeshoptCompression, KHRMeshQuantization]).registerDependencies({ 'meshopt.encoder': MeshoptEncoder });
  const stats = { realistic: {}, educational: {} };

  function docFor(mode, system) {
    const key = `${mode}/${system}`;
    if (!docs[key]) {
      const doc = new Document();
      doc.createBuffer();
      const scene = doc.createScene(system);
      const material = doc.createMaterial('default').setBaseColorFactor([0.8, 0.8, 0.8, 1]);
      docs[key] = { doc, scene, material };
    }
    return docs[key];
  }

  const out = [];
  let i = 0;
  for (const s of structures.values()) {
    const { system, alsoIn, layer } = classify(s);
    const nodes = {};
    let worldMin = [Infinity, Infinity, Infinity], worldMax = [-Infinity, -Infinity, -Infinity];
    const tris = {};
    for (const part of s.parts) {
      const soup = parseStl(await readFile(path.join(CACHE, 'stl', `${part.source}.stl`)));
      const welded = weld(soup);
      for (const mode of Object.keys(MODES)) {
        const simplified = simplifyFor(mode, part.source, welded);
        const positions = toViewerFrame(simplified.positions, origin);
        const normals = smoothNormals(positions, simplified.indices);
        if (mode === 'realistic') {
          const b = bbox(positions);
          for (let k = 0; k < 3; k++) { worldMin[k] = Math.min(worldMin[k], b.min[k]); worldMax[k] = Math.max(worldMax[k], b.max[k]); }
        }
        const { doc, scene, material } = docFor(mode, system);
        if (!nodes[mode]) {
          const mesh = doc.createMesh(s.key);
          nodes[mode] = doc.createNode(s.key).setMesh(mesh).setExtras({ structureId: s.key });
          scene.addChild(nodes[mode]);
        }
        const buffer = doc.getRoot().listBuffers()[0];
        const prim = doc.createPrimitive()
          .setAttribute('POSITION', doc.createAccessor().setType('VEC3').setArray(positions).setBuffer(buffer))
          .setAttribute('NORMAL', doc.createAccessor().setType('VEC3').setArray(normals).setBuffer(buffer))
          .setIndices(doc.createAccessor().setType('SCALAR').setArray(positions.length / 3 > 65535 ? simplified.indices : new Uint16Array(simplified.indices)).setBuffer(buffer))
          .setMaterial(material)
          .setExtras({ source: part.source });
        nodes[mode].getMesh().addPrimitive(prim);
        tris[mode] = (tris[mode] ?? 0) + simplified.indices.length / 3;
        stats[mode][system] = (stats[mode][system] ?? 0) + simplified.indices.length / 3;
      }
    }
    const rawNames = s.parts.map((p) => p.name);
    out.push({
      id: s.key,
      name: s.name,
      system,
      alsoIn,
      side: s.side,
      layer,
      contentId: contentIdFor(s, rawNames),
      parts: s.parts,
      center: worldMin.map((v, k) => round((v + worldMax[k]) / 2)),
      size: worldMin.map((v, k) => round(worldMax[k] - v)),
      triangles: { realistic: tris.realistic, educational: tris.educational },
      modes: { realistic: `realistic/${system}`, educational: `educational/${system}` },
    });
    if (++i % 50 === 0) console.log(`processed ${i}/${structures.size} structures`);
  }

  // Write GLBs.
  const assets = [];
  for (const [key, { doc }] of Object.entries(docs)) {
    await doc.transform(quantize(), meshopt({ encoder: MeshoptEncoder, level: 'medium' }));
    const glb = await io.writeBinary(doc);
    const file = path.join(OUT, `${key}.glb`);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, glb);
    const [mode, system] = key.split('/');
    assets.push({
      id: key,
      mode,
      system,
      url: `anatomy/${key}.glb`,
      format: 'glb',
      bytes: glb.length,
      sha256: createHash('sha256').update(glb).digest('hex'),
      version: ASSET_VERSION,
      dependencies: [],
      triangles: Math.round(stats[mode][system]),
      structures: out.filter((s) => s.modes[mode] === key).map((s) => s.id),
      requiredExtensions: ['EXT_meshopt_compression', 'KHR_mesh_quantization'],
    });
    console.log(`${key}.glb  ${(glb.length / 1e6).toFixed(2)} MB  ${Math.round(stats[mode][system])} triangles`);
  }

  const manifest = {
    schemaVersion: 1,
    assetVersion: ASSET_VERSION,
    generatedAt: new Date().toISOString(),
    coordinateFrame: 'metres, +Y superior, +Z anterior, +X body-left, feet at y=0',
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
    systems: SYSTEMS,
    assets: assets.sort((a, b) => a.id.localeCompare(b.id)),
    structures: out.sort((a, b) => a.id.localeCompare(b.id)),
  };
  await writeFile(MANIFEST, JSON.stringify(manifest, null, 1));
  const total = (m) => assets.filter((a) => a.mode === m).reduce((n, a) => n + a.bytes, 0) / 1e6;
  console.log(`${out.length} structures. realistic ${total('realistic').toFixed(1)} MB, educational ${total('educational').toFixed(1)} MB`);
}

main().catch((err) => { console.error(err); process.exit(1); });
