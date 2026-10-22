// Messages between the web app and the Android app shell (Expo + react-native-webview, see mobile/).
import { useViewer } from '../state/store';
import { useMobile } from '../ui/mobile/MobileShell';

declare global {
  interface Window {
    ReactNativeWebView?: { postMessage(message: string): void };
  }
}

/** Closes the topmost thing on screen. Returns false when there is nothing left to close. */
function handleBack(): boolean {
  const v = useViewer.getState();
  const m = useMobile.getState();
  if (v.panel === 'firstRun') v.finishFirstRun();
  else if (v.panel) v.openPanel(null);
  else if (m.tab !== 'info' || m.snap !== 'peek') m.close();
  else if (v.tour) v.setTour(null);
  else if (v.selectedId || v.infoId) useViewer.setState({ selectedId: null, infoId: null });
  else if (v.system !== 'all') {
    v.setSystem('all');
    v.requestCamera({ kind: 'reset' });
  } else return false;
  return true;
}

export function initNativeBridge(): void {
  // The shell dispatches this event when the Android back button or gesture is used.
  addEventListener('native-back', () => {
    if (!handleBack()) window.ReactNativeWebView?.postMessage(JSON.stringify({ type: 'exit' }));
  });
}
