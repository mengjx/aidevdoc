export interface Tool {
  id: string;
  name: string;
  category: "ide-plugin" | "cli-agent" | "platform" | "framework" | "model";
  description: string;
  url: string;
  pricing: "free" | "freemium" | "paid";
  tags: string[];
  rating: number; // 1-5
  pros: string[];
  cons: string[];
}

export const categoryLabels: Record<Tool["category"], string> = {
  "ide-plugin": "IDE 插件",
  "cli-agent": "CLI 智能体",
  platform: "平台工具",
  framework: "框架/SDK",
  model: "大模型",
};

export const tools: Tool[] = [
  // IDE 插件
  {
    id: "cursor",
    name: "Cursor",
    category: "ide-plugin",
    description:
      "基于 VS Code 的 AI 原生 IDE，内置 Chat、Composer、Agent 模式，支持多模型切换",
    url: "https://cursor.com",
    pricing: "freemium",
    tags: ["IDE", "AI编程", "Agent"],
    rating: 5,
    pros: ["深度集成 AI", "Composer 模式强大", "支持自定义规则", "多模型支持"],
    cons: ["免费版有使用限制", "闭源", "需要学习曲线"],
  },
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    category: "ide-plugin",
    description:
      "GitHub 官方 AI 编程助手，深度集成 VS Code / JetBrains，支持代码补全、Chat、Agent 模式",
    url: "https://github.com/features/copilot",
    pricing: "paid",
    tags: ["IDE", "代码补全", "Agent"],
    rating: 4,
    pros: ["IDE 集成最广", "代码补全准确率高", "GitHub 生态整合"],
    cons: ["收费（$10/月）", "Agent 模式较新", "上下文限制"],
  },
  {
    id: "windsurf",
    name: "Windsurf",
    category: "ide-plugin",
    description:
      "Codeium 团队打造的 AI IDE，主打 Cascade 流式 Agent 体验，上下文理解强",
    url: "https://codeium.com/windsurf",
    pricing: "freemium",
    tags: ["IDE", "Agent", "流式"],
    rating: 4,
    pros: ["Cascade 体验流畅", "免费额度大", "上下文理解强"],
    cons: ["社区生态较新", "部分功能不成熟"],
  },
  {
    id: "aider",
    name: "Aider",
    category: "cli-agent",
    description:
      "终端 AI 结对编程工具，支持多模型、Git 自动提交、Map-Refine 架构",
    url: "https://aider.chat",
    pricing: "free",
    tags: ["CLI", "Git集成", "多模型"],
    rating: 5,
    pros: ["开源免费", "Git 自动管理", "支持几乎所有 LLM", "架构优秀"],
    cons: ["纯命令行", "需要自行配置 API Key", "无 GUI"],
  },
  {
    id: "claude-code",
    name: "Claude Code",
    category: "cli-agent",
    description:
      "Anthropic 官方 CLI Agent，基于 Claude 模型，支持复杂任务分解和执行",
    url: "https://docs.anthropic.com/en/docs/claude-code",
    pricing: "paid",
    tags: ["CLI", "Agent", "Anthropic"],
    rating: 5,
    pros: ["推理能力强", "复杂任务处理优秀", "安全设计好"],
    cons: ["按量付费较贵", "仅支持 Claude 模型"],
  },
  {
    id: "codebuddy",
    name: "CodeBuddy",
    category: "cli-agent",
    description:
      "腾讯云 AI 代码助手，支持 CLI/IDE 多模式，深度集成腾讯云生态",
    url: "https://copilot.tencent.com",
    pricing: "freemium",
    tags: ["CLI", "IDE", "腾讯云"],
    rating: 4,
    pros: ["腾讯云生态整合", "中文体验好", "支持多种模式"],
    cons: ["国际影响力有限", "部分高级功能收费"],
  },
  {
    id: "github-copilot-cli",
    name: "Copilot CLI",
    category: "cli-agent",
    description: "GitHub Copilot 的 CLI 扩展，直接在终端中生成命令和脚本",
    url: "https://github.com/github/copilot-cli",
    pricing: "paid",
    tags: ["CLI", "Shell", "GitHub"],
    rating: 3,
    pros: ["终端原生体验", "GitHub 集成"],
    cons: ["功能相对单一", "需要 Copilot 订阅"],
  },
  // 平台工具
  {
    id: "v0",
    name: "v0 by Vercel",
    category: "platform",
    description: "Vercel 推出的 AI 前端生成工具，自然语言描述 → React/Next.js 组件",
    url: "https://v0.dev",
    pricing: "freemium",
    tags: ["前端生成", "React", "UI"],
    rating: 4,
    pros: ["UI 生成质量高", "直接可复制代码", "迭代速度快"],
    cons: ["仅限前端 UI", "复杂逻辑支持弱"],
  },
  {
    id: "bolt",
    name: "Bolt.new",
    category: "platform",
    description: "StackBlitz 推出的浏览器内全栈应用生成器，支持 Node.js/React 等",
    url: "https://bolt.new",
    pricing: "freemium",
    tags: ["全栈", "在线IDE", "快速原型"],
    rating: 4,
    pros: ["浏览器即用", "全栈支持", "部署一键完成"],
    cons: ["复杂项目受限", "免费额度有限"],
  },
  {
    id: "lovable",
    name: "Lovable",
    category: "platform",
    description: "AI 驱动的全栈应用构建平台，从描述到可部署应用",
    url: "https://lovable.dev",
    pricing: "freemium",
    tags: ["全栈", "快速构建", "部署"],
    rating: 4,
    pros: ["全栈生成", "部署简单", "迭代友好"],
    cons: ["定制化受限", "收费较高"],
  },
  // 框架/SDK
  {
    id: "langchain",
    name: "LangChain",
    category: "framework",
    description: "LLM 应用开发框架，提供 Chain/Agent/Tool 等抽象，支持 Python/JS",
    url: "https://langchain.com",
    pricing: "free",
    tags: ["LLM", "框架", "Agent"],
    rating: 4,
    pros: ["生态丰富", "抽象层次好", "社区活跃"],
    cons: ["学习曲线陡", "版本迭代快", "过度抽象"],
  },
  {
    id: "crewai",
    name: "CrewAI",
    category: "framework",
    description: "多 Agent 协作框架，定义角色和任务，Agent 自动协作完成复杂工作流",
    url: "https://crewai.com",
    pricing: "free",
    tags: ["多Agent", "协作", "工作流"],
    rating: 4,
    pros: ["多 Agent 协作", "角色定义清晰", "易上手"],
    cons: ["复杂场景稳定性待提升", "调试困难"],
  },
  {
    id: "openspec",
    name: "OpenSpec",
    category: "framework",
    description: "AI 时代的规范驱动开发框架，六阶段工作流，需求到代码全流程管理",
    url: "https://github.com/Fission-AI/OpenSpec",
    pricing: "free",
    tags: ["SDD", "规范", "工作流"],
    rating: 4,
    pros: ["工作流完整", "开源", "设计理念先进"],
    cons: ["较新，社区小", "文档待完善"],
  },
  // 大模型
  {
    id: "claude",
    name: "Claude (Anthropic)",
    category: "model",
    description: "Anthropic 的旗舰模型，编程能力顶尖，长上下文（200K），安全对齐",
    url: "https://anthropic.com",
    pricing: "paid",
    tags: ["LLM", "编程", "长上下文"],
    rating: 5,
    pros: ["编程能力最强之一", "长上下文", "安全性好"],
    cons: ["价格较高", "部分地区不可用"],
  },
  {
    id: "gpt4",
    name: "GPT-4o (OpenAI)",
    category: "model",
    description: "OpenAI 多模态旗舰模型，速度极快，支持图片/语音/代码",
    url: "https://openai.com",
    pricing: "paid",
    tags: ["LLM", "多模态", "通用"],
    rating: 5,
    pros: ["速度快", "多模态", "生态最完善"],
    cons: ["价格较高", "偶有幻觉"],
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    category: "model",
    description: "国产开源大模型，编程能力优秀，价格极低，中文友好",
    url: "https://deepseek.com",
    pricing: "freemium",
    tags: ["LLM", "开源", "中文"],
    rating: 5,
    pros: ["开源", "性价比极高", "中文优秀", "编程能力强"],
    cons: ["服务稳定性待提升", "国际影响力有限"],
  },
];

export function getToolsByCategory(category: Tool["category"]): Tool[] {
  return tools.filter((t) => t.category === category);
}

export function getToolById(id: string): Tool | undefined {
  return tools.find((t) => t.id === id);
}

export function getAllCategories(): Tool["category"][] {
  return ["ide-plugin", "cli-agent", "platform", "framework", "model"];
}
