// Builds the female body's asset packs from the Human Reference Atlas "3D Reference Organ Set,
// United Female v1.5" (HuBMAP, CC BY 4.0, Visible Human Female data), and merges them into the
// anatomy manifest next to the male BodyParts3D body.
//
//   .asset-cache/hra/3d-vh-f-united.glb   (from https://cdn.humanatlas.io/hra-releases/v2.0/models/3d-vh-f-united.glb.7z)
//   public/anatomy/female/<mode>/<system>.glb
//
// The source is already in metres, +Y up, +Z anterior, +X body-left; it is only translated so the
// feet are at y = 0 and the body is centred. Usage: node scripts/prepare-female.mjs [--dry-run]
import { existsSync } from 'node:fs';
import path from 'node:path';
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { getBounds } from '@gltf-transform/functions';
import { SYSTEMS } from './anatomy-rules.mjs';
import { PackWriter, bbox, mergeManifest, ready, round, simplify, weldIndexed } from './mesh-utils.mjs';

const SOURCE = path.resolve('.asset-cache/hra/3d-vh-f-united.glb');
const ASSET_VERSION = '1.0.0';
const DRY = process.argv.includes('--dry-run');

const MODES = {
  realistic: { ratio: 0.3, min: 600, max: 20000, maxError: 0.004, overrides: { VH_F_skin: 120000 } },
  educational: { ratio: 0.04, min: 60, max: 2400, maxError: 0.05, overrides: { VH_F_skin: 12000 } },
};

const SYSTEM_OF = {
  VH_F_integumentary_system: 'integumentary', VH_F_nervous_system: 'nervous', VH_F_muscular_system: 'muscular',
  VH_F_reproductive_system: 'reproductive', VH_F_digestive_system: 'digestive', VH_F_urinary_system: 'urinary',
  VH_F_circulatory_system: 'cardiovascular', VH_F_respiratory_system: 'respiratory', VH_F_lymphatic_system: 'lymphatic',
  VH_F_skeletal_system: 'skeletal',
};

/** Organ nodes left out, with the reason recorded in the manifest notes. */
const EXCLUDE = {
  VH_F_placenta: 'Pregnancy organ; the reference body is not pregnant and the model extends outside the skin.',
};

/** How an organ node becomes structures: one structure, one per direct child, or one per mesh. */
const SPLIT = {
  children: new Set([
    'VH_F_mammary_gland', 'VH_F_eyes', 'VH_F_nerves_of_eye', 'Allen_brain', 'VH_F_muscles_of_eye', 'VH_F_muscles_of_knee',
    'VH_F_fallopian_tube', 'VH_F_ligaments_of_uterus_and_ovaries', 'VH_F_ovary', 'VH_F_palatine_tonsil', 'VH_F_colon',
    'VH_F_small_intestine', 'VH_F_upper_urinary_tract', 'VH_F_blood_vasculature', 'VH_F_lungs', 'VH_F_larynx',
    'VH_F_tracheobronchial_tree', 'VH_F_pelvis', 'VH_F_lower_limb', 'VH_F_vertebrae',
  ]),
  meshes: new Set(['VH_F_heart']),
};

/** Merges some per-mesh/per-child structures into one (matched on the node name). */
const MERGE = [
  { test: /papillary_muscle/i, key: 'papillary-muscles', name: 'Papillary muscles' },
];

/** Single organs whose sub-parts carry left/right names (lobes, orifices) and must stay whole. */
const NO_SIDE_SPLIT = new Set([
  'f-papillary-muscles', 'f-liver', 'f-urinary-bladder', 'f-biliary-tree', 'f-thymus', 'f-laryngeal-cartilage', 'f-corniculate-cartilage',
  'f-blood-vasculature-of-heart', 'f-blood-vasculature-of-liver', 'f-blood-vasculature-of-large-intestine', 'f-blood-vasculature-of-uterus',
]);

