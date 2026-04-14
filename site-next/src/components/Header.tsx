"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import type { Dictionary } from "@/i18n/dictionaries/en";

const navIcons = {
  home: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  about: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  ),
  work: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  ),
  posts: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  ),
};

type NavKey = "home" | "about" | "work" | "posts";

interface HeaderProps {
  locale: string;
  dict: Dictionary;
}

export default function Header({ locale, dict }: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  // Build nav links based on locale — hide Posts for non-English
  const allNavLinks: { key: NavKey; href: string; label: string }[] = [
    { key: "home", href: `/${locale}`, label: dict.nav.home },
    { key: "about", href: `/${locale}/about`, label: dict.nav.about },
    { key: "work", href: `/${locale}/work`, label: dict.nav.work },
  ];
  allNavLinks.push({ key: "posts", href: `/${locale}/posts`, label: dict.nav.posts });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop Header */}
      <header className="fixed top-0 left-0 right-0 z-50 hidden md:flex items-center justify-center h-20 pointer-events-none" style={{ paddingTop: "env(safe-area-inset-top)" }}>
        <nav
          className={`pointer-events-auto flex items-center gap-1 px-1.5 py-1.5 rounded-[var(--radius-full)] border border-[var(--border)] transition-all duration-300 ${
            scrolled
              ? "bg-[var(--bg-translucent)] backdrop-blur-xl shadow-[var(--shadow-16)]"
              : "bg-[var(--bg-surface)] backdrop-blur-md"
          }`}
        >
          {allNavLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-[var(--radius-full)] text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isActive(link.href)
                  ? "bg-[var(--text-primary)] text-[var(--bg)] shadow-sm"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-muted)]"
              }`}
            >
              {navIcons[link.key]}
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
      </header>

      {/* Mobile Header — fixed top */}
      <div className="fixed top-4 left-0 right-0 z-50 flex md:hidden justify-center px-4" style={{ paddingTop: "env(safe-area-inset-top)" }}>
        <nav className="flex items-center gap-1 px-2 py-2 rounded-[var(--radius-full)] border border-[var(--border)] bg-[var(--bg-translucent)] backdrop-blur-xl shadow-[var(--shadow-16)]">
          {allNavLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={`flex items-center justify-center w-10 h-10 rounded-[var(--radius-full)] transition-all duration-200 ${
                isActive(link.href)
                  ? "bg-[var(--text-primary)] text-[var(--bg)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
              aria-label={link.label}
            >
              {navIcons[link.key]}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
