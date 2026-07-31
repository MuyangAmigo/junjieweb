/**
 * The subpath the site is served under, e.g. "/junjieweb" on GitHub Pages or
 * "" on a custom apex domain. Defined once in `next.config.ts` and inlined at
 * build time.
 *
 * Next already prefixes `<Link>`, `next/image`, and other framework-managed
 * URLs. These helpers exist for the URLs it does *not* touch: HTML produced by
 * the markdown pipeline, and hand-written meta refresh targets.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Origin the site is published under, without any trailing slash. */
export const siteOrigin = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "";

/** Public root of the site, e.g. `https://user.github.io/junjieweb`. */
export const siteUrl = `${siteOrigin}${basePath}`;

/** Prefix a root-absolute path (`/images/x.png` -> `/junjieweb/images/x.png`). */
export function withBasePath(pathname: string): string {
  if (!basePath || !pathname.startsWith("/")) return pathname;
  // Leave protocol-relative URLs (`//cdn.example.com`) alone.
  if (pathname.startsWith("//")) return pathname;
  return `${basePath}${pathname}`;
}

/**
 * Rewrite root-absolute `src`/`href` attributes in a fragment of HTML that did
 * not pass through Next's own URL handling.
 *
 * Only `="/…"` is matched, so absolute (`https://…`), protocol-relative
 * (`//…`), anchor (`#…`), and relative URLs are all left untouched.
 */
export function withBasePathInHtml(htmlFragment: string): string {
  if (!basePath) return htmlFragment;
  return htmlFragment.replace(
    /(\s(?:src|href)=")\/(?!\/)/g,
    `$1${basePath}/`,
  );
}
