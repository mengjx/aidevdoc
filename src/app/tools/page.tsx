import { Metadata } from "next";
import { tools, getAllCategories, categoryLabels, getToolsByCategory } from "@/lib/tools-data";
import ToolCard from "@/components/ToolCard";
import { Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "工具导航",
  description: "AI 编程工具精选导航：IDE 插件、CLI 智能体、平台工具、大模型对比",
};

export default function ToolsPage() {
  const categories = getAllCategories();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Wrench className="w-6 h-6 text-primary-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            工具导航
          </h1>
        </div>
        <p className="text-gray-500 dark:text-gray-400">
          收录 {tools.length} 个 AI 编程相关工具，涵盖 IDE 插件、CLI 智能体、平台工具、框架和大模型
        </p>
      </div>

      {categories.map((category) => {
        const catTools = getToolsByCategory(category);
        if (catTools.length === 0) return null;
        return (
          <section key={category} className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-100 dark:border-gray-800">
              {categoryLabels[category]}
              <span className="text-sm font-normal text-gray-400 ml-2">
                ({catTools.length})
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {catTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
