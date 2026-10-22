# Android app (Expo)

The Android app lives in [`mobile/`](../mobile). It is an Expo (SDK 58) app whose only screen is a full-screen `react-native-webview`. That WebView runs the same web app, built as one self-contained `index.html`, and it is **packaged inside the APK** together with all 22 model packs (30 MB). The app needs no network, no server and no downloads; it works offline from the first launch.

## How it fits together

| Piece | What it does |
|---|---|
| `npm run build:native` (repo root) | `vite build --mode native` → `dist-native/`. All JS/CSS and fonts are inlined into `index.html`, because module scripts cannot load from `file://`. There is no service worker. The model packs are copied next to it. `VITE_BUNDLED_ASSETS=true` (`.env.native`) switches the asset repository to "bundled" mode. |
| Bundled mode (`src/assets/repository.ts`) | Model bytes are read from the packaged files with `XMLHttpRequest`, because `fetch()` rejects `file://`. Each file's size, GLB header and SHA-256 are checked before use. The Downloads panel becomes "Offline models" with a verify button. |
| `mobile/plugins/withWebBundle.js` | Expo config plugin. During `expo prebuild` it copies `dist-native/` to `android/app/src/main/assets/web/` and limits native builds to arm64-v8a, armeabi-v7a and x86_64. Run as a script (`npm run sync-web`), it re-copies the web build without regenerating `android/`. |
| `mobile/App.tsx` | Loads `file:///android_asset/web/index.html` with `allowFileAccess` and `allowFileAccessFromFileURLs` enabled, and universal access left off. It also handles the parts below. |
| `src/features/nativeBridge.ts` | Back handling inside the page. The page closes the open dialog or sheet, the tour, the selection or the system view, and only then asks the shell to exit. |

What `mobile/App.tsx` handles besides loading the page:
- **Back:** the Android back button or gesture is forwarded to the page (see `nativeBridge.ts` in the table).
- **External links:** license and source links open in the system browser.
- **Renderer crash:** if Android kills the WebView's renderer process, the page reloads.
- **Splash screen:** stays up until the page has loaded.
- **Safe areas:** the content is inset around the status and navigation bars.

## Building the APK on Windows

Requirements (already set up on this PC):
- **JDK 17.** Microsoft Build of OpenJDK, unpacked to `C:\Users\pc\.jdks\jdk-17.0.20.1+1`.
- **Android SDK** at `%LOCALAPPDATA%\Android\Sdk`, with command-line tools, build tools and platform 35/36. Gradle installs the NDK and CMake on the first build.

First time only, generate the native project:

```bash
cd mobile && npx expo prebuild --platform android
```

Then, each time you want an APK (rebuilds the web bundle, copies it into `android/` and runs Gradle):

```bash
cd mobile && npm run apk
```

`npm run apk` needs `JAVA_HOME` to point at a JDK 17 (for example `C:\Users\pc\.jdks\jdk-17.0.20.1+1`). The steps it runs are `npm run build:native` in the repo root, `npm run sync-web` (copies `dist-native/` to `android/app/src/main/assets/web/`) and `gradlew.bat assembleRelease`.

The APK is written to `mobile/android/app/build/outputs/apk/release/app-release.apk`.

### Signing

The release APK is signed with the **debug keystore** that Expo's template generates. That is fine for installing on your own devices by side-loading, but **not for Google Play**. For Play, create your own upload key (see Expo's "Local app production" guide), configure `signingConfigs.release` in `android/app/build.gradle`, and build an `.aab` with `./gradlew.bat app:bundleRelease`. Keep that keystore safe; it can't be replaced.

### Installing on a phone

1. Copy `app-release.apk` to the phone, or run `adb install -r app-release.apk` with USB debugging on.
2. Allow "Install unknown apps" for the file manager or browser you open it with.
3. Open **Anatomy Explorer**. It works in airplane mode.

## Notes and limits

- The phone's Android System WebView (Chromium) does the rendering. WebGL 2 is required; it is available on Android 8+ devices with an up-to-date WebView.
- The Realistic muscular pack (2.3 M triangles) is heavy for low-end phones. Educational Mode is lighter.
- The APK contains React Native's native code for arm64-v8a, armeabi-v7a and x86_64 (emulators). 32-bit x86 is left out to keep the build smaller. The app's own logic is web code, identical on every ABI.

## Test results (2026-10-22)

- **Build:** `gradlew.bat assembleRelease` succeeded. The APK is 76.8 MB and signed with the debug key; `apksigner verify` passes. It targets SDK 36 and contains arm64-v8a, armeabi-v7a and x86_64 code, plus `assets/web/index.html` and all 22 `.glb` packs.
- **Packaged bundle from `file://` in Edge, network disabled:** the web app loads and every model pack is read from the package and passes its SHA-256 check (2.6 s to the first view). The "Offline models" panel reports the built-in packs. The native back event closes the selection first, then asks the shell to exit.
- **Android 15 emulator (System WebView 124), airplane mode:** the APK installs and launches, and the 3D body renders from the packaged models with the phone UI (system chips, tool rail, info sheet, tab bar) and labels.
  - The test PC has 8 GB of RAM and fell back to software rendering (SwiftShader), so Android's own System UI repeatedly froze ("isn't responding"). That prevented a full interactive pass on the emulator.
  - With the emulator's host-GPU mode the WebGL meshes did not draw, while the UI and labels did. The same bundle renders on this GPU in desktop Edge and under SwiftShader, so this appears to be an emulator GPU-translation issue. **Check on a real phone before relying on it.**

### Windows build gotchas found

- **SDK path:** `local.properties` must use forward slashes (`sdk.dir=C:/Users/...`). Backslashes are escape characters in that file.
- **Long paths:** React Native's C++ build produces object paths over 260 characters. Even with Windows long paths enabled, the ninja 1.10 bundled with CMake 3.22 fails. Install `cmake;3.31.6` (ninja 1.12.1) and add `cmake.dir=C:/Users/pc/AppData/Local/Android/Sdk/cmake/3.31.6` to `local.properties`.
- **sdkmanager package names:** `sdkmanager.bat` splits arguments on `;`, so quote package names: `'"system-images;android-35;google_apis;x86_64"'`.
