import { useEffect } from 'react';
import { CircleCheck, CloudOff, Download, HardDrive, RefreshCw, ShieldCheck, Trash2, TriangleAlert, X } from 'lucide-react';
import type { AssetEntry, Mode } from '../types';
import { ASSETS, assetFor, formatBytes, manifest } from '../data/manifest';
import { SYSTEMS } from '../data/systems';
import { INFO_ONLY } from '../data/content';
import { useViewer } from '../state/store';
import {
  cancelDownloads, queueDownloads, refreshStatuses, removeAsset, requestPersistentStorage, useAssets, verifyAsset,
  type AssetStatus,
} from '../assets/repository';
import { refreshStorageEstimate, useOffline } from '../features/offline';
import { useReadiness } from './OfflineBadge';
import { SYSTEM_ICONS } from './icons';

function Modal({ title, onClose, children, wide }: { title: string; onClose: () => void; children: React.ReactNode; wide?: boolean }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-3" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      {/* Phones: a bottom sheet; larger screens: a centered dialog. */}
      <div role="dialog" aria-modal="true" aria-label={title} className={`flex max-h-[92dvh] w-full flex-col rounded-t-2xl border border-ink-700 bg-ink-900 shadow-2xl sm:rounded-2xl ${wide ? 'max-w-4xl' : 'max-w-2xl'}`}>
        <header className="flex items-center justify-between border-b border-ink-800 px-5 py-3">
          <h2 className="font-display text-lg font-semibold text-white">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-md p-1.5 text-ink-400 hover:bg-ink-800 hover:text-white"><X className="h-5 w-5" /></button>
        </header>
        <div className="scroll-thin overflow-y-auto px-5 pt-4" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>{children}</div>
      </div>
    </div>
  );
}

const LABEL: Record<AssetStatus['state'], string> = {
  unknown: 'Checking…', 'not-downloaded': 'Not downloaded', queued: 'Queued', downloading: 'Downloading', verifying: 'Verifying',
  stored: 'Stored locally', 'update-available': 'Update available', failed: 'Download failed', 'storage-unavailable': 'Storage unavailable',
};

function StatusCell({ asset }: { asset: AssetEntry }) {
  const st = useAssets((s) => s.status[asset.id]);
  const shellReady = useReadiness().shellReady;
  if (!st) return null;
  const busy = st.state === 'downloading' || st.state === 'verifying' || st.state === 'queued';
  const pct = st.total ? Math.round(((st.received ?? 0) / st.total) * 100) : 0;
  const label = st.state === 'stored' && shellReady ? 'Available offline' : LABEL[st.state];
  const tone = st.state === 'stored' ? 'text-emerald-300' : st.state === 'failed' || st.state === 'storage-unavailable' ? 'text-rose-300' : st.state === 'update-available' ? 'text-amber-300' : busy ? 'text-cyan-300' : 'text-ink-400';
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-1.5">
        <span className={`text-xs font-medium ${tone}`}>{label}</span>
        <span className="text-[10px] text-ink-400">{formatBytes(asset.bytes)}</span>
        {st.state === 'stored' && st.meta?.integrity === 'size-and-format' && <span className="text-[10px] text-amber-300" title="Web Crypto unavailable on this origin; size and format were checked, not SHA-256">size-checked</span>}
      </div>
      {busy && <div className="mt-1 h-1 w-full overflow-hidden rounded bg-ink-700"><div className="h-full bg-cyan-400 transition-all" style={{ width: `${pct}%` }} /></div>}
      {st.error && <p className="mt-0.5 text-[10px] leading-snug text-rose-300">{st.error}</p>}
    </div>
  );
}

