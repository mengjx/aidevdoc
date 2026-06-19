import { ExternalLink, Star, Check, X } from "lucide-react";
import type { Tool } from "@/lib/tools-data";

export default function ToolCard({ tool }: { tool: Tool }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < tool.rating);

  const pricingBadge = {
    free: "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    freemium: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    paid: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  }[tool.pricing];

  const pricingLabel = {
    free: "免费",
    freemium: "免费+付费",
    paid: "付费",
  }[tool.pricing];

  return (
    <div className="p-5 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
          {tool.name}
        </h3>
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-primary-500 transition-colors flex-shrink-0"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
        {tool.description}
      </p>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-3">
        {stars.map((filled, i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              filled
                ? "text-amber-400 fill-amber-400"
                : "text-gray-200 dark:text-gray-700"
            }`}
          />
        ))}
        <span className={`text-xs px-2 py-0.5 rounded-full ml-2 ${pricingBadge}`}>
          {pricingLabel}
        </span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {tool.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Pros & Cons */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="space-y-1">
          {tool.pros.slice(0, 3).map((pro, i) => (
            <div key={i} className="flex items-start gap-1 text-green-600 dark:text-green-400">
              <Check className="w-3 h-3 mt-0.5 flex-shrink-0" />
              <span>{pro}</span>
            </div>
          ))}
        </div>
        <div className="space-y-1">
          {tool.cons.slice(0, 3).map((con, i) => (
            <div key={i} className="flex items-start gap-1 text-red-500 dark:text-red-400">
              <X className="w-3 h-3 mt-0.5 flex-shrink-0" />
              <span>{con}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
