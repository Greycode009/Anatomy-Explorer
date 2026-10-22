// Shared mesh and manifest helpers for the asset pipelines (prepare-assets.mjs = male body from
// BodyParts3D, prepare-female.mjs = female body from the Human Reference Atlas).
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { Document, NodeIO } from '@gltf-transform/core';
import { EXTMeshoptCompression, KHRMeshQuantization } from '@gltf-transform/extensions';
import { quantize, meshopt } from '@gltf-transform/functions';
import { MeshoptEncoder, MeshoptSimplifier } from 'meshoptimizer';

export const MANIFEST = path.resolve('src/data/anatomy-manifest.json');
export const OUT = path.resolve('public/anatomy');
export const round = (v) => Math.round(v * 1000) / 1000;

/** Merges bit-identical vertices (STL stores every triangle corner separately). */
export function weld(soup) {
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

/** Re-indexes an indexed mesh so vertices with bit-identical positions are shared. */
export function weldIndexed(mesh) {
  const soup = new Float32Array(mesh.indices.length * 3);
  for (let i = 0; i < mesh.indices.length; i++) {
    const v = mesh.indices[i] * 3;
    soup[i * 3] = mesh.positions[v]; soup[i * 3 + 1] = mesh.positions[v + 1]; soup[i * 3 + 2] = mesh.positions[v + 2];
  }
  return weld(soup);
}

/** Drops unused vertices after simplification. */
export function compact(positions, indices) {
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

export function smoothNormals(positions, indices) {
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

/** Decimates an indexed mesh to clamp(tris * ratio, min, max) triangles (or `target` if given). */
export function simplify(mesh, cfg, target) {
  const tris = mesh.indices.length / 3;
  const want = target ?? Math.round(Math.min(cfg.max, Math.max(cfg.min, tris * cfg.ratio)));
  if (want >= tris) return compact(mesh.positions, mesh.indices);
  const [idx] = MeshoptSimplifier.simplify(mesh.indices, mesh.positions, 3, want * 3, cfg.maxError);
  return compact(mesh.positions, idx);
}

export function bbox(p) {
  const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < p.length; i += 3) {
    for (let k = 0; k < 3; k++) { if (p[i + k] < min[k]) min[k] = p[i + k]; if (p[i + k] > max[k]) max[k] = p[i + k]; }
  }
  return { min, max };
}

export async function ready() {
  await MeshoptSimplifier.ready;
  await MeshoptEncoder.ready;
}

/**
 * Collects structures into one GLB per (mode, system). Each node is named with the structure
 * ID; each primitive carries its source part in extras.source.
 */
export class PackWriter {
  constructor(prefix) {
    this.prefix = prefix; // '' for the male body, 'female/' for the female body
    this.docs = {};
    this.stats = {};
  }

  doc(mode, system) {
    const key = `${this.prefix}${mode}/${system}`;
    if (!this.docs[key]) {
      const doc = new Document();
      doc.createBuffer();
      const scene = doc.createScene(system);
      const material = doc.createMaterial('default').setBaseColorFactor([0.8, 0.8, 0.8, 1]);
      this.docs[key] = { doc, scene, material, nodes: {}, mode, system };
    }
    return this.docs[key];
  }

  /** Adds one decimated part (positions already in the viewer frame) to a structure's node. */
  add(mode, system, structureId, source, mesh) {
    const d = this.doc(mode, system);
    let node = d.nodes[structureId];
    if (!node) {
      node = d.doc.createNode(structureId).setMesh(d.doc.createMesh(structureId)).setExtras({ structureId });
      d.scene.addChild(node);
      d.nodes[structureId] = node;
    }
    const buffer = d.doc.getRoot().listBuffers()[0];
    const normals = smoothNormals(mesh.positions, mesh.indices);
    const indices = mesh.positions.length / 3 > 65535 ? mesh.indices : new Uint16Array(mesh.indices);
    node.getMesh().addPrimitive(d.doc.createPrimitive()
      .setAttribute('POSITION', d.doc.createAccessor().setType('VEC3').setArray(mesh.positions).setBuffer(buffer))
      .setAttribute('NORMAL', d.doc.createAccessor().setType('VEC3').setArray(normals).setBuffer(buffer))
      .setIndices(d.doc.createAccessor().setType('SCALAR').setArray(indices).setBuffer(buffer))
      .setMaterial(d.material)
      .setExtras({ source }));
    const key = `${this.prefix}${mode}/${system}`;
    this.stats[key] = (this.stats[key] ?? 0) + mesh.indices.length / 3;
    return `${this.prefix}${mode}/${system}`;
  }

  async write(body, version, structures) {
    const io = new NodeIO().registerExtensions([EXTMeshoptCompression, KHRMeshQuantization]).registerDependencies({ 'meshopt.encoder': MeshoptEncoder });
    const assets = [];
    for (const [key, { doc, mode, system }] of Object.entries(this.docs)) {
      await doc.transform(quantize(), meshopt({ encoder: MeshoptEncoder, level: 'medium' }));
      const glb = await io.writeBinary(doc);
      const file = path.join(OUT, `${key}.glb`);
      await mkdir(path.dirname(file), { recursive: true });
      await writeFile(file, glb);
      assets.push({
        id: key,
        body,
        mode,
        system,
        url: `anatomy/${key}.glb`,
        format: 'glb',
        bytes: glb.length,
        sha256: createHash('sha256').update(glb).digest('hex'),
        version,
        dependencies: [],
        triangles: Math.round(this.stats[key]),
        structures: structures.filter((s) => s.modes[mode] === key).map((s) => s.id),
        requiredExtensions: ['EXT_meshopt_compression', 'KHR_mesh_quantization'],
      });
      console.log(`${key}.glb  ${(glb.length / 1e6).toFixed(2)} MB  ${Math.round(this.stats[key])} triangles`);
    }
    return assets;
  }
}

/** Replaces one body's structures, assets and source in the manifest, keeping the other body. */
export async function mergeManifest({ body, source, structures, assets, systems, assetVersion }) {
  const prev = existsSync(MANIFEST) ? JSON.parse(await readFile(MANIFEST, 'utf8')) : {};
  const keep = (list) => (list ?? []).filter((x) => (x.body ?? 'male') !== body);
  const manifest = {
    schemaVersion: 2,
    assetVersion,
    generatedAt: new Date().toISOString(),
    coordinateFrame: 'metres, +Y superior, +Z anterior, +X body-left, feet at y=0',
    sources: { ...(prev.sources ?? (prev.source ? { male: prev.source } : {})), [body]: source },
    systems,
    assets: [...keep(prev.assets), ...assets].sort((a, b) => a.id.localeCompare(b.id)),
    structures: [...keep(prev.structures), ...structures].sort((a, b) => a.id.localeCompare(b.id)),
  };
  await writeFile(MANIFEST, JSON.stringify(manifest, null, 1));
  return manifest;
}
