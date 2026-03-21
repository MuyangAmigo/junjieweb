import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getAllTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Posts",
  description: "Notes on career, tech, and life.",
};

export default function PostsPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  const grouped = posts.reduce<Record<string, typeof posts>>((acc, post) => {
    const year = post.date.split("-")[0] || "Undated";
    if (!acc[year]) acc[year] = [];
    acc[year].push(post);
    return acc;
  }, {});

  const years = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <div className="max-w-[660px] mx-auto px-6 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
        Posts
      </h1>
      <p className="text-[var(--text-secondary)] mb-8">
        Notes on career, tech, and life.
      </p>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-10">
          {tags.map((tag) => (
            <span
              key={tag.name}
              className="px-2.5 py-1 rounded-md text-xs font-mono border border-[var(--border)] text-[var(--text-muted)] bg-[var(--bg-card)]"
            >
              {tag.name}
              <span className="ml-1 text-[var(--text-muted)]">{tag.count}</span>
            </span>
          ))}
        </div>
      )}

      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-[var(--text-muted)]">No posts yet. Check back soon!</p>
        </div>
      ) : (
        <div className="space-y-10">
          {years.map((year) => (
            <div key={year}>
              <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)] mb-4">
                {year}
              </h2>
              <div className="space-y-1.5">
                {grouped[year].map((post) => (
                  <Link
                    key={post.slug}
                    href={`/posts/${post.slug}`}
                    className="group flex items-center justify-between gap-4 px-4 py-3.5 -mx-4 rounded-lg hover:bg-[var(--bg-card)] transition-all"
                  >
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors truncate">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-2.5 mt-0.5">
                        {post.categories[0] && (
                          <span className="font-mono text-[11px] text-[var(--accent)]">
                            {post.categories[0]}
                          </span>
                        )}
                        <span className="font-mono text-[11px] text-[var(--text-muted)]">
                          {post.readingTime}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-[11px] text-[var(--text-muted)] whitespace-nowrap shrink-0">
                      {post.date.slice(5)}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
