# AI 辅助开发知识库 — 技术方案

> 版本：v1.0-MVP | 日期：2025-06-18

---

## 一、技术选型

| 层级 | 技术 | 选型理由 |
|------|------|---------|
| **框架** | Next.js 14 (App Router) | SSG 模式，完美适配静态博客；React 生态成熟 |
| **语言** | TypeScript | 类型安全，维护性高 |
| **样式** | Tailwind CSS 3 | 原子化 CSS，快速出 UI，内置暗色模式 |
| **内容** | MDX (next-mdx-remote) | Markdown + React 组件混写，灵活性强 |
| **搜索** | 客户端全文搜索（FlexSearch） | 纯静态，无需后端 |
| **代码高亮** | Shiki | 构建时语法高亮，零运行时开销 |
| **图标** | Lucide React | 轻量、可 Tree-shaking |
| **部署** | 腾讯云 COS + CDN | 最低成本（免费额度 + 按量计费） |
| **CI/CD** | GitHub Actions | 推送即部署 |

---

## 二、部署架构

```
┌──────────────────────────────────────────────────────┐
│                    GitHub Actions                     │
│  git push → build (next build) → export static       │
│  → 上传至 COS → 刷新 CDN                             │
└──────────────────┬───────────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────────┐
│              腾讯云 COS (对象存储)                      │
│  - 静态网站托管模式                                     │
│  - 绑定自定义子域名 (ai.example.com)                    │
│  - 免费额度：50GB 存储 / 10GB 外网流量                  │
└──────────────────┬───────────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────────┐
│              腾讯云 CDN (内容分发)                      │
│  - 全球加速 + HTTPS                                    │
│  - 免费额度：10GB/月（中国境内）                         │
│  - 自定义域名 + SSL 证书                                │
└──────────────────────────────────────────────────────┘
```

### 2.1 成本估算

| 项目 | 月费用（预计） |
|------|-------------|
| COS 存储（< 1GB） | ¥0（免费额度 50GB） |
| COS 外网流量（< 10GB） | ¥0（免费额度 10GB） |
| CDN 流量（< 10GB） | ¥0（免费额度 10GB） |
| CDN HTTPS 请求 | ¥0（免费额度 200 万次） |
| SSL 证书 | ¥0（腾讯云免费证书） |
| **合计** | **¥0/月**（流量极低时可完全免费） |

> 注：如果后续流量增长超过免费额度，月成本约在 ¥5-50 之间。

---

## 三、项目目录结构

```
ai-dev-knowledge-hub/
├── public/                    # 静态资源
│   ├── images/                # 图片资源
│   └── favicon.ico
├── content/                   # MDX 文章内容
│   ├── spec-driven-dev/       # 按板块组织
│   ├── ai-coding-tools/
│   ├── prompt-engineering/
│   ├── ai-product-design/
│   ├── workflow-best-practices/
│   └── resources/
├── scripts/                   # 自动化脚本
│   ├── aggregate.ts           # 内容聚合脚本
│   └── deploy-cos.sh          # COS 部署脚本
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── page.tsx           # 首页
│   │   ├── articles/
│   │   │   ├── page.tsx       # 文章列表
│   │   │   └── [slug]/
│   │   │       └── page.tsx   # 文章详情
│   │   ├── tools/
│   │   │   └── page.tsx       # 工具导航
│   │   ├── topics/
│   │   │   └── [topic]/
│   │   │       └── page.tsx   # 知识板块
│   │   ├── about/
│   │   │   └── page.tsx       # 关于页
│   │   └── layout.tsx         # 根布局
│   ├── components/            # 可复用组件
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ArticleCard.tsx
│   │   ├── SearchBar.tsx
│   │   ├── TableOfContents.tsx
│   │   ├── TopicNav.tsx
│   │   └── MDXRenderer.tsx
│   ├── lib/                   # 工具库
│   │   ├── articles.ts        # 文章数据处理
│   │   ├── tools-data.ts      # 工具数据
│   │   ├── search.ts          # 搜索索引
│   │   └── topics.ts          # 板块定义
│   └── styles/
│       └── globals.css        # 全局样式
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 四、数据模型

### 4.1 文章 Frontmatter

```yaml
---
title: "OpenSpec 实战：从需求到代码的规范驱动开发"
slug: "openspec-sdd-practice"
topic: "spec-driven-dev"          # 所属板块
publishedAt: "2025-06-15"
updatedAt: "2025-06-15"
description: "深入解析 OpenSpec 的六阶段工作流..."
author: "Your Name"
tags: ["openspec", "sdd", "spec-coding"]
coverImage: "/images/openspec-cover.png"
featured: true                     # 是否精选
externalUrl: ""                    # 外部原文链接（聚合内容）
---
```

### 4.2 工具数据模型

```typescript
interface Tool {
  name: string;
  category: "ide-plugin" | "cli-agent" | "platform" | "framework";
  description: string;
  url: string;
  pricing: "free" | "freemium" | "paid";
  tags: string[];
  rating?: number;          // 1-5
  pros: string[];
  cons: string[];
}
```

---

## 五、核心实现要点

### 5.1 静态生成策略

- 使用 Next.js `generateStaticParams` 为所有文章生成静态页面
- 使用 `next-mdx-remote` 在服务端编译 MDX
- 构建时生成搜索索引 JSON，客户端加载

### 5.2 搜索实现

- 使用 `flexsearch` 构建文章全文索引
- 构建时生成索引文件，客户端加载后搜索
- 支持中文分词

### 5.3 自动化聚合

- 定时脚本（GitHub Actions cron / 本地运行）
- 从 RSS 源抓取最新文章
- 调用 AI API 生成中文摘要
- 自动生成 MDX 文件到 content 目录

### 5.4 性能优化

- Next.js Image 组件优化图片加载
- 静态页面预渲染，首屏 < 1s
- CDN 全球加速
- 代码分割，按页面加载

---

## 六、部署流程

```bash
# 1. 构建静态站点
npm run build

# 2. 导出静态文件到 out/
npm run export

# 3. 上传至腾讯云 COS
# 使用 COSCMD 或 cos-nodejs-sdk-v5
coscmd upload -r out/ / --delete

# 4. 刷新 CDN 缓存
# 腾讯云 CDN 刷新 API
```
