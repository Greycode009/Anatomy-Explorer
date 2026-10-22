import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { CameraControls, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { useViewer } from '../state/store';
import { STRUCTURE_BY_ID } from '../data/manifest';
import { AssetModel } from './AssetModel';
import { neededAssets } from './visibility';
import { LabelProjector } from './labels';
import { useAssets } from '../assets/repository';
import { useLoadState } from './modelCache';

export const HOME = { position: new THREE.Vector3(0, 1.05, 3.4), target: new THREE.Vector3(0, 0.88, 0) };
// Portrait phones: the top chips and the bottom sheet + tab bar cover part of the canvas, so the
// full-body view is pulled back and shifted up to fit the uncovered area.
const HOME_PORTRAIT = { position: new THREE.Vector3(0, 0.9, 4.35), target: new THREE.Vector3(0, 0.76, 0) };
const home = () => (innerWidth < 1024 && innerHeight > innerWidth ? HOME_PORTRAIT : HOME);
const FOV = 35;

function CameraRig() {
  const ref = useRef<CameraControls>(null);
  const camera = useViewer((s) => s.camera);
  const { camera: cam } = useThree();

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const h = home();
    c.setLookAt(h.position.x, h.position.y, h.position.z, h.target.x, h.target.y, h.target.z, false);
  }, []);

  useEffect(() => {
    const c = ref.current;
    if (!c || !camera) return;
    if (camera.kind === 'reset') {
      const h = home();
      c.setLookAt(h.position.x, h.position.y, h.position.z, h.target.x, h.target.y, h.target.z, true);
    } else if (camera.kind === 'zoom') {
      c.dolly(c.distance * (1 - 1 / camera.factor), true);
    } else if (camera.kind === 'focus') {
      const s = STRUCTURE_BY_ID.get(camera.id);
      if (!s) return;
      // Frame the structure from its bounding box, keeping the current viewing direction.
      const center = new THREE.Vector3(...s.center);
      const radius = Math.max(0.045, Math.hypot(...s.size) / 2);
      const fov = THREE.MathUtils.degToRad(FOV);
      const aspect = (cam as THREE.PerspectiveCamera).aspect || 1;
      const fit = radius / Math.sin(Math.min(fov, fov * aspect) / 2);
      const dir = new THREE.Vector3().subVectors(cam.position, c.getTarget(new THREE.Vector3())).normalize();
      if (dir.lengthSq() < 0.5) dir.set(0, 0, 1);
      const pos = center.clone().addScaledVector(dir, Math.min(4, fit * 1.25));
      c.setLookAt(pos.x, pos.y, pos.z, center.x, center.y, center.z, true);
    }
  }, [camera, cam]);

  return (
    <CameraControls
      ref={ref}
      makeDefault
      minDistance={0.06}
      maxDistance={6}
      smoothTime={0.35}
      draggingSmoothTime={0.08}
      dollyToCursor
      infinityDolly={false}
    />
  );
}

function Models() {
  const mode = useViewer((s) => s.mode);
  const body = useViewer((s) => s.body);
  const system = useViewer((s) => s.system);
  const layers = useViewer((s) => s.layers);
  const hidden = useViewer((s) => s.hidden);
  const context = useViewer((s) => s.context);
  const nonce = useViewer((s) => s.reloadNonce);
  const assets = useMemo(() => neededAssets({ body, system, layers, hidden }, mode, context), [body, system, layers, hidden, mode, context]);
  return (
    <group>
      {assets.map((id) => <AssetModel key={`${id}:${nonce}`} assetId={id} mode={mode} />)}
    </group>
  );
}

function Lights() {
  const mode = useViewer((s) => s.mode);
  return (
    <>
      <ambientLight intensity={mode === 'educational' ? 0.5 : 0.15} />
      <directionalLight position={[2, 4, 3]} intensity={mode === 'educational' ? 1.6 : 1.3} />
      <directionalLight position={[-3, 2, -2]} intensity={0.5} color="#9ccfff" />
      {/* Studio lighting generated locally; no HDR files are fetched from a CDN. */}
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={2.2} position={[0, 3, 2]} scale={[6, 2, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={1.2} position={[-4, 1, 0]} rotation-y={Math.PI / 2} scale={[4, 3, 1]} color="#bfe3ff" />
        <Lightformer form="rect" intensity={0.9} position={[4, 1, -1]} rotation-y={-Math.PI / 2} scale={[4, 3, 1]} color="#ffd9c7" />
        <Lightformer form="circle" intensity={0.6} position={[0, -2, 2]} scale={3} color="#7cc8ff" />
      </Environment>
    </>
  );
}

function Floor() {
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, -0.002, 0]} raycast={() => null}>
      <circleGeometry args={[0.7, 64]} />
      <meshBasicMaterial color="#1fb6d8" transparent opacity={0.06} />
    </mesh>
  );
}

export function AnatomyCanvas() {
  const mode = useViewer((s) => s.mode);
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ fov: FOV, near: 0.01, far: 50, position: HOME.position.toArray() }}
      dpr={[1, 2]}
      gl={{ antialias: true, localClippingEnabled: true, powerPreference: 'high-performance' }}
      onCreated={(state) => {
        state.gl.localClippingEnabled = true;
        state.gl.toneMapping = THREE.ACESFilmicToneMapping;
        // Exposed for automated tests (scripts/e2e) to inspect the scene and camera.
        (window as unknown as { __anatomy?: unknown }).__anatomy = { three: state, viewer: useViewer, assets: useAssets, loads: useLoadState };
      }}
      onPointerMissed={() => useViewer.getState().hover(null)}
      style={{ background: mode === 'realistic' ? 'radial-gradient(ellipse at 50% 40%, #142235 0%, #070b12 70%)' : 'radial-gradient(ellipse at 50% 40%, #1a2c45 0%, #0b1422 75%)' }}
      aria-label="Interactive 3D anatomy viewer"
    >
      <Lights />
      <Floor />
      <Models />
      <CameraRig />
      <LabelProjector />
    </Canvas>
  );
}
