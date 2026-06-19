import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <h1 className="text-6xl font-extrabold text-gray-200 dark:text-gray-800 mb-4">
        404
      </h1>
      <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
        页面未找到
      </p>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        你访问的页面不存在或已被移除
      </p>
      <div className="flex justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
        >
          <Home className="w-4 h-4" />
          返回首页
        </Link>
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
        >
          <Search className="w-4 h-4" />
          浏览文章
        </Link>
      </div>
    </div>
  );
}
