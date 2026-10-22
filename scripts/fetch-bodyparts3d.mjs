// Downloads the BodyParts3D STL meshes (CC BY-SA 2.1 JP) from a pinned commit of the
// Kevin-Mattheus-Moerman/BodyParts3D GitHub mirror into .asset-cache/bp3d/.
// Every file is verified against the git blob SHA-1 listed in the repository tree, so a
// truncated or corrupted download is detected and retried.
//
// Usage: node scripts/fetch-bodyparts3d.mjs [--concurrency 8]
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile, stat, rename } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { BP3D_COMMIT, BP3D_REPO } from './bp3d-source.mjs';

const DATA_DIR = 'assets/BodyParts3D_data';
const CACHE = path.resolve('.asset-cache/bp3d');

const args = process.argv.slice(2);
const concurrency = Number(args[args.indexOf('--concurrency') + 1]) || 8;

function gitBlobSha(buf) {
  return createHash('sha1').update(`blob ${buf.length}\0`).update(buf).digest('hex');
}

async function getJson(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'anatomy-explorer-asset-prep' } });
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  return res.json();
}

async function download(entry, attempt = 1) {
  const file = path.join(CACHE, 'stl', path.basename(entry.path));
  if (existsSync(file)) {
    const buf = await readFile(file);
    if (gitBlobSha(buf) === entry.sha) return { cached: true, bytes: buf.length };
  }
  const url = `https://raw.githubusercontent.com/${BP3D_REPO}/${BP3D_COMMIT}/${entry.path}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length !== entry.size) throw new Error(`size ${buf.length} != ${entry.size}`);
    if (gitBlobSha(buf) !== entry.sha) throw new Error('git blob SHA-1 mismatch');
    await writeFile(file + '.part', buf);
    await rename(file + '.part', file);
    return { cached: false, bytes: buf.length };
  } catch (err) {
    if (attempt >= 4) throw new Error(`${entry.path}: ${err.message}`);
    await new Promise((r) => setTimeout(r, 1000 * attempt));
    return download(entry, attempt + 1);
  }
}

async function main() {
  await mkdir(path.join(CACHE, 'stl'), { recursive: true });
  const tree = await getJson(`https://api.github.com/repos/${BP3D_REPO}/git/trees/${BP3D_COMMIT}?recursive=1`);
  if (tree.truncated) throw new Error('GitHub tree listing truncated');
  await writeFile(path.join(CACHE, 'tree.json'), JSON.stringify(tree.tree));

  // Small text/metadata files that ship with the dataset.
  for (const name of ['parts_list_e.txt', 'LICENSE_content', 'README_e.html']) {
    const entry = tree.tree.find((e) => e.path === `${DATA_DIR}/${name}`);
    const res = await fetch(`https://raw.githubusercontent.com/${BP3D_REPO}/${BP3D_COMMIT}/${entry.path}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (gitBlobSha(buf) !== entry.sha) throw new Error(`${name}: checksum mismatch`);
    await writeFile(path.join(CACHE, name), buf);
  }

  const stls = tree.tree.filter((e) => e.type === 'blob' && e.path.startsWith(`${DATA_DIR}/stl/`) && e.path.endsWith('.stl'));
  const total = stls.reduce((n, e) => n + e.size, 0);
  console.log(`${stls.length} STL files, ${(total / 1e6).toFixed(0)} MB`);

  let done = 0, bytes = 0, fromCache = 0;
  const failures = [];
  const queue = [...stls];
  await Promise.all(Array.from({ length: concurrency }, async () => {
    while (queue.length) {
      const entry = queue.shift();
      try {
        const r = await download(entry);
        bytes += r.bytes; if (r.cached) fromCache++;
      } catch (err) {
        failures.push(err.message);
      }
      if (++done % 50 === 0 || done === stls.length) {
        console.log(`${done}/${stls.length}  ${(bytes / 1e6).toFixed(0)} MB  (${fromCache} already cached)`);
      }
    }
  }));
  if (failures.length) {
    console.error(`${failures.length} downloads failed:\n` + failures.join('\n'));
    process.exit(1);
  }
  const s = await stat(path.join(CACHE, 'stl'));
  console.log('All STL files downloaded and verified.', s.isDirectory());
}

main().catch((err) => { console.error(err); process.exit(1); });
