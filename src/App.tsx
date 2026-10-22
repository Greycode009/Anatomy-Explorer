import { useEffect } from 'react';
import { useViewer } from './state/store';
import { AnatomyCanvas } from './viewer/AnatomyCanvas';
import { LabelOverlay } from './viewer/labels';
import { Sidebar } from './ui/Sidebar';
import { InfoPanelContent } from './ui/InfoPanel';
import { ModeSwitch, Toolbar } from './ui/ViewerControls';
import { HoverTooltip, NoticeToast, StatusLine, TourPanel, ViewerStatus } from './ui/Overlays';
import { PanelHost } from './ui/Modals';
import { MobileShell, collapseSheetsForCanvas } from './ui/mobile/MobileShell';

function useKeyboardShortcuts() {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('input, textarea, select, [role="dialog"]')) return;
      const st = useViewer.getState();
      if (e.key === 'Escape') st.select(null);
      else if (e.key === 'r' || e.key === 'R') { st.select(null); st.requestCamera({ kind: 'reset' }); }
      else if (e.key === 'l' || e.key === 'L') st.toggleLabels();
      else if (e.key === '+' || e.key === '=') st.requestCamera({ kind: 'zoom', factor: 1.4 });
      else if (e.key === '-') st.requestCamera({ kind: 'zoom', factor: 1 / 1.4 });
      else if ((e.key === 'h' || e.key === 'H') && st.selectedId) st.hide(st.selectedId);
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, []);
}

export default function App() {
  useKeyboardShortcuts();

  return (
    <div className="flex h-full overflow-hidden">
      <aside className="hidden w-72 shrink-0 border-r border-ink-800 lg:block">
        <Sidebar />
      </aside>

      <main
        className="relative min-w-0 flex-1 overflow-hidden"
        aria-label="3D anatomy viewer"
        onPointerDown={(e) => {
          if ((e.target as HTMLElement).tagName === 'CANVAS') collapseSheetsForCanvas();
        }}
      >
        <AnatomyCanvas />
        <LabelOverlay />

        {/* Desktop chrome */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 hidden justify-center p-3 lg:flex">
          <div className="pointer-events-auto flex flex-col items-center gap-2">
            <ModeSwitch />
            <NoticeToast />
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-4 left-0 right-0 z-20 hidden flex-col items-center gap-2 px-2 lg:flex">
          <div className="pointer-events-auto"><Toolbar /></div>
          <StatusLine />
        </div>

        {/* Shared: loading and error status (below the chips on phones) */}
        <div className="pointer-events-none absolute left-2 right-16 top-[6.75rem] z-20 flex flex-col gap-2 lg:left-4 lg:right-auto lg:top-16">
          <div className="lg:hidden"><NoticeToast /></div>
          <ViewerStatus />
          <div className="hidden lg:block"><TourPanel /></div>
        </div>

        <MobileShell tourCard={<TourPanel />} />
        <HoverTooltip />
      </main>

      <aside className="scroll-thin hidden w-[22rem] shrink-0 overflow-y-auto border-l border-ink-800 bg-ink-900/95 p-5 lg:block" aria-label="Information panel">
        <InfoPanelContent />
      </aside>

      <PanelHost />
    </div>
  );
}
