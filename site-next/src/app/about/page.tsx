import type { Metadata } from "next";
import { profile, experience, education, skills } from "@/lib/data";

function CompanyLogo({ company }: { company: string }) {
  if (company === "Microsoft") {
    return (
      <svg viewBox="0 0 21 21" width="20" height="20" aria-label="Microsoft">
        <rect x="1" y="1" width="9" height="9" fill="#f25022" />
        <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
        <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
        <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
      </svg>
    );
  }
  if (company === "Apple") {
    return (
      <svg viewBox="0 0 814 1000" width="18" height="18" fill="currentColor" className="text-[var(--text-secondary)]" aria-label="Apple">
        <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.9-164-39.9c-76.5 0-103.7 40.8-165.9 40.8s-105-57.9-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 268.5-317.3 70.1 0 128.4 46.4 172.5 46.4 42.8 0 109.7-49.3 188.2-49.3zM639.5 98.8c33.7-40.8 57.7-97.7 57.7-154.6 0-8.1-.6-16.2-2-23.7-54.5 2-118.4 36.3-158 81.3-30.7 35.7-58.3 92.6-58.3 150.2 0 8.7 1.4 17.4 2 20.1 3.2.6 8.1 1.4 13 1.4 48.7 0 109.4-32.4 145.6-74.7z" />
      </svg>
    );
  }
  if (company === "Trip.com Group") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="https://dimg04.tripcdn.com/images/05E5012000rqtcwsyC749.png"
        alt="Trip.com"
        width={20}
        height={20}
        className="object-contain"
      />
    );
  }
  return (
    <span className="text-[var(--accent)] font-bold text-sm">{company[0]}</span>
  );
}

function SchoolLogo({ school }: { school: string }) {
  if (school === "Northwestern University") {
    return (
      <svg viewBox="0 0 32 32" width="20" height="20" aria-label="Northwestern University">
        <rect width="32" height="32" rx="4" fill="#4E2A84" />
        <text x="16" y="23" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="serif">N</text>
      </svg>
    );
  }
  // Generic graduation cap for other schools
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="text-[var(--text-secondary)]" aria-label={school}>
      <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: "About",
  description: `${profile.name} — ${profile.title} at ${profile.company}. Full resume and career details.`,
};

export default function AboutPage() {
  return (
    <div className="max-w-[820px] mx-auto px-6 py-12 md:py-20">
      {/* ===== HERO ===== */}
      <section className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
          About Me
        </h1>
        <div className="flex items-center gap-2 mb-5">
          <span className="text-[var(--accent)] font-medium text-sm">
            {profile.title} &middot; {profile.company} {profile.team}
          </span>
          <span className="text-[var(--text-muted)] text-sm">
            {profile.location}
          </span>
        </div>
        <p className="text-[17px] text-[var(--text-secondary)] leading-relaxed">
          I build developer tools that turn complex AI capabilities into accessible experiences.
          With a background spanning software engineering at Apple, product management at Trip.com,
          and now leading AI developer tooling at Microsoft, I bring a unique blend of technical
          depth and product vision.
        </p>
        <div className="flex flex-wrap gap-2.5 mt-6">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[var(--border)] text-sm text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-all"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[var(--border)] text-sm text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-all"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[var(--border)] text-sm text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-all"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            Email
          </a>
        </div>
      </section>

      {/* ===== EXPERIENCE ===== */}
      <section className="mb-16">
        <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)] mb-6">
          Experience
        </h2>

        <div className="space-y-4">
          {experience.map((exp, i) => (
            <div
              key={i}
              className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] p-5 hover:border-[var(--border-hover)] transition-colors"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[var(--bg-muted)] border border-[var(--border)] flex items-center justify-center">
                  <CompanyLogo company={exp.company} />
                </div>
                <span className="font-semibold text-base text-[var(--text-primary)]">
                  {exp.company}
                </span>
              </div>

              <div className="space-y-4">
                {exp.roles.map((role, j) => (
                  <div key={j} className={j > 0 ? "pt-4 border-t border-[var(--border)]" : ""}>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-2">
                        <h3 className="text-[15px] font-semibold text-[var(--accent)]">
                          {role.title}
                        </h3>
                        {role.current && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Current
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-xs text-[var(--text-muted)]">
                        {role.period}
                      </span>
                    </div>
                    <ul className="space-y-1.5">
                      {role.bullets.map((bullet, k) => (
                        <li
                          key={k}
                          className="relative pl-3.5 text-[15px] text-[var(--text-secondary)] leading-relaxed before:absolute before:left-0 before:top-[10px] before:w-1 before:h-1 before:rounded-full before:bg-[var(--text-muted)]"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== EDUCATION ===== */}
      <section className="mb-16">
        <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)] mb-6">
          Education
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {education.map((edu, i) => (
            <div
              key={i}
              className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] p-5 hover:border-[var(--border-hover)] transition-colors"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--bg-muted)] border border-[var(--border)] flex items-center justify-center">
                  <SchoolLogo school={edu.school} />
                </div>
                <span className="font-semibold text-[var(--text-primary)]">{edu.school}</span>
              </div>
              <div className="text-[15px] font-medium text-[var(--accent)] mb-1">
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
      <section>
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
                    className="px-2.5 py-1 rounded-md text-xs font-mono border border-[var(--border)] text-[var(--text-secondary)] bg-[var(--bg-card)]"
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
