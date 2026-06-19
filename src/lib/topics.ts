export interface Topic {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  articleCount: number;
}

export const topics: Topic[] = [
  {
    id: "spec-driven-dev",
    name: "Spec-Driven 开发",
    description: "规范驱动开发方法论，OpenSpec / GitHub Spec Kit / Kiro 实战",
    icon: "FileText",
    color: "blue",
    articleCount: 0,
  },
  {
    id: "ai-coding-tools",
    name: "AI 编程工具",
    description: "Cursor / Copilot / Claude Code / Windsurf 评测与对比",
    icon: "Wrench",
    color: "purple",
    articleCount: 0,
  },
  {
    id: "prompt-engineering",
    name: "提示工程",
    description: "Prompt 方法论、结构化模板、代码场景最佳实践",
    icon: "Sparkles",
    color: "amber",
    articleCount: 0,
  },
  {
    id: "ai-product-design",
    name: "AI 辅助产品设计",
    description: "AI 生成 PRD / 原型 / 用户故事 / 验收标准",
    icon: "Palette",
    color: "green",
    articleCount: 0,
  },
  {
    id: "workflow-best-practices",
    name: "工作流最佳实践",
    description: "AI 驱动的研发流程、Code Review、测试、文档自动化",
    icon: "GitBranch",
    color: "red",
    articleCount: 0,
  },
  {
    id: "resources",
    name: "资源导航",
    description: "精选工具导航、论文、博客、视频、社区关注列表",
    icon: "Bookmark",
    color: "indigo",
    articleCount: 0,
  },
];

export function getTopic(id: string): Topic | undefined {
  return topics.find((t) => t.id === id);
}
