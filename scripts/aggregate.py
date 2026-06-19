#!/usr/bin/env python3
"""
AI Dev Hub — 自动化内容聚合脚本

用法：
  python3 scripts/aggregate.py

功能：
  1. 从配置的 RSS 源抓取最新文章
  2. 去重（对比已有文章）
  3. 生成 MDX 草稿文件
  4. 输出新文章统计
"""

import os
import re
import ssl
import json
import urllib.request
import urllib.error
from datetime import datetime
from html import unescape

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONTENT_ROOT = os.path.join(PROJECT_ROOT, "content")

# ====== RSS 源配置 ======

SOURCES = [
    {
        "name": "OpenAI Blog",
        "url": "https://openai.com/blog/rss.xml",
        "topic": "ai-coding-tools",
        "tags": ["OpenAI", "GPT", "AI"],
        "max_items": 3,
    },
    {
        "name": "GitHub Blog",
        "url": "https://github.blog/feed/",
        "topic": "workflow-best-practices",
        "tags": ["GitHub", "Copilot", "工程实践"],
        "max_items": 3,
    },
    {
        "name": "LangChain Blog",
        "url": "https://blog.langchain.dev/rss/",
        "topic": "workflow-best-practices",
        "tags": ["LangChain", "Agent", "LLM"],
        "max_items": 2,
    },
    {
        "name": "Aider Blog",
        "url": "https://aider.chat/atom.xml",
        "topic": "ai-coding-tools",
        "tags": ["Aider", "CLI", "AI编程"],
        "max_items": 2,
    },
]

# ====== 工具函数 ======

SSL_CONTEXT = ssl.create_default_context()
SSL_CONTEXT.check_hostname = False
SSL_CONTEXT.verify_mode = ssl.CERT_NONE


def fetch_url(url):
    """抓取 URL 内容"""
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "AI-Dev-Hub-Aggregator/1.0"},
    )
    with urllib.request.urlopen(req, context=SSL_CONTEXT, timeout=15) as resp:
        return resp.read().decode("utf-8", errors="replace")


def parse_rss_items(xml):
    """解析 RSS XML，返回文章列表"""
    items = []
    item_pattern = re.compile(r"<item[^>]*>([\s\S]*?)</item>", re.IGNORECASE)

    for match in item_pattern.finditer(xml):
        item = match.group(1)
        title = extract_tag(item, "title")
        link = extract_tag(item, "link")
        pub_date = extract_tag(item, "pubDate") or extract_tag(item, "published")
        description = strip_html(extract_tag(item, "description"))

        if title and link:
            items.append(
                {"title": title, "link": link, "pub_date": pub_date, "description": description}
            )

    return items


def extract_tag(xml, tag):
    """提取 XML 标签内容，清理 CDATA"""
    pattern = re.compile(rf"<{tag}[^>]*>([\s\S]*?)</{tag}>", re.IGNORECASE)
    match = pattern.search(xml)
    if not match:
        return ""
    content = match.group(1).strip()
    # 清理 CDATA 包裹
    cdata = re.match(r"<!\[CDATA\[([\s\S]*?)\]\]>", content)
    if cdata:
        content = cdata.group(1).strip()
    return unescape(content)


def strip_html(text):
    """去除 HTML 标签"""
    return re.sub(r"<[^>]+>", "", text).strip()


def slugify(text):
    """生成 URL slug"""
    slug = re.sub(r"[^a-z0-9\u4e00-\u9fff]+", "-", text.lower()).strip("-")
    return slug[:80] if slug else "untitled"


def format_date(date_str):
    """格式化日期为 YYYY-MM-DD"""
    try:
        from email.utils import parsedate_to_datetime

        dt = parsedate_to_datetime(date_str)
        return dt.strftime("%Y-%m-%d")
    except Exception:
        return datetime.now().strftime("%Y-%m-%d")


def generate_mdx(item, source, slug):
    """生成 MDX 文件内容"""
    date = format_date(item["pub_date"])
    title = item["title"].replace('"', '\\"')
    description = item["description"][:200].replace('"', '\\"')
    tags_json = json.dumps(source["tags"], ensure_ascii=False)

    return f"""---
title: "{title}"
slug: "{slug}"
topic: "{source['topic']}"
publishedAt: "{date}"
updatedAt: "{date}"
description: "{description}"
author: "AI Dev Hub (自动聚合)"
tags: {tags_json}
externalUrl: "{item['link']}"
---

> 📡 本文由自动化聚合脚本从 [{source['name']}]({item['link']}) 抓取，内容版权归原作者所有。

## 原文摘要

{item['description'][:500]}

---

👉 [阅读原文]({item['link']})
"""


# ====== 主逻辑 ======

def main():
    print("🚀 开始聚合内容...\n")

    total_new = 0
    total_skipped = 0
    total_failed = 0

    for source in SOURCES:
        print(f"📡 检查: {source['name']}")
        try:
            xml = fetch_url(source["url"])
            items = parse_rss_items(xml)
            print(f"   📄 找到 {len(items)} 篇文章")

            topic_dir = os.path.join(CONTENT_ROOT, source["topic"])
            os.makedirs(topic_dir, exist_ok=True)

            for item in items[: source["max_items"]]:
                slug = slugify(item["title"])
                file_path = os.path.join(topic_dir, f"{slug}.mdx")

                if os.path.exists(file_path):
                    print(f"   ⏭️  已存在: {item['title'][:50]}")
                    total_skipped += 1
                    continue

                mdx = generate_mdx(item, source, slug)
                with open(file_path, "w", encoding="utf-8") as f:
                    f.write(mdx)
                print(f"   ✅ 新文章: {item['title'][:50]}")
                total_new += 1

        except Exception as e:
            print(f"   ❌ 错误: {e}")
            total_failed += 1

        print()

    print("=" * 50)
    print(f"  聚合完成！新增 {total_new} 篇, 跳过 {total_skipped} 篇, 失败 {total_failed} 个源")
    print("=" * 50)

    if total_new > 0:
        print("\n💡 提示: 运行部署脚本发布新内容:")
        print("   python3 scripts/deploy.py")


if __name__ == "__main__":
    main()
