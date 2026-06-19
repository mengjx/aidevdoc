"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MDXRendererProps {
  content: string;
}

// Custom components for markdown
const components: Record<string, React.FC<React.PropsWithChildren<Record<string, unknown>>>> = {
  h2: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
    const id = String(children)
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return <h2 id={id} className="text-2xl font-bold mt-10 mb-4 text-gray-900 dark:text-white" {...props}>{children as React.ReactNode}</h2>;
  },
  h3: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
    const id = String(children)
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return <h3 id={id} className="text-xl font-semibold mt-8 mb-3 text-gray-900 dark:text-white" {...props}>{children as React.ReactNode}</h3>;
  },
  h4: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
    const id = String(children)
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return <h4 id={id} className="text-lg font-medium mt-6 mb-2 text-gray-900 dark:text-white" {...props}>{children as React.ReactNode}</h4>;
  },
  p: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed my-4" {...props}>{children as React.ReactNode}</p>
  ),
  ul: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
    <ul className="list-disc pl-6 my-4 space-y-1.5 text-gray-700 dark:text-gray-300" {...props}>{children as React.ReactNode}</ul>
  ),
  ol: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
    <ol className="list-decimal pl-6 my-4 space-y-1.5 text-gray-700 dark:text-gray-300" {...props}>{children as React.ReactNode}</ol>
  ),
  li: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
    <li className="leading-relaxed" {...props}>{children as React.ReactNode}</li>
  ),
  a: ({ children, href, ...props }: React.PropsWithChildren<{ href?: string } & Record<string, unknown>>) => (
    <a
      className="text-primary-600 hover:text-primary-700 underline decoration-primary-200 hover:decoration-primary-500 transition-colors"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      {...props}
    >
      {children as React.ReactNode}
    </a>
  ),
  blockquote: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
    <blockquote className="border-l-4 border-primary-300 dark:border-primary-700 pl-4 my-4 italic text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 py-2 pr-4 rounded-r-lg" {...props}>{children as React.ReactNode}</blockquote>
  ),
  code: ({ className, children, ...props }: React.PropsWithChildren<{ className?: string } & Record<string, unknown>>) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code className="bg-gray-100 dark:bg-gray-800 text-primary-700 dark:text-primary-300 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
          {children as React.ReactNode}
        </code>
      );
    }
    return (
      <code className={className} {...props}>
        {children as React.ReactNode}
      </code>
    );
  },
  pre: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
    <pre className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto my-4 text-sm leading-relaxed" {...props}>{children as React.ReactNode}</pre>
  ),
  table: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full border-collapse text-sm" {...props}>{children as React.ReactNode}</table>
    </div>
  ),
  th: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
    <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 bg-gray-50 dark:bg-gray-900 font-semibold text-left" {...props}>{children as React.ReactNode}</th>
  ),
  td: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
    <td className="border border-gray-200 dark:border-gray-700 px-4 py-2" {...props}>{children as React.ReactNode}</td>
  ),
  // eslint-disable-next-line @next/next/no-img-element
  img: ({ src, alt, ...props }: React.PropsWithChildren<{ src?: string; alt?: string } & Record<string, unknown>>) => (
    <img className="max-w-full h-auto rounded-lg my-6" src={src} alt={alt || ""} {...props} />
  ),
  hr: () => <hr className="my-8 border-gray-200 dark:border-gray-800" />,
};

export default function MDXRenderer({ content }: MDXRendererProps) {
  return (
    <div className="prose-custom">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        components={components as any}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
