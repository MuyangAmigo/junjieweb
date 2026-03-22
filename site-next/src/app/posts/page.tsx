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
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
        Posts
      </h1>
      <p className="text-lg text-[var(--text-secondary)] mb-10">
        Published articles on Microsoft developer blogs.
      </p>

      <div className="space-y-10">
        {years.map((year) => (
          <div key={year}>
            <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)] mb-4">
              {year}
            </h2>
            <div className="space-y-1.5">
              {grouped[year].map((post) => (
                <a
                  key={post.url}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 px-4 py-3.5 -mx-4 rounded-lg hover:bg-[var(--bg-card)] transition-all"
                >
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors truncate">
                      {post.title}
                      <svg
                        className="inline-block ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </h3>
                    <span className="font-mono text-xs text-[var(--accent)]">
                      {post.source}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-[var(--text-muted)] whitespace-nowrap shrink-0">
                    {post.date.slice(5)}
                  </span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
