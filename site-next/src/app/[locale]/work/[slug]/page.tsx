import type { Metadata } from "next";
import Link from "next/link";
import SiteImage from "@/components/SiteImage";
import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import type { Persona, JourneyStep, UserStory, Feature, ArchitectureLayer, ArchitectureInsight, ProblemArea } from "@/lib/data";
import { ArrowRightIcon } from "@/components/Icons";
import { locales, isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getLocalizedProjects } from "@/i18n/get-localized-data";

export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const localizedProjects = await getLocalizedProjects(locale as Locale);
  const project = localizedProjects.find((p) => p.slug === slug);
  if (!project) return { title: "Not Found" };
  return { title: project.title, description: project.description };
}

function PersonaBadge({ type, dict }: { type: Persona["type"]; dict: Record<string, string> }) {
  const labels = { primary: dict.primaryUser, secondary: dict.secondaryUser, extended: dict.extendedUser };
  return <span className="inline-block px-2.5 py-0.5 rounded-[var(--radius-full)] text-xs font-medium text-[var(--accent)] bg-[var(--accent-subtle)] mb-2">{labels[type]}</span>;
}

export default async function ProjectPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);
  const localizedProjects = await getLocalizedProjects(locale as Locale);
  const project = localizedProjects.find((p) => p.slug === slug);
  if (!project) notFound();

  const related = localizedProjects.filter((p) => p.slug !== project.slug).slice(0, 1);

  return (
    <div className="max-w-[960px] mx-auto px-6 pt-4 pb-12 md:pt-8 md:pb-20">
      <Link href={`/${locale}/work`} className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-200 mb-8">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
        {dict.work.backToProjects}
      </Link>

      {/* Header */}
      <section className="mb-12 animate-fade-in-up opacity-0">
        <p className="font-mono text-xs text-[var(--text-muted)] mb-3">{project.team} &middot; {project.period}</p>
        <h1 className="display-heading text-3xl md:text-5xl text-[var(--text-primary)] mb-4">{project.title}</h1>
        <p className="text-lg text-[var(--text-secondary)] italic mb-6">&ldquo;{project.tagline}&rdquo;</p>
        <div className="flex flex-wrap gap-2.5 mb-8">
          {project.marketplaceUrl && <a href={project.marketplaceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-full)] bg-[var(--accent)] text-white text-sm font-medium hover:bg-[var(--accent-hover)] transition-colors duration-200">{dict.work.vsCodeMarketplace} <ArrowRightIcon size={12} /></a>}
          {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-full)] border border-[var(--border)] text-sm text-[var(--text-primary)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-muted)] transition-all duration-200">{dict.work.github} <ArrowRightIcon size={12} /></a>}
        </div>
      </section>

      {project.heroImage && (
        <section className="mb-16 animate-fade-in-up opacity-0 animation-delay-100">
          <div className="rounded-[var(--radius-xl)] overflow-hidden border border-[var(--border)]">
            <SiteImage src={project.heroImage} alt={project.title} width={960} height={540} className="w-full h-auto" priority />
          </div>
        </section>
      )}

      <section className="mb-16 animate-fade-in-up opacity-0 animation-delay-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {project.stats.map((stat) => (
            <div key={stat.label} className="text-center p-4 rounded-[var(--radius-lg)] bg-[var(--bg-surface)] border border-[var(--border)]">
              <div className="text-2xl font-semibold text-[var(--accent)]">{stat.value}</div>
              <div className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wide mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-[720px] mx-auto">
        {/* Problem */}
        <section className="mb-16"><h2 className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wide mb-6">{dict.work.problemStatement}</h2><h3 className="text-xl md:text-2xl font-semibold text-[var(--text-primary)] mb-3">{project.problemStatement.title}</h3><p className="text-[var(--text-secondary)] leading-relaxed mb-8">{project.problemStatement.subtitle}</p><div className="grid md:grid-cols-2 gap-4">{project.problemStatement.areas.map((area: ProblemArea) => (<div key={area.title} className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-surface)] p-5 hover-lift"><div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--accent-subtle)] border border-[var(--accent)]/20 flex items-center justify-center text-lg mb-3" aria-hidden="true">{area.icon}</div><h4 className="text-[15px] font-semibold text-[var(--text-primary)] mb-1.5">{area.title}</h4><p className="text-sm text-[var(--text-secondary)] leading-relaxed">{area.description}</p></div>))}</div></section>

        {/* Personas */}
        <section className="mb-16"><h2 className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wide mb-6">{dict.work.userPersonas}</h2><div className="space-y-4">{project.personas.map((persona: Persona) => (<div key={persona.title} className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-surface)] p-5 hover-lift"><PersonaBadge type={persona.type} dict={dict.work} /><h4 className="text-[15px] font-semibold text-[var(--text-primary)] mb-1.5">{persona.title}</h4><p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">{persona.description}</p><ul className="space-y-1.5">{persona.goals.map((goal: string) => (<li key={goal} className="relative pl-4 text-sm text-[var(--text-secondary)] leading-relaxed before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[var(--accent-subtle)] before:border before:border-[var(--accent)]">{goal}</li>))}</ul></div>))}</div></section>

        {/* Journey */}
        <section className="mb-16"><h2 className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wide mb-6">{dict.work.userJourney}</h2><h3 className="text-xl md:text-2xl font-semibold text-[var(--text-primary)] mb-6">{project.journey.title}</h3><div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-surface)] overflow-hidden">{project.journey.steps.map((step: JourneyStep, i: number) => (<div key={step.step} className={`px-5 py-5 ${i > 0 ? "border-t border-[var(--border)]" : ""}`}><div className="flex items-start gap-4"><span className="shrink-0 w-8 h-8 rounded-full bg-[var(--accent)] text-white font-semibold text-sm flex items-center justify-center mt-0.5">{step.step}</span><div className="min-w-0"><h4 className="text-[15px] font-semibold text-[var(--text-primary)] mb-1">{step.title}</h4><p className="text-sm text-[var(--text-secondary)] leading-relaxed">{step.description}</p><p className="text-xs text-[var(--text-muted)] italic mt-2">{dict.work.painPoint}: {step.painPoint}</p></div></div></div>))}</div></section>

        {/* Stories */}
        <section className="mb-16"><h2 className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wide mb-6">{dict.work.userStories}</h2><div className="space-y-3">{project.userStories.map((story: UserStory, i: number) => (<div key={i} className="rounded-[var(--radius-lg)] border border-[var(--border)] border-l-2 border-l-[var(--accent)] bg-[var(--bg-surface)] px-5 py-4"><p className="font-mono text-xs text-[var(--accent)] uppercase tracking-wide">As {story.as}</p><p className="text-sm font-semibold text-[var(--text-primary)] mt-1">I want to {story.want}</p><p className="text-sm text-[var(--text-secondary)] mt-1">So that {story.soThat}</p></div>))}</div></section>

        {/* Features */}
        <section className="mb-16"><h2 className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wide mb-6">{dict.work.features}</h2><div className="grid md:grid-cols-2 gap-4">{project.features.map((feature: Feature) => (<div key={feature.title} className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-surface)] p-5 hover-lift"><span className="inline-block px-2.5 py-0.5 rounded-[var(--radius-full)] text-xs font-mono font-medium border border-[var(--border)] text-[var(--text-muted)] mb-3">{feature.badge}</span><div className="flex items-center gap-2 mb-1.5"><span className="text-lg" aria-hidden="true">{feature.icon}</span><h4 className="text-[15px] font-semibold text-[var(--text-primary)]">{feature.title}</h4></div><p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">{feature.description}</p><p className="font-mono text-xs text-[var(--accent)] font-medium">{feature.metric}</p></div>))}</div></section>

        {/* Architecture */}
        <section className="mb-16"><h2 className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wide mb-6">{dict.work.technicalArchitecture}</h2><div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-surface)] p-6 mb-6">{project.architecture.layers.map((layer: ArchitectureLayer, i: number) => (<div key={layer.label}><div className="text-center mb-2"><span className="font-mono text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">{layer.label}</span></div><div className="flex flex-wrap items-center justify-center gap-2 mb-2">{layer.boxes.map((box, j) => (<div key={j} className="px-3 py-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-card)] text-center min-w-[110px]"><div className="text-sm font-medium text-[var(--text-primary)]">{box.name}</div><div className="text-xs text-[var(--text-muted)]">{box.detail}</div></div>))}</div>{layer.connectorLabel && <div className="text-center text-[var(--text-muted)] my-3"><div className="text-lg">&darr;</div><div className="font-mono text-xs">{layer.connectorLabel}</div></div>}{!layer.connectorLabel && i < project.architecture.layers.length - 1 && <div className="my-3" />}</div>))}<div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-[var(--border)] justify-center">{project.architecture.techBadges.map((badge: string) => (<span key={badge} className="px-2.5 py-1 rounded-[var(--radius-full)] text-xs font-mono border border-[var(--border)] text-[var(--text-secondary)]">{badge}</span>))}</div></div><div className="grid md:grid-cols-3 gap-4">{project.architecture.insights.map((insight: ArchitectureInsight) => (<div key={insight.title} className="rounded-[var(--radius-lg)] border border-[var(--border)] border-l-2 border-l-[var(--accent)] bg-[var(--bg-surface)] p-4"><h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1.5">{insight.title}</h4><p className="text-xs text-[var(--text-secondary)] leading-relaxed">{insight.description}</p></div>))}</div></section>
      </div>

      {related.length > 0 && (
        <section className="pt-8 border-t border-[var(--border)]">
          <h2 className="text-sm font-medium text-[var(--text-muted)] mb-6">{dict.work.relatedProjects}</h2>
          {related.map((rp) => (
            <Link key={rp.slug} href={`/${locale}/work/${rp.slug}`} className="group block minimal-card rounded-[var(--radius-xl)] overflow-hidden">
              {rp.heroImage && <div className="aspect-[16/9] overflow-hidden"><SiteImage src={rp.heroImage} alt={rp.title} width={960} height={540} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" /></div>}
              <div className="p-6 md:p-8"><div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8"><h3 className="text-xl font-semibold text-[var(--text-primary)] md:flex-[5]">{rp.title}</h3><div className="md:flex-[7]"><p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">{rp.description}</p><span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)]">{dict.work.readCaseStudy}<span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5"><ArrowRightIcon size={14} /></span></span></div></div></div>
            </Link>
          ))}
        </section>
      )}
    </div>
  );
}
