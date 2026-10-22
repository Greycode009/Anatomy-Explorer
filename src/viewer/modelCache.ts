// Parses locally stored GLB bytes into Three.js scenes, keeps a small LRU of loaded models and
// disposes GPU resources of models that are evicted. Being downloaded (repository) and being
// loaded into the scene (this module) are tracked separately.
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh';
import { create } from 'zustand';
import { loadAssetBytes } from '../assets/repository';

THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
THREE.Mesh.prototype.raycast = acceleratedRaycast;

export type LoadState = { state: 'loading' } | { state: 'ready' } | { state: 'error'; message: string };

export const useLoadState = create<{ loads: Record<string, LoadState> }>(() => ({ loads: {} }));
const setLoad = (id: string, s: LoadState | null) => {
  const loads = { ...useLoadState.getState().loads };
  if (s) loads[id] = s; else delete loads[id];
  useLoadState.setState({ loads });
};

const manager = new THREE.LoadingManager();
// Packs are self-contained GLBs. Any attempt to resolve an external URI is blocked so a model can
// never silently depend on the network.
manager.setURLModifier((url) => {
  if (url.startsWith('blob:') || url.startsWith('data:')) return url;
  console.error(`Blocked external model dependency: ${url}`);
  return 'data:application/octet-stream;base64,';
});
const loader = new GLTFLoader(manager);
loader.setMeshoptDecoder(MeshoptDecoder);

interface Entry {
  promise: Promise<THREE.Group>;
  scene?: THREE.Group;
  refs: number;
  lastUsed: number;
}

const cache = new Map<string, Entry>();
const MAX_IDLE = 4;

function disposeScene(scene: THREE.Object3D) {
  scene.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (mesh.isMesh) {
      mesh.geometry.disposeBoundsTree?.();
      mesh.geometry.dispose();
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      mats.forEach((m) => m.dispose());
    }
  });
}

function evictIdle() {
  const idle = [...cache.entries()].filter(([, e]) => e.refs === 0 && e.scene).sort((a, b) => a[1].lastUsed - b[1].lastUsed);
  while (idle.length > MAX_IDLE) {
    const [id, e] = idle.shift()!;
    disposeScene(e.scene!);
    cache.delete(id);
    setLoad(id, null);
  }
}

async function parse(assetId: string): Promise<THREE.Group> {
  const bytes = await loadAssetBytes(assetId);
  const gltf = await loader.parseAsync(bytes.slice(0), '');
  const scene = gltf.scene;
  scene.updateMatrixWorld(true);
  buildBvhWhenIdle(scene);
  return scene;
}

/**
 * Builds raycasting acceleration structures in small time slices after the model is shown, so
 * large packs appear immediately. Until a mesh has its BVH, standard raycasting is used.
 */
function buildBvhWhenIdle(scene: THREE.Object3D) {
  const queue: THREE.BufferGeometry[] = [];
  scene.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (mesh.isMesh) queue.push(mesh.geometry);
  });
  const step = () => {
    const start = performance.now();
    while (queue.length && performance.now() - start < 8) {
      const geometry = queue.shift()!;
      try {
        if (!geometry.boundsTree) geometry.computeBoundsTree();
      } catch {
        // Falls back to standard raycasting for geometry the BVH cannot index.
      }
    }
    if (queue.length) setTimeout(step, 16);
  };
  setTimeout(step, 100);
}

export function acquireModel(assetId: string): Promise<THREE.Group> {
  let e = cache.get(assetId);
  if (!e) {
    setLoad(assetId, { state: 'loading' });
    const promise = parse(assetId);
    e = { promise, refs: 0, lastUsed: Date.now() };
    cache.set(assetId, e);
    const entry = e;
    promise.then(
      (scene) => { entry.scene = scene; setLoad(assetId, { state: 'ready' }); },
      (err: Error) => { cache.delete(assetId); setLoad(assetId, { state: 'error', message: err.message }); },
    );
  }
  e.refs++;
  e.lastUsed = Date.now();
  return e.promise;
}

export function releaseModel(assetId: string): void {
  const e = cache.get(assetId);
  if (!e) return;
  e.refs = Math.max(0, e.refs - 1);
  e.lastUsed = Date.now();
  evictIdle();
}

/** Finds the structure ID for an intersected mesh by walking up to the named GLB node. */
export function structureIdOf(object: THREE.Object3D | null): string | null {
  for (let o = object; o; o = o.parent) {
    const id = o.userData?.structureId as string | undefined;
    if (id) return id;
  }
  return null;
}
