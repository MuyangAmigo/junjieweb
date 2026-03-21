#!/usr/bin/env node
/**
 * Fetches published posts from Microsoft developer blogs and updates
 * the externalPosts array in site-next/src/lib/data.ts.
 *
 * Sources:
 *   - https://devblogs.microsoft.com/microsoft365dev/author/junjieli/
 *   - https://techcommunity.microsoft.com/users/junjieli/814565
 *
 * Usage: node scripts/fetch-external-posts.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = join(__dirname, "../site-next/src/lib/data.ts");

// ── Fetch helper ────────────────────────────────────────────────────

async function fetchPage(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; BlogIndexer/1.0; +https://github.com/MuyangAmigo)",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return await res.text();
}

function stripHtml(s) {
  return s
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&#8212;/g, "—")
    .replace(/&#8211;/g, "–")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&nbsp;/g, " ")
    .trim();
}

/**
 * Parse a short date like "Jan 9, 2025" or "Mar 16, 2026" → "2025-01-09"
 */
function parseShortDate(str) {
  const d = new Date(str.trim());
  if (isNaN(d.getTime())) return "";
  return d.toISOString().split("T")[0];
}

// ── DevBlogs parser ─────────────────────────────────────────────────
//
// Structure per the actual HTML:
//   <article class="post ...">
//     <div class="bg-white box ... post-card" data-post-id="...">
//       <header class="entry-header">
//         <div class="d-flex justify-content-between mb-16">
//           <div class="d-flex align-items-left gap-4">
//             Jan 9, 2025
//           </div>
//         </div>
//         <h3 class="fs-24 mb-16">
//           <a class="single-click" href="...">Title</a>
//         </h3>
//       </header>
//     </div>
//   </article>

