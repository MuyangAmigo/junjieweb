import type { Metadata } from "next";
import Image from "next/image";
import { profile } from "@/lib/data";
import { GitHubIcon, LinkedInIcon, EmailIcon } from "@/components/Icons";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getLocalizedProfile, getLocalizedExperience, getLocalizedEducation, getLocalizedSkills } from "@/i18n/get-localized-data";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return { title: dict.about.introduction, description: `${profile.name} — ${profile.title} at ${profile.company}` };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const localizedProfile = await getLocalizedProfile(locale as Locale);
  const experience = await getLocalizedExperience(locale as Locale);
  const education = await getLocalizedEducation(locale as Locale);
  const skills = await getLocalizedSkills(locale as Locale);

  const sections = [
    { id: "intro", label: dict.about.introduction },
    { id: "experience", label: dict.about.workExperience },
    { id: "education", label: dict.about.education },
    { id: "skills", label: dict.about.technicalSkills },
  ];

  return (
    <div className="max-w-[960px] mx-auto px-6 pt-4 pb-12 md:pt-8 md:pb-20">
      <div className="flex gap-16">
        <aside className="hidden lg:block w-[200px] shrink-0">
          <div className="sticky top-24">
            <Image src="https://junjieblob.blob.core.windows.net/images/profile_photo.jpeg" alt={profile.name} width={120} height={120} className="rounded-full object-cover border-2 border-[var(--border)] mb-4" style={{ width: 120, height: 120 }} priority />
            <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] mb-6">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
              {profile.location}
            </div>
            <nav className="space-y-1">
              {sections.map((s) => (<a key={s.id} href={`#${s.id}`} className="block text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200 py-1">{s.label}</a>))}
            </nav>
          </div>
        </aside>
        <div className="flex-1 min-w-0">
          <section className="mb-16 animate-fade-in-up opacity-0" id="intro">
            <div className="lg:hidden flex items-center gap-4 mb-6">
              <Image src="https://junjieblob.blob.core.windows.net/images/profile_photo.jpeg" alt={profile.name} width={80} height={80} className="rounded-full object-cover border-2 border-[var(--border)]" style={{ width: 80, height: 80 }} priority />
              <div><h1 className="display-heading text-2xl text-[var(--text-primary)]">{profile.name}</h1><p className="text-sm text-[var(--text-muted)] mt-1">{profile.title} at {profile.company}</p></div>
            </div>
            <div className="hidden lg:block mb-4"><h1 className="display-heading text-3xl md:text-4xl text-[var(--text-primary)]">{profile.name}</h1><p className="text-[var(--text-muted)] mt-1">{profile.title} at {profile.company}</p></div>
            <div className="flex flex-wrap gap-2 mb-6">
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[var(--radius-full)] bg-[#0A66C2] text-white text-sm font-medium hover:bg-[#004182] transition-colors duration-200"><LinkedInIcon size={14} />LinkedIn</a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[var(--radius-full)] border border-[var(--border)] text-sm text-[var(--text-primary)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-muted)] transition-all duration-200"><GitHubIcon size={14} />GitHub</a>
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[var(--radius-full)] border border-[var(--border)] text-sm text-[var(--text-primary)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-muted)] transition-all duration-200"><EmailIcon size={14} />Email</a>
            </div>
            <p className="text-[var(--text-secondary)] leading-[1.75] text-[15px]">{localizedProfile.bio}</p>
          </section>

          <section className="mb-16 animate-fade-in-up opacity-0 animation-delay-100" id="experience">
            <h2 className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wide mb-8">{dict.about.workExperience}</h2>
            <div className="space-y-10">
              {experience.map((exp, i) => (<div key={i}>{exp.roles.map((role, j) => (<div key={j} className={j > 0 ? "mt-6" : ""}><div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-2"><h3 className="text-lg font-semibold text-[var(--text-primary)]">{exp.company}</h3><span className="font-mono text-xs text-[var(--text-muted)]">{role.period}</span></div><p className="text-sm text-[var(--text-muted)] mb-3">{role.title}</p><ul className="space-y-2">{role.bullets.map((b, k) => (<li key={k} className="relative pl-4 text-[15px] text-[var(--text-secondary)] leading-relaxed before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[var(--accent-subtle)] before:border before:border-[var(--accent)]">{b}</li>))}</ul></div>))}</div>))}
            </div>
          </section>

          <section className="mb-16 animate-fade-in-up opacity-0 animation-delay-200" id="education">
            <h2 className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wide mb-8">{dict.about.education}</h2>
            <div className="space-y-6">
              {education.map((edu, i) => (<div key={i}><h3 className="text-lg font-semibold text-[var(--text-primary)]">{edu.school}</h3><p className="text-sm text-[var(--text-muted)] mt-1">{edu.degree} &middot; GPA: {edu.gpa} &middot; {edu.period}</p>{"dualDegree" in edu && edu.dualDegree && <p className="text-sm text-[var(--text-secondary)] mt-2">{edu.dualDegree}</p>}{"publication" in edu && edu.publication && <p className="text-xs text-[var(--text-secondary)] mt-2 italic">{edu.publication}</p>}</div>))}
            </div>
          </section>

          <section className="animate-fade-in-up opacity-0 animation-delay-300" id="skills">
            <h2 className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wide mb-8">{dict.about.technicalSkills}</h2>
            <div className="space-y-8">
              {Object.entries(skills).map(([cat, items]) => (<div key={cat}><h3 className="text-base font-semibold text-[var(--text-primary)] mb-3">{cat}</h3><div className="flex flex-wrap gap-2">{(items as string[]).map((s) => (<span key={s} className="px-3 py-1.5 rounded-[var(--radius-full)] text-xs font-mono border border-[var(--border)] text-[var(--text-secondary)]">{s}</span>))}</div></div>))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
