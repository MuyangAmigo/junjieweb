"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";

const localeLabels: Record<Locale, string> = {
  en: "EN",
  zh: "\u4e2d",
  ja: "\u65e5",
};

export default function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const pathname = usePathname();
  // Strip locale prefix: /zh/about → /about
  const pathWithoutLocale = "/" + pathname.split("/").slice(2).join("/");
  const cleanPath = pathWithoutLocale === "/" ? "" : pathWithoutLocale;

  return (
    <div className="flex items-center gap-0.5">
      {locales.map((locale) => (
        <Link
          key={locale}
          href={`/${locale}${cleanPath}`}
          className={`px-2 py-1 rounded-[var(--radius-full)] text-xs font-medium transition-all duration-200 ${
            locale === currentLocale
              ? "text-[var(--text-primary)] bg-[var(--bg-muted)]"
              : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          }`}
          aria-label={`Switch to ${locale}`}
        >
          {localeLabels[locale]}
        </Link>
      ))}
    </div>
  );
}
