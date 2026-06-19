import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs, getArticleBySlug } from "@/lib/articles";
import { getTopic } from "@/lib/topics";
import { Calendar, Clock, Tag, User, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import TableOfContents from "@/components/TableOfContents";
import ReadingProgress from "@/components/ReadingProgress";
import MDXRenderer from "@/components/MDXRenderer";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return { title: "文章未找到" };

  return {
    title: article.frontmatter.title,
    description: article.frontmatter.description,
    openGraph: {
      title: article.frontmatter.title,
      description: article.frontmatter.description,
      type: "article",
      publishedTime: article.frontmatter.publishedAt,
      tags: article.frontmatter.tags,
    },
  };
}

export default function ArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const { frontmatter, content, readingTime } = article;
  const topic = getTopic(frontmatter.topic);

  return (
    <>
      <ReadingProgress />
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Back Link */}
        <Link
          href="/articles"
          className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-primary-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-3 h-3" />
          返回文章列表
        </Link>

        {/* Header */}
        <header className="mb-8">
          {topic && (
            <Link
              href={`/topics/${topic.id}`}
              className="inline-block text-xs font-medium text-primary-600 bg-primary-50 dark:bg-primary-900/30 dark:text-primary-400 px-2.5 py-1 rounded-full mb-4"
            >
              {topic.name}
            </Link>
          )}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
            {frontmatter.title}
          </h1>
          <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
            {frontmatter.description}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              {frontmatter.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {frontmatter.publishedAt}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {readingTime} 分钟阅读
            </span>
          </div>

          {/* Tags */}
          {frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                >
                  <Tag className="w-3 h-3 inline mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* External link */}
          {frontmatter.externalUrl && (
            <a
              href={frontmatter.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-4 text-sm text-primary-600 hover:text-primary-700"
            >
              阅读原文
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </header>

        {/* Content area with sidebar */}
        <div className="flex gap-10">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <MDXRenderer content={content} />
          </div>

          {/* Sidebar - TOC */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-24">
              <TableOfContents content={content} />
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