/** Clearer display names for some generated structure keys. */
const NAMES = {
  'f-muscles-of-knee-left': 'Left rectus femoris (lower part)', 'f-muscles-of-knee-right': 'Right rectus femoris (lower part)',
  'f-lower-limb-left': 'Left leg bones and knee', 'f-lower-limb-right': 'Right leg bones and knee',
  'f-trachea-of-respiratory-system': 'Trachea', 'f-nerves-of-eye-left': 'Left optic nerve and sheath', 'f-nerves-of-eye-right': 'Right optic nerve and sheath',
  'f-ocular-muscles-left': 'Left extraocular muscles', 'f-ocular-muscles-right': 'Right extraocular muscles',
  'f-lymph-node': 'Lymph node (representative model)', 'f-brain-hemisphere-left': 'Left half of the brain', 'f-brain-hemisphere-right': 'Right half of the brain',
  'f-renal-pelvis-ureter-left': 'Left renal pelvis and ureter', 'f-renal-pelvis-ureter-right': 'Right renal pelvis and ureter',
  'f-cardiac-atrium-left': 'Left atrium', 'f-cardiac-atrium-right': 'Right atrium',
};

const TYPO = { jejenum: 'jejunum', eigth: 'eighth', fibria: 'fimbria', heptopancreatic: 'hepatopancreatic', ucinate: 'uncinate', caecum: 'cecum', vertebra_6: 'vertebra 6' };

