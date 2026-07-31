#!/usr/bin/env node
/**
 * Downscale and recompress everything in public/images.
 *
 * The site builds with `images.unoptimized: true` (required by Next's static
 * export), so whatever is committed here is exactly what visitors download.
 * Run this after adding new media.
 *
 *   npm run optimize:images -- [--max-width 1920] [--dry-run] [--force]
 *
 * Processed files are recorded by content hash in `image-manifest.json`, so
 * re-running is a no-op. That matters: PNG quantization and JPEG encoding are
 * both lossy, so blindly recompressing an already-processed file degrades it
 * a little more every time.
 */

import { readdir, readFile, writeFile, rename, unlink } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = path.join(__dirname, "..", "public", "images");
// Deliberately outside public/ so it is not published with the site.
const MANIFEST = path.join(__dirname, "image-manifest.json");

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const force = args.includes("--force");
const maxWidthArg = args.indexOf("--max-width");
const MAX_WIDTH = maxWidthArg !== -1 ? Number(args[maxWidthArg + 1]) : 1920;

const EXTENSIONS = [".png", ".jpg", ".jpeg"];
const PNG_OPTS = { compressionLevel: 9, effort: 10, palette: true };
const JPEG_OPTS = { quality: 82, mozjpeg: true };

const fmt = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;
const sha256 = (buffer) => createHash("sha256").update(buffer).digest("hex");

const manifest = await readFile(MANIFEST, "utf8")
  .then(JSON.parse)
  .catch(() => ({}));

async function optimize(file) {
  const full = path.join(IMAGES_DIR, file);
  const original = await readFile(full);
  const before = original.length;
  const hash = sha256(original);

  if (!force && manifest[file] === hash) {
    console.log(`skip  ${file.padEnd(45)} ${fmt(before)} (already optimized)`);
    return { before, after: before, hash };
  }

  const image = sharp(original, { failOn: "none" });
  const { width } = await image.metadata();

  let pipeline = image.rotate();
  if (width > MAX_WIDTH) pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  pipeline =
    path.extname(file).toLowerCase() === ".png" ? pipeline.png(PNG_OPTS) : pipeline.jpeg(JPEG_OPTS);

  const buffer = await pipeline.toBuffer();

  // Never let "optimization" make a file bigger. A smaller-but-heavier file is
  // strictly worse, so fall back to the original even when we did downscale.
  if (buffer.length >= before) {
    console.log(`skip  ${file.padEnd(45)} ${fmt(before)} (already optimal)`);
    return { before, after: before, hash };
  }

  if (!dryRun) {
    const tmp = `${full}.tmp`;
    await writeFile(tmp, buffer);
    await unlink(full);
    await rename(tmp, full);
  }

  const newWidth = Math.min(width, MAX_WIDTH);
  const scale = newWidth === width ? "" : ` (${width}\u2192${newWidth}px)`;
  console.log(
    `ok    ${file.padEnd(45)} ${fmt(before)} \u2192 ${fmt(buffer.length)}` +
      ` (-${Math.round((1 - buffer.length / before) * 100)}%)${scale}`,
  );
  return { before, after: buffer.length, hash: sha256(buffer) };
}

const files = (await readdir(IMAGES_DIR))
  .filter((f) => EXTENSIONS.includes(path.extname(f).toLowerCase()))
  .sort();

const next = {};
let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
  const { before, after, hash } = await optimize(file);
  next[file] = hash;
  totalBefore += before;
  totalAfter += after;
}

if (!dryRun) await writeFile(MANIFEST, `${JSON.stringify(next, null, 2)}\n`);

console.log(
  `\n${dryRun ? "[dry run] " : ""}total: ${fmt(totalBefore)} \u2192 ${fmt(totalAfter)}` +
    ` (-${Math.round((1 - totalAfter / totalBefore) * 100)}%)`,
);
