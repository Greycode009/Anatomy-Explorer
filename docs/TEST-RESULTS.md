# Test results

This is the automated end-to-end and offline test of the **production build** (`scripts/e2e-offline.mjs`). It ran in **Microsoft Edge** (installed system browser, driven by playwright-core, headless) on Windows 11 with an Intel UHD GPU.

- Run: 2026-10-22T09:55:26.868Z → 2026-10-22T09:57:31.375Z
- Result: **66 passed, 0 failed**
- Raw report: `test-results/offline-test.json`. Screenshots: `test-results/*.png`. Neither is committed; running `npm run test:offline` regenerates both.

## How the offline test works

1. **Online preparation.** The test serves `dist/` with `scripts/serve-dist.mjs`. It opens the app, waits for the service worker to cache the shell and reloads so the service worker controls the page. It then clicks **Everything** in the first-run dialog. The server cuts `realistic/muscular.glb` halfway on its first request and flips one byte of `realistic/urinary.glb` on its first request. The test retries through **Downloads → Retry failed** and finally re-hashes every file stored in IndexedDB against `dist/` and the manifest.
2. **Close everything.** The browser is closed, the **server process is killed** (the test confirms a request to it fails) and the browser profile is reopened with **networking disabled** (`offline: true`, so `navigator.onLine === false`).
3. **Offline session.** The test opens all 11 systems in both modes. It then exercises:
   - selection by clicking an actual mesh
   - mode switching with the selection kept
   - search, including an information-only result
   - zoom, rotate (drag) and reset
   - the label toggle, layer presets and restore
   - hiding and showing a structure
   - cutaway and a guided tour
   - the phone layout: system chips, search sheet, info sheet, layers sheet

   Every HTTP request is recorded.
4. **Missing asset.** One stored pack is deleted while offline and then opened.
5. **Storage failure.** A separate profile has IndexedDB writes and Cache Storage refused.

## Network audit (offline session)

- HTTP requests: 8, all served by the service worker (8). Requests not served by the service worker: 0. Failed requests: 0.
- Model bytes come from IndexedDB and are parsed in memory. The GLB loader blocks any external URI by design.

## Results

