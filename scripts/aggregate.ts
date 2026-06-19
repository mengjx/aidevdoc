/**
 * 自动化内容聚合脚本
 *
 * 用法：
 *   npx ts-node --compiler-options '{"module":"commonjs","esModuleInterop":true}' scripts/aggregate.ts
 *
 * 功能：
 *   1. 从配置的 RSS 源抓取最新文章
 *   2. 去重（对比已有文章）
 *   3. 生成 MDX 草稿文件
 *   4. （可选）调用 AI API 生成中文摘要
 */

import * as fs from "fs";
import * as path from "path";

// ====== 配置 ======

interface RSSSource {
  name: string;
  url: string;
  topic: string;
  tags: string[];
}

const SOURCES: RSSSource[] = [
  {
    name: "Anthropic Blog",
    url: "https://www.anthropic.com/blog/rss.xml",
    topic: "ai-coding-tools",
    tags: ["Anthropic", "Claude", "AI"],
  },
  {
    name: "OpenAI Blog",
    url: "https://openai.com/blog/rss.xml",
    topic: "ai-coding-tools",
    tags: ["OpenAI", "GPT", "AI"],
  },
  {
    name: "Cursor Blog",
    url: "https://cursor.com/blog/rss.xml",
    topic: "ai-coding-tools",
    tags: ["Cursor", "IDE", "AI编程"],
  },
  // 可添加更多 RSS 源
];

const CONTENT_ROOT = path.join(__dirname, "..", "content");

// ====== 主逻辑 ======

async function main() {
  console.log("🚀 开始聚合内容...\n");

  for (const source of SOURCES) {
    console.log(`📡 检查: ${source.name}`);
    try {
      const response = await fetch(source.url, {
        headers: { "User-Agent": "AI-Dev-Hub-Aggregator/1.0" },
      });

      if (!response.ok) {
        console.log(`  ⚠️  无法访问 RSS (${response.status}), 跳过\n`);
        continue;
      }

      const xml = await response.text();
      const items = parseRSSItems(xml);

      console.log(`  📄 找到 ${items.length} 篇文章`);

      for (const item of items.slice(0, 3)) {
        // 只取最新 3 篇
        const slug = slugify(item.title);
        const filePath = path.join(CONTENT_ROOT, source.topic, `${slug}.mdx`);

        if (fs.existsSync(filePath)) {
          console.log(`  ⏭️  已存在: ${item.title}`);
          continue;
        }

        const mdx = generateMDX(item, source, slug);
        fs.writeFileSync(filePath, mdx, "utf-8");
        console.log(`  ✅ 新文章: ${item.title}`);
      }
    } catch (err) {
      console.log(`  ❌ 错误: ${(err as Error).message}`);
    }
    console.log("");
  }

  console.log("✅ 聚合完成！");
}

// ====== 工具函数 ======

function parseRSSItems(xml: string): Array<{ title: string; link: string; pubDate: string; description: string }> {
  const items: Array<{ title: string; link: string; pubDate: string; description: string }> = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const item = match[1];
    const title = extractTag(item, "title");
    const link = extractTag(item, "link");
    const pubDate = extractTag(item, "pubDate");
    const description = stripHtml(extractTag(item, "description"));

    if (title && link) {
      items.push({ title, link, pubDate, description });
    }
  }

  return items;
}

function extractTag(xml: string, tag: string): string {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const match = xml.match(regex);
  return match ? match[1].trim() : "";
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').trim();
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toISOString().split("T")[0];
  } catch {
    return new Date().toISOString().split("T")[0];
  }
}

function generateMDX(
  item: { title: string; link: string; pubDate: string; description: string },
  source: RSSSource,
  slug: string
): string {
  const date = formatDate(item.pubDate);
  const description = item.description.slice(0, 200).replace(/"/g, '\\"');

  return `---
title: "${item.title.replace(/"/g, '\\"')}"
slug: "${slug}"
topic: "${source.topic}"
publishedAt: "${date}"
updatedAt: "${date}"
description: "${description} [原文: ${source.name}]"
author: "AI Dev Hub (自动聚合)"
tags: ${JSON.stringify(source.tags)}
externalUrl: "${item.link}"
---

> 📡 本文由自动化聚合脚本从 [${source.name}](${item.link}) 抓取，内容版权归原作者所有。

## 原文摘要

${item.description.slice(0, 500)}

---

👉 [阅读原文](${item.link})
`;
}

main();