function AssetActions({ asset }: { asset: AssetEntry }) {
  const st = useAssets((s) => s.status[asset.id]?.state);
  const online = useOffline((s) => s.online);
  const icon = 'h-3.5 w-3.5';
  const btn = 'grid h-9 w-9 place-items-center rounded-md border sm:h-7 sm:w-7 border-ink-700 text-ink-300 hover:border-cyan-400/50 hover:text-white disabled:opacity-30';
  return (
    <div className="flex gap-1">
      {(st === 'not-downloaded' || st === 'failed' || st === 'update-available' || st === 'storage-unavailable') && (
        <button type="button" className={btn} disabled={!online} onClick={() => queueDownloads([asset])} aria-label={`${st === 'failed' ? 'Retry' : 'Download'} ${asset.id}`} title={st === 'failed' ? 'Retry (resumes if possible)' : 'Download'}>
          {st === 'failed' ? <RefreshCw className={icon} /> : <Download className={icon} />}
        </button>
      )}
      {st === 'stored' && (
        <>
          <button type="button" className={btn} onClick={() => verifyAsset(asset)} aria-label={`Verify ${asset.id}`} title="Verify integrity"><ShieldCheck className={icon} /></button>
          <button type="button" className={btn} onClick={() => removeAsset(asset).then(refreshStorageEstimate)} aria-label={`Remove ${asset.id}`} title="Remove local copy"><Trash2 className={icon} /></button>
        </>
      )}
    </div>
  );
}

function packStats(assets: AssetEntry[], status: Record<string, AssetStatus>) {
  const stored = assets.filter((a) => status[a.id]?.state === 'stored');
  const failed = assets.filter((a) => status[a.id]?.state === 'failed');
  return { stored: stored.length, failed: failed.length, total: assets.length, bytes: assets.reduce((n, a) => n + a.bytes, 0), storedBytes: stored.reduce((n, a) => n + a.bytes, 0) };
}

function PackButton({ label, assets }: { label: string; assets: AssetEntry[] }) {
  const status = useAssets((s) => s.status);
  const online = useOffline((s) => s.online);
  const p = packStats(assets, status);
  const complete = p.stored === p.total;
  return (
    <button type="button" disabled={complete || !online} onClick={() => queueDownloads(assets)}
      className="rounded-xl border border-ink-700 bg-ink-850 p-3 text-left hover:border-cyan-400/50 disabled:cursor-default disabled:hover:border-ink-700">
      <span className="flex items-center gap-2 text-sm font-medium text-white">
        {complete ? <CircleCheck className="h-4 w-4 text-emerald-300" /> : <Download className="h-4 w-4 text-cyan-300" />} {label}
      </span>
      <span className="mt-1 block text-[11px] text-ink-400">
        {p.stored}/{p.total} files stored · {formatBytes(p.storedBytes)} of {formatBytes(p.bytes)}
        {p.failed > 0 && <span className="text-rose-300"> · {p.failed} failed</span>}
      </span>
    </button>
  );
}

