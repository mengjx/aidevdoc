import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { topics } from "./topics";

export interface ArticleFrontmatter {
  title: string;
  slug: string;
  topic: string;
  publishedAt: string;
  updatedAt: string;
  description: string;
  author: string;
  tags: string[];
  coverImage?: string;
  featured?: boolean;
  externalUrl?: string;
}

export interface Article {
  frontmatter: ArticleFrontmatter;
  content: string;
  readingTime: number;
}

const contentRoot = path.join(process.cwd(), "content");

export function getAllSlugs(): string[] {
  const slugs: string[] = [];
  for (const topic of topics) {
    const dir = path.join(contentRoot, topic.id);
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
    for (const file of files) {
      slugs.push(file.replace(".mdx", ""));
    }
  }
  return slugs;
}

export function getAllArticles(): Article[] {
  const articles: Article[] = [];
  for (const topic of topics) {
    const dir = path.join(contentRoot, topic.id);
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
    for (const file of files) {
      const filePath = path.join(dir, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      const wordCount = content.split(/\s+/).length;
      articles.push({
        frontmatter: {
          title: data.title || file.replace(".mdx", ""),
          slug: data.slug || file.replace(".mdx", ""),
          topic: data.topic || topic.id,
          publishedAt: data.publishedAt || new Date().toISOString().split("T")[0],
          updatedAt: data.updatedAt || data.publishedAt || new Date().toISOString().split("T")[0],
          description: data.description || "",
          author: data.author || "匿名",
          tags: data.tags || [],
          coverImage: data.coverImage,
          featured: data.featured || false,
          externalUrl: data.externalUrl,
        },
        content,
        readingTime: Math.max(1, Math.ceil(wordCount / 200)),
      });
    }
  }
  return articles.sort(
    (a, b) =>
      new Date(b.frontmatter.publishedAt).getTime() -
      new Date(a.frontmatter.publishedAt).getTime()
  );
}

export function getArticleBySlug(slug: string): Article | undefined {
  for (const topic of topics) {
    const filePath = path.join(contentRoot, topic.id, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) continue;
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const wordCount = content.split(/\s+/).length;
    return {
      frontmatter: {
        title: data.title || slug,
        slug: data.slug || slug,
        topic: data.topic || topic.id,
        publishedAt: data.publishedAt || new Date().toISOString().split("T")[0],
        updatedAt: data.updatedAt || data.publishedAt || new Date().toISOString().split("T")[0],
        description: data.description || "",
        author: data.author || "匿名",
        tags: data.tags || [],
        coverImage: data.coverImage,
        featured: data.featured || false,
        externalUrl: data.externalUrl,
      },
      content,
      readingTime: Math.max(1, Math.ceil(wordCount / 200)),
    };
  }
  return undefined;
}

export function getArticlesByTopic(topicId: string): Article[] {
  return getAllArticles().filter((a) => a.frontmatter.topic === topicId);
}

export function getFeaturedArticles(): Article[] {
  return getAllArticles().filter((a) => a.frontmatter.featured);
}

export function getRecentArticles(count: number = 6): Article[] {
  return getAllArticles().slice(0, count);
}

export function getTopicArticleCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const topic of topics) {
    const dir = path.join(contentRoot, topic.id);
    if (!fs.existsSync(dir)) {
      counts[topic.id] = 0;
      continue;
    }
    counts[topic.id] = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".mdx")).length;
  }
  return counts;
}
