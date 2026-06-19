"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ content }: { content: string }) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Parse headings from raw MDX content
    const headingRegex = /^(#{2,4})\s+(.+)$/gm;
    const tocItems: TocItem[] = [];
    let match;
    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
        .replace(/(^-|-$)/g, "");
      tocItems.push({ id, text, level });
    }
    setItems(tocItems);

    // Intersection Observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    tocItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [content]);

  if (items.length === 0) return null;

  return (
    <nav className="text-sm">
      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">目录</h4>
      <ul className="space-y-1.5 border-l-2 border-gray-100 dark:border-gray-800">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block py-0.5 transition-colors ${
                item.level === 2
                  ? "pl-3"
                  : item.level === 3
                  ? "pl-6"
                  : "pl-9"
              } ${
                activeId === item.id
                  ? "text-primary-600 border-l-2 -ml-0.5 border-primary-600 font-medium"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
