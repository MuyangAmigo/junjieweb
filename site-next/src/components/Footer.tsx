import { profile } from "@/lib/data";
import { LinkedInIcon, GitHubIcon, EmailIcon } from "@/components/Icons";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="max-w-[820px] mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-mono text-xs text-[var(--text-muted)]">
          &copy; {new Date().getFullYear()} {profile.name}
        </p>
        <div className="flex items-center gap-4">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
          >
            <LinkedInIcon size={16} />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
          >
            <GitHubIcon size={16} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
          >
            <EmailIcon size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
