import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon } from "@/components/Icons";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getLocalizedProjects } from "@/i18n/get-localized-data";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return { title: dict.work.projects };
}

export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const projects = await getLocalizedProjects(locale as Locale);

  return (
    <div className="max-w-[960px] mx-auto px-6 py-8 md:py-16">
      <h1 className="display-heading text-3xl md:text-5xl text-[var(--text-primary)] text-center mb-12">{dict.work.projects}</h1>
      <div className="space-y-8">
        {projects.map((project) => (
          <Link key={project.slug} href={`/${locale}/work/${project.slug}`} className="group block minimal-card rounded-[var(--radius-xl)] overflow-hidden">
            {project.heroImage && (
              <div className="aspect-[16/9] overflow-hidden">
                <Image src={project.heroImage} alt={project.title} width={960} height={540} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
              </div>
            )}
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                <div className="md:flex-[5]">
                  <h2 className="text-xl md:text-2xl font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-200 mb-2">{project.title}</h2>
                  <p className="font-mono text-xs text-[var(--text-muted)]">{project.team} &middot; {project.period}</p>
                </div>
                <div className="md:flex-[7]">
                  <p className="text-sm text-[var(--text-secondary)] leading-[1.7] mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.stats.slice(0, 3).map((stat) => (
                      <span key={stat.label} className="px-2.5 py-1 rounded-[var(--radius-full)] text-xs font-mono bg-[rgba(14,165,233,0.05)] border border-[rgba(14,165,233,0.2)] text-[#7dd3fc]">{stat.value} {stat.label.toLowerCase()}</span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)]">
                    {dict.work.readCaseStudy}
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5"><ArrowRightIcon size={14} /></span>
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
