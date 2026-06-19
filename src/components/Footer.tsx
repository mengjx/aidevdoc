import Link from "next/link";
import { BookOpen } from "lucide-react";
import { topics } from "@/lib/topics";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-gray-900 dark:text-white mb-3">
              <BookOpen className="w-5 h-5 text-primary-600" />
              AI Dev Hub
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              AI 辅助开发知识聚合平台
              <br />
              系统化整理，高效检索
            </p>
          </div>

          {/* Topics */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">知识板块</h4>
            <div className="grid grid-cols-2 gap-2">
              {topics.map((topic) => (
                <Link
                  key={topic.id}
                  href={`/topics/${topic.id}`}
                  className="text-sm text-gray-500 hover:text-primary-600 dark:text-gray-400 transition-colors"
                >
                  {topic.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">链接</h4>
            <div className="space-y-2">
              <Link href="/articles" className="block text-sm text-gray-500 hover:text-primary-600 dark:text-gray-400 transition-colors">
                全部文章
              </Link>
              <Link href="/tools" className="block text-sm text-gray-500 hover:text-primary-600 dark:text-gray-400 transition-colors">
                工具导航
              </Link>
              <Link href="/about" className="block text-sm text-gray-500 hover:text-primary-600 dark:text-gray-400 transition-colors">
                关于本站
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-6 flex flex-col items-center gap-2 text-xs text-gray-400">
          <div>© {new Date().getFullYear()} AI Dev Hub — 知识共享，欢迎转载（注明出处）</div>
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            浙ICP备2025163645号
          </a>
        </div>
      </div>
    </footer>
  );
}
