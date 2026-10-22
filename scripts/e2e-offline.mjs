// End-to-end and offline test of the production build in a real browser (Microsoft Edge or
// Chrome via playwright-core). Writes test-results/offline-test.json and screenshots.
//
//   npm run build && node scripts/e2e-offline.mjs
//
// Phase 1 (online): load the app, let the service worker cache the shell, download every asset
//   pack through the UI (one download is cut halfway by the server and must resume; one is
//   corrupted once and must be rejected), then verify every stored file against dist/.
// Phase 2 (offline): the server is stopped and the browser is set offline. The same profile is
//   reopened and every system is explored in both modes; selection, search, camera, labels,
//   layers, hide/show, cutaway, tours and info-only entries are exercised; every network request
//   is recorded. A missing asset is then simulated.
// Phase 3: storage failure (IndexedDB and Cache Storage writes refused) in a separate profile.
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const OUT = path.resolve('test-results');
const PROFILE = path.resolve('.e2e-profile');
const PROFILE_FAIL = path.resolve('.e2e-profile-storage-fail');
// A dedicated port so a running `npm run preview` (4173) does not interfere.
const PORT = process.env.E2E_PORT ?? '4180';
const URL_ = `http://localhost:${PORT}/`;
const CHANNEL = process.env.BROWSER_CHANNEL ?? 'msedge';
const manifest = JSON.parse(await readFile('src/data/anatomy-manifest.json', 'utf8'));
const SYSTEMS = manifest.systems;
const SHORT = { skeletal: 'Skeletal', muscular: 'Muscular', nervous: 'Nervous', cardiovascular: 'Cardiovascular', respiratory: 'Respiratory', digestive: 'Digestive', urinary: 'Urinary', reproductive: 'Reproductive', endocrine: 'Endocrine', lymphatic: 'Lymphatic', integumentary: 'Integumentary' };
const INTERRUPTED = '/anatomy/realistic/muscular.glb';
const CORRUPTED = '/anatomy/realistic/urinary.glb'; // not needed by the opening view, so only the bulk download fetches it

