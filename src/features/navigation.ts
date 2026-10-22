import { STRUCTURE_BY_ID, hasModel } from '../data/manifest';
import { INFO_ONLY_BY_ID } from '../data/content';
import { useViewer } from '../state/store';
import { inScope } from '../viewer/visibility';
import { TOURS } from '../data/tours';

/**
 * Selects a structure from anywhere (search, related links, tours, lists) and makes sure it is
 * actually visible: switches system or turns its layer on, un-hides it, then focuses the camera.
 */
export function goToStructure(id: string): void {
  const st = useViewer.getState();
  const info = INFO_ONLY_BY_ID.get(id);
  if (info) {
    st.showInfo(id);
    return;
  }
  const s = STRUCTURE_BY_ID.get(id);
  if (!s) return;
  if (!hasModel(s, st.mode)) {
    st.notify({ tone: 'warning', text: `${s.name} has no ${st.mode} model.` });
    return;
  }
  if (st.system !== 'all' && !inScope(s, st.system)) st.setSystem(s.system);
  if (useViewer.getState().system === 'all' && !st.layers[s.layer]) st.setLayer(s.layer, true);
  if (st.hidden.has(id)) {
    const hidden = new Set(st.hidden);
    hidden.delete(id);
    useViewer.setState({ hidden });
  }
  useViewer.getState().select(id);
}

export function startTour(id: string, step = 0): void {
  const tour = TOURS.find((t) => t.id === id);
  const s = tour?.steps[step];
  if (!tour || !s) return;
  const st = useViewer.getState();
  st.setTour({ id, step });
  if (s.system !== st.system) st.setSystem(s.system);
  if (s.layers) useViewer.getState().setLayers(s.layers);
  if (s.structureId) goToStructure(s.structureId);
  else {
    useViewer.getState().select(null);
    useViewer.getState().requestCamera({ kind: 'reset' });
  }
}
