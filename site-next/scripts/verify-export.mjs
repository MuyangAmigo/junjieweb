// Verifies the exported site as GitHub Pages will serve it.
// 1. Resolves every internal src/href in every page against out/ using Pages'
//    own lookup order (exact file, then .html, then dir/index.html).
// 2. Serves out/ under the base path and smoke-tests real HTTP responses.
//
// This guards a failure mode that is invisible locally: `output: "export"`
// forces `images.unoptimized`, whose loader emits `src` verbatim and skips the
// `basePath` prefixing the default loader does. Markdown-authored HTML and
// metadata URLs are likewise untouched by Next. Each of those 404s only once
// the site is served from a subpath.
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const OUT = path.join(ROOT, "out");

// Read the base path back out of next.config.ts so this cannot drift from the
// real build configuration.
const config = fs.readFileSync(path.join(ROOT, "next.config.ts"), "utf8");
const match = /const BASE_PATH\s*=\s*"([^"]*)"/.exec(config);
if (!match) {
  console.error("could not read BASE_PATH from next.config.ts");
  process.exit(1);
}
const BASE = match[1];
console.log(`base path: ${BASE || "(none)"}`);

if (!fs.existsSync(OUT)) {
  console.error(`no build output at ${OUT} — run \`npm run build\` first`);
  process.exit(1);
}

const walk = (d) =>
  fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(d, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });

// Pages tries the literal path, then `.html`, then `index.html` inside it.
function resolveFile(urlPath) {
  const rel = decodeURIComponent(urlPath).replace(/^\/+/, "");
  for (const c of [rel, `${rel}.html`, path.join(rel, "index.html")]) {
    const f = path.join(OUT, c);
    if (fs.existsSync(f) && fs.statSync(f).isFile()) return f;
  }
  return null;
}

const pages = walk(OUT).filter((f) => f.endsWith(".html"));
const broken = [];
let checked = 0;

for (const page of pages) {
  const html = fs.readFileSync(page, "utf8");
  for (const m of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const url = m[1];
    if (!url.startsWith("/")) continue; // external, anchor, or relative
    if (url.startsWith("//")) continue; // protocol-relative
    checked++;
    if (!url.startsWith(`${BASE}/`) && url !== BASE) {
      broken.push({ page, url, why: "missing base path" });
      continue;
    }
    const stripped = url.slice(BASE.length).split(/[?#]/)[0] || "/";
    if (!resolveFile(stripped)) broken.push({ page, url, why: "no such file" });
  }
}

console.log(`internal URLs checked: ${checked}`);
console.log(`broken: ${broken.length}`);
for (const b of broken.slice(0, 25)) {
  console.log(`  ${b.why}: ${b.url}  (in ${path.relative(OUT, b.page)})`);
}

// ---- HTTP smoke test ----
const TYPES = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".jpeg": "image/jpeg",
  ".woff2": "font/woff2",
  ".txt": "text/plain",
};

const server = http.createServer((req, res) => {
  const urlPath = req.url.split(/[?#]/)[0];
  if (!urlPath.startsWith(BASE)) {
    res.writeHead(404).end("outside base path");
    return;
  }
  const f = resolveFile(urlPath.slice(BASE.length) || "/");
  if (!f) {
    const nf = path.join(OUT, "404.html");
    res.writeHead(404, { "content-type": "text/html" });
    res.end(fs.existsSync(nf) ? fs.readFileSync(nf) : "404");
    return;
  }
  res.writeHead(200, { "content-type": TYPES[path.extname(f)] ?? "application/octet-stream" });
  res.end(fs.readFileSync(f));
});

await new Promise((r) => server.listen(0, "127.0.0.1", r));
const port = server.address().port;
const origin = `http://127.0.0.1:${port}`;

const routes = [
  `${BASE}/`,
  `${BASE}/en`,
  `${BASE}/zh`,
  `${BASE}/ja`,
  `${BASE}/en/about`,
  `${BASE}/en/posts`,
  `${BASE}/en/work`,
  `${BASE}/en/posts/generative-ai`,
  `${BASE}/en/work/ai-toolkit`,
  `${BASE}/images/profile_photo.jpeg`,
  `${BASE}/images/generative-ai-market-map.png`,
];

let failures = 0;
for (const r of routes) {
  const res = await fetch(`${origin}${r}`);
  const ok = res.status === 200;
  if (!ok) failures++;
  console.log(`  ${ok ? "ok " : "FAIL"} ${res.status}  ${r}`);
}

const nf = await fetch(`${origin}${BASE}/definitely-not-a-page`);
const nfOk = nf.status === 404;
if (!nfOk) failures++;
console.log(`  ${nfOk ? "ok " : "FAIL"} ${nf.status}  ${BASE}/definitely-not-a-page (expect 404)`);

// The root must redirect into the default locale.
const rootHtml = await (await fetch(`${origin}${BASE}/`)).text();
const refresh = /content="0; url=([^"]+)"/.exec(rootHtml)?.[1];
const refreshOk = refresh === `${BASE}/en`;
if (!refreshOk) failures++;
console.log(`  ${refreshOk ? "ok " : "FAIL"} root meta refresh -> ${refresh}`);

server.close();
console.log(`\nRESULT: ${broken.length === 0 && failures === 0 ? "PASS" : "FAIL"}`);
process.exit(broken.length === 0 && failures === 0 ? 0 : 1);