const report = { startedAt: new Date().toISOString(), browser: CHANNEL, results: [], network: {}, notes: [] };
let failures = 0;
function check(name, ok, detail = '') {
  report.results.push({ name, ok: !!ok, detail });
  if (!ok) failures++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? `  — ${detail}` : ''}`);
}

function startServer(extra = []) {
  return new Promise((resolve, reject) => {
    const proc = spawn(process.execPath, ['scripts/serve-dist.mjs', '--port', PORT, ...extra], { stdio: ['ignore', 'pipe', 'pipe'] });
    proc.log = [];
    proc.stdout.on('data', (d) => {
      for (const line of String(d).split('\n').filter(Boolean)) {
        proc.log.push(line);
        if (line.startsWith('serving')) resolve(proc);
      }
    });
    proc.stderr.on('data', (d) => process.stderr.write(d));
    proc.on('exit', (code) => code && reject(new Error(`server exited ${code}`)));
  });
}

const launch = (profile, extra = {}) => chromium.launchPersistentContext(profile, {
  channel: CHANNEL,
  headless: process.env.HEADED ? false : true,
  viewport: { width: 1440, height: 900 },
  args: ['--ignore-gpu-blocklist', '--enable-unsafe-swiftshader'],
  ...extra,
});

const state = (page) => page.evaluate(() => {
  const a = window.__anatomy;
  if (!a) return null;
  const v = a.viewer.getState();
  const three = a.three.get ? a.three.get() : a.three;
  return {
    system: v.system, mode: v.mode, selectedId: v.selectedId, infoId: v.infoId, labels: v.labels, hidden: [...v.hidden],
    cut: v.cut.axis, tour: v.tour, layers: v.layers,
    loads: a.loads.getState().loads,
    assets: Object.fromEntries(Object.entries(a.assets.getState().status).map(([k, s]) => [k, { state: s.state, error: s.error }])),
    camera: three.camera.position.toArray(),
    triangles: three.gl.info.render.triangles,
  };
});

async function waitForApp(page) {
  await page.waitForFunction(() => !!window.__anatomy, null, { timeout: 60000 });
}

/** Waits until every model the current view needs is loaded (or failed). */
async function waitForModels(page, timeout = 90000) {
  await page.waitForFunction(() => {
    const a = window.__anatomy;
    const loads = Object.values(a.loads.getState().loads);
    return loads.length > 0 && loads.every((l) => l.state !== 'loading');
  }, null, { timeout });
  await page.waitForTimeout(700);
}

async function clickSystem(page, system) {
  const label = system === 'all' ? 'Full body' : SHORT[system];
  await page.locator('aside nav button', { hasText: label }).first().click();
}

async function setMode(page, mode) {
  await page.getByRole('group', { name: 'Visualization mode' }).getByRole('button', { name: mode === 'realistic' ? 'Realistic' : 'Educational' }).click();
}

async function main() {
  await mkdir(OUT, { recursive: true });
  await rm(PROFILE, { recursive: true, force: true });
  await rm(PROFILE_FAIL, { recursive: true, force: true });

  // ---------------------------------------------------------------- Phase 1: online preparation
  let server = await startServer(['--interrupt', INTERRUPTED, '--corrupt', CORRUPTED]);
  let ctx = await launch(PROFILE);
  let page = ctx.pages()[0] ?? await ctx.newPage();
  page.on('pageerror', (e) => report.notes.push(`pageerror (online): ${e.message}`));
  await page.goto(URL_);
  await waitForApp(page);
  check('App starts online from the production build', true);

  await page.waitForFunction(() => navigator.serviceWorker?.controller || navigator.serviceWorker?.ready.then(() => true), null, { timeout: 30000 });
  // The first visit installs the service worker; reload so it controls the page.
  await page.waitForFunction(async () => {
    const names = await caches.keys();
    for (const n of names) if (n.includes('precache') && (await (await caches.open(n)).keys()).some((r) => r.url.endsWith('/index.html'))) return true;
    return false;
  }, null, { timeout: 60000 });
  await page.reload();
  await waitForApp(page);
  const controlled = await page.evaluate(() => !!navigator.serviceWorker.controller);
  check('Service worker installed and controlling the page', controlled);
  const precache = await page.evaluate(async () => {
    const out = [];
    for (const n of await caches.keys()) for (const r of await (await caches.open(n)).keys()) out.push(new URL(r.url).pathname);
    return out;
  });
  check('Application shell precached (index.html, JS, CSS, fonts, icons)', precache.includes('/index.html') && precache.some((p) => p.endsWith('.js')) && precache.some((p) => p.endsWith('.css')), `${precache.length} entries`);
  check('Model packs are not in the service-worker precache (handled by the download manager)', !precache.some((p) => p.endsWith('.glb')));

  // First-run dialog -> "Everything".
  const firstRun = page.getByRole('dialog', { name: 'Welcome to Anatomy Explorer' });
  check('First-run dialog explains offline use', await firstRun.isVisible() && (await firstRun.innerText()).includes('Works offline'));
  await firstRun.getByRole('button', { name: /Everything/ }).click();
  await firstRun.getByRole('button', { name: 'Start exploring' }).click();

  await page.waitForFunction(() => {
    const st = Object.values(window.__anatomy.assets.getState().status);
    return st.every((s) => ['stored', 'failed', 'storage-unavailable'].includes(s.state));
  }, null, { timeout: 600000 });
  let s = await state(page);
  const interruptedId = INTERRUPTED.replace('/anatomy/', '').replace('.glb', '');
  const corruptedId = CORRUPTED.replace('/anatomy/', '').replace('.glb', '');
  check('Interrupted download is reported as failed, not complete', s.assets[interruptedId].state === 'failed', s.assets[interruptedId].error);
  check('Corrupted download is rejected by the integrity check', s.assets[corruptedId].state === 'failed' && /SHA-256|checksum/i.test(s.assets[corruptedId].error ?? ''), s.assets[corruptedId].error);
  const partial = await page.evaluate(() => new Promise((res) => {
    const req = indexedDB.open('anatomy-explorer');
    req.onsuccess = () => {
      const g = req.result.transaction('partials').objectStore('partials').getAll();
      g.onsuccess = () => res(g.result.map((p) => ({ assetId: p.assetId, received: p.received })));
    };
  }));
  check('Partial bytes of the interrupted download were kept for resuming', partial.some((p) => p.assetId === interruptedId && p.received > 0), JSON.stringify(partial));
  const storedBefore = Object.values(s.assets).filter((a) => a.state === 'stored').length;
  check('A pack with failed files is not reported complete', storedBefore === manifest.assets.length - 2, `${storedBefore}/${manifest.assets.length} stored`);

  // Retry through the download manager.
  await page.locator('aside nav').getByRole('button', { name: 'Downloads' }).first().click();
  const dm = page.getByRole('dialog', { name: 'Offline assets' });
  await dm.getByRole('button', { name: 'Retry failed' }).click();
  try {
    await page.waitForFunction(() => Object.values(window.__anatomy.assets.getState().status).every((s) => s.state === 'stored'), null, { timeout: 300000 });
  } catch (err) {
    const st = await state(page);
    console.error('Retry did not finish. Not stored:', JSON.stringify(Object.entries(st.assets).filter(([, a]) => a.state !== 'stored')));
    console.error(server.log.filter((l) => l.includes('.glb')).slice(-10).join(' | '));
    await page.screenshot({ path: path.join(OUT, 'debug-retry.png') });
    throw err;
  }
  const rangeLine = server.log.find((l) => l.includes(INTERRUPTED) && l.includes('range='));
  check('Retry resumed the interrupted download with an HTTP Range request', !!rangeLine, rangeLine ?? 'no range request seen');
  check('All asset packs stored after retry', true, `${manifest.assets.length}/${manifest.assets.length}`);
  await page.screenshot({ path: path.join(OUT, '01-download-manager-complete.png') });

  // Verify every stored file byte-for-byte against the build output.
  const stored = await page.evaluate(() => new Promise((res) => {
    const req = indexedDB.open('anatomy-explorer');
    req.onsuccess = () => {
      const tx = req.result.transaction(['assetData', 'assetMeta']);
      const d = tx.objectStore('assetData').getAll();
      const m = tx.objectStore('assetMeta').getAll();
      tx.oncomplete = async () => {
        const out = [];
        for (const row of d.result) {
          const digest = await crypto.subtle.digest('SHA-256', row.data);
          const hex = [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
          const meta = m.result.find((x) => x.assetId === row.assetId);
          out.push({ id: row.assetId, sha256: hex, bytes: row.data.byteLength, meta });
        }
        res(out);
      };
    };
  }));
  let allMatch = stored.length === manifest.assets.length;
  for (const a of manifest.assets) {
    const local = stored.find((x) => x.id === a.id);
    const disk = createHash('sha256').update(await readFile(path.join('dist', a.url))).digest('hex');
    if (!local || local.sha256 !== disk || local.sha256 !== a.sha256 || local.meta?.integrity !== 'sha256') allMatch = false;
  }
  check('Every stored asset matches dist/ and the manifest SHA-256', allMatch, `${stored.length} files in IndexedDB, ${(stored.reduce((n, x) => n + x.bytes, 0) / 1e6).toFixed(1)} MB`);
  const persisted = await page.evaluate(() => navigator.storage.persisted());
  report.notes.push(`navigator.storage.persisted() in the test browser: ${persisted}`);

  await ctx.close();
  server.kill();
  await new Promise((r) => setTimeout(r, 500));
  const serverDown = await fetch(URL_).then(() => false, () => true);
  check('Server stopped before the offline phase', serverDown);

  // ---------------------------------------------------------------- Phase 2: offline
  ctx = await launch(PROFILE, { offline: true });
  page = ctx.pages()[0] ?? await ctx.newPage();
  const requests = [];
  const failed = [];
  page.on('requestfinished', async (r) => {
    const resp = await r.response();
    requests.push({ url: r.url(), fromSW: resp?.fromServiceWorker() ?? false, status: resp?.status() });
  });
  page.on('requestfailed', (r) => failed.push({ url: r.url(), error: r.failure()?.errorText }));
  page.on('pageerror', (e) => report.notes.push(`pageerror (offline): ${e.message}`));
  await page.goto(URL_);
  await waitForApp(page);
  check('Installed app shell reopens with the network disabled and no server', true);
  const onLine = await page.evaluate(() => navigator.onLine);
  check('Browser reports offline', onLine === false);
  check('UI shows offline status', (await page.locator('aside nav').innerText()).includes('Offline'));

  for (const mode of ['educational', 'realistic']) {
    await setMode(page, mode);
    for (const sys of SYSTEMS) {
      await clickSystem(page, sys);
      await waitForModels(page);
      s = await state(page);
      const errors = Object.entries(s.loads).filter(([, l]) => l.state === 'error');
      check(`Offline ${mode}: ${sys} loads from local storage`, errors.length === 0 && s.triangles > 0, errors.length ? JSON.stringify(errors) : `${s.triangles} triangles drawn`);
    }
    await clickSystem(page, 'cardiovascular');
    await waitForModels(page);
    await page.screenshot({ path: path.join(OUT, `02-offline-${mode}-cardiovascular.png`) });
  }

  // Full body, educational: select by clicking the actual mesh under the pointer.
  await setMode(page, 'educational');
  await clickSystem(page, 'all');
  await waitForModels(page);
  await page.waitForTimeout(1500);
  const target = await page.evaluate(() => {
    const a = window.__anatomy;
    const three = a.three.get ? a.three.get() : a.three;
    const rect = three.gl.domElement.getBoundingClientRect();
    // Femur centre in the viewer frame (from the manifest bounding box), projected to the screen.
    const v = three.camera.position.clone().set(0.088, 0.637, -0.018).project(three.camera);
    return { x: rect.x + (v.x * 0.5 + 0.5) * rect.width, y: rect.y + (-v.y * 0.5 + 0.5) * rect.height };
  });
  await page.mouse.move(target.x, target.y);
  await page.waitForTimeout(400);
  await page.mouse.click(target.x, target.y);
  await page.waitForTimeout(1500);
  s = await state(page);
  check('Clicking a mesh selects the structure under the pointer (raycast)', s.selectedId === 'femur-left', `selected: ${s.selectedId}`);
  const panelTitle = await page.locator('aside[aria-label="Information panel"] h2').first().innerText();
  check('Information panel matches the selection', panelTitle === 'Left femur', panelTitle);
  const labelText = await page.locator('button[data-selected="true"]').first().innerText().catch(() => '');
  check('Selected structure has a label (not colour-only feedback)', labelText.includes('Left femur'), labelText);

  // Mode switch preserves the selection.
  await setMode(page, 'realistic');
  await waitForModels(page);
  s = await state(page);
  check('Switching mode keeps the selected structure', s.selectedId === 'femur-left' && s.mode === 'realistic');
  await page.screenshot({ path: path.join(OUT, '03-offline-realistic-femur-selected.png') });

  // Search.
  const search = page.getByRole('textbox', { name: /Search anatomy/ });
  await search.fill('heart');
  await search.press('Enter');
  await page.waitForTimeout(2500);
  s = await state(page);
  check('Search "heart" selects and focuses the heart', s.selectedId === 'heart', `selected: ${s.selectedId}`);
  await page.screenshot({ path: path.join(OUT, '04-offline-search-heart.png') });
  await search.fill('thyroid gland');
  await search.press('Enter');
  await page.waitForTimeout(500);
  s = await state(page);
  const infoText = await page.locator('aside[aria-label="Information panel"]').innerText();
  check('Info-only result is shown and clearly marked as having no 3D model', s.infoId === 'thyroid-gland' && infoText.includes('Information only'), s.infoId);
  await search.fill('');

  // Camera controls.
  await page.getByRole('button', { name: 'Reset to full-body view' }).click();
  await page.waitForTimeout(1500);
  const d0 = Math.hypot(...(await state(page)).camera);
  await page.getByRole('button', { name: 'Zoom in' }).click();
  await page.waitForTimeout(1200);
  const d1 = Math.hypot(...(await state(page)).camera);
  await page.getByRole('button', { name: 'Zoom out' }).click();
  await page.getByRole('button', { name: 'Zoom out' }).click();
  await page.waitForTimeout(1200);
  const d2 = Math.hypot(...(await state(page)).camera);
  check('Zoom in and zoom out move the camera', d1 < d0 && d2 > d1, `${d0.toFixed(2)} -> ${d1.toFixed(2)} -> ${d2.toFixed(2)}`);
  const box = await page.locator('canvas').boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width / 2 + 200, box.y + box.height / 2, { steps: 10 });
  await page.mouse.up();
  await page.waitForTimeout(800);
  const rotated = (await state(page)).camera;
  check('Dragging rotates the camera', Math.abs(rotated[0]) > 0.3, `camera x = ${rotated[0].toFixed(2)}`);
  await page.getByRole('button', { name: 'Reset to full-body view' }).click();
  await page.waitForTimeout(1500);
  const home = (await state(page)).camera;
  check('Reset returns to the full-body view', Math.abs(home[0]) < 0.01 && Math.abs(home[2] - 3.4) < 0.05, home.map((x) => x.toFixed(2)).join(', '));

  // Labels.
  const visibleLabels = () => page.locator('button[data-slot]:visible').count();
  const withLabels = await visibleLabels();
  await page.getByRole('button', { name: 'Hide labels' }).click();
  await page.waitForTimeout(600);
  const withoutLabels = await visibleLabels();
  await page.getByRole('button', { name: 'Show labels' }).click();
  check('Label toggle shows and hides labels', withLabels > 0 && withoutLabels === 0, `${withLabels} -> ${withoutLabels}`);

  // Layers: skin on, then preset, then restore.
  await page.getByRole('button', { name: 'Layers', exact: true }).click();
  const layerPanel = page.getByRole('dialog', { name: 'Layers' });
  await layerPanel.getByRole('button', { name: 'Body surface' }).click();
  await waitForModels(page);
  s = await state(page);
  check('Layer preset "Body surface" shows only the skin layer', s.layers.skin && !s.layers.skeleton && s.triangles > 0);
  await page.screenshot({ path: path.join(OUT, '05-offline-layer-skin.png') });
  await layerPanel.getByRole('button', { name: 'Deep muscles' }).click();
  await waitForModels(page);
  s = await state(page);
  check('Layer preset "Deep muscles" hides superficial muscles and skin', s.layers['muscles-deep'] && !s.layers['muscles-superficial'] && !s.layers.skin);
  await page.screenshot({ path: path.join(OUT, '06-offline-layer-deep-muscles.png') });
  await layerPanel.getByRole('button', { name: 'Restore all layers' }).click();
  await waitForModels(page);
  s = await state(page);
  check('Restore all layers turns every layer on', Object.values(s.layers).every(Boolean));
  await layerPanel.getByRole('button', { name: 'Close layers' }).click();

  // Hide / show selected.
  await page.evaluate(() => window.__anatomy.viewer.getState().select('liver'));
  await page.getByRole('button', { name: /^Hide Liver/ }).click();
  s = await state(page);
  check('Hide selected structure', s.hidden.includes('liver') && s.selectedId === null);
  await page.getByRole('button', { name: /Show hidden structures/ }).click();
  s = await state(page);
  check('Show hidden structures restores it', s.hidden.length === 0);

  // Cutaway.
  await page.getByRole('button', { name: 'Cutaway' }).click();
  await page.getByRole('dialog', { name: 'Cutaway' }).getByRole('button', { name: 'Sagittal' }).click();
  await page.waitForTimeout(800);
  s = await state(page);
  check('Cutaway plane can be enabled', s.cut === 'sagittal');
  await page.screenshot({ path: path.join(OUT, '07-offline-cutaway.png') });
  await page.getByRole('dialog', { name: 'Cutaway' }).getByRole('button', { name: 'Off' }).click();
  await page.getByRole('button', { name: 'Close cutaway' }).click();

  // Guided tour.
  await page.evaluate(() => window.__anatomy.viewer.getState().select(null));
  await clickSystem(page, 'all');
  await page.getByRole('button', { name: /The heart and great vessels/ }).click();
  await page.getByRole('region', { name: 'Guided exploration' }).getByRole('button', { name: 'Next' }).click();
  await page.waitForTimeout(1500);
  s = await state(page);
  check('Guided tour advances and selects real structures', s.tour?.step === 1 && s.selectedId === 'heart', `step ${s.tour?.step}, selected ${s.selectedId}`);
  await page.getByRole('button', { name: 'Exit guided exploration' }).click();

  // Mobile layout: system chips, search sheet, info sheet and tab bar.
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(OUT, '08-offline-mobile.png') });
  await page.getByRole('navigation', { name: 'Organ systems' }).getByRole('button', { name: 'Digestive' }).click();
  await waitForModels(page);
  s = await state(page);
  check('Mobile: system chips switch system in one tap', s.system === 'digestive');
  await page.getByRole('navigation', { name: 'App sections' }).getByRole('button', { name: 'Search' }).click();
  const mobileSearch = page.getByRole('region', { name: 'Search' }).getByRole('textbox', { name: /Search anatomy/ });
  await mobileSearch.fill('stomach');
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(OUT, '09-offline-mobile-search.png') });
  await page.getByRole('region', { name: 'Search' }).getByRole('listbox', { name: 'Search results' }).getByRole('button').first().click();
  await page.waitForTimeout(1500);
  s = await state(page);
  const sheet = page.getByRole('region', { name: 'Information' });
  check('Mobile: search sheet selects the result and closes', s.selectedId === 'stomach' && !(await page.getByRole('region', { name: 'Search' }).isVisible()));
  check('Mobile: info sheet shows the selected structure', (await sheet.innerText()).includes('Stomach'));
  await sheet.getByRole('button', { name: 'Details' }).click();
  await page.waitForTimeout(600);
  check('Mobile: info sheet expands to show details', (await sheet.innerText()).includes('Primary functions'.toUpperCase()) || (await sheet.innerText()).toLowerCase().includes('primary functions'));
  await page.screenshot({ path: path.join(OUT, '10-offline-mobile-sheet.png') });
  await page.getByRole('navigation', { name: 'App sections' }).getByRole('button', { name: 'Layers' }).click();
  check('Mobile: layers sheet opens from the tab bar', await page.getByRole('region', { name: 'Layers and cutaway' }).isVisible());
  await page.screenshot({ path: path.join(OUT, '10b-offline-mobile-layers.png') });
  await page.getByRole('button', { name: 'Close Layers & cutaway' }).click();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.evaluate(() => window.__anatomy.viewer.getState().setSystem('all'));

  // Network audit for the whole offline session.
  const network = requests.filter((r) => !r.url.startsWith('blob:') && !r.url.startsWith('data:'));
  const notFromSW = network.filter((r) => !r.fromSW);
  report.network = { requests: network.length, servedByServiceWorker: network.filter((r) => r.fromSW).length, notFromServiceWorker: notFromSW, failed };
  check('Offline session: every HTTP request was served by the service worker', notFromSW.length === 0, `${network.length} requests`);
  check('Offline session: no failed requests', failed.length === 0, failed.map((f) => `${f.url} (${f.error})`).join('; '));

  // Missing asset while offline: delete one stored pack and open it.
  await page.evaluate(() => new Promise((res) => {
    const req = indexedDB.open('anatomy-explorer');
    req.onsuccess = () => {
      const tx = req.result.transaction(['assetData', 'assetMeta'], 'readwrite');
      tx.objectStore('assetData').delete('realistic/lymphatic');
      tx.objectStore('assetMeta').delete('realistic/lymphatic');
      tx.oncomplete = () => res();
    };
  }));
  await page.reload();
  await waitForApp(page);
  await setMode(page, 'realistic');
  await clickSystem(page, 'lymphatic');
  await waitForModels(page);
  s = await state(page);
  const msg = await page.locator('main').innerText();
  check('Missing asset offline: clear message, no crash', s.loads['realistic/lymphatic']?.state === 'error' && msg.includes('has not been downloaded'), s.loads['realistic/lymphatic']?.message);
  await page.screenshot({ path: path.join(OUT, '11-offline-missing-asset.png') });
  await setMode(page, 'educational');
  await waitForModels(page);
  s = await state(page);
  check('After a missing asset, the other mode still works', s.loads['educational/lymphatic']?.state === 'ready');
  await ctx.close();

  // ---------------------------------------------------------------- Phase 3: storage failure
  server = await startServer();
  ctx = await launch(PROFILE_FAIL);
  await ctx.addInitScript(() => {
    const quota = () => { throw new DOMException('Simulated: storage quota exceeded', 'QuotaExceededError'); };
    IDBObjectStore.prototype.put = quota;
    CacheStorage.prototype.open = () => Promise.reject(new DOMException('Simulated: Cache Storage unavailable', 'SecurityError'));
  });
  page = ctx.pages()[0] ?? await ctx.newPage();
  await page.goto(URL_);
  await waitForApp(page);
  await page.getByRole('dialog', { name: 'Welcome to Anatomy Explorer' }).getByRole('button', { name: 'Start exploring' }).click();
  await page.waitForFunction(() => Object.values(window.__anatomy.assets.getState().status).some((s) => s.state === 'storage-unavailable'), null, { timeout: 120000 });
  s = await state(page);
  const unavailable = Object.entries(s.assets).filter(([, a]) => a.state === 'storage-unavailable');
  check('Storage failure is reported per asset and nothing is marked stored', unavailable.length > 0 && !Object.values(s.assets).some((a) => a.state === 'stored'), unavailable[0]?.[1].error);
  await waitForModels(page);
  s = await state(page);
  check('With storage refused, models still display for the session', s.triangles > 0);
  await page.screenshot({ path: path.join(OUT, '12-storage-failure.png') });
  await ctx.close();
  server.kill();

  report.finishedAt = new Date().toISOString();
  report.summary = { passed: report.results.filter((r) => r.ok).length, failed: failures };
  await writeFile(path.join(OUT, 'offline-test.json'), JSON.stringify(report, null, 2));
  console.log(`\n${report.summary.passed} passed, ${failures} failed. Report: test-results/offline-test.json`);
  process.exit(failures ? 1 : 0);
}

main().catch(async (err) => {
  console.error(err);
  report.error = String(err?.stack ?? err);
  await writeFile(path.join(OUT, 'offline-test.json'), JSON.stringify(report, null, 2)).catch(() => {});
  process.exit(2);
});
