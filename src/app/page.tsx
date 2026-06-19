import { getRecentArticles, getFeaturedArticles } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import TopicNav from "@/components/TopicNav";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const featured = getFeaturedArticles();
  const recent = getRecentArticles(6);

  return (
    <>
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          AI 辅助开发知识聚合平台
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
          AI 时代的
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
            {" "}开发知识库
          </span>
        </h1>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          系统化整理 Spec-Driven Development、AI 编程工具、Prompt Engineering、
          工作流最佳实践，为中文开发者打造的一站式知识聚合平台。
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20"
          >
            浏览文章
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
          >
            工具导航
          </Link>
        </div>
      </section>

      {/* Topic Navigation */}
      <TopicNav />

      {/* Featured Articles */}
      {featured.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              精选推荐
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featured.map((article) => (
              <ArticleCard key={article.frontmatter.slug} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Recent Articles */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            最新文章
          </h2>
          <Link
            href="/articles"
            className="text-sm text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1"
          >
            查看全部
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recent.map((article) => (
            <ArticleCard key={article.frontmatter.slug} article={article} />
          ))}
        </div>
      </section>
    </>
  );
}
