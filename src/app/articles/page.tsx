import { getAllArticles } from "@/lib/articles";
import { topics } from "@/lib/topics";
import ArticleCard from "@/components/ArticleCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "全部文章",
  description: "浏览所有 AI 辅助开发相关文章，按板块、标签筛选",
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          全部文章
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          共 {articles.length} 篇文章，涵盖 {topics.length} 个知识板块
        </p>
      </div>

      {/* Topic filter pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        <a
          href="/articles"
          className="px-3 py-1.5 rounded-full text-sm font-medium bg-primary-600 text-white"
        >
          全部
        </a>
        {topics.map((topic) => (
          <a
            key={topic.id}
            href={`/topics/${topic.id}`}
            className="px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-primary-900/30 dark:hover:text-primary-400 transition-colors"
          >
            {topic.name}
          </a>
        ))}
      </div>

      {/* Article Grid */}
      {articles.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 dark:text-gray-500 text-lg">暂无文章</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
            内容正在建设中，敬请期待
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article) => (
            <ArticleCard key={article.frontmatter.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
