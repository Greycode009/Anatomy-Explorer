// Renders the Android app icons and splash image for the Expo app (mobile/assets) from the logo,
// using a locally installed Edge or Chrome. Usage: node scripts/make-app-icons.mjs
import { chromium } from 'playwright-core';

const G = `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#67e8f9"/><stop offset="1" stop-color="#3b82f6"/></linearGradient></defs>`;
const FIGURE = (fill) => `<circle cx="32" cy="15" r="5.5" fill="${fill}"/><path d="M32 22c-6 0-10 3-12 8l-3 9 4 1 4-8v24h5V43h4v13h5V32l4 8 4-1-3-9c-2-5-6-8-12-8z" fill="${fill}"/>`;
const RING = `<circle cx="32" cy="32" r="30" fill="#0b1626" stroke="url(#g)" stroke-width="2.5"/>`;

// [file, size, svg body, background, scale of the 64-unit artwork within the canvas]
const ICONS = [
  ['icon.png', 1024, `${G}${RING}${FIGURE('url(#g)')}`, '#0b1626', 0.92],
  ['android-icon-foreground.png', 1024, `${G}${FIGURE('url(#g)')}`, 'transparent', 0.62],
  ['android-icon-background.png', 1024, '', '#0b1626', 1],
  ['android-icon-monochrome.png', 1024, FIGURE('#ffffff'), 'transparent', 0.62],
  ['splash-icon.png', 512, `${G}${RING}${FIGURE('url(#g)')}`, 'transparent', 0.9],
  ['favicon.png', 48, `${G}${RING}${FIGURE('url(#g)')}`, 'transparent', 1],
];

const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL ?? 'msedge' });
const page = await browser.newPage();
for (const [file, size, body, bg, scale] of ICONS) {
  await page.setViewportSize({ width: size, height: size });
  const inner = Math.round(size * scale);
  await page.setContent(`<body style="margin:0;width:${size}px;height:${size}px;display:grid;place-items:center;background:${bg}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${inner}" height="${inner}">${body}</svg></body>`);
  await page.screenshot({ path: `mobile/assets/${file}`, omitBackground: bg === 'transparent' });
}
await browser.close();
console.log('app icons written to mobile/assets');
