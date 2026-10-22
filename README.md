# Anatomy Explorer: Interactive 3D Human Anatomy

An offline-first web application (installable PWA) for exploring human anatomy in 3D. It uses real anatomical geometry from the BodyParts3D research dataset and offers two visualization modes, 724 selectable structures across all 11 organ systems, structured educational content, search, guided tours and layer-by-layer exploration. It has no backend: after installation and asset download it runs fully offline.

> Educational use only. This is not a diagnostic or clinical tool.

## Features

- **Real 3D anatomy.** 934 BodyParts3D meshes of one adult male body are grouped into 724 selectable structures. Selection uses BVH-accelerated raycasting against the actual meshes. No invisible hitboxes are used.
- **Two visualization modes.** Both share structure IDs, selection, search and content:
  - **Realistic Mode:** higher-detail meshes (about 16% of source triangles), physically based tissue materials, studio lighting generated locally.
  - **Educational Mode:** a separate, heavily simplified asset pack (about 2.5% of source triangles), toon shading, a color family per organ system with per-structure variation, and more labels.
  - **Mode switching:** keeps the system, selection, layers and camera, and fades the new model in. If a structure ever lacks a model in the target mode, the app explains this and offers to switch back.
- **Navigation.** Full body plus the 11 organ systems. Each system has an overview, an honest "what is modelled" note, a keyboard-accessible structure list, its own view (with an optional faint skeleton for orientation) and offline status per mode.
- **Camera.** Drag to rotate, scroll or pinch to zoom, right-drag or two-finger to pan. Transitions are smooth, zoom is limited, and the camera fits the selected structure from its bounding box. Reset to the full body with the button or `R`.
- **Selection feedback.** Hover highlight with a tooltip, a distinct selection highlight, a "fade surroundings" option, and a selected label marked with ● plus a status line, so selection is not shown by color alone.
- **Labels.** Labels have leader lines and a two-column layout to avoid overlap. Which labels appear depends on zoom (smaller structures appear as you zoom in), and an occlusion test ensures only visible structures are labelled. A global toggle turns them off.
- **Layers.** Toggles for skin, superficial muscles, deep muscles, skeleton, organs, heart and vessels, and brain and nerves. Presets cover common views ("Organs (rib cage hidden)", …), and "Restore all" resets everything. Individual structures can be hidden and restored.
- **Cutaway and see-through.** A sagittal, coronal or transverse clipping plane cuts the real meshes. A see-through slider affects skin and superficial muscle; it is labelled as transparency, not dissection.
- **Education.**
  - Every structure has an entry with anatomical and common name, system, location, functions, components, how it works, facts and links to related structures (375 entries in total).
  - 50 information-only entries cover anatomy that is not modelled (spinal cord, peripheral nerves, thyroid gland, female reproductive organs, skin layers, heart chambers…). They are clearly marked and link to related modelled structures.
- **Search.** Matches anatomical names, common names, aliases (e.g. "lats", "Achilles tendon") and source part names, optionally within the current system. Results are badged **3D** or **Info only**.
- **Guided exploration.** Three tours ("The heart and great vessels", "The path of food", "Peeling back the layers") with next, previous and exit controls.
- **Offline-first.**
  - The service worker precaches the shell.
  - Models are stored in IndexedDB, with Cache Storage as a fallback.
  - Downloads are resumable (HTTP Range) and verified (size, GLB header, SHA-256, read-back) before they are marked stored.
  - The download manager covers per-system, per-mode, all-pack, retry, verify and remove actions.
  - Readiness shows installed, shell cached, partial or full assets, and whether both modes are available.
  - The app requests persistent storage.
- **Responsive.** Desktop uses a three-column layout. Mobile has a collapsible navigation drawer, a bottom sheet for information and touch controls.

## Tech stack

React 19, TypeScript, Vite, Tailwind CSS 4, Three.js, React Three Fiber, Drei (CameraControls, local Lightformer environment), three-mesh-bvh, Lucide, zustand, idb, vite-plugin-pwa (Workbox). Build tooling: glTF-Transform and meshoptimizer for the asset pipeline, and playwright-core for automated testing with the system's Edge or Chrome. Fonts (Inter, Space Grotesk) are bundled locally.

There is no backend, no remote API and no account system. Node.js is used only for development, asset preparation and building.

## Getting started

```bash
npm install
```

```bash
npm run dev
```

The repository already contains the generated model packs (`public/anatomy/`) and manifest (`src/data/anatomy-manifest.json`), so this is enough to run the app. In dev mode there is no service worker; offline features need the production build.

### Rebuilding the anatomy assets from source (optional)

```bash
npm run fetch-assets
```

```bash
npm run prepare-assets
```

`fetch-assets` downloads the 934 BodyParts3D STL files (1.32 GB) from a pinned commit of the GitHub mirror into `.asset-cache/` and checks each file against its git blob SHA-1. `prepare-assets` (about 1 minute) regenerates the GLB packs and the manifest. The grouping and classification rules are in `scripts/anatomy-rules.mjs`.

## Offline installation and asset preparation

1. Build and serve the production version. Any static host works, as long as it serves `dist/` over HTTPS or on `localhost` and supports HTTP Range requests for resumable downloads:

   ```bash
   npm run build
   ```

   ```bash
   npm run preview
   ```

