// Renders public/favicon.svg to the PNG icons the web app manifest needs, using a locally
// installed Edge or Chrome through playwright-core. Usage: node scripts/make-icons.mjs
import { chromium } from 'playwright-core';
import { readFile } from 'node:fs/promises';

const svg = await readFile('public/favicon.svg', 'utf8');
const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL ?? 'msedge' });
const page = await browser.newPage();
for (const [file, size, pad] of [['icon-192.png', 192, 0], ['icon-512.png', 512, 0], ['icon-maskable-512.png', 512, 0.12]]) {
  await page.setViewportSize({ width: size, height: size });
  const inner = Math.round(size * (1 - pad * 2));
  await page.setContent(`<body style="margin:0;background:#0b1626;display:grid;place-items:center;width:${size}px;height:${size}px">${svg.replace('<svg ', `<svg width="${inner}" height="${inner}" `)}</body>`);
  await page.screenshot({ path: `public/icons/${file}`, omitBackground: pad === 0 });
}
await browser.close();
console.log('icons written');
