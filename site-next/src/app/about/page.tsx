import type { Metadata } from "next";
import Image from "next/image";
import { profile, experience, education, skills } from "@/lib/data";
import { GitHubIcon, LinkedInIcon, EmailIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "About",
  description: `${profile.name} — ${profile.title} at ${profile.company}. Full resume and career details.`,
};

function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-2">
      <a
        href={profile.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[var(--radius-full)] bg-[#0A66C2] text-white text-sm font-medium hover:bg-[#004182] transition-colors duration-200"
      >
        <LinkedInIcon size={14} />
        LinkedIn
      </a>
      <a
        href={profile.github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[var(--radius-full)] border border-[var(--border)] text-sm text-[var(--text-primary)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-muted)] transition-all duration-200"
      >
        <GitHubIcon size={14} />
        GitHub
      </a>
      <a
        href={`mailto:${profile.email}`}
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[var(--radius-full)] border border-[var(--border)] text-sm text-[var(--text-primary)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-muted)] transition-all duration-200"
      >
        <EmailIcon size={14} />
        Email
      </a>
    </div>
  );
}

export default function AboutPage() {
  const sections = [
    { id: "intro", label: "Introduction" },
    { id: "experience", label: "Work Experience" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Technical Skills" },
  ];

  return (
    <div className="max-w-[960px] mx-auto px-6 py-12 md:py-20">
      <div className="flex gap-16">
        {/* Sidebar — sticky on desktop, hidden on mobile */}
        <aside className="hidden lg:block w-[200px] shrink-0">
          <div className="sticky top-24">
            {/* Avatar */}
            <Image
              src="https://junjieblob.blob.core.windows.net/images/profile.jpg"
              alt={profile.name}
              width={120}
              height={120}
              className="rounded-full object-cover border-2 border-[var(--border)] mb-4"
              style={{ width: 120, height: 120, objectPosition: "85% 10%" }}
              priority
            />

            {/* Location */}
            <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] mb-6">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              {profile.location}
            </div>

            {/* Table of Contents */}
            <nav className="space-y-1">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200 py-1"
                >
                  {section.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* ===== HERO ===== */}
          <section className="mb-16 animate-fade-in-up opacity-0" id="intro">
            {/* Mobile avatar */}
            <div className="lg:hidden flex items-center gap-4 mb-6">
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
                <h1 className="display-heading text-2xl text-[var(--text-primary)]">
                  {profile.name}
                </h1>
                <p className="text-sm text-[var(--text-muted)] mt-1">
                  {profile.title} at {profile.company}
                </p>
              </div>
            </div>

            {/* Desktop name */}
            <div className="hidden lg:block mb-4">
              <h1 className="display-heading text-3xl md:text-4xl text-[var(--text-primary)]">
                {profile.name}
              </h1>
              <p className="text-[var(--text-muted)] mt-1">
                {profile.title} at {profile.company}
              </p>
            </div>

            <div className="mb-6">
              <SocialLinks />
            </div>

            <p className="text-[var(--text-secondary)] leading-[1.75] text-[15px]">
              {profile.bio}
            </p>
          </section>

          {/* ===== EXPERIENCE ===== */}
          <section className="mb-16 animate-fade-in-up opacity-0 animation-delay-100" id="experience">
            <h2 className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wide mb-8">
              Work Experience
            </h2>

            <div className="space-y-10">
              {experience.map((exp, i) => (
                <div key={i}>
                  {exp.roles.map((role, j) => (
                    <div key={j} className={j > 0 ? "mt-6" : ""}>
                      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-2">
                        <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                          {exp.company}
                        </h3>
                        <span className="font-mono text-xs text-[var(--text-muted)]">
                          {role.period}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--text-muted)] mb-3">
                        {role.title}
                      </p>
                      <ul className="space-y-2">
                        {role.bullets.map((bullet, k) => (
                          <li
                            key={k}
                            className="relative pl-4 text-[15px] text-[var(--text-secondary)] leading-relaxed before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[var(--accent-subtle)] before:border before:border-[var(--accent)]"
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

          {/* ===== EDUCATION ===== */}
          <section className="mb-16 animate-fade-in-up opacity-0 animation-delay-200" id="education">
            <h2 className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wide mb-8">
              Education
            </h2>

            <div className="space-y-6">
              {education.map((edu, i) => (
                <div key={i}>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                    {edu.school}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] mt-1">
                    {edu.degree} &middot; GPA: {edu.gpa} &middot; {edu.period}
                  </p>
                  {"dualDegree" in edu && edu.dualDegree && (
                    <p className="text-sm text-[var(--text-secondary)] mt-2">
                      {edu.dualDegree}
                    </p>
                  )}
                  {"publication" in edu && edu.publication && (
                    <p className="text-xs text-[var(--text-secondary)] mt-2 italic">
                      Publication: {edu.publication}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ===== SKILLS ===== */}
          <section className="animate-fade-in-up opacity-0 animation-delay-300" id="skills">
            <h2 className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wide mb-8">
              Technical Skills
            </h2>

            <div className="space-y-8">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-base font-semibold text-[var(--text-primary)] mb-3">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-[var(--radius-full)] text-xs font-mono border border-[var(--border)] text-[var(--text-secondary)]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
