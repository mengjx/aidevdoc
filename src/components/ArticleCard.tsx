import Link from "next/link";
import { Clock, Tag, Calendar, Rss } from "lucide-react";
import type { Article } from "@/lib/articles";
import { getTopic } from "@/lib/topics";

export default function ArticleCard({ article }: { article: Article }) {
  const { frontmatter, readingTime } = article;
  const topic = getTopic(frontmatter.topic);

  return (
    <Link
      href={`/articles/${frontmatter.slug}`}
      className="block p-5 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-primary-200 dark:hover:border-primary-800 hover:shadow-md transition-all group"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* Topic Badge */}
          {topic && (
            <span className="inline-block text-xs font-medium text-primary-600 bg-primary-50 dark:bg-primary-900/30 dark:text-primary-400 px-2 py-0.5 rounded-full mb-2">
              {topic.name}
            </span>
          )}
          {/* Title */}
          <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors line-clamp-2">
            {frontmatter.title}
          </h3>
          {/* Description */}
          <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
            {frontmatter.description}
          </p>
        </div>
        {/* Aggregated badge */}
        {frontmatter.externalUrl && (
          <Rss className="w-4 h-4 text-gray-300 group-hover:text-primary-500 flex-shrink-0 mt-1" />
        )}
      </div>

      {/* Meta */}
      <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {frontmatter.publishedAt}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {readingTime} 分钟
        </span>
        {frontmatter.tags.length > 0 && (
          <span className="flex items-center gap-1 truncate">
            <Tag className="w-3 h-3" />
            {frontmatter.tags.slice(0, 3).join(" · ")}
          </span>
        )}
      </div>
    </Link>
  );
}
