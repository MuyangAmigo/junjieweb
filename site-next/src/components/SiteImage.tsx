import Image, { type ImageProps } from "next/image";
import { withBasePath } from "@/lib/base-path";

/**
 * `next/image` with `basePath` applied to string sources.
 *
 * `output: "export"` requires `images.unoptimized`, and the unoptimized loader
 * emits `src` verbatim rather than routing it through the default loader that
 * prepends `basePath`. Without this wrapper every image 404s once the site is
 * served from a subpath such as `/junjieweb`.
 *
 * Static imports (`import hero from "./hero.png"`) already carry a correct URL,
 * so only string sources are rewritten.
 */
export default function SiteImage({ src, ...rest }: ImageProps) {
  return <Image src={typeof src === "string" ? withBasePath(src) : src} {...rest} />;
}
