import Link from "next/link";
import { ArrowRightIcon } from "@/components/Icons";

export const metadata = {
  title: "404 — Page Not Found",
};

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Breathing gradient orb */}
      <div className="hero-orb" style={{ top: "40%", left: "55%" }} />

      {/* Subtle second orb for depth */}
      <div
        className="hero-orb"
        style={{
          top: "20%",
          left: "20%",
          width: 320,
          height: 320,
          opacity: 0.6,
          animationDelay: "4s",
        }}
      />

      <div className="relative z-10 text-center max-w-[520px]">
        {/* Giant 404 */}
        <div className="animate-fade-in-up opacity-0 mb-2 select-none pointer-events-none">
          <span
            className="font-mono font-bold leading-none text-[var(--accent)]"
            style={{ fontSize: "clamp(96px, 22vw, 200px)", opacity: 0.18 }}
          >
            404
          </span>
        </div>

        {/* Divider with label */}
        <div className="flex items-center gap-4 mb-6 animate-fade-in-up opacity-0 animation-delay-100">
          <div className="h-px flex-1 bg-[var(--border)]" />
          <span className="micro text-[var(--text-muted)]">Page not found</span>
          <div className="h-px flex-1 bg-[var(--border)]" />
        </div>

        {/* Message */}
        <p className="text-[var(--text-secondary)] leading-[1.7] mb-8 animate-fade-in-up opacity-0 animation-delay-200">
          This page wandered off into the void.
          <br />
          Let&apos;s get you back.
        </p>

        {/* CTA */}
        <div className="flex items-center justify-center gap-3 animate-fade-in-up opacity-0 animation-delay-300">
          <Link
            href="/en"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[var(--radius-full)] bg-[var(--accent-subtle)] border border-[var(--accent)]/20 text-sm font-medium text-[var(--accent)] hover:bg-[var(--accent)]/15 transition-colors duration-200"
          >
            Go home
            <ArrowRightIcon size={14} />
          </Link>

          <Link
            href="/en/posts"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[var(--radius-full)] bg-[var(--bg-surface)] border border-[var(--border)] text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-all duration-200"
          >
            Read posts
          </Link>
        </div>
      </div>

      {/* Footer hint */}
      <p className="absolute bottom-8 font-mono text-[11px] text-[var(--text-muted)] animate-fade-in opacity-0 animation-delay-400">
        junjie.li
      </p>
    </div>
  );
}
