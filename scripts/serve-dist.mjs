// Minimal static server for the production build (dist/) with HTTP Range support.
// Used by the end-to-end tests; `--interrupt <path>` cuts the first full download of that file
// halfway through (the socket is destroyed) to exercise resumable downloads; `--corrupt <path>`
// flips one byte of the first response for that file to exercise integrity checking.
//
// Usage: node scripts/serve-dist.mjs [--port 4173] [--interrupt /anatomy/realistic/muscular.glb]
import { createServer } from 'node:http';
import { createReadStream, readFileSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const opt = (name, fallback) => (args.includes(name) ? args[args.indexOf(name) + 1] : fallback);
const port = Number(opt('--port', 4173));
const interrupt = new Set(args.filter((_, i) => args[i - 1] === '--interrupt'));
const corrupt = new Set(args.filter((_, i) => args[i - 1] === '--corrupt'));
const root = path.resolve('dist');

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2',
  '.glb': 'model/gltf-binary', '.txt': 'text/plain; charset=utf-8',
};


createServer((req, res) => {
  const url = new URL(req.url, 'http://x');
  let file = path.join(root, decodeURIComponent(url.pathname));
  if (!file.startsWith(root)) { res.writeHead(403).end(); return; }
  if (!existsSync(file) || statSync(file).isDirectory()) file = path.join(root, 'index.html');
  const size = statSync(file).size;
  const headers = {
    'Content-Type': TYPES[path.extname(file)] ?? 'application/octet-stream',
    'Accept-Ranges': 'bytes',
    ETag: `"${size}-${statSync(file).mtimeMs}"`,
    'Cache-Control': 'no-cache',
  };
  const range = req.headers.range?.match(/bytes=(\d+)-(\d*)/);
  console.log(`${req.method} ${url.pathname}${range ? ` range=${range[1]}-` : ''}`);
  if (range) {
    const start = Number(range[1]);
    const end = range[2] ? Number(range[2]) : size - 1;
    res.writeHead(206, { ...headers, 'Content-Range': `bytes ${start}-${end}/${size}`, 'Content-Length': end - start + 1 });
    createReadStream(file, { start, end }).pipe(res);
    return;
  }
  res.writeHead(200, { ...headers, 'Content-Length': size });
  if (interrupt.has(url.pathname)) {
    interrupt.delete(url.pathname);
    console.log(`  -> interrupting ${url.pathname} after ${Math.floor(size / 2)} bytes`);
    const stream = createReadStream(file, { start: 0, end: Math.floor(size / 2) - 1 });
    stream.pipe(res, { end: false });
    stream.on('end', () => setTimeout(() => req.socket.destroy(), 50));
    return;
  }
  if (corrupt.has(url.pathname)) {
    corrupt.delete(url.pathname);
    console.log(`  -> corrupting one byte of ${url.pathname}`);
    const buf = readFileSync(file);
    buf[Math.floor(size / 2)] ^= 0xff;
    res.end(buf);
    return;
  }
  if (req.method === 'HEAD') { res.end(); return; }
  createReadStream(file).pipe(res);
}).listen(port, () => console.log(`serving dist/ on http://localhost:${port}`));
