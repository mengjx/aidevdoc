import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTopic, topics } from "@/lib/topics";
import { getArticlesByTopic } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Props {
  params: { topic: string };
}

export async function generateStaticParams() {
  return topics.map((t) => ({ topic: t.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const topic = getTopic(params.topic);
  if (!topic) return { title: "板块未找到" };
  return {
    title: topic.name,
    description: topic.description,
  };
}

export default function TopicPage({ params }: Props) {
  const topic = getTopic(params.topic);

  if (!topic) {
    notFound();
  }

  const articles = getArticlesByTopic(params.topic);

  const colorMap: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    purple: "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    amber: "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
    green: "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    red: "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400",
    indigo: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Link
        href="/articles"
        className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-primary-600 transition-colors mb-6"
      >
        <ArrowLeft className="w-3 h-3" />
        返回文章列表
      </Link>

      <div className="mb-8">
        <span
          className={`inline-block text-sm font-medium px-3 py-1 rounded-full mb-3 ${colorMap[topic.color] || colorMap.blue}`}
        >
          {topic.name}
        </span>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {topic.name}
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          {topic.description}
        </p>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 dark:text-gray-500 text-lg">该板块暂无文章</p>
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
