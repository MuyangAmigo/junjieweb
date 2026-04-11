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
    <div className="max-w-[960px] mx-auto px-6">
      {/* ===== HERO ===== */}
      <section className="pt-12 pb-16 md:pt-20 md:pb-24" aria-label="Introduction">
        {/* Featured badge */}
        <div className="animate-fade-in-up opacity-0">
          <Link
            href="/work/ai-toolkit"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[var(--radius-full)] bg-[var(--accent-subtle)] border border-[var(--accent)]/20 text-sm text-[var(--accent)] font-medium hover:bg-[var(--accent)]/15 transition-colors duration-200 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            Building AI Toolkit — 1M+ installs
          </Link>
        </div>

        {/* Large display heading */}
        <h1 className="display-heading text-4xl md:text-6xl lg:text-7xl text-[var(--text-primary)] mb-6 max-w-[800px] animate-fade-in-up opacity-0 animation-delay-100">
          Building developer tools that empower millions
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed max-w-[560px] mb-10 animate-fade-in-up opacity-0 animation-delay-200">
          {profile.bio}
        </p>

        {/* CTA with avatar */}
        <div className="flex flex-wrap items-center gap-3 animate-fade-in-up opacity-0 animation-delay-300">
          <Link
            href="/about"
            className="group inline-flex items-center gap-3 pl-1.5 pr-5 py-1.5 rounded-[var(--radius-full)] bg-[var(--bg-surface)] border border-[var(--border)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-muted)] transition-all duration-200"
          >
            <Image
              src="https://junjieblob.blob.core.windows.net/images/profile.jpg"
              alt={profile.name}
              width={36}
              height={36}
              className="rounded-full object-cover"
              style={{ width: 36, height: 36, objectPosition: "85% 10%" }}
              priority
            />
            <span className="text-sm font-medium text-[var(--text-primary)]">About me</span>
            <ArrowRightIcon size={14} />
          </Link>
          <div className="flex items-center gap-1.5 ml-1">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-full)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-muted)] transition-all duration-200"
              aria-label="GitHub"
            >
              <GitHubIcon size={18} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-full)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-muted)] transition-all duration-200"
              aria-label="LinkedIn"
            >
              <LinkedInIcon size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* ===== FEATURED PROJECT ===== */}
      <section className="pb-16 md:pb-24 animate-fade-in-up opacity-0 animation-delay-500" aria-label="Featured project">
        {(() => {
          const featured = projects[0];
          return (
            <Link
              href={`/work/${featured.slug}`}
              className="group block rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden hover:border-[var(--border-hover)] transition-all duration-300 hover:shadow-[var(--shadow-16)]"
            >
              {/* Project hero image */}
              {featured.heroImage && (
                <div className="aspect-[16/9] overflow-hidden">
                  <Image
                    src={featured.heroImage}
                    alt={featured.title}
                    width={960}
                    height={540}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                  <h3 className="text-xl md:text-2xl font-semibold text-[var(--text-primary)] md:flex-[5]">
                    {featured.title}
                  </h3>
                  <div className="md:flex-[7]">
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                      {featured.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)]">
                      Read case study <ArrowRightIcon size={14} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })()}
      </section>

      {/* ===== LATEST POSTS ===== */}
      {posts.length > 0 && (
        <section className="pb-16 md:pb-24 animate-fade-in-up opacity-0 animation-delay-600" aria-label="Latest blog posts">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-[var(--border)]" />
            <h2 className="text-sm font-medium text-[var(--text-muted)] shrink-0">
              Latest from the blog
            </h2>
            <div className="h-px flex-1 bg-[var(--border)]" />
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            {posts.slice(0, 4).map((post) => (
              <a
                key={post.url}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-1.5 p-4 rounded-[var(--radius-lg)] border border-transparent hover:border-[var(--border)] hover:bg-[var(--bg-card)] transition-all duration-200"
              >
                <h3 className="text-[15px] font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] line-clamp-1">
                  {post.subtitle}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-[var(--text-muted)]">
                    {post.date}
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">&middot;</span>
                  <span className="text-xs text-[var(--text-muted)]">
                    {post.source}
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-6">
            <Link
              href="/posts"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] hover:underline transition-colors duration-200"
            >
              View all posts <ArrowRightIcon size={12} />
            </Link>
          </div>
        </section>
      )}

      {/* ===== MORE PROJECTS ===== */}
      {projects.length > 1 && (
        <section className="pb-20 md:pb-32 animate-fade-in-up opacity-0 animation-delay-600" aria-label="More projects">
          {projects.slice(1).map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="group block rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden hover:border-[var(--border-hover)] transition-all duration-300 hover:shadow-[var(--shadow-16)]"
            >
              {project.heroImage && (
                <div className="aspect-[16/9] overflow-hidden">
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    width={960}
                    height={540}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                  <h3 className="text-xl md:text-2xl font-semibold text-[var(--text-primary)] md:flex-[5]">
                    {project.title}
                  </h3>
                  <div className="md:flex-[7]">
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)]">
                      Read case study <ArrowRightIcon size={14} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </section>
      )}
    </div>
  );
}
