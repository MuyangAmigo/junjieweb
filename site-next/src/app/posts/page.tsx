import type { Metadata } from "next";
import { externalPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Posts",
  description: "Published articles on Microsoft developer blogs.",
};

export default function PostsPage() {
  const posts = externalPosts;

  const grouped = posts.reduce<Record<string, typeof posts>>((acc, post) => {
    const year = post.date.split("-")[0] || "Undated";
    if (!acc[year]) acc[year] = [];
    acc[year].push(post);
    return acc;
  }, {});

  const years = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <div className="max-w-[820px] mx-auto px-6 py-12 md:py-20">
      <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[var(--text-primary)] mb-3">
        Posts
      </h1>
      <p className="text-lg text-[var(--text-secondary)] mb-10">
        Published articles on Microsoft developer blogs.
      </p>

      <div className="space-y-10">
        {years.map((year, yearIdx) => {
          const yearPosts = grouped[year];
          const isCurrentYear = yearIdx === 0;

          return (
            <div key={year}>
              <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">
                {year}
              </h2>

              {isCurrentYear ? (
                /* Current year: full-width stacked cards */
                <div className="space-y-1.5">
                  {yearPosts.map((post) => (
                    <a
                      key={post.url}
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="fluent-card group flex items-center justify-between gap-4 px-4 py-3.5 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)]"
                    >
                      <div className="min-w-0">
                        <h3 className="text-base font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-200 truncate">
                          {post.title}
                        </h3>
                        <span className="font-mono text-xs text-[var(--text-muted)]">
                          {post.source}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-[var(--text-muted)] whitespace-nowrap shrink-0">
                        {post.date.slice(5)}
                      </span>
                    </a>
                  ))}
                </div>
              ) : (
                /* Older years: 2-column grid */
                <div className="grid md:grid-cols-2 gap-1.5">
                  {yearPosts.map((post) => (
                    <a
                      key={post.url}
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="fluent-card group flex items-center justify-between gap-3 px-4 py-3.5 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)]"
                    >
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-200 truncate">
                          {post.title}
                        </h3>
                        <span className="font-mono text-xs text-[var(--text-muted)]">
                          {post.source}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-[var(--text-muted)] whitespace-nowrap shrink-0">
                        {post.date.slice(5)}
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
