import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

// English-only post detail pages
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ locale: "en", slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (locale !== "en") return {};
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: `${post.title} \u2014 Junjie Li` };
}

export default async function PostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (locale !== "en") notFound();

  const post = await getPostBySlug(slug);
  if (!post || post.draft) notFound();

  return (
    <article className="max-w-[660px] mx-auto px-6 py-12 md:py-20">
      <Link href="/en/posts" className="inline-flex items-center gap-1 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors mb-8">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></svg>
        Back to posts
      </Link>
      <header className="mb-10">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-4">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs text-[var(--text-muted)]">
          <time dateTime={post.date}>{post.date}</time>
          <span>&middot;</span>
          <span>{post.readingTime}</span>
          {post.categories.length > 0 && (<><span>&middot;</span>{post.categories.map((cat) => (<span key={cat} className="text-[var(--accent)]">{cat}</span>))}</>)}
        </div>
        {post.tags.length > 0 && (<div className="flex flex-wrap gap-1.5 mt-4">{post.tags.map((tag) => (<span key={tag} className="px-2 py-0.5 rounded-md text-[11px] font-mono border border-[var(--border)] text-[var(--text-muted)] bg-[var(--bg-card)]">{tag}</span>))}</div>)}
      </header>
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
