# Phase 1: inspection, plan and asset inventory

## Repository inspection (2026-10-22)

- `D:\Side Project\Full Body` was **empty**: no application, no dependencies and no anatomy models. Nothing had to be preserved.
- No local 3D anatomy assets existed, so every model had to be sourced externally under a license that permits download, storage and redistribution.

## Asset sourcing

| Candidate | Verdict |
|---|---|
| **BodyParts3D 3.0** (DBCLS, Japan), via the GitHub mirror `Kevin-Mattheus-Moerman/BodyParts3D` | **Used.** CC BY-SA 2.1 JP, so download, modification and redistribution are allowed with attribution and share-alike. It has 934 separate meshes (binary STL, millimetres), one per anatomical part, named by FMA ID with an English parts list. The mirror's git tree publishes a SHA-1 for every file, which lets downloads be verified. |
| Z-Anatomy (CC BY-SA 4.0) | Not used. It is distributed as a large Blender project; there is no ready per-structure web format to download and verify automatically. It would be a good future source for female anatomy and nerves. |
| Assets only visible in web viewers (Sketchfab etc.) | Not used. Being visible in a viewer does not make a model downloadable or redistributable. |

The app downloads nothing from third parties at runtime. A **build-time** step fetches the source data, and the app's own static host serves the converted packs. The in-app download manager then copies them into IndexedDB with integrity checks.

- `scripts/fetch-bodyparts3d.mjs` downloads all 934 STLs (1.32 GB) from a **pinned commit** (`f0eeb6e8…`). It checks each file against the git blob SHA-1 from the repository tree and retries failures. All 934 were downloaded and verified.
- `scripts/prepare-assets.mjs` does the following:
  1. Welds vertices.
  2. Decimates each mesh twice with meshoptimizer: Realistic about 16% of source triangles (capped per mesh), Educational about 2.5%.
  3. Re-orients the meshes (BodyParts3D Z-up mm → Y-up metres) and groups parts into structures with stable IDs.
  4. Writes one self-contained, quantized, meshopt-compressed GLB per system and mode, plus `src/data/anatomy-manifest.json` with sizes, SHA-256, bounding boxes and licensing.

## Asset inventory (generated)

**724 selectable structures** built from **934 source meshes**, in 22 GLB packs (11 systems × 2 modes). Realistic total: 25.6 MB and about 3.8 M triangles. Educational total: 4.8 MB and about 0.53 M triangles.

| System | Structures | Realistic pack | Educational pack | Notable gaps (information-only in the app) |
|---|---:|---:|---:|---|
| Skeletal | 160 | 3.7 MB | 0.8 MB | coccyx, auditory ossicles |
| Muscular | 376 | 15.5 MB | 2.8 MB | tongue, extra-ocular muscles |
| Nervous | 86 | 2.4 MB | 0.5 MB | spinal cord, all peripheral nerves |
| Cardiovascular | 50 | 1.2 MB | 0.2 MB | heart chambers as separate parts, aortic valve, limb vessels |
| Respiratory | 7 | 0.5 MB | 0.1 MB | nasal cavity, pharynx, most of the larynx |
| Digestive | 17 | 0.7 MB | 0.15 MB | tongue, salivary glands, bile ducts |
| Urinary | 6 | 0.08 MB | 0.02 MB | none |
| Reproductive | 12 | 0.1 MB | 0.03 MB | **all female structures** (the source body is male) |
| Endocrine | 4 (+5 shared) | 0.06 MB | 0.01 MB | thyroid and parathyroid glands |
| Lymphatic | 2 | 0.1 MB | 0.02 MB | lymph nodes and vessels, tonsils |
| Integumentary | 4 | 1.1 MB | 0.1 MB | skin layers, follicles, nails (skin is one surface mesh) |

Every structure exists in both modes because both are derived from the same source mesh. Educational Mode is a separate, simplified asset pack, not a material swap.

## Implementation plan

1. Foundation: Vite + React + TypeScript + Tailwind; feature folders (`assets/`, `viewer/`, `features/`, `ui/`, `data/`, `state/`).
2. Anatomy engine: GLB loading from local bytes, node name → structure ID, raycast selection (three-mesh-bvh), highlight, bounding-box camera focus, labels with leader lines and occlusion test, layer visibility, mode switch with context preservation, cutaway plane.
3. Offline: vite-plugin-pwa (Workbox) precaches the shell. The asset repository has IndexedDB as primary storage and Cache Storage as fallback. A downloader handles resume via Range, size/GLB-header/SHA-256 validation and read-back confirmation. The download manager UI and readiness status sit on top.
4. Content: per-structure educational entries (375 content keys), 50 information-only entries for unmodelled anatomy, system overviews with honest coverage notes, and three guided tours that reference only existing IDs.
5. QA: an automated Edge-driven test of the production build covers the online preparation, injected interruption and corruption, the fully offline session (server stopped and browser offline), a missing asset and a storage failure (`scripts/e2e-offline.mjs`).

## Addendum: female body (2026-10-22)

BodyParts3D only contains a male body, so a second source was added for the female option.

| Candidate | Verdict |
|---|---|
| **Human Reference Atlas, "3D Reference Organ Set for United, Female v1.5"** (HuBMAP, from the NLM Visible Human Female; DOI 10.48539/HBM352.BTSQ.586) | **Used.** CC BY 4.0. One GLB places every female reference organ in a shared body frame, organized by system. The frame is already in meters, +Y up, +Z anterior, +X body-left. |
| Z-Anatomy | Not used. It is a Blender project derived from the same male BodyParts3D data. |
| Commercial female models (TurboSquid, CGTrader…) | Not used. Paid or proprietary licenses don't allow redistribution. |

`scripts/prepare-female.mjs` turns the 1,073-node, 5.56 M-triangle source into **123 selectable structures**:

- **Packs:** Realistic 11.7 MB and Educational 2.4 MB, stored under `public/anatomy/female/`.
- **Splits:** heart chambers and valves, colon segments, paired organs and individual vertebrae are separate structures.
- **Exclusion:** the placenta is left out because the reference body is not pregnant and the model extends outside the skin.
- **Welding:** the source stores split vertices, so they are welded before decimation.

What the female body covers:

- **Organs and systems:** reproductive organs and ligaments, mammary glands, heart chambers and valves, lungs and airways, digestive tract from the duodenum to the rectum, liver, biliary tree and pancreas, kidneys, ureters and bladder, spleen, thymus, tonsils and one lymph node.
- **Nervous system and eyes:** brain halves, spinal cord and eyes.
- **Skeleton:** pelvis, vertebrae and leg bones with knees.

Not covered: skull, ribs, arms, feet, most muscles, stomach and esophagus.
