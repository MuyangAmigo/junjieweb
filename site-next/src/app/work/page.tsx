import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/lib/data";
import { ArrowRightIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Products I've built at Microsoft — AI Toolkit for VS Code and Microsoft 365 Agents Toolkit.",
};

export default function WorkPage() {
  return (
    <div className="max-w-[960px] mx-auto px-6 py-12 md:py-24">
      <h1 className="display-heading text-3xl md:text-5xl text-[var(--text-primary)] text-center mb-16">
        Projects
      </h1>

      <div className="space-y-8">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="group block rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden hover:border-[var(--border-hover)] transition-all duration-300 hover:shadow-[var(--shadow-16)]"
          >
            {/* Hero image */}
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

            {/* Card content */}
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                <div className="md:flex-[5]">
                  <h2 className="text-xl md:text-2xl font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-200 mb-2">
                    {project.title}
                  </h2>
                  <p className="font-mono text-xs text-[var(--text-muted)]">
                    {project.team} &middot; {project.period}
                  </p>
                </div>

                <div className="md:flex-[7]">
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Stats as pills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.stats.slice(0, 3).map((stat) => (
                      <span
                        key={stat.label}
                        className="px-2.5 py-1 rounded-[var(--radius-full)] text-xs font-mono border border-[var(--border)] text-[var(--text-secondary)]"
                      >
                        {stat.value} {stat.label.toLowerCase()}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)]">
                    Read case study <ArrowRightIcon size={14} />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
