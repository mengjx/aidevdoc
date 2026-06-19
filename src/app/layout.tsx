import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "AI Dev Hub — AI 辅助开发知识库",
    template: "%s | AI Dev Hub",
  },
  description:
    "系统化整理 AI 辅助开发知识：Spec-Driven Development、AI 编程工具、Prompt Engineering、工作流最佳实践。为中文开发者打造的一站式知识聚合平台。",
  keywords: [
    "AI编程",
    "Spec-Driven Development",
    "AI辅助开发",
    "Prompt Engineering",
    "Cursor",
    "Claude Code",
    "AI工具",
    "开发工作流",
  ],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "AI Dev Hub",
    title: "AI Dev Hub — AI 辅助开发知识库",
    description:
      "系统化整理 AI 辅助开发知识：Spec-Driven Development、AI 编程工具、Prompt Engineering、工作流最佳实践。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
