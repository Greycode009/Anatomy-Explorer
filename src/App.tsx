import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Menu, X } from 'lucide-react';
import { useViewer } from './state/store';
import { AnatomyCanvas } from './viewer/AnatomyCanvas';
import { LabelOverlay } from './viewer/labels';
import { Sidebar } from './ui/Sidebar';
import { InfoPanelContent } from './ui/InfoPanel';
import { ModeSwitch, Toolbar } from './ui/ViewerControls';
import { HoverTooltip, NoticeToast, StatusLine, TourPanel, ViewerStatus } from './ui/Overlays';
import { PanelHost } from './ui/Modals';
import { SYSTEM_BY_ID } from './data/systems';

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

/** Mobile: information panel as a bottom sheet that can be collapsed. */
function BottomSheet() {
  const selectedId = useViewer((s) => s.selectedId);
  const infoId = useViewer((s) => s.infoId);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => setExpanded(!!(selectedId || infoId)), [selectedId, infoId]);
  return (
    <section
      aria-label="Information"
      className={`absolute inset-x-0 bottom-0 z-30 flex flex-col rounded-t-2xl border-t border-ink-700 bg-ink-900/97 shadow-2xl transition-[height] duration-300 lg:hidden ${expanded ? 'h-[58vh]' : 'h-14'}`}
    >
      <button type="button" onClick={() => setExpanded(!expanded)} className="flex h-14 shrink-0 items-center justify-between px-4 text-sm" aria-expanded={expanded}>
        <span className="mx-auto absolute left-1/2 top-1.5 h-1 w-10 -translate-x-1/2 rounded-full bg-ink-600" />
        <SheetTitle />
        {expanded ? <ChevronDown className="h-5 w-5 text-ink-400" /> : <ChevronUp className="h-5 w-5 text-ink-400" />}
      </button>
      {expanded && <div className="scroll-thin min-h-0 flex-1 overflow-y-auto px-4 pb-6"><InfoPanelContent /></div>}
    </section>
  );
}

function SheetTitle() {
  const selectedId = useViewer((s) => s.selectedId);
  const system = useViewer((s) => s.system);
  return <span className="truncate font-medium text-white">{selectedId ? 'Selected structure' : system === 'all' ? 'Full body · guided tours' : SYSTEM_BY_ID[system].name}</span>;
}

export default function App() {
  useKeyboardShortcuts();
  const navOpen = useViewer((s) => s.navOpen);
  const setNavOpen = useViewer((s) => s.setNavOpen);

  return (
    <div className="flex h-full overflow-hidden">
      <aside className="hidden w-72 shrink-0 border-r border-ink-800 lg:block">
        <Sidebar />
      </aside>

      {navOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button type="button" className="absolute inset-0 bg-black/60" aria-label="Close navigation" onClick={() => setNavOpen(false)} />
          <aside className="relative h-full w-[min(20rem,86vw)] border-r border-ink-700 shadow-2xl">
            <button type="button" onClick={() => setNavOpen(false)} className="absolute right-2 top-3 z-10 rounded-md p-2 text-ink-400 hover:text-white" aria-label="Close navigation"><X className="h-5 w-5" /></button>
            <Sidebar />
          </aside>
        </div>
      )}

      <main className="relative min-w-0 flex-1 overflow-hidden" aria-label="3D anatomy viewer">
        <AnatomyCanvas />
        <LabelOverlay />

        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-2 p-3">
          <button type="button" onClick={() => setNavOpen(true)} className="pointer-events-auto grid h-10 w-10 place-items-center rounded-lg border border-ink-700 bg-ink-900/85 text-ink-200 lg:hidden" aria-label="Open organ systems and search">
            <Menu className="h-5 w-5" />
          </button>
          <div className="pointer-events-auto mx-auto flex flex-col items-center gap-2">
            <ModeSwitch />
            <NoticeToast />
          </div>
          <span className="w-10 lg:hidden" />
        </div>

        <div className="pointer-events-none absolute left-3 top-16 z-20 flex flex-col gap-2 sm:left-4">
          <ViewerStatus />
          <TourPanel />
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-16 z-20 flex flex-col items-center gap-2 px-2 lg:bottom-4">
          <div className="pointer-events-auto"><Toolbar /></div>
          <div className="hidden lg:block"><StatusLine /></div>
        </div>

        <BottomSheet />
        <HoverTooltip />
      </main>

      <aside className="scroll-thin hidden w-[22rem] shrink-0 overflow-y-auto border-l border-ink-800 bg-ink-900/95 p-5 lg:block" aria-label="Information panel">
        <InfoPanelContent />
      </aside>

      <PanelHost />
    </div>
  );
}
