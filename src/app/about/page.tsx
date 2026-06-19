import { Metadata } from "next";
import { BookOpen, Target, Users, Share2 } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "关于",
  description: "了解 AI Dev Hub 的使命和愿景",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        关于 AI Dev Hub
      </h1>

      {/* Mission */}
      <div className="prose-custom">
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
          AI Dev Hub 是一个面向中文开发者的 <strong>AI 辅助开发知识聚合平台</strong>。
          我们系统化整理 Spec-Driven Development、AI 编程工具、Prompt Engineering、
          工作流最佳实践等内容，帮助开发者高效学习和应用 AI 技术。
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="p-6 rounded-xl border border-gray-100 dark:border-gray-800">
          <BookOpen className="w-8 h-8 text-primary-600 mb-3" />
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            体系化知识
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            按知识板块组织内容，从入门到进阶，循序渐进建立完整的 AI 开发知识体系
          </p>
        </div>
        <div className="p-6 rounded-xl border border-gray-100 dark:border-gray-800">
          <Target className="w-8 h-8 text-primary-600 mb-3" />
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            实战导向
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            聚焦真实开发场景，提供可复制的最佳实践、模板和案例
          </p>
        </div>
        <div className="p-6 rounded-xl border border-gray-100 dark:border-gray-800">
          <Users className="w-8 h-8 text-primary-600 mb-3" />
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            中文优先
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            精选和翻译优质英文内容，降低中文开发者的学习门槛
          </p>
        </div>
        <div className="p-6 rounded-xl border border-gray-100 dark:border-gray-800">
          <Share2 className="w-8 h-8 text-primary-600 mb-3" />
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            内容分发
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            知识库内容支持多渠道分发，帮助创作者扩大影响力
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          开始探索
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          浏览知识板块，找到你需要的 AI 开发资源
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/articles"
            className="px-6 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            浏览文章
          </Link>
          <Link
            href="/tools"
            className="px-6 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
          >
            工具导航
          </Link>
        </div>
      </div>
    </div>
  );
}