| Result | Check | Detail |
|---|---|---|
| ✅ pass | App starts online from the production build |  |
| ✅ pass | Service worker installed and controlling the page |  |
| ✅ pass | Application shell precached (index.html, JS, CSS, fonts, icons) | 20 entries |
| ✅ pass | Model packs are not in the service-worker precache (handled by the download manager) |  |
| ✅ pass | First-run dialog explains offline use |  |
| ✅ pass | Interrupted download is reported as failed, not complete | Connection interrupted after 4194304 bytes; it will resume on retry. |
| ✅ pass | Corrupted download is rejected by the integrity check | SHA-256 checksum mismatch; the file is corrupted or was changed. |
| ✅ pass | Partial bytes of the interrupted download were kept for resuming | [{"assetId":"realistic/muscular","received":4194304}] |
| ✅ pass | A pack with failed files is not reported complete | 20/22 stored |
| ✅ pass | Retry resumed the interrupted download with an HTTP Range request | GET /anatomy/realistic/muscular.glb range=4194304- |
| ✅ pass | All asset packs stored after retry | 22/22 |
| ✅ pass | Every stored asset matches dist/ and the manifest SHA-256 | 22 files in IndexedDB, 30.4 MB |
| ✅ pass | Server stopped before the offline phase |  |
| ✅ pass | Installed app shell reopens with the network disabled and no server |  |
| ✅ pass | Browser reports offline |  |
| ✅ pass | UI shows offline status |  |
| ✅ pass | Offline educational: skeletal loads from local storage | 74610 triangles drawn |
| ✅ pass | Offline educational: muscular loads from local storage | 410420 triangles drawn |
| ✅ pass | Offline educational: nervous loads from local storage | 124310 triangles drawn |
| ✅ pass | Offline educational: cardiovascular loads from local storage | 94944 triangles drawn |
| ✅ pass | Offline educational: respiratory loads from local storage | 86010 triangles drawn |
| ✅ pass | Offline educational: digestive loads from local storage | 89202 triangles drawn |
| ✅ pass | Offline educational: urinary loads from local storage | 75944 triangles drawn |
| ✅ pass | Offline educational: reproductive loads from local storage | 76490 triangles drawn |
| ✅ pass | Offline educational: endocrine loads from local storage | 78670 triangles drawn |
| ✅ pass | Offline educational: lymphatic loads from local storage | 77104 triangles drawn |
| ✅ pass | Offline educational: integumentary loads from local storage | 91438 triangles drawn |
| ✅ pass | Offline realistic: skeletal loads from local storage | 524068 triangles drawn |
| ✅ pass | Offline realistic: muscular loads from local storage | 2879438 triangles drawn |
| ✅ pass | Offline realistic: nervous loads from local storage | 867586 triangles drawn |
| ✅ pass | Offline realistic: cardiovascular loads from local storage | 697802 triangles drawn |
| ✅ pass | Offline realistic: respiratory loads from local storage | 606764 triangles drawn |
| ✅ pass | Offline realistic: digestive loads from local storage | 629640 triangles drawn |
| ✅ pass | Offline realistic: urinary loads from local storage | 534192 triangles drawn |
| ✅ pass | Offline realistic: reproductive loads from local storage | 536392 triangles drawn |
| ✅ pass | Offline realistic: endocrine loads from local storage | 549570 triangles drawn |
| ✅ pass | Offline realistic: lymphatic loads from local storage | 540932 triangles drawn |
| ✅ pass | Offline realistic: integumentary loads from local storage | 704344 triangles drawn |
| ✅ pass | Clicking a mesh selects the structure under the pointer (raycast) | selected: femur-left |
| ✅ pass | Information panel matches the selection | Left femur |
| ✅ pass | Selected structure has a label (not colour-only feedback) | ● Left femur |
| ✅ pass | Switching mode keeps the selected structure |  |
| ✅ pass | Search "heart" selects and focuses the heart | selected: heart |
| ✅ pass | Info-only result is shown and clearly marked as having no 3D model | thyroid-gland |
| ✅ pass | Zoom in and zoom out move the camera | 3.55 -> 2.63 -> 4.62 |
| ✅ pass | Dragging rotates the camera | camera x = -4.43 |
| ✅ pass | Reset returns to the full-body view | -0.01, 1.05, 3.40 |
| ✅ pass | Label toggle shows and hides labels | 5 -> 0 |
| ✅ pass | Layer preset "Body surface" shows only the skin layer |  |
| ✅ pass | Layer preset "Deep muscles" hides superficial muscles and skin |  |
| ✅ pass | Restore all layers turns every layer on |  |
| ✅ pass | Hide selected structure |  |
| ✅ pass | Show hidden structures restores it |  |
| ✅ pass | Cutaway plane can be enabled |  |
| ✅ pass | Guided tour advances and selects real structures | step 1, selected heart |
| ✅ pass | Mobile: system chips switch system in one tap |  |
| ✅ pass | Mobile: search sheet selects the result and closes |  |
| ✅ pass | Mobile: info sheet shows the selected structure |  |
| ✅ pass | Mobile: info sheet expands to show details |  |
| ✅ pass | Mobile: layers sheet opens from the tab bar |  |
| ✅ pass | Offline session: every HTTP request was served by the service worker | 8 requests |
| ✅ pass | Offline session: no failed requests |  |
| ✅ pass | Missing asset offline: clear message, no crash | The realistic lymphatic model pack has not been downloaded, and this device is offline. |
| ✅ pass | After a missing asset, the other mode still works |  |
| ✅ pass | Storage failure is reported per asset and nothing is marked stored | Could not store the asset locally (indexeddb: storage quota exceeded; cache-storage: Simulated: Cache Storage unavailable). |
| ✅ pass | With storage refused, models still display for the session |  |

## Notes and limits of this test

- **Install not tested at OS level.** `playwright` runs the app in a browser profile, not in an OS-installed PWA window. An installed PWA uses the same origin, service worker and storage, so the offline behaviour is the same, but the install prompt itself was not exercised. To check it manually, install from the Edge or Chrome address bar, close the window, disconnect the network and reopen the app from the Start menu.
- **Persistent storage.** navigator.storage.persisted() in the test browser: false. Persistence is requested from the Downloads panel; whether it is granted depends on the browser (for example engagement or installation).
- **Rendering speed.** Not measured as a pass/fail criterion. In the in-app browser pane on this machine, a full-body Realistic view with all muscles (about 2.9 M triangles) loaded and rendered, but it is heavy for integrated GPUs.
