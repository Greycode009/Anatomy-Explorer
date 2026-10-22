import { useEffect, useRef, useState } from 'react';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { create } from 'zustand';
import type { Mode, Structure } from '../types';
import { STRUCTURE_BY_ID } from '../data/manifest';
import { useViewer } from '../state/store';
import { acquireModel, releaseModel, structureIdOf } from './modelCache';
import { createMaterial, GHOST_MATERIAL, type StructureMaterial } from './materials';
import { isContext, isVisible } from './visibility';
import { CUT_PLANE } from './cutPlane';

/** Pointer position for the hover tooltip, kept out of the main store to avoid re-renders. */
export const usePointer = create<{ x: number; y: number }>(() => ({ x: 0, y: 0 }));

interface Part {
  structure: Structure;
  node: THREE.Object3D;
  meshes: THREE.Mesh[];
  material: StructureMaterial;
}

const noRaycast = () => {};
const SELECT_COLOR = new THREE.Color('#22d3ee');
const HOVER_COLOR = new THREE.Color('#7dd3fc');
const DIM = new THREE.Color('#5b6472');

function prepare(scene: THREE.Group, mode: Mode): Part[] {
  if (scene.userData.parts) return scene.userData.parts as Part[];
  const parts: Part[] = [];
  scene.traverse((node) => {
    const id = node.userData.structureId as string | undefined;
    const structure = id ? STRUCTURE_BY_ID.get(id) : undefined;
    if (!structure) return;
    const material = createMaterial(structure, mode);
    const meshes: THREE.Mesh[] = [];
    node.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.material = material;
        meshes.push(mesh);
      }
    });
    parts.push({ structure, node, meshes, material });
  });
  scene.userData.parts = parts;
  return parts;
}

function apply(parts: Part[], fade: number) {
  const st = useViewer.getState();
  const v = { system: st.system, layers: st.layers, hidden: st.hidden };
  const clipping = st.cut.axis !== 'none' ? [CUT_PLANE] : [];
  for (const p of parts) {
    const s = p.structure;
    const visible = isVisible(s, v);
    const ghost = !visible && isContext(s, v, st.context);
    p.node.visible = visible || ghost;
    for (const m of p.meshes) {
      m.material = ghost ? GHOST_MATERIAL : p.material;
      m.userData.pickable = visible;
      m.renderOrder = ghost ? 2 : 0;
      // Backdrop and hidden meshes never take part in raycasting (picking or label occlusion).
      m.raycast = visible ? THREE.Mesh.prototype.raycast : noRaycast;
    }
    if (!visible) continue;

    const mat = p.material;
    const selected = st.selectedId === s.id;
    const hovered = st.hoveredId === s.id && !selected;
    mat.color.copy(mat.userData.baseColor);
    if (st.selectedId && !selected && st.mode === 'educational') mat.color.lerp(DIM, 0.55);
    mat.emissive.copy(selected ? SELECT_COLOR : hovered ? HOVER_COLOR : new THREE.Color(0));
    mat.emissiveIntensity = selected ? (st.mode === 'realistic' ? 0.16 : 0.15) : hovered ? 0.12 : 0;

    const outer = st.system === 'all' && (s.layer === 'skin' || s.layer === 'muscles-superficial') && !selected;
    const faded = st.fadeOthers && st.selectedId !== null && !selected;
    const opacity = Math.min(fade, outer ? st.outerOpacity : 1, faded ? 0.22 : 1);
    const transparent = opacity < 1;
    if (mat.transparent !== transparent) mat.needsUpdate = true;
    mat.transparent = transparent;
    mat.opacity = opacity;
    mat.depthWrite = !transparent || opacity > 0.6;

    if ((mat.clippingPlanes?.length ?? 0) !== clipping.length) {
      mat.clippingPlanes = clipping;
      mat.needsUpdate = true;
    }
  }
  if ((GHOST_MATERIAL.clippingPlanes?.length ?? 0) !== clipping.length) {
    GHOST_MATERIAL.clippingPlanes = clipping;
    GHOST_MATERIAL.needsUpdate = true;
  }
}

function pickable(e: ThreeEvent<PointerEvent | MouseEvent>): string | null {
  if (!e.object.userData.pickable) return null;
  if (useViewer.getState().cut.axis !== 'none' && CUT_PLANE.distanceToPoint(e.point) < 0) return null;
  return structureIdOf(e.object);
}

export function AssetModel({ assetId, mode }: { assetId: string; mode: Mode }) {
  const [scene, setScene] = useState<THREE.Group | null>(null);
  const parts = useRef<Part[]>([]);
  const fade = useRef(0);

  useEffect(() => {
    let alive = true;
    acquireModel(assetId).then((s) => alive && setScene(s)).catch(() => {});
    return () => {
      alive = false;
      releaseModel(assetId);
    };
  }, [assetId]);

  useEffect(() => {
    if (!scene) return;
    parts.current = prepare(scene, mode);
    fade.current = 0;
    apply(parts.current, 0);
    return useViewer.subscribe(() => apply(parts.current, fade.current));
  }, [scene, mode]);

  // Fade new models in so mode switches and system changes are not abrupt.
  useFrame((_, dt) => {
    if (!scene || fade.current >= 1) return;
    fade.current = Math.min(1, fade.current + dt / 0.45);
    apply(parts.current, fade.current);
  });

  if (!scene) return null;
  return (
    <primitive
      object={scene}
      onPointerMove={(e: ThreeEvent<PointerEvent>) => {
        const id = pickable(e);
        if (!id) return;
        e.stopPropagation();
        usePointer.setState({ x: e.nativeEvent.clientX, y: e.nativeEvent.clientY });
        useViewer.getState().hover(id);
      }}
      onPointerOut={() => useViewer.getState().hover(null)}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        if (e.delta > 6) return; // ignore clicks that were really drags
        const id = pickable(e);
        if (!id) return;
        e.stopPropagation();
        useViewer.getState().select(id);
      }}
    />
  );
}