2. Open the app online. The service worker installs and caches the application shell, which includes all educational text, the manifest, fonts and icons.
3. Optional: install it with the browser's **Install app** option (Edge or Chrome address bar, or "Add to Home Screen" on mobile).
4. In the first-run dialog or **Downloads**, choose **Everything** (30.3 MB), or the Educational (4.8 MB) or Realistic (25.6 MB) pack, or individual systems. Wait until every row shows **Available offline**. Systems you open while online are also downloaded automatically.
5. Press **Request persistent storage** in Downloads. Browsers may still evict site data under storage pressure; **Verify all stored** re-hashes every stored pack.
6. The app now works without a network connection. Anything not downloaded is reported by name when you try to open it offline.

A desktop package (Tauri or Electron) was evaluated but not built. The PWA already starts offline, and its files are small (about 33 MB including everything), so a native wrapper would mainly add value by bundling the models in an installer. See *Next steps*.

## Testing

```bash
npm run build
```

```bash
npm run test:offline
```

`scripts/e2e-offline.mjs` drives the installed Microsoft Edge (set `BROWSER_CHANNEL=chrome` to use Chrome) against the production build served by `scripts/serve-dist.mjs`, a static server with Range support and fault injection. It writes `test-results/offline-test.json` and screenshots. See [docs/TEST-RESULTS.md](docs/TEST-RESULTS.md) for the latest run.

## Architecture

```
scripts/                  asset pipeline, icon renderer, test server, e2e test
public/anatomy/           generated GLB packs: realistic/<system>.glb, educational/<system>.glb (+ LICENSE.txt)
src/
  types.ts                shared types (Structure, AssetEntry, ContentEntry, …)
  data/
    anatomy-manifest.json generated: structures (stable IDs, parts, bounding boxes), assets (size, SHA-256), licensing
    manifest.ts           typed access to the manifest
    systems.ts            11 system overviews + honest coverage notes
    content/              educational text (independent of rendering) + information-only entries
    tours.ts              guided exploration
  assets/
    backends.ts           IndexedDB and Cache Storage backends; partial-download store
    downloader.ts         resumable download + validation (size, GLB header, SHA-256)
    repository.ts         single entry point for asset bytes; download manager actions and statuses
  viewer/
    AnatomyCanvas.tsx     R3F canvas, lighting, camera rig (focus, zoom, reset)
    AssetModel.tsx        per-pack model: materials, visibility, highlight, picking
    modelCache.ts         GLB parsing from local bytes, LRU + GPU disposal, BVH building, no external URIs
    labels.tsx            labels with leader lines, overlap avoidance, occlusion test
    visibility.ts         system, layer and hidden rules; which packs are needed
    materials.ts          realistic (PBR) and educational (toon) materials
    cutPlane.ts           clipping plane
  features/               search, navigation (go to structure, tours), offline status / service worker
  state/                  zustand store; small preferences in localStorage
  ui/                     sidebar, info panel, toolbar and layer/cut panels, overlays, modals
```

Storage roles:

- **Cache Storage (Workbox precache):** the application shell.
- **IndexedDB:** model packs, partial downloads and stored-asset metadata.
- **Cache Storage `anatomy-assets-v1`:** fallback storage for model packs.
- **localStorage:** small preferences only (mode, system, labels, layers, first-run flag).

## Sources, licenses and attribution

- **3D models:** BodyParts3D, © The Database Center for Life Science, licensed under CC Attribution-Share Alike 2.1 Japan (<https://creativecommons.org/licenses/by-sa/2.1/jp/deed.en>).
  - Source data: BodyParts3D 3.0 (2011-09-15), via <https://github.com/Kevin-Mattheus-Moerman/BodyParts3D> at commit `f0eeb6e843380cfe6b83797cf8c3e1af74de5e61`.
  - Citation: Mitsuhashi N. et al., *BodyParts3D: 3D structure database for anatomical concepts*, Nucleic Acids Res. 2009;37:D782-5, doi:10.1093/nar/gkn613.
  - The derived GLB files in `public/anatomy/` are modified (converted, decimated, re-oriented, grouped, compressed) and are distributed under the same license. The attribution is shown in the app under **Sources**.
- **Educational text:** written for this project from standard anatomy knowledge. It has not been reviewed by a medical professional; see *Known limitations*.
- **Fonts:** Inter and Space Grotesk (SIL Open Font License), bundled via Fontsource.
- **Code dependencies:** see `package.json`. All are MIT or similarly permissive.

## Known limitations

- **One body.** A single adult male body: female reproductive anatomy is not modelled (information only), and anatomical variation is not represented.
- **Gaps in the source dataset.** The spinal cord (only its central canal), peripheral nerves, lymph nodes and vessels, thyroid and parathyroid glands, nasal cavity, pharynx, tongue, skin layers and nails are missing. The heart is one wall mesh, so its chambers are not separately selectable. All of these are labelled as information-only.
- **No textures.** BodyParts3D has no textures, so Realistic Mode relies on materials and lighting. The skin is one surface and cannot be peeled into layers.
- **Hollow cuts.** The meshes are surfaces, so cut organs appear hollow in the cutaway view.
- **Not professionally reviewed.** Educational text has been checked for consistency but not by a clinician or anatomist.
- **Performance.** The Realistic muscular pack (2.3 M triangles) is heavy on low-end GPUs and phones; Educational Mode is the lighter option.

## Next steps

1. Professional review of the educational content.
2. Add the missing systems' geometry from Z-Anatomy (CC BY-SA 4.0): spinal cord, peripheral nerves, lymph nodes, thyroid, and female anatomy.
3. Split the heart into chambers (manual segmentation) and add the aortic valve.
4. Optional Tauri desktop package with the model packs bundled in the installer.
5. Level-of-detail switching for the muscular pack on mobile GPUs.
