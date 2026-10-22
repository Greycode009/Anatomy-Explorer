import * as THREE from 'three';
import type { CutAxis } from '../state/store';

/** Shared clipping plane. Geometry on the negative side of the plane is cut away. */
export const CUT_PLANE = new THREE.Plane(new THREE.Vector3(0, 0, -1), 0);

export const CUT_RANGES: Record<Exclude<CutAxis, 'none'>, { min: number; max: number; label: string; hint: string }> = {
  sagittal: { min: -0.35, max: 0.35, label: 'Sagittal', hint: 'Removes the body\'s left side up to the slider' },
  coronal: { min: -0.18, max: 0.18, label: 'Coronal', hint: 'Removes the front of the body up to the slider' },
  transverse: { min: 0, max: 1.75, label: 'Transverse', hint: 'Removes everything above the slider' },
};

export function updateCutPlane(axis: CutAxis, position: number): void {
  if (axis === 'sagittal') CUT_PLANE.set(new THREE.Vector3(-1, 0, 0), position);
  else if (axis === 'coronal') CUT_PLANE.set(new THREE.Vector3(0, 0, -1), position);
  else if (axis === 'transverse') CUT_PLANE.set(new THREE.Vector3(0, -1, 0), position);
}
