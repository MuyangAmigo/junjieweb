import type { Metadata } from "next";
import { ArrowRightIcon } from "@/components/Icons";
import { locales, isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getLocalizedPosts } from "@/i18n/get-localized-data";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return { title: dict.posts.title, description: dict.posts.subtitle };
}

const tagColors: Record<string, string> = {
  Release: "text-[#22c55e] bg-[#22c55e]/10 border-[#22c55e]/20",
  Feature: "text-[#a78bfa] bg-[#a78bfa]/10 border-[#a78bfa]/20",
  Tutorial: "text-[#38bdf8] bg-[#38bdf8]/10 border-[#38bdf8]/20",
  Integration: "text-[#fb923c] bg-[#fb923c]/10 border-[#fb923c]/20",
  Announcement: "text-[#f472b6] bg-[#f472b6]/10 border-[#f472b6]/20",
};

export default async function PostsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);
  const posts = await getLocalizedPosts(locale as Locale);
  const [featured, ...rest] = posts;

  const grouped = rest.reduce<Record<string, typeof posts>>((acc, post) => {
    const year = post.date.split("-")[0] || "Undated";
    if (!acc[year]) acc[year] = [];
    acc[year].push(post);
    return acc;
  }, {});

  const years = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <div className="max-w-[960px] mx-auto px-6 pt-2 pb-8 md:pt-6 md:pb-16">
      <h1 className="display-heading text-3xl md:text-5xl text-[var(--text-primary)] text-center mb-4">{dict.posts.title}</h1>
      <p className="text-center text-[var(--text-secondary)] mb-12">{dict.posts.subtitle}</p>

      {/* Featured latest post */}
      <a href={featured.url} target="_blank" rel="noopener noreferrer" className="group block minimal-card rounded-[var(--radius-xl)] p-6 md:p-8 mb-16">
        <div className="flex items-center gap-3 mb-4">
          <span className={`px-2.5 py-0.5 rounded-[var(--radius-full)] text-xs font-medium border ${tagColors[featured.tag]}`}>{featured.tag}</span>
          <span className="text-xs text-[var(--text-muted)]">{featured.source}</span>
          <span className="text-xs text-[var(--text-muted)]">&middot;</span>
          <span className="font-mono text-xs text-[var(--text-muted)]">{featured.date}</span>
        </div>
        <h2 className="text-xl md:text-2xl font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-200 mb-3">{featured.title}</h2>
        <p className="text-[var(--text-secondary)] leading-[1.7] mb-4 max-w-[640px]">{featured.summary}</p>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)]">{dict.posts.readArticle}<span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5"><ArrowRightIcon size={14} /></span></span>
      </a>

      {/* At a glance */}
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-6"><div className="h-px flex-1 bg-[var(--border)]" /><h2 className="text-sm font-medium text-[var(--text-muted)] shrink-0">{dict.posts.atAGlance}</h2><div className="h-px flex-1 bg-[var(--border)]" /></div>
        <div className="minimal-card rounded-[var(--radius-lg)] overflow-hidden">
          <div className="hidden md:grid grid-cols-[1fr_auto_auto] gap-4 px-5 py-3 border-b border-[var(--border)] text-xs font-medium text-[var(--text-muted)] uppercase tracking-wide"><span>{dict.posts.tableTitle}</span><span>{dict.posts.tableTag}</span><span>{dict.posts.tableDate}</span></div>
          {posts.slice(0, 8).map((post, i) => (
            <a key={post.url} href={post.url} target="_blank" rel="noopener noreferrer" className={`group grid md:grid-cols-[1fr_auto_auto] gap-2 md:gap-4 px-5 py-3 row-highlight ${i > 0 ? "border-t border-[var(--border)]" : ""}`}>
              <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-150 truncate">{post.title}</span>
              <span className={`px-2 py-0.5 rounded-[var(--radius-full)] text-xs font-medium border w-fit ${tagColors[post.tag]}`}>{post.tag}</span>
              <span className="font-mono text-xs text-[var(--text-muted)] whitespace-nowrap self-center">{post.date}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Posts by year */}
      <div className="space-y-16">
        {years.map((year, yearIdx) => {
          const yearPosts = grouped[year];
          const isCurrentYear = yearIdx === 0;
          return (
            <div key={year}>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6">{year}</h2>
              {isCurrentYear ? (
                <div className="space-y-3">{yearPosts.map((post) => (<a key={post.url} href={post.url} target="_blank" rel="noopener noreferrer" className="group block minimal-card rounded-[var(--radius-lg)] p-5"><div className="flex items-center gap-2.5 mb-2.5"><span className={`px-2 py-0.5 rounded-[var(--radius-full)] text-xs font-medium border ${tagColors[post.tag]}`}>{post.tag}</span><span className="font-mono text-xs text-[var(--text-muted)]">{post.date}</span></div><h3 className="text-base font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-200 mb-2">{post.title}</h3><p className="text-sm text-[var(--text-secondary)] leading-[1.7] mb-2">{post.summary}</p><span className="text-xs text-[var(--text-muted)]">{post.source}</span></a>))}</div>
              ) : (
                <div className="grid md:grid-cols-3 gap-3">{yearPosts.map((post) => (<a key={post.url} href={post.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col minimal-card rounded-[var(--radius-lg)] p-4"><div className="flex items-center gap-2 mb-2"><span className={`px-2 py-0.5 rounded-[var(--radius-full)] text-[10px] font-medium border ${tagColors[post.tag]}`}>{post.tag}</span><span className="font-mono text-[10px] text-[var(--text-muted)]">{post.date.slice(5)}</span></div><h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-200 line-clamp-2 mb-2 flex-1">{post.title}</h3><p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2 mb-2">{post.summary}</p><span className="text-[10px] text-[var(--text-muted)] mt-auto">{post.source}</span></a>))}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
