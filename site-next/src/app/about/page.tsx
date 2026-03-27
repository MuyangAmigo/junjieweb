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
    <div className="flex flex-wrap gap-2.5">
      <a
        href={profile.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[var(--radius-lg)] bg-[#0A66C2] text-white text-sm font-medium hover:bg-[#004182] transition-colors duration-200"
      >
        <LinkedInIcon size={14} />
        LinkedIn
      </a>
      <a
        href={profile.github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[var(--radius-lg)] border border-[var(--border)] text-sm text-[var(--text-primary)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-muted)] transition-all duration-200"
      >
        <GitHubIcon size={14} />
        GitHub
      </a>
      <a
        href={`mailto:${profile.email}`}
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[var(--radius-lg)] border border-[var(--border)] text-sm text-[var(--text-primary)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-muted)] transition-all duration-200"
      >
        <EmailIcon size={14} />
        Email
      </a>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="max-w-[820px] mx-auto px-6 py-12 md:py-20">
      {/* ===== HERO ===== */}
      <section className="mb-16 animate-fade-in-up opacity-0">
        <div className="fluent-card rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-card)] p-6 hover:border-[var(--border-hover)]">
          <div className="flex items-center gap-5 mb-5">
            <Image
              src="/profile.jpg"
              alt={profile.name}
              width={80}
              height={80}
              className="rounded-full object-cover border-2 border-[var(--border)]"
              style={{ width: 80, height: 80, objectPosition: "85% 10%" }}
              priority
            />
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
                {profile.name}
              </h1>
              <p className="text-sm text-[var(--text-muted)] mt-1">
                {profile.title} at {profile.company}
              </p>
            </div>
          </div>
          <SocialLinks />
        </div>
      </section>

      {/* ===== EXPERIENCE ===== */}
      <section className="mb-16 animate-fade-in-up opacity-0 animation-delay-100">
        <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)] mb-6">
          Experience
        </h2>

        <div className="space-y-4">
          {experience.map((exp, i) => (
            <div
              key={i}
              className="fluent-card rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden hover:border-[var(--border-hover)]"
            >
              {/* Company header */}
              <div className="px-5 pt-5 pb-3">
                <h3 className="text-base font-semibold text-[var(--text-primary)]">
                  {exp.company}
                </h3>
              </div>

              {/* Table header */}
              <div className="hidden md:grid grid-cols-[180px_160px_1fr] gap-0 px-5 pb-2 border-b border-[var(--border)]">
                <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide">Job Title</span>
                <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide">Date</span>
                <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide">Details</span>
              </div>

              {/* Roles */}
              {exp.roles.map((role, j) => (
                <div
                  key={j}
                  className={`px-5 py-4 ${j > 0 ? "border-t border-[var(--border)]" : ""}`}
                >
                  {/* Mobile layout */}
                  <div className="md:hidden">
                    <div className="text-sm font-semibold text-[var(--text-secondary)] mb-1">
                      {role.title}
                    </div>
                    <div className="font-mono text-xs text-[var(--text-muted)] mb-3">
                      {role.period}
                    </div>
                    <ul className="space-y-1.5">
                      {role.bullets.map((bullet, k) => (
                        <li
                          key={k}
                          className="relative pl-4 text-sm text-[var(--text-secondary)] leading-relaxed before:absolute before:left-0 before:top-[8px] before:w-1 before:h-1 before:rounded-full before:bg-[var(--text-muted)]"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Desktop table layout */}
                  <div className="hidden md:grid grid-cols-[180px_160px_1fr] gap-0 items-start">
                    <div className="text-sm font-medium text-[var(--text-secondary)] pr-4">
                      {role.title}
                    </div>
                    <div className="font-mono text-xs text-[var(--text-muted)] pt-0.5">
                      {role.period}
                    </div>
                    <ul className="space-y-1.5">
                      {role.bullets.map((bullet, k) => (
                        <li
                          key={k}
                          className="relative pl-4 text-sm text-[var(--text-secondary)] leading-relaxed before:absolute before:left-0 before:top-[8px] before:w-1 before:h-1 before:rounded-full before:bg-[var(--text-muted)]"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ===== EDUCATION ===== */}
      <section className="mb-16 animate-fade-in-up opacity-0 animation-delay-200">
        <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)] mb-6">
          Education
        </h2>

        <div className="space-y-4">
          {education.map((edu, i) => (
            <div
              key={i}
              className="fluent-card rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-card)] p-5 hover:border-[var(--border-hover)]"
            >
              <span className="font-semibold text-[var(--text-primary)]">{edu.school}</span>
              <div className="text-[15px] font-medium text-[var(--accent)] mt-2 mb-1">
                {edu.degree}
              </div>
              <div className="font-mono text-xs text-[var(--text-muted)] mb-3">
                GPA: {edu.gpa} &middot; {edu.period}
              </div>
              {"dualDegree" in edu && edu.dualDegree && (
                <div className="text-xs text-[var(--text-secondary)] border-t border-[var(--border)] pt-2.5 mb-2.5">
                  {edu.dualDegree}
                </div>
              )}
              {"publication" in edu && edu.publication && (
                <div className="text-xs text-[var(--text-secondary)] border-t border-[var(--border)] pt-2.5">
                  <span className="font-semibold text-[var(--text-muted)] uppercase tracking-wide text-[10px] font-mono">Publication · </span>
                  {edu.publication}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ===== SKILLS ===== */}
      <section className="animate-fade-in-up opacity-0 animation-delay-300">
        <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)] mb-6">
          Skills &amp; Expertise
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-xs font-semibold text-[var(--text-secondary)] mb-2.5">
                {category}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-[var(--radius-md)] text-xs font-mono border border-[var(--border)] text-[var(--text-secondary)] bg-[var(--bg-card)]"
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
  );
}