async function fetchDevBlogPosts() {
  const posts = [];

  for (let page = 1; page <= 3; page++) {
    const url =
      page === 1
        ? "https://devblogs.microsoft.com/microsoft365dev/author/junjieli/"
        : `https://devblogs.microsoft.com/microsoft365dev/author/junjieli/page/${page}/`;

    let html;
    try {
      html = await fetchPage(url);
    } catch {
      break; // no more pages
    }

    // Split by article boundaries
    const articles = html.split(/<article\b/i).slice(1);
    if (articles.length === 0) break;

    for (const article of articles) {
      // Extract title & URL from <h3><a class="single-click" href="...">Title</a></h3>
      const linkMatch = article.match(
        /<h3[^>]*>\s*<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>\s*<\/h3>/i
      );
      if (!linkMatch) continue;

      const url = linkMatch[1].trim();
      const title = stripHtml(linkMatch[2]);

      // Extract date from <div class="d-flex align-items-left gap-4">DATE</div>
      const dateMatch = article.match(
        /align-items-left[^"]*"[^>]*>\s*([A-Z][a-z]{2}\s+\d{1,2},\s+\d{4})/i
      );
      const date = dateMatch ? parseShortDate(dateMatch[1]) : "";

      if (title && url) {
        posts.push({
          title,
          date,
          url,
          source: "Microsoft 365 Developer Blog",
        });
      }
    }

    console.log(`  Page ${page}: found ${articles.length} article(s)`);
  }

  return posts;
}

// ── Tech Community parser ───────────────────────────────────────────
//
// The page is React/Khoros SSR with Apollo GraphQL cache in the HTML.
// Each blog post is a "BlogTopicMessage:message:<id>" key with fields:
//   "subject": "title", "postTime": "ISO date"
// Post URLs appear elsewhere as /blog/azuredevcommunityblog/<slug>/<id>

async function fetchTechCommunityPosts() {
  const html = await fetchPage(
    "https://techcommunity.microsoft.com/users/junjieli/814565"
  );

  // 1. Collect unique message IDs
  const idSet = new Set();
  const idRegex = /"BlogTopicMessage:message:(\d+)"/g;
  let m;
  while ((m = idRegex.exec(html)) !== null) idSet.add(m[1]);
  const messageIds = [...idSet];

  // 2. Build a URL map: messageId → path
  //    URLs appear as /blog/azuredevcommunityblog/<slug>/<id> throughout the HTML
  const urlMap = new Map();
  const urlRegex = /\/blog\/[a-z][a-z0-9-]*\/[^"'\s>]+\/(\d+)/g;
  while ((m = urlRegex.exec(html)) !== null) {
    if (!urlMap.has(m[1])) urlMap.set(m[1], m[0]);
  }

  // 3. For each message, extract subject and postTime from the Apollo cache
  //    The entry looks like: "BlogTopicMessage:message:ID":{..."subject":"TITLE"..."postTime":"ISO"...}
  const posts = [];
  for (const msgId of messageIds) {
    const entryStart = html.indexOf(`"BlogTopicMessage:message:${msgId}":{`);
    if (entryStart === -1) continue;

    // Grab a generous chunk — entries are typically ~1500 chars
    const chunk = html.slice(entryStart, entryStart + 2000);

    const subjectMatch = chunk.match(/"subject"\s*:\s*"([^"]+)"/);
    const timeMatch = chunk.match(/"postTime"\s*:\s*"([^"]+)"/);
    if (!subjectMatch) continue;

    const title = subjectMatch[1]
      .replace(/\\u[\dA-Fa-f]{4}/g, (u) =>
        String.fromCodePoint(parseInt(u.slice(2), 16))
      )
      .replace(/\\"/g, '"');
    const date = timeMatch ? timeMatch[1].split("T")[0] : "";
    const urlPath = urlMap.get(msgId);
    const url = urlPath
      ? `https://techcommunity.microsoft.com${urlPath}`
      : "";

    if (url) {
      posts.push({ title, date, url, source: "Microsoft Tech Community" });
    }
  }

  return posts;
}

// ── Main ────────────────────────────────────────────────────────────

async function main() {
  console.log("Fetching external posts...\n");

  console.log("→ Microsoft 365 Developer Blog");
  const devBlogPosts = await fetchDevBlogPosts();
  console.log(`  Total: ${devBlogPosts.length} posts\n`);

  console.log("→ Microsoft Tech Community");
  const techPosts = await fetchTechCommunityPosts();
  console.log(`  Total: ${techPosts.length} posts\n`);

  let allPosts = [...techPosts, ...devBlogPosts];

  // Deduplicate by URL
  const seen = new Set();
  allPosts = allPosts.filter((p) => {
    if (seen.has(p.url)) return false;
    seen.add(p.url);
    return true;
  });

  // Sort by date descending
  allPosts.sort((a, b) => (a.date > b.date ? -1 : 1));

  console.log(`Total: ${allPosts.length} unique posts\n`);

  if (allPosts.length === 0) {
    console.log("⚠ No posts found — keeping data.ts unchanged.");
    process.exit(0);
  }

  // Update data.ts
  const dataFile = readFileSync(DATA_FILE, "utf8");

  const postsLiteral = allPosts
    .map(
      (p) =>
        `  {\n    title: ${JSON.stringify(p.title)},\n    date: "${p.date}",\n    url: "${p.url}",\n    source: "${p.source}",\n  }`
    )
    .join(",\n");

  const newArray = `export const externalPosts: ExternalPost[] = [\n${postsLiteral},\n];`;

  const updated = dataFile.replace(
    /export const externalPosts: ExternalPost\[\] = \[[\s\S]*?\];/,
    newArray
  );

  if (updated === dataFile && allPosts.length > 0) {
    console.log("⚠ Could not find externalPosts array in data.ts — no changes made.");
    process.exit(1);
  }

  writeFileSync(DATA_FILE, updated, "utf8");
  console.log(`✓ Updated ${DATA_FILE}`);

  // Print posts for verification
  for (const p of allPosts) {
    console.log(`  ${p.date}  ${p.title}`);
  }
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
