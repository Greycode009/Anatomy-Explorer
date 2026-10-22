import { useMemo, useState } from 'react';
import { Box, Crosshair, EyeOff, Route, TriangleAlert, X } from 'lucide-react';
import type { ContentEntry, Mode, Structure } from '../types';
import { STRUCTURE_BY_ID, hasModel, structuresInSystem } from '../data/manifest';
import { SYSTEM_BY_ID } from '../data/systems';
import { contentFor, fallbackContent, INFO_ONLY_BY_ID, infoOnlyFor } from '../data/content';
import { TOURS } from '../data/tours';
import { useViewer } from '../state/store';
import { goToStructure, startTour } from '../features/navigation';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-1.5">
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-300/80">{title}</h3>
      {children}
    </section>
  );
}

function RelatedLinks({ related }: { related: string[] }) {
  const mode = useViewer((s) => s.mode);
  return (
    <ul className="flex flex-wrap gap-1.5">
      {related.map((r) => {
        const s = STRUCTURE_BY_ID.get(r);
        const info = infoOnlyFor(r);
        if (s) {
          const ok = hasModel(s, mode);
          return (
            <li key={r}>
              <button type="button" disabled={!ok} onClick={() => goToStructure(r)} className="rounded-full border border-cyan-400/30 bg-cyan-400/5 px-2.5 py-1 text-xs text-cyan-200 hover:bg-cyan-400/15 disabled:opacity-40">
                {s.name}
              </button>
            </li>
          );
        }
        if (info) {
          return (
            <li key={r}>
              <button type="button" onClick={() => goToStructure(info.id)} className="rounded-full border border-amber-400/30 px-2.5 py-1 text-xs text-amber-200 hover:bg-amber-400/10" title="Information only — no 3D model">
                {info.name} · info
              </button>
            </li>
          );
        }
        return <li key={r} className="rounded-full border border-ink-700 px-2.5 py-1 text-xs text-ink-400" title="Not modelled in the installed assets">{r}</li>;
      })}
    </ul>
  );
}

function ContentBody({ c }: { c: ContentEntry }) {
  return (
    <>
      <p className="text-sm leading-relaxed text-ink-200">{c.summary}</p>
      <Section title="Location"><p className="text-sm leading-relaxed text-ink-300">{c.location}</p></Section>
      {c.functions.length > 0 && (
        <Section title="Primary functions">
          <ul className="list-disc space-y-1 pl-4 text-sm text-ink-300 marker:text-cyan-400">{c.functions.map((f) => <li key={f}>{f}</li>)}</ul>
        </Section>
      )}
      {c.components && c.components.length > 0 && (
        <Section title="Important structures and components">
          <ul className="list-disc space-y-1 pl-4 text-sm text-ink-300 marker:text-cyan-400">{c.components.map((f) => <li key={f}>{f}</li>)}</ul>
        </Section>
      )}
      {c.howItWorks && <Section title="How it works"><p className="text-sm leading-relaxed text-ink-300">{c.howItWorks}</p></Section>}
      {c.facts && c.facts.length > 0 && (
        <Section title="Facts">
          <ul className="space-y-1.5 text-sm text-ink-300">{c.facts.map((f) => <li key={f} className="rounded-md bg-ink-850 px-2.5 py-1.5">{f}</li>)}</ul>
        </Section>
      )}
      {c.related && c.related.length > 0 && <Section title="Related and connected structures"><RelatedLinks related={c.related} /></Section>}
    </>
  );
}