export function DownloadManager({ onClose }: { onClose: () => void }) {
  const r = useReadiness();
  const persisted = useAssets((s) => s.persisted);
  const status = useAssets((s) => s.status);
  useEffect(() => {
    refreshStatuses();
    refreshStorageEstimate();
  }, []);
  const byMode = (m: Mode) => ASSETS.filter((a) => a.mode === m);
  const busy = Object.values(status).some((s) => s.state === 'downloading' || s.state === 'queued' || s.state === 'verifying');

  return (
    <Modal title="Offline assets" onClose={onClose} wide>
      <div className="space-y-5">
        <ReadinessChecklist />
        <div className="grid gap-2 sm:grid-cols-3">
          <PackButton label="Educational pack" assets={byMode('educational')} />
          <PackButton label="Realistic pack" assets={byMode('realistic')} />
          <PackButton label="Everything" assets={ASSETS} />
        </div>
        {!r.online && <p className="flex items-center gap-2 rounded-md bg-amber-400/10 px-3 py-2 text-xs text-amber-200"><CloudOff className="h-4 w-4" /> You are offline. Stored assets work; downloads resume when you are back online.</p>}
        {/* Phones: one card per system instead of the wide table. */}
        <ul className="space-y-2 sm:hidden">
          {SYSTEMS.map((s) => {
            const Icon = SYSTEM_ICONS[s.id];
            const pair = [assetFor(s.id, 'realistic'), assetFor(s.id, 'educational')].filter((a): a is AssetEntry => !!a);
            return (
              <li key={s.id} className="rounded-xl border border-ink-800 bg-ink-850 p-3">
                <div className="mb-2 flex items-center gap-2">
                  <Icon className="h-4 w-4" style={{ color: s.color }} />
                  <span className="flex-1 text-sm font-medium text-ink-200">{s.shortName}</span>
                  <button type="button" disabled={!r.online} onClick={() => queueDownloads(pair)} className="rounded-md border border-ink-700 px-2.5 py-1.5 text-[11px] text-ink-300 disabled:opacity-30">Download both</button>
                </div>
                {pair.map((a) => (
                  <div key={a.id} className="flex items-center gap-2 border-t border-ink-800 py-2">
                    <span className="w-20 shrink-0 text-xs text-ink-400">{a.mode === 'realistic' ? 'Realistic' : 'Educational'}</span>
                    <div className="min-w-0 flex-1"><StatusCell asset={a} /></div>
                    <AssetActions asset={a} />
                  </div>
                ))}
              </li>
            );
          })}
        </ul>
        <div className="hidden overflow-x-auto sm:block">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="text-[10px] uppercase tracking-[0.12em] text-ink-400">
              <tr><th className="py-1.5 font-semibold">System</th><th className="font-semibold">Realistic</th><th className="font-semibold">Educational</th><th className="w-24 font-semibold">Both</th></tr>
            </thead>
            <tbody className="divide-y divide-ink-800">
              {SYSTEMS.map((s) => {
                const Icon = SYSTEM_ICONS[s.id];
                const ra = assetFor(s.id, 'realistic');
                const ea = assetFor(s.id, 'educational');
                const pair = [ra, ea].filter((a): a is AssetEntry => !!a);
                return (
                  <tr key={s.id}>
                    <td className="py-2 pr-3"><span className="flex items-center gap-2 text-ink-200"><Icon className="h-4 w-4" style={{ color: s.color }} /> {s.shortName}</span></td>
                    {[ra, ea].map((a, i) => (
                      <td key={i} className="py-2 pr-3">
                        {a ? <div className="flex items-center gap-2"><div className="min-w-0 flex-1"><StatusCell asset={a} /></div><AssetActions asset={a} /></div> : <span className="text-xs text-ink-400">No model</span>}
                      </td>
                    ))}
                    <td className="py-2"><button type="button" disabled={!r.online} onClick={() => queueDownloads(pair)} className="rounded-md border border-ink-700 px-2 py-1 text-[11px] text-ink-300 hover:border-cyan-400/50 disabled:opacity-30">Download</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <button type="button" onClick={() => Promise.all(ASSETS.filter((a) => status[a.id]?.state === 'stored').map(verifyAsset)).then(() => refreshStatuses())} className="flex items-center gap-1.5 rounded-md border border-ink-700 px-2.5 py-1.5 text-ink-200 hover:border-cyan-400/50"><ShieldCheck className="h-3.5 w-3.5" /> Verify all stored</button>
          <button type="button" onClick={() => queueDownloads(ASSETS.filter((a) => status[a.id]?.state === 'failed'))} className="flex items-center gap-1.5 rounded-md border border-ink-700 px-2.5 py-1.5 text-ink-200 hover:border-cyan-400/50"><RefreshCw className="h-3.5 w-3.5" /> Retry failed</button>
          {busy && <button type="button" onClick={cancelDownloads} className="rounded-md border border-ink-700 px-2.5 py-1.5 text-ink-200 hover:border-rose-400/50">Pause downloads</button>}
          <button type="button" onClick={() => requestPersistentStorage()} className="flex items-center gap-1.5 rounded-md border border-ink-700 px-2.5 py-1.5 text-ink-200 hover:border-cyan-400/50"><HardDrive className="h-3.5 w-3.5" /> Request persistent storage</button>
          <span className="text-ink-400">
            Persistent storage: {persisted === null ? 'not requested' : persisted ? 'granted' : 'not granted (the browser may evict data under storage pressure)'}
          </span>
        </div>
        {r.storage && <p className="text-[11px] text-ink-400">This site uses {formatBytes(r.storage.usage)} of about {formatBytes(r.storage.quota)} available to it.</p>}
        <p className="text-[11px] leading-relaxed text-ink-400">
          Models are stored in IndexedDB (Cache Storage is used if IndexedDB fails). A file is only marked stored after its size, GLB header and SHA-256 checksum are verified and the write is read back. Interrupted downloads resume from the last saved chunk. Browsers can clear site data, so use “Verify all stored” if something seems missing.
        </p>
      </div>
    </Modal>
  );
}

function ReadinessChecklist() {
  const r = useReadiness();
  const item = (ok: boolean, text: string, detail?: string) => (
    <li className="flex items-start gap-2">
      {ok ? <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /> : <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-ink-400" />}
      <span className={ok ? 'text-ink-200' : 'text-ink-400'}>{text}{detail && <span className="block text-[11px] text-ink-400">{detail}</span>}</span>
    </li>
  );
  return (
    <ul className="grid gap-2 rounded-xl border border-ink-800 bg-ink-850 p-3 text-sm sm:grid-cols-2">
      {item(r.installed, 'Application installed', r.installed ? 'Running as an installed app' : 'Optional: use your browser\'s “Install app” option')}
      {item(r.shellReady, 'Application shell cached', r.sw === 'dev' ? 'Not available on the dev server — use the production build' : r.sw === 'unsupported' ? 'This browser has no service worker support' : r.shellReady ? 'Opens without a network connection' : 'Waiting for the service worker')}
      {item(r.stored > 0, 'Some anatomy assets downloaded', `${r.stored} of ${r.total} model packs stored`)}
      {item(r.bothModes > 0, 'Both visualization modes available', `${r.bothModes} of 11 systems have both modes stored`)}
      {item(r.stored === r.total, 'All supported anatomy assets downloaded', `${formatBytes(ASSETS.reduce((n, a) => n + a.bytes, 0))} in total`)}
      {item(r.level === 'all', 'Ready for full offline use')}
    </ul>
  );
}

export function FirstRun({ onClose }: { onClose: () => void }) {
  const r = useReadiness();
  const edu = ASSETS.filter((a) => a.mode === 'educational');
  const real = ASSETS.filter((a) => a.mode === 'realistic');
  const size = (a: AssetEntry[]) => formatBytes(a.reduce((n, x) => n + x.bytes, 0));
  return (
    <Modal title="Welcome to Anatomy Explorer" onClose={onClose}>
      <div className="space-y-4 text-sm leading-relaxed text-ink-300">
        <p>
          Explore a full 3D human body built from <strong className="text-ink-200">BodyParts3D</strong>, a research anatomy dataset with {manifest.structures.length} selectable structures across all eleven organ systems (coverage differs by system; gaps are labelled). Switch between a <strong className="text-ink-200">Realistic</strong> view with detailed meshes and tissue-like materials and a simplified, color-coded <strong className="text-ink-200">Educational</strong> view.
        </p>
        <p>
          <strong className="text-ink-200">Works offline.</strong> The app itself and all educational text ({INFO_ONLY.length} extra information-only entries included) are cached automatically. The 3D models are downloaded on demand, or you can store them now:
        </p>
        <div className="grid gap-2 sm:grid-cols-3">
          <button type="button" onClick={() => queueDownloads(edu)} className="rounded-xl border border-ink-700 bg-ink-850 p-3 text-left hover:border-cyan-400/50"><span className="block font-medium text-white">Educational pack</span><span className="text-[11px] text-ink-400">{size(edu)} · fast, lightweight</span></button>
          <button type="button" onClick={() => queueDownloads(real)} className="rounded-xl border border-ink-700 bg-ink-850 p-3 text-left hover:border-cyan-400/50"><span className="block font-medium text-white">Realistic pack</span><span className="text-[11px] text-ink-400">{size(real)} · high detail</span></button>
          <button type="button" onClick={() => queueDownloads(ASSETS)} className="rounded-xl border border-cyan-400/40 bg-cyan-400/10 p-3 text-left hover:border-cyan-400"><span className="block font-medium text-white">Everything</span><span className="text-[11px] text-ink-400">{size(ASSETS)} · both modes, all systems</span></button>
        </div>
        <p className="text-xs text-ink-400">
          Available immediately: navigation, search, educational content and guided tours. Each system's models download automatically the first time you open it while online. {r.stored}/{r.total} model packs are stored so far — progress is in Downloads.
        </p>
        <p className="rounded-md border border-ink-800 bg-ink-850 px-3 py-2 text-xs text-ink-400">
          Educational use only — not a diagnostic or clinical tool. The model is one adult male body; female reproductive anatomy, peripheral nerves, the spinal cord, lymph nodes and the thyroid are described but not modelled.
        </p>
        <div className="sticky bottom-0 -mx-5 flex justify-end border-t border-ink-800 bg-ink-900 px-5 py-3 sm:static sm:mx-0 sm:border-0 sm:p-0">
          <button type="button" onClick={onClose} className="w-full rounded-lg bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-ink-950 sm:w-auto">Start exploring</button>
        </div>
      </div>
    </Modal>
  );
}

export function About({ onClose }: { onClose: () => void }) {
  const src = manifest.source;
  return (
    <Modal title="Sources, license and accuracy" onClose={onClose}>
      <div className="space-y-4 text-sm leading-relaxed text-ink-300">
        <section>
          <h3 className="font-semibold text-white">3D models</h3>
          <p>{src.attribution}.</p>
          <p className="text-xs text-ink-400">{src.citation}</p>
          <p className="mt-1 text-xs">License: <a className="text-cyan-300 underline" href={src.licenseUrl} target="_blank" rel="noreferrer">{src.license}</a>. Source data: {src.name}, {src.publisher}; downloaded from the GitHub mirror pinned at <span className="break-all text-ink-400">{src.mirror}</span>. Original: <span className="text-ink-400">{src.original}</span>.</p>
          <p className="mt-1 text-xs text-ink-400">Changes made: {src.modifications} The derived models are shared under the same license.</p>
        </section>
        <section>
          <h3 className="font-semibold text-white">What the two modes are</h3>
          <p className="text-xs">Both modes use the same BodyParts3D geometry and the same structure IDs. Realistic Mode shows meshes decimated to roughly 16% of the source triangles with physically based tissue colors (the dataset has no textures). Educational Mode shows a separate, heavily simplified version (about 2.5% of source triangles) with toon shading, a color family per system and more labels.</p>
        </section>
        <section>
          <h3 className="font-semibold text-white">Accuracy and limits</h3>
          <ul className="list-disc space-y-1 pl-4 text-xs">
            <li>One adult male body. Positions and proportions are those of the source dataset.</li>
            <li>Missing structures (spinal cord, peripheral nerves, lymph nodes and vessels, thyroid and parathyroid glands, female reproductive organs, skin layers, nails, heart chambers as separate parts) are information-only and labelled as such.</li>
            <li>See-through mode is transparency, not dissection. The cutaway plane clips surface meshes, so cut organs look hollow.</li>
            <li>Educational text was written for this app from standard anatomy references. It is a learning aid, not medical advice, and not a diagnostic or clinical tool.</li>
          </ul>
        </section>
        <section className="text-xs text-ink-400">
          Built with React, Three.js, React Three Fiber, Drei, three-mesh-bvh, meshoptimizer and Workbox. Fonts: Inter and Space Grotesk (SIL OFL), bundled locally.
        </section>
      </div>
    </Modal>
  );
}

export function PanelHost() {
  const panel = useViewer((s) => s.panel);
  const openPanel = useViewer((s) => s.openPanel);
  const finishFirstRun = useViewer((s) => s.finishFirstRun);
  if (panel === 'downloads') return <DownloadManager onClose={() => openPanel(null)} />;
  if (panel === 'about') return <About onClose={() => openPanel(null)} />;
  if (panel === 'firstRun') return <FirstRun onClose={finishFirstRun} />;
  return null;
}
