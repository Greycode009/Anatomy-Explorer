// Prints the node tree, triangle counts and bounds of a GLB. Usage: node scripts/inspect-glb.mjs file.glb
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { getBounds } from '@gltf-transform/functions';
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
const doc = await io.read(process.argv[2]);
const root = doc.getRoot();
const scene = root.listScenes()[0];
console.log('scenes', root.listScenes().length, 'nodes', root.listNodes().length, 'meshes', root.listMeshes().length, 'materials', root.listMaterials().length, 'textures', root.listTextures().length);
console.log('scene bounds', JSON.stringify(getBounds(scene)));
function tris(mesh) { let n = 0; for (const p of mesh.listPrimitives()) { const i = p.getIndices(); n += (i ? i.getCount() : p.getAttribute('POSITION').getCount()) / 3; } return n; }
function walk(node, depth) {
  const m = node.getMesh();
  const t = node.getTranslation(), s = node.getScale(), r = node.getRotation();
  const xf = (t.some((v) => v) || s.some((v) => v !== 1) || r[3] !== 1) ? ` T${t.map((v) => v.toFixed(3))} S${s.map((v) => v.toFixed(3))} R${r.map((v) => v.toFixed(2))}` : '';
  if (depth < 3 || m) console.log('  '.repeat(depth) + node.getName() + (m ? `  [${Math.round(tris(m))} tris]` : '') + xf + ` (${node.listChildren().length} ch)`);
  for (const c of node.listChildren()) walk(c, depth + 1);
}
for (const n of scene.listChildren()) walk(n, 0);
