import type { NextConfig } from "next";

/**
 * Single source of truth for the path the site is served under.
 *
 * GitHub Pages serves a project repo at `https://<user>.github.io/<repo>/`, so
 * every absolute URL needs the `/junjieweb` prefix. Set this to "" when moving
 * to a custom apex domain, which is the only edit that switch requires —
 * `src/lib/base-path.ts` reads the value back out of `env`, so no app code or
 * markdown content hardcodes the prefix.
 */
const BASE_PATH = "/junjieweb";
const SITE_ORIGIN = "https://muyangamigo.github.io";

const nextConfig: NextConfig = {
  output: "export",
  basePath: BASE_PATH,
  // Re-exported so runtime code can prefix the URLs Next does not rewrite
  // itself: markdown-authored HTML, the root meta-refresh target, and the
  // absolute URLs in page metadata.
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
    NEXT_PUBLIC_SITE_ORIGIN: SITE_ORIGIN,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
