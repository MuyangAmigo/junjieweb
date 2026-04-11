import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { profile, externalPosts, projects } from "@/lib/data";
import { GitHubIcon, LinkedInIcon, ArrowRightIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Junjie Li — Senior Product Manager at Microsoft",
  description: profile.bio,
  openGraph: {
    title: "Junjie Li — Senior Product Manager at Microsoft",
    description: profile.bio,
    url: "https://junjie.li",
    images: [{ url: "https://junjieblob.blob.core.windows.net/images/profile.jpg", width: 800, height: 800, alt: "Junjie Li" }],
  },
  twitter: {
    card: "summary",
    title: "Junjie Li — Senior Product Manager at Microsoft",
    description: profile.bio,
  },
};

export default function Home() {
  const posts = externalPosts.slice(0, 5);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="max-w-[820px] mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16" aria-label="Introduction">
        <div className="flex items-center gap-5 mb-6 animate-fade-in-up opacity-0">
          <Image
            src="https://junjieblob.blob.core.windows.net/images/profile.jpg"
            alt={profile.name}
            width={80}
            height={80}
            className="rounded-full object-cover border-2 border-[var(--border)]"
            style={{ width: 80, height: 80, objectPosition: "85% 10%" }}
            priority
          />
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[var(--text-primary)] leading-[1.1]">
              {profile.name}
            </h1>
          </div>
        </div>

        <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8 max-w-lg animate-fade-in-up opacity-0 animation-delay-100">
          {profile.bio}
        </p>

        <div className="flex flex-wrap items-center gap-3 animate-fade-in-up opacity-0 animation-delay-200">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[var(--radius-lg)] bg-[var(--accent)] text-white font-semibold text-sm hover:bg-[var(--accent-hover)] transition-colors duration-200"
          >
            About me
            <ArrowRightIcon size={14} />
          </Link>
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[var(--radius-lg)] text-[var(--text-primary)] font-semibold text-sm border border-[var(--border)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-muted)] transition-all duration-200"
          >
            Read posts
            <ArrowRightIcon size={14} />
          </Link>
          <div className="flex items-center gap-2 ml-1">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-[var(--radius-lg)] text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] transition-all duration-200"
              aria-label="GitHub"
            >
              <GitHubIcon size={20} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-[var(--radius-lg)] text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] transition-all duration-200"
              aria-label="LinkedIn"
            >
              <LinkedInIcon size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <div className="max-w-[820px] mx-auto px-6"><hr className="border-[var(--border)]" /></div>

      {/* ===== FEATURED WORK ===== */}
      <section className="max-w-[820px] mx-auto px-6 py-12 animate-fade-in-up opacity-0 animation-delay-300" aria-label="Featured work">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
            Featured Work
          </h2>
          <Link
            href="/work"
            className="text-sm font-medium text-[var(--accent)] hover:underline inline-flex items-center gap-1 transition-colors duration-200"
          >
            View all
            <ArrowRightIcon size={12} />
          </Link>
        </div>

        <div className="space-y-2">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="fluent-card group flex items-center justify-between gap-4 px-4 py-3.5 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)]"
            >
              <div className="min-w-0">
                <h3 className="text-base font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-200 truncate">
                  {project.title}
                </h3>
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  {project.team} &middot; {project.stats[0].value} {project.stats[0].label.toLowerCase()}
                </span>
              </div>
              {project.current ? (
                <span className="shrink-0 px-2 py-0.5 rounded-[var(--radius-md)] text-xs font-semibold font-mono bg-[var(--accent)] text-white">
                  Current
                </span>
              ) : (
                <span className="font-mono text-xs text-[var(--text-muted)] whitespace-nowrap shrink-0">
                  {project.period.split(" — ")[1]}
                </span>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <div className="max-w-[820px] mx-auto px-6"><hr className="border-[var(--border)]" /></div>

      {/* ===== LATEST POSTS ===== */}
      {posts.length > 0 && (
        <section className="max-w-[820px] mx-auto px-6 py-12 pb-20 animate-fade-in-up opacity-0 animation-delay-400" aria-label="Latest blog posts">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
              Recent Posts
            </h2>
            <Link
              href="/posts"
              className="text-sm font-medium text-[var(--accent)] hover:underline inline-flex items-center gap-1 transition-colors duration-200"
            >
              View all
              <ArrowRightIcon size={12} />
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