function ModeAvailability({ s }: { s: Structure }) {
  const chip = (mode: Mode) => (
    <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${hasModel(s, mode) ? 'bg-emerald-400/15 text-emerald-300' : 'bg-rose-400/15 text-rose-300'}`}>
      {mode === 'realistic' ? 'Realistic' : 'Educational'} {hasModel(s, mode) ? '✓' : '✗'}
    </span>
  );
  return <div className="flex gap-1.5">{chip('realistic')}{chip('educational')}</div>;
}

function StructureView({ s }: { s: Structure }) {
  const content = contentFor(s);
  const c = content ?? fallbackContent(s);
  const sys = SYSTEM_BY_ID[s.system];
  const { select, hide, requestCamera } = useViewer.getState();
  return (
    <div className="space-y-4">
      <header className="space-y-2">
        <div className="flex items-start gap-2">
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-1.5 text-[11px] font-medium" style={{ color: sys.color }}>
              <span className="h-2 w-2 rounded-full" style={{ background: sys.color }} /> {sys.name}
              {s.alsoIn.length > 0 && <span className="text-ink-400">· also {s.alsoIn.map((a) => SYSTEM_BY_ID[a].shortName.toLowerCase()).join(', ')}</span>}
            </p>
            <h2 className="font-display text-xl font-semibold leading-tight text-white">{s.name}</h2>
            {content && content.anatomicalName.toLowerCase() !== s.name.toLowerCase() && <p className="text-xs text-ink-400">{content.anatomicalName}</p>}
            {content?.commonName && <p className="text-xs text-ink-300">Common name: {content.commonName}</p>}
          </div>
          <button type="button" onClick={() => select(null)} className="rounded-md p-1.5 text-ink-400 hover:bg-ink-800 hover:text-ink-200" aria-label="Clear selection">
            <X className="h-4 w-4" />
          </button>
        </div>
        <ModeAvailability s={s} />
        <div className="flex gap-1.5">
          <button type="button" onClick={() => requestCamera({ kind: 'focus', id: s.id })} className="flex items-center gap-1 rounded-md border border-ink-700 px-2 py-1 text-xs text-ink-200 hover:border-cyan-400/50"><Crosshair className="h-3.5 w-3.5" /> Focus</button>
          <button type="button" onClick={() => hide(s.id)} className="flex items-center gap-1 rounded-md border border-ink-700 px-2 py-1 text-xs text-ink-200 hover:border-cyan-400/50"><EyeOff className="h-3.5 w-3.5" /> Hide</button>
        </div>
        {!content && (
          <p className="flex gap-1.5 rounded-md border border-amber-400/30 bg-amber-400/5 px-2.5 py-1.5 text-xs text-amber-200">
            <TriangleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" /> No educational entry has been written for this structure yet.
          </p>
        )}
      </header>
      <ContentBody c={c} />
      <Section title={`Model parts (${s.parts.length})`}>
        <ul className="space-y-0.5 text-xs text-ink-400">
          {s.parts.map((p) => <li key={p.source}><span className="text-ink-300">{p.name}</span> · BodyParts3D {p.source}</li>)}
        </ul>
      </Section>
    </div>
  );
}

function InfoOnlyView({ id }: { id: string }) {
  const info = INFO_ONLY_BY_ID.get(id)!;
  const sys = SYSTEM_BY_ID[info.system];
  return (
    <div className="space-y-4">
      <header className="space-y-2">
        <div className="flex items-start gap-2">
          <div className="flex-1">
            <p className="text-[11px] font-medium" style={{ color: sys.color }}>{sys.name}</p>
            <h2 className="font-display text-xl font-semibold text-white">{info.name}</h2>
          </div>
          <button type="button" onClick={() => useViewer.getState().showInfo(null)} className="rounded-md p-1.5 text-ink-400 hover:bg-ink-800" aria-label="Close"><X className="h-4 w-4" /></button>
        </div>
        <p className="flex gap-1.5 rounded-md border border-amber-400/30 bg-amber-400/5 px-2.5 py-1.5 text-xs text-amber-200">
          <Box className="mt-0.5 h-3.5 w-3.5 shrink-0" /> Information only — this structure has no 3D model in the installed assets. Related modelled structures are linked below.
        </p>
      </header>
      <ContentBody c={info.content} />
    </div>
  );
}

function SystemOverview() {
  const system = useViewer((s) => s.system);
  const mode = useViewer((s) => s.mode);
  const hidden = useViewer((s) => s.hidden);
  const [filter, setFilter] = useState('');
  const list = useMemo(() => (system === 'all' ? [] : structuresInSystem(system)).filter((s) => s.name.toLowerCase().includes(filter.toLowerCase())), [system, filter]);

  if (system === 'all') {
    return (
      <div className="space-y-4">
        <header>
          <h2 className="font-display text-xl font-semibold text-white">Full body</h2>
          <p className="mt-1 text-sm leading-relaxed text-ink-300">
            Click or tap any structure to identify it. Use the layer controls to peel from skin to muscle to bone and organs, or choose an organ system on the left.
          </p>
        </header>
        <Section title="Guided exploration">
          <ul className="space-y-2">
            {TOURS.map((t) => (
              <li key={t.id}>
                <button type="button" onClick={() => startTour(t.id)} className="w-full rounded-lg border border-ink-700 bg-ink-850 p-3 text-left hover:border-cyan-400/40">
                  <span className="flex items-center gap-2 text-sm font-medium text-white"><Route className="h-4 w-4 text-cyan-300" /> {t.title}</span>
                  <span className="mt-1 block text-xs text-ink-400">{t.description} · {t.steps.length} steps</span>
                </button>
              </li>
            ))}
          </ul>
        </Section>
        <p className="text-[11px] leading-relaxed text-ink-400">
          For education only. Not a diagnostic or clinical tool. Models: BodyParts3D (adult male), CC BY-SA 2.1 JP.
        </p>
      </div>
    );
  }

  const sys = SYSTEM_BY_ID[system];
  return (
    <div className="space-y-4">
      <header>
        <p className="text-[11px] font-medium" style={{ color: sys.color }}>Organ system</p>
        <h2 className="font-display text-xl font-semibold text-white">{sys.name}</h2>
        <p className="mt-1 text-sm leading-relaxed text-ink-300">{sys.overview}</p>
      </header>
      <Section title="Functions">
        <ul className="list-disc space-y-1 pl-4 text-sm text-ink-300 marker:text-cyan-400">{sys.functions.map((f) => <li key={f}>{f}</li>)}</ul>
      </Section>
      <Section title="What is modelled">
        <p className="rounded-md bg-ink-850 px-2.5 py-2 text-xs leading-relaxed text-ink-300">{sys.coverage}</p>
      </Section>
      <Section title={`Structures (${list.length})`}>
        <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filter this list" aria-label="Filter structures" className="w-full rounded-md border border-ink-700 bg-ink-850 px-2.5 py-1.5 text-xs focus:border-cyan-400/60 focus:outline-none" />
        <ul className="scroll-thin max-h-80 space-y-0.5 overflow-y-auto pr-1">
          {list.map((s) => (
            <li key={s.id}>
              <button type="button" onClick={() => goToStructure(s.id)} className="flex w-full items-center justify-between gap-2 rounded px-2 py-1 text-left text-xs text-ink-300 hover:bg-ink-800 hover:text-white focus:bg-ink-800 focus:outline-none">
                <span className={hidden.has(s.id) ? 'line-through opacity-60' : ''}>{s.name}</span>
                {!hasModel(s, mode) && <span className="text-[10px] text-rose-300">no {mode} model</span>}
              </button>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}

export function InfoPanelContent() {
  const selectedId = useViewer((s) => s.selectedId);
  const infoId = useViewer((s) => s.infoId);
  const s = selectedId ? STRUCTURE_BY_ID.get(selectedId) : undefined;
  if (infoId && INFO_ONLY_BY_ID.has(infoId)) return <InfoOnlyView id={infoId} />;
  if (s) return <StructureView s={s} />;
  return <SystemOverview />;
}
