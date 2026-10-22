import * as THREE from 'three';
import type { Mode, Structure } from '../types';
import { SYSTEM_BY_ID } from '../data/systems';

// Tissue colors for Realistic Mode. BodyParts3D ships geometry only (no textures), so realism
// comes from physically based materials and lighting, not photographic textures.
const TISSUE: { test: RegExp; color: string; roughness: number; sheen?: number; clearcoat?: number }[] = [
  { test: /^(upper|lower)-teeth$/, color: '#efe9da', roughness: 0.25, clearcoat: 0.6 },
  { test: /hair|eyebrows/, color: '#2b1d15', roughness: 0.7, sheen: 0.6 },
  { test: /^skin$/, color: '#cf9e85', roughness: 0.55, sheen: 0.4 },
  { test: /cartilage|intervertebral|nasal-cartilages/, color: '#c7d3d6', roughness: 0.35, clearcoat: 0.4 },
  { test: /tendon|linea-alba|iliotibial|aponeurosis|ligament|retinaculum|membrane|tendinous-arch/, color: '#d9d4c3', roughness: 0.4, sheen: 0.5 },
  { test: /^heart$/, color: '#8a2a2a', roughness: 0.42, clearcoat: 0.5 },
  { test: /valve|papillary/, color: '#c98f86', roughness: 0.5 },
  { test: /vein|vena-cava|coronary-sinus|cardiac-veins/, color: '#3b4f9c', roughness: 0.35, clearcoat: 0.6 },
  { test: /artery|aorta|arteries/, color: '#b5262f', roughness: 0.35, clearcoat: 0.6 },
  { test: /^liver$/, color: '#6e2b20', roughness: 0.38, clearcoat: 0.5 },
  { test: /^gallbladder$/, color: '#4f7a3a', roughness: 0.35, clearcoat: 0.6 },
  { test: /^spleen$/, color: '#5d2234', roughness: 0.4, clearcoat: 0.4 },
  { test: /^lung/, color: '#d48f8b', roughness: 0.6, sheen: 0.5 },
  { test: /trachea|bronchus/, color: '#d8b7ae', roughness: 0.45 },
  { test: /kidney/, color: '#7b2f2b', roughness: 0.4, clearcoat: 0.5 },
  { test: /adrenal|pituitary|pineal|thymus|pancrea|prostate|seminal/, color: '#d1a35c', roughness: 0.5, sheen: 0.3 },
  { test: /stomach|esophagus|duodenum|jejunum|ileum|colon|rectum|appendix|taeniae|bladder|ureter|urethra|lips|gingiva/, color: '#cf8a7c', roughness: 0.45, clearcoat: 0.4 },
  { test: /testis|epididymis|deferent|penis|glans/, color: '#c98c8a', roughness: 0.45 },
  { test: /eyeball/, color: '#f1eee8', roughness: 0.15, clearcoat: 1 },
  { test: /optic|white-matter|corpus-callosum|internal-capsule|fornix|commissure|stria|lamina|tract/, color: '#efe3d6', roughness: 0.6 },
  { test: /ventricular-system|choroid/, color: '#7fb3d9', roughness: 0.3, clearcoat: 0.6 },
];

const DEFAULT_BY_SYSTEM: Record<string, { color: string; roughness: number; sheen?: number; clearcoat?: number }> = {
  skeletal: { color: '#e6dac0', roughness: 0.62 },
  muscular: { color: '#9c302b', roughness: 0.48, sheen: 0.6, clearcoat: 0.25 },
  nervous: { color: '#d9b3a6', roughness: 0.55, sheen: 0.3 },
  integumentary: { color: '#cf9e85', roughness: 0.55, sheen: 0.4 },
};

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return (h >>> 0) / 4294967295;
}

let toonGradient: THREE.DataTexture | null = null;
function gradient(): THREE.DataTexture {
  if (!toonGradient) {
    toonGradient = new THREE.DataTexture(new Uint8Array([90, 90, 90, 255, 170, 170, 170, 255, 235, 235, 235, 255, 255, 255, 255, 255]), 4, 1, THREE.RGBAFormat);
    toonGradient.magFilter = THREE.NearestFilter;
    toonGradient.minFilter = THREE.NearestFilter;
    toonGradient.needsUpdate = true;
  }
  return toonGradient;
}

/** Educational colors: each system has a hue family; structures get a stable variation so neighbors differ. */
export function educationalColor(s: Structure): THREE.Color {
  const base = new THREE.Color(SYSTEM_BY_ID[s.system].color);
  const hsl = { h: 0, s: 0, l: 0 };
  base.getHSL(hsl);
  const key = s.id.replace(/-(left|right)$/, '');
  const v = hash(key);
  const hueSpread = s.system === 'skeletal' || s.system === 'integumentary' ? 0.015 : 0.06;
  return new THREE.Color().setHSL((hsl.h + (v - 0.5) * hueSpread + 1) % 1, Math.min(1, hsl.s * (0.75 + v * 0.4)), Math.min(0.85, hsl.l * (0.82 + v * 0.3)));
}

export interface StructureMaterial extends THREE.Material {
  color: THREE.Color;
  emissive: THREE.Color;
  emissiveIntensity: number;
  userData: { baseColor: THREE.Color };
}

export function createMaterial(s: Structure, mode: Mode): StructureMaterial {
  let mat: THREE.MeshPhysicalMaterial | THREE.MeshToonMaterial;
  if (mode === 'realistic') {
    const t = TISSUE.find((x) => x.test.test(s.id)) ?? DEFAULT_BY_SYSTEM[s.system] ?? { color: '#c98276', roughness: 0.45, clearcoat: 0.3 };
    mat = new THREE.MeshPhysicalMaterial({
      color: t.color,
      roughness: t.roughness,
      metalness: 0,
      sheen: t.sheen ?? 0,
      sheenRoughness: 0.6,
      sheenColor: new THREE.Color(t.color).offsetHSL(0, -0.1, 0.25),
      clearcoat: t.clearcoat ?? 0,
      clearcoatRoughness: 0.35,
    });
    // Subtle per-structure variation so adjacent muscles/bones remain distinguishable.
    mat.color.offsetHSL((hash(s.id) - 0.5) * 0.02, 0, (hash(s.id + 'l') - 0.5) * 0.06);
  } else {
    mat = new THREE.MeshToonMaterial({ color: educationalColor(s), gradientMap: gradient() });
  }
  mat.userData.baseColor = mat.color.clone();
  return mat as unknown as StructureMaterial;
}

export const GHOST_MATERIAL = new THREE.MeshBasicMaterial({ color: '#6fb6d9', transparent: true, opacity: 0.07, depthWrite: false });
