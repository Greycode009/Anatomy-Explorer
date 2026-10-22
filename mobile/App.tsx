// Android app shell: a full-screen WebView running the offline web build that is packaged inside
// the APK (see plugins/withWebBundle.js). All 3D models ship in the package; no network is used.
import { useEffect, useRef, type ComponentType, type Ref } from 'react';
import { BackHandler, Linking, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { WebView as RNWebView, type WebViewMessageEvent, type WebViewProps } from 'react-native-webview';

const APP_ROOT = 'file:///android_asset/web/';
const BACKGROUND = '#070b12';

SplashScreen.preventAutoHideAsync().catch(() => {});

// The library's public typings declare WebView without a ref; the component does forward one.
interface WebViewHandle {
  injectJavaScript(script: string): void;
  reload(): void;
}
const WebView = RNWebView as unknown as ComponentType<WebViewProps & { ref?: Ref<WebViewHandle> }>;

export default function App() {
  const web = useRef<WebViewHandle>(null);

  // The web app decides what "back" means (close a sheet, clear the selection, …) and asks
  // the shell to exit only when there is nothing left to close.
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      web.current?.injectJavaScript("window.dispatchEvent(new Event('native-back')); true;");
      return true;
    });
    return () => sub.remove();
  }, []);

  const onMessage = (e: WebViewMessageEvent) => {
    try {
      const msg = JSON.parse(e.nativeEvent.data) as { type?: string };
      if (msg.type === 'exit') BackHandler.exitApp();
    } catch {
      // Ignore messages that are not ours.
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.root} edges={['top', 'bottom', 'left', 'right']}>
        <StatusBar style="light" />
        <WebView
          ref={web}
          source={{ uri: `${APP_ROOT}index.html` }}
          style={styles.web}
          originWhitelist={['*']}
          // Needed to read the packaged model files from file:// with XMLHttpRequest.
          allowFileAccess
          allowFileAccessFromFileURLs
          javaScriptEnabled
          domStorageEnabled
          textZoom={100}
          overScrollMode="never"
          setBuiltInZoomControls={false}
          androidLayerType="hardware"
          webviewDebuggingEnabled={__DEV__}
          onMessage={onMessage}
          onLoadEnd={() => SplashScreen.hideAsync().catch(() => {})}
          // Links to licenses and sources open in the system browser.
          onShouldStartLoadWithRequest={(req) => {
            if (req.url.startsWith(APP_ROOT) || req.url.startsWith('about:') || req.url.startsWith('data:') || req.url.startsWith('blob:')) return true;
            if (/^https?:/i.test(req.url)) Linking.openURL(req.url).catch(() => {});
            return false;
          }}
          onOpenWindow={(e) => {
            if (/^https?:/i.test(e.nativeEvent.targetUrl)) Linking.openURL(e.nativeEvent.targetUrl).catch(() => {});
          }}
          // If Android reclaims the WebView's renderer, reload instead of showing a blank screen.
          onRenderProcessGone={() => web.current?.reload()}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: BACKGROUND },
  web: { flex: 1, backgroundColor: BACKGROUND },
});
