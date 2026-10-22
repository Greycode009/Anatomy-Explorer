// Labels with leader lines. The projector (inside the Canvas) picks which structures to label each
// few frames — the selected structure always, plus the largest on-screen visible structures, so
// zooming in reveals labels for smaller structures — and lays them out in two columns to avoid
// overlap. It writes directly to a pool of DOM nodes owned by <LabelOverlay>.
import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { STRUCTURES, STRUCTURE_BY_ID } from '../data/manifest';
import { useViewer } from '../state/store';
import { isVisible } from './visibility';
import { structureIdOf, useLoadState } from './modelCache';
import { CUT_PLANE } from './cutPlane';

const POOL = 12;
interface Slot { box: HTMLButtonElement; line: SVGLineElement; dot: SVGCircleElement }
const slots: Slot[] = [];

export function LabelOverlay() {
  const svg = useRef<SVGSVGElement>(null);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    slots.length = 0;
    const boxes = root.current!.querySelectorAll<HTMLButtonElement>('button[data-slot]');
    const lines = svg.current!.querySelectorAll<SVGLineElement>('line');
    const dots = svg.current!.querySelectorAll<SVGCircleElement>('circle');
    boxes.forEach((box, i) => slots.push({ box, line: lines[i], dot: dots[i] }));
  }, []);
  return (
    <div ref={root} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="false">
      <svg ref={svg} className="absolute inset-0 h-full w-full">
        {Array.from({ length: POOL }, (_, i) => (
          <g key={i}>
            <line stroke="currentColor" strokeWidth="1" className="text-cyan-300/70" style={{ display: 'none' }} />
            <circle r="2.5" className="fill-cyan-300" style={{ display: 'none' }} />
          </g>
        ))}
      </svg>
      {Array.from({ length: POOL }, (_, i) => (
        <button
          key={i}
          data-slot={i}
          type="button"
          tabIndex={-1}
          style={{ display: 'none' }}
          onClick={(e) => {
            const id = (e.currentTarget as HTMLButtonElement).dataset.id;
            if (id) useViewer.getState().select(id);
          }}
          className="label-chip pointer-events-auto absolute left-0 top-0 whitespace-nowrap rounded-md border px-2 py-0.5 text-[11px] font-medium shadow-lg backdrop-blur"
        />
      ))}
    </div>
  );
}

const v3 = new THREE.Vector3();
/** Screen margins (px) covered by the phone UI: chips on top, tool rail right, sheet + tab bar below. */
const SAFE = { top: 116, right: 64, bottom: 190 };
const ray = new THREE.Raycaster();
(ray as THREE.Raycaster & { firstHitOnly?: boolean }).firstHitOnly = true;

function shown(o: THREE.Object3D): boolean {
  for (let x: THREE.Object3D | null = o; x; x = x.parent) if (!x.visible) return false;
  return true;
}

/** Visible, selectable meshes: the only ones that can occlude a label. */
function pickableMeshes(scene: THREE.Object3D): THREE.Mesh[] {
  const out: THREE.Mesh[] = [];
  scene.traverse((o) => {
    const m = o as THREE.Mesh;
    if (m.isMesh && m.userData.pickable && shown(m)) out.push(m);
  });
  return out;
}

/** True when the first selectable surface along the ray to the structure's center belongs to it. */
function unoccluded(id: string, center: THREE.Vector3, camera: THREE.Camera, meshes: THREE.Mesh[], clip: boolean): boolean {
  ray.set(camera.position, v3.copy(center).sub(camera.position).normalize());
  for (const hit of ray.intersectObjects(meshes, false)) {
    if (clip && CUT_PLANE.distanceToPoint(hit.point) < 0) continue;
    return structureIdOf(hit.object) === id;
  }
  return false;
}

