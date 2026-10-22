import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'prompt',
      injectRegister: false,
      includeAssets: ['favicon.svg', 'icons/*.png', 'anatomy/LICENSE.txt'],
      manifest: {
        name: 'Anatomy Explorer — Interactive 3D Human Anatomy',
        short_name: 'Anatomy',
        description: 'Explore human anatomy in 3D, offline. Realistic and educational modes.',
        theme_color: '#0b1422',
        background_color: '#070b12',
        display: 'standalone',
        start_url: '.',
        scope: '.',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // The application shell (HTML, JS, CSS, fonts, icons, anatomy manifest + educational text,
        // which are bundled into the JS) is precached. The 3D model packs are NOT precached: the
        // in-app download manager stores them in IndexedDB with integrity checks.
        globPatterns: ['**/*.{js,css,html,svg,png,woff2,txt}'],
        globIgnores: ['anatomy/**/*.glb'],
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
        navigateFallback: 'index.html',
        cleanupOutdatedCaches: true,
      },
    }),
  ],
  build: {
    chunkSizeWarningLimit: 2500,
  },
});
