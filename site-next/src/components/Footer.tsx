import { profile } from "@/lib/data";
import { LinkedInIcon, GitHubIcon, EmailIcon } from "@/components/Icons";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] pb-24 md:pb-0">
      <div className="max-w-[960px] mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-[var(--text-muted)]">
          &copy; {new Date().getFullYear()} {profile.name}
        </p>
        <div className="flex items-center gap-1">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex items-center justify-center w-9 h-9 rounded-[var(--radius-full)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-muted)] transition-all duration-200"
          >
            <LinkedInIcon size={16} />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex items-center justify-center w-9 h-9 rounded-[var(--radius-full)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-muted)] transition-all duration-200"
          >
            <GitHubIcon size={16} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="flex items-center justify-center w-9 h-9 rounded-[var(--radius-full)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-muted)] transition-all duration-200"
          >
            <EmailIcon size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
