import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import readingTime from "reading-time";
import { withBasePathInHtml } from "./base-path";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface Post {
  slug: string;
  title: string;
  date: string;
  categories: string[];
  tags: string[];
  draft: boolean;
  content: string;
  readingTime: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  categories: string[];
  tags: string[];
  readingTime: string;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));

  const posts = fileNames
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      if (data.draft === true) return null;

      const stats = readingTime(content);

      return {
        slug,
        title: (data.title as string) || slug,
        date: data.date ? new Date(data.date as string).toISOString().split("T")[0] : "",
        categories: (data.categories as string[]) || [],
        tags: (data.tags as string[]) || [],
        readingTime: stats.text,
      };
    })
    .filter((p): p is PostMeta => p !== null);

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html, { sanitize: false }).process(content);
  const stats = readingTime(content);

  return {
    slug,
    title: (data.title as string) || slug,
    date: data.date ? new Date(data.date as string).toISOString().split("T")[0] : "",
    categories: (data.categories as string[]) || [],
    tags: (data.tags as string[]) || [],
    draft: data.draft === true,
    // Posts author images as `/images/…`. This HTML is injected directly, so
    // Next never sees those URLs and cannot apply `basePath` to them.
    content: withBasePathInHtml(processedContent.toString()),
    readingTime: stats.text,
  };
}

export function getAllTags(): { name: string; count: number }[] {
  const posts = getAllPosts();
  const tagMap = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags) {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    }
  }
  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}
