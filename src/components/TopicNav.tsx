import Link from "next/link";
import {
  FileText,
  Wrench,
  Sparkles,
  Palette,
  GitBranch,
  Bookmark,
  LucideIcon,
} from "lucide-react";
import { topics } from "@/lib/topics";

const iconMap: Record<string, LucideIcon> = {
  FileText,
  Wrench,
  Sparkles,
  Palette,
  GitBranch,
  Bookmark,
};

export default function TopicNav() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        知识板块
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map((topic) => {
          const Icon = iconMap[topic.icon] || FileText;
          const colorClasses: Record<string, string> = {
            blue: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
            purple: "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
            amber: "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
            green: "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400",
            red: "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400",
            indigo: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
          };
          return (
            <Link
              key={topic.id}
              href={`/topics/${topic.id}`}
              className="flex items-start gap-4 p-5 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-primary-200 dark:hover:border-primary-800 hover:shadow-md transition-all group"
            >
              <div
                className={`p-2.5 rounded-lg ${colorClasses[topic.color] || colorClasses.blue}`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
                  {topic.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {topic.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
