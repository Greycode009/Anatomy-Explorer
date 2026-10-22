import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { initOffline } from './features/offline';
import { BUNDLED, checkPersisted, refreshStatuses } from './assets/repository';
import { initNativeBridge } from './features/nativeBridge';

initOffline();
if (BUNDLED) initNativeBridge();
refreshStatuses();
checkPersisted();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
