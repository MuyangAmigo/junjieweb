import Link from "next/link";
import Image from "next/image";
import { profile, projects } from "@/lib/data";
import { GitHubIcon, LinkedInIcon, ArrowRightIcon } from "@/components/Icons";
import CountUp from "@/components/CountUp";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getLocalizedPosts } from "@/i18n/get-localized-data";
import { notFound } from "next/navigation";

const tagColors: Record<string, string> = {
  Release: "text-[#22c55e] bg-[#22c55e]/10 border-[#22c55e]/20",
  Feature: "text-[#a78bfa] bg-[#a78bfa]/10 border-[#a78bfa]/20",
  Tutorial: "text-[#38bdf8] bg-[#38bdf8]/10 border-[#38bdf8]/20",
  Integration: "text-[#fb923c] bg-[#fb923c]/10 border-[#fb923c]/20",
  Announcement: "text-[#f472b6] bg-[#f472b6]/10 border-[#f472b6]/20",
};

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);
  const localizedPosts = await getLocalizedPosts(locale as Locale);
  const recentPosts = localizedPosts.slice(0, 3);

  return (
    <div className="max-w-[960px] mx-auto px-6">
      {/* ===== SECTION A: HERO & FOCUS ===== */}
      <section className="pt-12 pb-16 md:pt-20 md:pb-20 relative" aria-label="Introduction">
        {/* Breathing gradient orb */}
        <div className="hero-orb" style={{ top: "20%", left: "70%" }} />

        <h1 className="display-heading text-4xl md:text-6xl lg:text-7xl text-[var(--text-primary)] mb-6 max-w-[800px] animate-fade-in-up opacity-0 relative z-1">
          {dict.home.heroHeading}
        </h1>

        <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-[1.7] max-w-[600px] mb-6 animate-fade-in-up opacity-0 animation-delay-100">
          {dict.home.heroSubtitle}
        </p>

        <div className="animate-fade-in-up opacity-0 animation-delay-200 mb-10">
          <Link
            href={`/${locale}/work/ai-toolkit`}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[var(--radius-full)] bg-[var(--accent-subtle)] border border-[var(--accent)]/20 text-sm text-[var(--accent)] font-medium hover:bg-[var(--accent)]/15 transition-colors duration-200"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            {dict.home.currentFocus}
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-3 animate-fade-in-up opacity-0 animation-delay-300">
          <Link
            href={`/${locale}/about`}
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
            <span className="text-sm font-medium text-[var(--text-primary)]">{dict.home.aboutMe}</span>
            <ArrowRightIcon size={14} />
          </Link>
          <div className="flex items-center gap-1.5 ml-1">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-full)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-muted)] transition-all duration-200" aria-label={dict.common.githubProfile}>
              <GitHubIcon size={18} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-full)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-muted)] transition-all duration-200" aria-label={dict.common.linkedinProfile}>
              <LinkedInIcon size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* ===== SECTION B: IMPACT STRIP ===== */}
      <section className="pb-16 md:pb-20 animate-fade-in-up opacity-0 animation-delay-400" aria-label="Impact metrics">
        <div className="minimal-card rounded-[var(--radius-xl)] p-6 md:p-8">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <CountUp value="1M+" className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)]" />
              <div className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wide mt-1">{dict.home.totalInstalls}</div>
            </div>
            <div className="border-x border-[var(--border)]">
              <CountUp value="130K" className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)]" />
              <div className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wide mt-1">{dict.home.peakMau}</div>
            </div>
            <div>
              <CountUp value="2" className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)]" />
              <div className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wide mt-1">{dict.home.toolkitsLaunched}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION C: SELECTED WORK ===== */}
      <section className="pb-16 md:pb-20 animate-fade-in-up opacity-0 animation-delay-500" aria-label="Selected work">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wide">{dict.home.selectedWork}</h2>
          <Link href={`/${locale}/work`} className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] hover:underline transition-colors duration-200">
            {dict.home.viewAll}
            <span className="inline-block transition-transform duration-200 hover:translate-x-0.5"><ArrowRightIcon size={12} /></span>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((project, i) => (
            <Link
              key={project.slug}
              href={`/${locale}/work/${project.slug}`}
              className="group spatial-card p-2"
            >
              <div className="rounded-[var(--radius-xl)] bg-[var(--bg-surface)] p-5 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <span className="micro text-[var(--text-muted)]">{project.team}</span>
                  <span className="micro text-[var(--text-muted)]">{project.period}</span>
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-200 mb-3">{project.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-[1.7] mb-4 flex-1">
                  {i === 0 ? dict.home.aiToolkitSummary : dict.home.m365ToolkitSummary}
                </p>
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-[var(--radius-full)] text-xs font-mono bg-[rgba(14,165,233,0.05)] border border-[rgba(14,165,233,0.2)] text-[#7dd3fc]">
                    {project.stats[0].value} {project.stats[0].label.toLowerCase()}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-200">
                    {dict.home.viewCaseStudy}
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5"><ArrowRightIcon size={14} /></span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== SECTION D: LATEST WRITING ===== */}
      <section className="pb-20 md:pb-32 animate-fade-in-up opacity-0 animation-delay-600" aria-label="Latest writing">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-[var(--border)]" />
          <h2 className="text-sm font-medium text-[var(--text-muted)] shrink-0">{dict.home.latestWriting}</h2>
          <div className="h-px flex-1 bg-[var(--border)]" />
        </div>

        <div className="space-y-2">
          {recentPosts.map((post) => (
            <a
              key={post.url}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start justify-between gap-4 minimal-card rounded-[var(--radius-lg)] p-5"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className={`px-2 py-0.5 rounded-[var(--radius-full)] text-[10px] font-medium border ${tagColors[post.tag]}`}>{post.tag}</span>
                  <span className="font-mono text-[10px] text-[var(--text-muted)]">{post.date}</span>
                </div>
                <h3 className="text-[15px] font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-200 mb-1">{post.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] line-clamp-1">{post.subtitle}</p>
              </div>
              <span className="shrink-0 mt-6 inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-200">
                {dict.home.read}
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5"><ArrowRightIcon size={12} /></span>
              </span>
            </a>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link href={`/${locale}/posts`} className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] hover:underline transition-colors duration-200">
            {dict.home.readAllPosts}
            <span className="inline-block transition-transform duration-200 hover:translate-x-0.5"><ArrowRightIcon size={12} /></span>
          </Link>
        </div>
      </section>
    </div>
  );
}
