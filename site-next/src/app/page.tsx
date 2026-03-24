import Link from "next/link";
import { profile, experience, externalPosts } from "@/lib/data";

export default function Home() {
  const posts = externalPosts.slice(0, 5);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="max-w-[820px] mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16" aria-label="Introduction">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[var(--text-primary)] mb-5 leading-[1.1] animate-fade-in-up opacity-0">
          {profile.name}
        </h1>

        <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8 max-w-lg animate-fade-in-up opacity-0 animation-delay-100">
          {profile.bio}
        </p>

        <div className="flex flex-wrap items-center gap-3 animate-fade-in-up opacity-0 animation-delay-200">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[var(--radius-lg)] bg-[var(--accent)] text-white font-semibold text-sm hover:bg-[var(--accent-hover)] transition-colors duration-200"
          >
            About me
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[var(--radius-lg)] text-[var(--text-primary)] font-semibold text-sm border border-[var(--border)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-muted)] transition-all duration-200"
          >
            Read posts
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
          <div className="flex items-center gap-2 ml-1">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-[var(--radius-lg)] text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] transition-all duration-200"
              aria-label="GitHub"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-[var(--radius-lg)] text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] transition-all duration-200"
              aria-label="LinkedIn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <div className="max-w-[820px] mx-auto px-6"><hr className="border-[var(--border)]" /></div>

      {/* ===== EXPERIENCE ===== */}
      <section className="max-w-[820px] mx-auto px-6 py-12" aria-label="Career journey">
        <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)] mb-8">
          Experience
        </h2>

        <div className="space-y-4">
          {experience.map((exp, i) => (
            <div
              key={i}
              className="fluent-card rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-card)] p-5 hover:border-[var(--border-hover)]"
            >
              {exp.roles.map((role, j) => (
                <div key={j} className={j > 0 ? "pt-4 mt-4 border-t border-[var(--border)]" : ""}>
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <h3 className="text-base font-semibold text-[var(--text-primary)]">
                      {exp.company}
                    </h3>
                    <span className="font-mono text-xs text-[var(--text-muted)]">
                      {role.period}
                    </span>
                  </div>
                  <div className="text-[15px] font-medium text-[var(--text-secondary)] mb-3">
                    {role.title}
                  </div>
                  <ul className="space-y-1.5">
                    {role.bullets.map((bullet, k) => (
                      <li
                        key={k}
                        className="relative pl-4 text-sm text-[var(--text-secondary)] leading-relaxed before:absolute before:left-0 before:top-[8px] before:w-1 before:h-1 before:rounded-full before:bg-[var(--text-muted)]"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <div className="max-w-[820px] mx-auto px-6"><hr className="border-[var(--border)]" /></div>

      {/* ===== LATEST POSTS ===== */}
      {posts.length > 0 && (
        <section className="max-w-[820px] mx-auto px-6 py-12 pb-20" aria-label="Latest blog posts">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
              Recent Posts
            </h2>
            <Link
              href="/posts"
              className="text-sm font-medium text-[var(--accent)] hover:underline inline-flex items-center gap-1 transition-colors duration-200"
            >
              View all
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="space-y-2">
            {posts.map((post) => (
              <a
                key={post.url}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="fluent-card group flex items-center justify-between gap-4 px-4 py-3.5 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)]"
              >
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-200 truncate">
                    {post.title}
                  </h3>
                  <span className="font-mono text-xs text-[var(--text-muted)]">
                    {post.source}
                  </span>
                </div>
                <span className="font-mono text-xs text-[var(--text-muted)] whitespace-nowrap shrink-0">
                  {post.date}
                </span>
              </a>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
