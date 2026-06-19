# AI Dev Hub — 内容更新指南

> 本文档介绍三种内容更新方式，以及如何自动化部署。

---

## 方式一：手动写原创文章（主要方式）

### 1. 创建 MDX 文件

在对应的板块目录下创建 `.mdx` 文件：

```bash
# Spec-Driven 开发
content/spec-driven-dev/your-article-slug.mdx

# AI 编程工具
content/ai-coding-tools/your-article-slug.mdx

# 提示工程
content/prompt-engineering/your-article-slug.mdx

# AI 辅助产品设计
content/ai-product-design/your-article-slug.mdx

# 工作流最佳实践
content/workflow-best-practices/your-article-slug.mdx

# 资源导航
content/resources/your-article-slug.mdx
```

### 2. 文件格式

```mdx
---
title: "文章标题"
slug: "article-slug"
topic: "spec-driven-dev"
publishedAt: "2025-06-19"
updatedAt: "2025-06-19"
description: "一句话描述文章内容"
author: "你的名字"
tags: ["标签1", "标签2", "标签3"]
featured: false
---

正文内容（支持完整 Markdown 语法）...
```

### 3. 发布

```bash
# 一键构建 + 部署
python3 scripts/deploy.py
```

---

## 方式二：自动聚合外部内容

### 运行聚合脚本

```bash
# 抓取 RSS 源，生成新文章
python3 scripts/aggregate.py

# 如果有新文章，再部署
python3 scripts/deploy.py
```

### 添加/修改 RSS 源

编辑 `scripts/aggregate.py` 中的 `SOURCES` 列表：

```python
SOURCES = [
    {
        "name": "显示名称",
        "url": "RSS 源地址",
        "topic": "所属板块 ID",
        "tags": ["标签"],
        "max_items": 3,  # 每次最多抓取几篇
    },
]
```

### 当前已配置的 RSS 源

| 源 | 板块 | 说明 |
|----|------|------|
| OpenAI Blog | ai-coding-tools | OpenAI 官方博客 |
| GitHub Blog | workflow-best-practices | GitHub 工程实践 |
| LangChain Blog | workflow-best-practices | LangChain Agent 开发 |

---

## 方式三：GitHub Actions 全自动（推荐）

### 配置 Secrets

在 GitHub 仓库 → Settings → Secrets and variables → Actions 中添加：

| Secret 名称 | 值 |
|-------------|-----|
| `COS_SECRET_ID` | 你的腾讯云 SecretId |
| `COS_SECRET_KEY` | 你的腾讯云 SecretKey |
| `COS_BUCKET` | `ai-blog-1253479692` |
| `COS_REGION` | `ap-shanghai` |

### 自动触发场景

| 事件 | 动作 | 配置文件 |
|------|------|---------|
| `git push` 到 main | 自动构建 + 部署 | `.github/workflows/deploy.yml` |
| 每天北京时间 10:00 | 自动聚合 RSS + 部署 | `.github/workflows/aggregate.yml` |
| 手动触发 | 在 GitHub Actions 页面点击 Run | 两个 workflow 都支持 |

### 工作流程

```
每天 10:00
  ↓
聚合脚本抓取 RSS → 检查是否有新内容
  ↓ 有新内容
自动 commit → push 到 main
  ↓
触发部署 → 构建 → 上传到 COS
  ↓
网站更新完成
```

---

## 快速参考

| 操作 | 命令 |
|------|------|
| 写原创文章 | 在 `content/` 下创建 `.mdx` 文件 |
| 抓取外部内容 | `python3 scripts/aggregate.py` |
| 构建并部署 | `python3 scripts/deploy.py` |
| 本地预览 | `npm run dev` |
| 手动构建 | `npm run build` |

---

## 内容规范

### 文章 Frontmatter 字段

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | ✅ | 文章标题 |
| `slug` | ✅ | URL 路径（英文/数字/短横线） |
| `topic` | ✅ | 板块 ID（见下表） |
| `publishedAt` | ✅ | 发布日期 `YYYY-MM-DD` |
| `description` | ✅ | 一句话摘要 |
| `author` | ✅ | 作者 |
| `tags` | ✅ | 标签数组 |
| `featured` | ❌ | 是否精选（true/false） |
| `externalUrl` | ❌ | 外部原文链接（聚合文章用） |
| `updatedAt` | ❌ | 更新日期 |

### 板块 ID 对照

| 板块名称 | ID |
|---------|-----|
| Spec-Driven 开发 | `spec-driven-dev` |
| AI 编程工具 | `ai-coding-tools` |
| 提示工程 | `prompt-engineering` |
| AI 辅助产品设计 | `ai-product-design` |
| 工作流最佳实践 | `workflow-best-practices` |
| 资源导航 | `resources` |