function humanize(nodeName) {
  let s = nodeName.replace(/^(VH_F_|Allen_|Yao_)/, '').replace(/_+$/, '');
  let side = 'midline';
  const word = s.match(/(^|_)(left|right)(_|$)/i);
  const suffix = s.match(/_(L|R)(_[a-z0-9]+)?$/);
  if (word) {
    side = word[2].toLowerCase() === 'left' ? 'left' : 'right';
    s = s.replace(/(^|_)(left|right)(_|$)/i, '$1');
  } else if (suffix) {
    side = suffix[1] === 'L' ? 'left' : 'right';
    s = s.replace(/_(L|R)(?=(_[a-z0-9]+)?$)/, '');
  }
  for (const [bad, good] of Object.entries(TYPO)) s = s.replace(new RegExp(bad, 'i'), good);
  s = s.replace(/_(l|r)(?=_|$)/gi, '').replace(/_/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
  s = s.replace(/^lungs$/, 'lung');
  return { label: s, side };
}

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** Educational content key (CONTENT key or information-only ID) for a female structure. */
function contentIdFor(label, system) {
  const rules = [
    [/vasculature|vessel/, 'blood-vessels'], [/nerves of eye|optic nerve/, 'optic-nerve'],
    [/ocular muscle|extraocular/, 'extraocular-muscles'], [/rectus femoris/, 'rectus-femoris'],
    [/renal pelvis|ureter/, 'ureter'], [/knee|lower limb/, 'knee-joint'], [/half of the brain|brain hemisphere/, 'brain-hemisphere'],
    [/ligament|broad|pouch/, 'uterine-ligaments'],
    [/^skin$/, 'skin'], [/mammary|fat|nipple|areola|lactiferous|suspensory ligaments/, 'mammary-glands'],
    [/(^|\s)eye$|retina|cornea|lens|iris|sclera/, 'eyeball'], [/optic nerve|dura mater/, 'optic-nerve'], [/optic chiasm/, 'optic-chiasm'],
    [/spinal cord/, 'spinal-cord'], [/extraocular|rectus .*ocular|oblique .*ocular|muscles of eye/, 'extraocular-muscles'],
    [/rectus femoris/, 'rectus-femoris'], [/uterine tube|fallopian/, 'uterine-tubes'], [/ovary/, 'ovaries'],
    [/^uterus|cervix/, 'uterus'], [/vagina|cervicovaginal/, 'vagina'],
    [/tonsil/, 'tonsils'], [/appendix/, 'appendix'], [/rectum/, 'rectum'], [/cecum|ileocecal/, 'cecum'],
    [/colon|flexure/, 'colon'], [/jejunum/, 'jejunum'], [/ileum/, 'ileum'], [/duodenum/, 'duodenum'],
    [/biliary|duct|ampulla/, 'bile-ducts'], [/liver/, 'liver'], [/gallbladder/, 'gallbladder'], [/pancrea/, 'pancreas'],
    [/kidney|renal/, 'kidney'], [/ureter/, 'ureter'], [/bladder/, 'urinary-bladder'], [/urethra/, 'urethra'],
    [/right (cardiac )?atrium/, 'right-atrium'], [/left (cardiac )?atrium/, 'left-atrium'],
    [/right ventricle/, 'right-ventricle'], [/left ventricle/, 'left-ventricle'], [/interventricular septum/, 'interventricular-septum'],
    [/aortic valve/, 'aortic-valve'], [/mitral/, 'mitral-valve'], [/tricuspid/, 'tricuspid-valve'], [/pulmonary valve/, 'pulmonary-valve'],
    [/papillary/, 'papillary-muscles'], [/lung/, 'lung'], [/larynx|cartilage|epiglottis|vocal/, 'larynx'],
    [/trachea/, 'trachea'], [/bronch/, 'bronchus'], [/spleen/, 'spleen'], [/thymus/, 'thymus'], [/lymph/, 'lymph-nodes'],
    [/sacrum/, 'sacrum'], [/coccyx/, 'coccyx'], [/hip bone|ilium|ischium|pubis|pelvic/, 'hip-bone'],
    [/cervical vertebra/, 'cervical-vertebra'], [/thoracic vertebra/, 'thoracic-vertebra'], [/lumbar vertebra/, 'lumbar-vertebra'],
    [/knee|femur|tibia|fibula|patella|menisc/, 'knee-joint'],
  ];
  for (const [re, id] of rules) if (re.test(label)) return id;
  if (system === 'cardiovascular') return 'blood-vessels';
  if (system === 'nervous') return 'brain-regions';
  return slug(label);
}

function layerFor(system, label) {
  if (system === 'integumentary') return /mammary|fat|nipple|areola|lactiferous|suspensory/.test(label) ? 'organs' : 'skin';
  if (system === 'skeletal') return 'skeleton';
  if (system === 'muscular') return 'muscles-deep';
  if (system === 'cardiovascular') return 'vessels';
  if (system === 'nervous') return 'nervous';
  return 'organs';
}

// ---------------------------------------------------------------------------------------------

/** World-space indexed geometry of one mesh node (all primitives merged). */
function meshWorld(node) {
  const m = node.getWorldMatrix();
  const positions = [];
  const indices = [];
  let base = 0;
  for (const prim of node.getMesh().listPrimitives()) {
    const pos = prim.getAttribute('POSITION');
    if (!pos || (prim.getMode() !== 4)) continue;
    const n = pos.getCount();
    const v = [0, 0, 0];
    for (let i = 0; i < n; i++) {
      pos.getElement(i, v);
      positions.push(
        m[0] * v[0] + m[4] * v[1] + m[8] * v[2] + m[12],
        m[1] * v[0] + m[5] * v[1] + m[9] * v[2] + m[13],
        m[2] * v[0] + m[6] * v[1] + m[10] * v[2] + m[14],
      );
    }
    const idx = prim.getIndices();
    if (idx) for (let i = 0; i < idx.getCount(); i++) indices.push(idx.getScalar(i) + base);
    else for (let i = 0; i < n; i++) indices.push(i + base);
    base += n;
  }
  // Mirrored transforms flip the winding; keep faces outward for normals and culling.
  const det = m[0] * (m[5] * m[10] - m[6] * m[9]) - m[4] * (m[1] * m[10] - m[2] * m[9]) + m[8] * (m[1] * m[6] - m[2] * m[5]);
  if (det < 0) for (let i = 0; i < indices.length; i += 3) [indices[i + 1], indices[i + 2]] = [indices[i + 2], indices[i + 1]];
  return { positions: new Float32Array(positions), indices: new Uint32Array(indices) };
}

function meshNodesUnder(node) {
  const out = [];
  const walk = (n) => { if (n.getMesh()) out.push(n); n.listChildren().forEach(walk); };
  walk(node);
  return out;
}

async function main() {
  if (!existsSync(SOURCE)) {
    throw new Error(`Missing ${SOURCE}. Download https://cdn.humanatlas.io/hra-releases/v2.0/models/3d-vh-f-united.glb.7z and extract it into .asset-cache/hra/.`);
  }
  await ready();
  const doc = await new NodeIO().registerExtensions(ALL_EXTENSIONS).read(SOURCE);
  const rootNode = doc.getRoot().listNodes().find((n) => n.getName() === 'VH_F');
  const skin = doc.getRoot().listNodes().find((n) => n.getName() === 'VH_F_skin');
  const sb = getBounds(skin);
  const offset = [-(sb.min[0] + sb.max[0]) / 2, -sb.min[1], -(sb.min[2] + sb.max[2]) / 2];

  // 1. Decide structures.
  const structures = new Map();
  const add = (system, node, meshNodes) => {
    const { label, side } = humanize(node.getName());
    const merge = MERGE.find((m) => m.test.test(node.getName()));
    const key = 'f-' + (merge ? merge.key : slug(`${label}${side === 'midline' ? '' : `-${side}`}`));
    const name = merge ? merge.name : `${side === 'midline' ? '' : `${cap(side)} `}${side === 'midline' ? cap(label) : label}`;
    const s = structures.get(key) ?? { key, name, system, side: merge ? 'midline' : side, label: merge ? merge.name.toLowerCase() : label, meshes: [] };
    s.meshes.push(...meshNodes);
    structures.set(key, s);
  };
  const excluded = [];
  for (const sysNode of rootNode.listChildren()) {
    const system = SYSTEM_OF[sysNode.getName()];
    if (!system) { console.warn('unknown system node', sysNode.getName()); continue; }
    for (const organ of sysNode.listChildren()) {
      const name = organ.getName();
      if (EXCLUDE[name]) { excluded.push({ node: name, reason: EXCLUDE[name] }); continue; }
      if (SPLIT.meshes.has(name)) for (const m of meshNodesUnder(organ)) add(system, m, [m]);
      else if (SPLIT.children.has(name)) {
        if (organ.getMesh()) add(system, organ, [organ]);
        for (const child of organ.listChildren()) add(system, child, meshNodesUnder(child));
      } else add(system, organ, meshNodesUnder(organ));
    }
  }
  for (const [k, s] of structures) if (s.meshes.length === 0) structures.delete(k);

  // Structures whose parent node held both sides (kidneys, hip bones, ligaments…) are split by
  // the side marker in each mesh name.
  for (const [k, s] of [...structures]) {
    if (s.side !== 'midline' || NO_SIDE_SPLIT.has(k)) continue;
    const bySide = { left: [], right: [], midline: [] };
    for (const m of s.meshes) bySide[humanize(m.getName()).side].push(m);
    if (!bySide.left.length || !bySide.right.length) continue;
    structures.delete(k);
    for (const side of ['left', 'right']) {
      const meshes = side === 'left' ? [...bySide.left, ...bySide.midline] : bySide.right;
      structures.set(`${k}-${side}`, { ...s, key: `${k}-${side}`, side, name: `${cap(side)} ${s.label}`, meshes });
    }
  }
  for (const s of structures.values()) {
    s.name = NAMES[s.key] ?? cap(s.name.replace(/blood vasculature of /i, 'blood vessels of the '));
    if (/cartilage$/.test(s.name)) s.name += 's';
  }

  if (DRY) {
    for (const s of structures.values()) console.log(`${s.system.padEnd(14)} ${s.key.padEnd(44)} ${s.name.padEnd(42)} ${contentIdFor(s.name.toLowerCase(), s.system).padEnd(24)} ${layerFor(s.system, s.label).padEnd(10)} n=${s.meshes.length}`);
    console.log(structures.size, 'structures; excluded', excluded.map((e) => e.node).join(', '));
    return;
  }

  // 2. Geometry.
  const packs = new PackWriter('female/');
  const out = [];
  let i = 0;
  for (const s of structures.values()) {
    const worldMin = [Infinity, Infinity, Infinity], worldMax = [-Infinity, -Infinity, -Infinity];
    const tris = {};
    const modes = {};
    for (const node of s.meshes) {
      const raw = meshWorld(node);
      for (let k = 0; k < raw.positions.length; k += 3) {
        raw.positions[k] += offset[0]; raw.positions[k + 1] += offset[1]; raw.positions[k + 2] += offset[2];
      }
      if (raw.indices.length < 3) continue;
      // The source stores split vertices (per-face normals); weld them so they can be simplified.
      const welded = weldIndexed(raw);
      for (const [mode, cfg] of Object.entries(MODES)) {
        const mesh = simplify(welded, cfg, cfg.overrides[node.getName()]);
        if (mesh.indices.length < 3) continue;
        if (mode === 'realistic') {
          const b = bbox(mesh.positions);
          for (let k = 0; k < 3; k++) { worldMin[k] = Math.min(worldMin[k], b.min[k]); worldMax[k] = Math.max(worldMax[k], b.max[k]); }
        }
        modes[mode] = packs.add(mode, s.system, s.key, node.getName(), mesh);
        tris[mode] = (tris[mode] ?? 0) + mesh.indices.length / 3;
      }
    }
    if (!modes.realistic) continue;
    out.push({
      id: s.key,
      body: 'female',
      name: s.name,
      system: s.system,
      alsoIn: /mammary/.test(s.label) ? ['reproductive'] : /ovary|pancreas|thymus/.test(s.label) ? ['endocrine'] : /tonsil/.test(s.label) ? ['lymphatic'] : [],
      side: s.side,
      layer: layerFor(s.system, s.label),
      contentId: contentIdFor(s.name.toLowerCase(), s.system),
      parts: s.meshes.map((n) => ({ source: n.getName(), name: humanize(n.getName()).label })),
      center: worldMin.map((v, k) => round((v + worldMax[k]) / 2)),
      size: worldMin.map((v, k) => round(worldMax[k] - v)),
      triangles: { realistic: tris.realistic, educational: tris.educational ?? 0 },
      modes,
    });
    if (++i % 25 === 0) console.log(`processed ${i}/${structures.size} structures`);
  }

  const assets = await packs.write('female', ASSET_VERSION, out);
  await mergeManifest({
    body: 'female',
    assetVersion: ASSET_VERSION,
    systems: SYSTEMS,
    structures: out,
    assets,
    source: {
      name: '3D Reference Organ Set for United, Female v1.5 (Human Reference Atlas, HRA v2.0)',
      publisher: 'HuBMAP / Human Reference Atlas; created by Kristen Browne and Heidi Schlehlein from the NLM Visible Human Female',
      mirror: 'https://cdn.humanatlas.io/hra-releases/v2.0/models/3d-vh-f-united.glb.7z',
      original: 'https://doi.org/10.48539/HBM352.BTSQ.586',
      license: 'CC BY 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
      attribution: 'Kristen Browne; Heidi Schlehlein. 2023. 3D Reference Organ Set for Female, v1.5. HuBMAP. https://doi.org/10.48539/HBM352.BTSQ.586 — licensed under CC BY 4.0',
      citation: 'Browne K, Schlehlein H, Herr BW II, Quardokus E, Bueckle A, Börner K. 2023. HuBMAP CCF 3D Reference Object Library. https://humanatlas.io/3d-reference-library',
      modifications: `Organs grouped into selectable structures, translated so the feet are at y = 0, decimated with meshoptimizer (two levels of detail), quantized and meshopt-compressed. Excluded: ${excluded.map((e) => `${e.node} (${e.reason})`).join('; ')}`,
    },
  });
  const total = (m) => assets.filter((a) => a.mode === m).reduce((n, a) => n + a.bytes, 0) / 1e6;
  console.log(`${out.length} female structures. realistic ${total('realistic').toFixed(1)} MB, educational ${total('educational').toFixed(1)} MB`);
}

main().catch((err) => { console.error(err); process.exit(1); });