export function LabelProjector() {
  const frame = useRef(0);
  useFrame(({ camera, size, scene }) => {
    if (++frame.current % 6 !== 0 || slots.length === 0) return;
    const st = useViewer.getState();
    const loads = useLoadState.getState().loads;
    const cam = camera as THREE.PerspectiveCamera;
    const focal = size.height / (2 * Math.tan(THREE.MathUtils.degToRad(cam.fov) / 2));
    const vis = { system: st.system, layers: st.layers, hidden: st.hidden };
    const narrow = size.width < 640;
    const max = st.labels ? (st.mode === 'educational' ? (narrow ? 5 : 9) : narrow ? 3 : 5) : 0;

    type Cand = { id: string; name: string; x: number; y: number; px: number; selected: boolean };
    const cands: Cand[] = [];
    const project = (id: string, selected: boolean) => {
      const s = STRUCTURE_BY_ID.get(id);
      if (!s) return;
      const asset = s.modes[st.mode];
      if (!asset || loads[asset]?.state !== 'ready' || !isVisible(s, vis)) return;
      v3.set(...s.center);
      if (st.cut.axis !== 'none' && CUT_PLANE.distanceToPoint(v3) < 0) return;
      const dist = v3.distanceTo(cam.position);
      v3.project(cam);
      if (v3.z > 1 || Math.abs(v3.x) > 1.05 || Math.abs(v3.y) > 1.05) return;
      const px = (Math.hypot(...s.size) / 2 / dist) * focal;
      const x = (v3.x * 0.5 + 0.5) * size.width;
      const y = (-v3.y * 0.5 + 0.5) * size.height;
      // Phones: skip anchors hidden under the chip row, tool rail, bottom sheet or tab bar.
      if (narrow && (y < SAFE.top || y > size.height - SAFE.bottom || x > size.width - SAFE.right)) return;
      cands.push({ id, name: s.name, x, y, px, selected });
    };

    if (st.selectedId) project(st.selectedId, true);
    if (max > 0) {
      const pool: Cand[] = [];
      const before = cands.length;
      for (const s of STRUCTURES) if (s.id !== st.selectedId) project(s.id, false);
      pool.push(...cands.splice(before));
      pool.sort((a, b) => b.px - a.px);
      let tested = 0;
      const clip = st.cut.axis !== 'none';
      const meshes = pickableMeshes(scene);
      for (const c of pool) {
        if (cands.length >= max + (st.selectedId ? 1 : 0) || tested >= 16) break;
        if (c.px <= 14 || c.px >= size.height * 0.9) continue;
        tested++;
        const s = STRUCTURE_BY_ID.get(c.id)!;
        if (unoccluded(c.id, new THREE.Vector3(...s.center), cam, meshes, clip)) cands.push(c);
      }
    }

    // Two-column layout: labels sit beside their anchors, stacked to avoid overlap.
    const mid = size.width / 2;
    const placed: (Cand & { lx: number; ly: number; side: 'l' | 'r' })[] = [];
    for (const side of ['l', 'r'] as const) {
      const group = cands.filter((c) => (c.x < mid) === (side === 'l')).sort((a, b) => a.y - b.y);
      let lastY = -Infinity;
      for (const c of group) {
        const ly = Math.max(c.y, lastY + 24);
        lastY = ly;
        const offset = Math.max(36, Math.min(120, c.px + 24));
        placed.push({ ...c, ly, lx: side === 'l' ? c.x - offset : c.x + offset, side });
      }
    }

    slots.forEach((slot, i) => {
      const p = placed[i];
      if (!p) {
        slot.box.style.display = 'none';
        slot.line.style.display = 'none';
        slot.dot.style.display = 'none';
        return;
      }
      slot.box.style.display = 'block';
      slot.box.dataset.id = p.id;
      slot.box.dataset.selected = String(p.selected);
      const text = p.selected ? `● ${p.name}` : p.name;
      if (slot.box.textContent !== text) slot.box.textContent = text;
      const w = slot.box.offsetWidth;
      const left = Math.max(4, Math.min(size.width - w - (narrow ? SAFE.right : 4), p.side === 'l' ? p.lx - w : p.lx));
      slot.box.style.transform = `translate(${Math.round(left)}px, ${Math.round(p.ly - 10)}px)`;
      slot.line.style.display = 'block';
      slot.dot.style.display = 'block';
      slot.line.setAttribute('x1', String(p.x));
      slot.line.setAttribute('y1', String(p.y));
      slot.line.setAttribute('x2', String(p.lx));
      slot.line.setAttribute('y2', String(p.ly));
      slot.dot.setAttribute('cx', String(p.x));
      slot.dot.setAttribute('cy', String(p.y));
    });
  });
  return null;
}
