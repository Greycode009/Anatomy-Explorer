// Expo config plugin: packages the offline web build (../dist-native, made by `npm run build:native`
// in the repository root) into the Android app as assets, so the WebView loads it from
// file:///android_asset/web/ with no network. Also limits the native CPU architectures built.
const fs = require('fs');
const path = require('path');
const { withDangerousMod, withGradleProperties } = require('expo/config-plugins');

/** Copies the web build into the Android project's assets (also usable without prebuild). */
function syncWebBundle(projectRoot, source = '../dist-native') {
  const src = path.resolve(projectRoot, source);
  if (!fs.existsSync(path.join(src, 'index.html'))) {
    throw new Error(`Web bundle not found at ${src}. Run "npm run build:native" in the repository root first.`);
  }
  const dest = path.join(projectRoot, 'android', 'app', 'src', 'main', 'assets', 'web');
  fs.rmSync(dest, { recursive: true, force: true });
  fs.mkdirSync(dest, { recursive: true });
  fs.cpSync(src, dest, { recursive: true });
  return dest;
}

function withWebBundle(config, { source = '../dist-native', architectures = 'arm64-v8a,armeabi-v7a,x86_64' } = {}) {
  config = withDangerousMod(config, [
    'android',
    async (cfg) => {
      syncWebBundle(cfg.modRequest.projectRoot, source);
      return cfg;
    },
  ]);
  return withGradleProperties(config, (cfg) => {
    const props = cfg.modResults.filter((p) => !(p.type === 'property' && p.key === 'reactNativeArchitectures'));
    props.push({ type: 'property', key: 'reactNativeArchitectures', value: architectures });
    cfg.modResults = props;
    return cfg;
  });
}

module.exports = withWebBundle;
module.exports.syncWebBundle = syncWebBundle;

// `node plugins/withWebBundle.js` re-copies the web build into an existing android/ project.
if (require.main === module) console.log(`Copied web bundle to ${syncWebBundle(path.resolve(__dirname, '..'))}`);
