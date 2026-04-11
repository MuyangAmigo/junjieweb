import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import type {
  Project,
  Persona,
  JourneyStep,
  UserStory,
  Feature,
  ArchitectureLayer,
  ArchitectureInsight,
  ProblemArea,
} from "@/lib/data";
import { ArrowRightIcon } from "@/components/Icons";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Not Found" };
  return {
    title: project.title,
    description: project.description,
  };
}

function SectionHeader({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <h2
      className={`font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)] mb-6 ${className ?? ""}`}
    >
      {label}
    </h2>
  );
}

function PersonaBadge({ type }: { type: Persona["type"] }) {
  const labels = { primary: "Primary User", secondary: "Secondary User", extended: "Extended User" };
  return (
    <span className="inline-block px-2.5 py-0.5 rounded-[var(--radius-md)] text-xs font-mono font-semibold text-[var(--accent)] bg-[var(--bg-muted)] mb-2">
      {labels[type]}
    </span>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div className="max-w-[820px] mx-auto px-6 py-12 md:py-20">
      {/* Back link */}
      <Link
        href="/work"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-200 mb-8"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back to work
      </Link>

      {/* ===== HERO ===== */}
      <section className="mb-16 animate-fade-in-up opacity-0">
        <div className="fluent-card rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-card)] p-6">
          <div className="flex items-start justify-between gap-4 mb-1">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
              {project.title}
            </h1>
            {project.current && (
              <span className="shrink-0 px-2.5 py-0.5 rounded-[var(--radius-md)] text-xs font-semibold font-mono bg-[var(--accent)] text-white mt-1">
                Current
              </span>
            )}
          </div>
          <p className="font-mono text-xs text-[var(--text-muted)] mb-3">
            {project.team} &middot; {project.period}
          </p>
          <p className="text-[var(--text-secondary)] italic mb-2">
            &ldquo;{project.tagline}&rdquo;
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
            {project.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
            {project.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl font-semibold text-[var(--accent)]">
                  {stat.value}
                </div>
                <div className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-2.5">
            {project.marketplaceUrl && (
              <a
                href={project.marketplaceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[var(--radius-lg)] bg-[var(--accent)] text-white text-sm font-medium hover:bg-[var(--accent-hover)] transition-colors duration-200"
              >
                VS Code Marketplace
                <ArrowRightIcon size={12} />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[var(--radius-lg)] border border-[var(--border)] text-sm text-[var(--text-primary)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-muted)] transition-all duration-200"
              >
                GitHub
                <ArrowRightIcon size={12} />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ===== PROBLEM STATEMENT ===== */}
      <section className="mb-16 animate-fade-in-up opacity-0 animation-delay-100">
        <SectionHeader label="Problem Statement" />
        <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
          {project.problemStatement.title}
        </h3>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 max-w-[640px]">
          {project.problemStatement.subtitle}
        </p>
        <div className="grid md:grid-cols-2 gap-3">
          {project.problemStatement.areas.map((area: ProblemArea) => (
            <div
              key={area.title}
              className="fluent-card rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-card)] p-5 hover:border-[var(--border-hover)]"
            >
              <div className="text-2xl mb-3">{area.icon}</div>
              <h4 className="text-base font-semibold text-[var(--text-primary)] mb-1.5">
                {area.title}
              </h4>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== USER PERSONAS ===== */}
      <section className="mb-16 animate-fade-in-up opacity-0 animation-delay-200">
        <SectionHeader label="User Personas" />
        <div className="space-y-3">
          {project.personas.map((persona: Persona) => (
            <div
              key={persona.title}
              className="fluent-card rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-card)] p-5 hover:border-[var(--border-hover)]"
            >
              <PersonaBadge type={persona.type} />
              <h4 className="text-base font-semibold text-[var(--text-primary)] mb-1.5">
                {persona.title}
              </h4>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                {persona.description}
              </p>
              <ul className="space-y-1.5">
                {persona.goals.map((goal: string) => (
                  <li
                    key={goal}
                    className="relative pl-4 text-sm text-[var(--text-secondary)] leading-relaxed before:absolute before:left-0 before:top-[8px] before:w-1 before:h-1 before:rounded-full before:bg-[var(--text-muted)]"
                  >
                    {goal}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ===== USER JOURNEY ===== */}
      <section className="mb-16 animate-fade-in-up opacity-0 animation-delay-200">
        <SectionHeader label="User Journey" />
        <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
          {project.journey.title}
        </h3>
        <div className="fluent-card rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden">
          {project.journey.steps.map((step: JourneyStep, i: number) => (
            <div
              key={step.step}
              className={`px-5 py-4 ${i > 0 ? "border-t border-[var(--border)]" : ""}`}
            >
              <div className="flex items-start gap-4">
                <span className="shrink-0 w-8 h-8 rounded-full bg-[var(--accent)] text-white font-semibold text-sm flex items-center justify-center mt-0.5">
                  {step.step}
                </span>
                <div className="min-w-0">
                  <h4 className="text-base font-semibold text-[var(--text-primary)] mb-1">
                    {step.title}
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {step.description}
                  </p>
                  <p className="text-xs text-[var(--text-muted)] italic mt-2">
                    Pain point: {step.painPoint}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== USER STORIES ===== */}
      <section className="mb-16 animate-fade-in-up opacity-0 animation-delay-300">
        <SectionHeader label="User Stories" />
        <div className="space-y-2">
          {project.userStories.map((story: UserStory, i: number) => (
            <div
              key={i}
              className="fluent-card rounded-[var(--radius-lg)] border border-[var(--border)] border-l-2 border-l-[var(--accent)] bg-[var(--bg-card)] px-5 py-4"
            >
              <p className="font-mono text-xs text-[var(--accent)] uppercase tracking-wide">
                As {story.as}
              </p>
              <p className="text-sm font-semibold text-[var(--text-primary)] mt-1">
                I want to {story.want}
              </p>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                So that {story.soThat}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="mb-16 animate-fade-in-up opacity-0 animation-delay-300">
        <SectionHeader label="Features" />
        <div className="grid md:grid-cols-2 gap-3">
          {project.features.map((feature: Feature) => (
            <div
              key={feature.title}
              className="fluent-card rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-card)] p-5 hover:border-[var(--border-hover)]"
            >
              <span className="inline-block px-2.5 py-0.5 rounded-[var(--radius-md)] text-xs font-mono font-semibold border border-[var(--border)] text-[var(--text-muted)] bg-[var(--bg-muted)] mb-3">
                {feature.badge}
              </span>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xl">{feature.icon}</span>
                <h4 className="text-base font-semibold text-[var(--text-primary)]">
                  {feature.title}
                </h4>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                {feature.description}
              </p>
              <p className="font-mono text-xs text-[var(--accent)] font-semibold">
                {feature.metric}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== ARCHITECTURE ===== */}
      <section className="mb-16 animate-fade-in-up opacity-0 animation-delay-400">
        <SectionHeader label="Technical Architecture" />

        {/* Layered diagram */}
        <div className="fluent-card rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-card)] p-6 mb-6">
          {project.architecture.layers.map(
            (layer: ArchitectureLayer, i: number) => (
              <div key={layer.label}>
                {/* Layer label */}
                <div className="text-center mb-2">
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
                    {layer.label}
                  </span>
                </div>

                {/* Boxes */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
                  {layer.boxes.map((box, j) => (
                    <div
                      key={j}
                      className="px-3 py-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-muted)] text-center min-w-[120px]"
                    >
                      <div className="text-sm font-medium text-[var(--text-primary)]">
                        {box.name}
                      </div>
                      <div className="text-xs text-[var(--text-muted)]">
                        {box.detail}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Arrow connector */}
                {layer.connectorLabel && (
                  <div className="text-center text-[var(--text-muted)] my-3">
                    <div className="text-lg">&darr;</div>
                    <div className="font-mono text-xs">
                      {layer.connectorLabel}
                    </div>
                  </div>
                )}

                {/* Spacing between layers without arrows */}
                {!layer.connectorLabel &&
                  i < project.architecture.layers.length - 1 && (
                    <div className="my-3" />
                  )}
              </div>
            )
          )}

          {/* Tech badges */}
          <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-[var(--border)] justify-center">
            {project.architecture.techBadges.map((badge: string) => (
              <span
                key={badge}
                className="px-2.5 py-1 rounded-[var(--radius-md)] text-xs font-mono border border-[var(--border)] text-[var(--text-secondary)] bg-[var(--bg-card)]"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="grid md:grid-cols-3 gap-3">
          {project.architecture.insights.map(
            (insight: ArchitectureInsight) => (
              <div
                key={insight.title}
                className="fluent-card rounded-[var(--radius-lg)] border border-[var(--border)] border-l-2 border-l-[var(--accent)] bg-[var(--bg-card)] p-4"
              >
                <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1.5">
                  {insight.title}
                </h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {insight.description}
                </p>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
}
