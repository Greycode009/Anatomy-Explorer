import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { initOffline } from './features/offline';
import { checkPersisted, refreshStatuses } from './assets/repository';

initOffline();
refreshStatuses();
checkPersisted();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
