// Captures phone-sized screenshots of the main mobile states for visual review.
// Usage: node scripts/mobile-shots.mjs [url]   (default http://localhost:5173/)
import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';

const url = process.argv[2] ?? 'http://localhost:5173/';
const out = 'test-results/mobile';
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL ?? 'msedge', headless: true });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
const shot = (name) => page.screenshot({ path: `${out}/${name}.png` });
const ready = () => page.waitForFunction(() => {
  const l = Object.values(window.__anatomy?.loads.getState().loads ?? {});
  return l.length > 0 && l.every((x) => x.state !== 'loading');
}, null, { timeout: 120000 }).then(() => page.waitForTimeout(1200));

await page.goto(url);
await page.waitForFunction(() => !!window.__anatomy, null, { timeout: 120000 });
await shot('00-first-run');
await page.getByRole('button', { name: 'Start exploring' }).tap();
await ready();
await shot('01-home');
await page.getByRole('navigation', { name: 'Organ systems' }).getByRole('button', { name: 'Cardiovascular' }).tap();
await ready();
await shot('02-system-chip');
await page.evaluate(() => window.__anatomy.viewer.getState().select('heart'));
await page.waitForTimeout(1500);
await shot('03-selected-peek');
await page.getByRole('button', { name: 'Details' }).tap();
await page.waitForTimeout(600);
await shot('04-details-half');
await page.getByRole('button', { name: 'Search', exact: true }).tap();
await page.waitForTimeout(500);
await page.keyboard.type('bicep');
await page.waitForTimeout(400);
await shot('05-search');
await page.getByRole('listbox', { name: 'Search results' }).getByRole('button').first().tap();
await ready();
await shot('06-search-result');
await page.getByRole('button', { name: 'Layers', exact: true }).tap();
await page.waitForTimeout(500);
await shot('07-layers');
await page.getByRole('button', { name: 'Tours', exact: true }).tap();
await page.waitForTimeout(500);
await shot('08-tours');
await page.getByRole('button', { name: /The heart and great vessels/ }).tap();
await ready();
await shot('09-tour-card');
await page.getByRole('button', { name: 'Exit guided exploration' }).last().tap();
await page.getByRole('button', { name: 'More', exact: true }).tap();
await page.waitForTimeout(500);
await shot('10-more');
await page.getByRole('button', { name: /Downloads & offline storage/ }).tap();
await page.waitForTimeout(800);
await shot('11-downloads');
await browser.close();
console.log('screenshots in', out);
