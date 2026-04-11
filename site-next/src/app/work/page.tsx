import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/data";
import { ArrowRightIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Products I've built at Microsoft — AI Toolkit for VS Code and Microsoft 365 Agents Toolkit.",
};

export default function WorkPage() {
  return (
    <div className="max-w-[820px] mx-auto px-6 py-12 md:py-20">
      <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[var(--text-primary)] mb-3">
        Work
      </h1>
      <p className="text-lg text-[var(--text-secondary)] mb-10">
        Products I&apos;ve built at Microsoft.
      </p>

      <div className="space-y-4">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="fluent-card group block rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-card)] p-5 hover:border-[var(--accent)]"
          >
            <div className="flex items-start justify-between gap-4 mb-2">
              <h2 className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-200">
                {project.title}
              </h2>
              {project.current && (
                <span className="shrink-0 px-2.5 py-0.5 rounded-[var(--radius-md)] text-xs font-semibold font-mono bg-[var(--accent)] text-white">
                  Current
                </span>
              )}
            </div>
            <p className="font-mono text-xs text-[var(--text-muted)] mb-3">
              {project.team} &middot; {project.period}
            </p>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
              {project.description}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {project.stats.slice(0, 3).map((stat) => (
                <span
                  key={stat.label}
                  className="px-2.5 py-1 rounded-[var(--radius-md)] text-xs font-mono border border-[var(--border)] text-[var(--text-secondary)] bg-[var(--bg-card)]"
                >
                  {stat.value} {stat.label.toLowerCase()}
                </span>
              ))}
              <span className="ml-auto text-sm text-[var(--accent)] inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                View details <ArrowRightIcon size={12} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
