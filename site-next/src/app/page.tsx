import type { Metadata } from "next";
import { defaultLocale } from "@/i18n/config";

const target = `/${defaultLocale}`;

export const metadata: Metadata = {
  alternates: { canonical: target },
};

/**
 * `next/navigation`'s `redirect()` cannot be used here: with `output: "export"`
 * there is no server to issue a 3xx, so Next emits an error shell for `/`
 * instead and the redirect only happens once client-side JS has hydrated.
 *
 * A meta refresh is the only redirect a static host can serve, and it works
 * with JavaScript disabled. React hoists the tag into <head> at build time, so
 * it lands in the prerendered HTML.
 */
export default function RootPage() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <main className="flex min-h-screen items-center justify-center px-6">
        <p className="text-[var(--text-secondary)]">
          Redirecting to{" "}
          <a className="text-[var(--accent)] underline" href={target}>
            {target}
          </a>
          …
        </p>
      </main>
    </>
  );
}
