"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/articles?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 dark:bg-gray-950/80 dark:border-gray-800">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-gray-900 dark:text-white">
          <BookOpen className="w-6 h-6 text-primary-600" />
          <span>AI Dev Hub</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/articles" className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-300 transition-colors">
            文章
          </Link>
          <Link href="/tools" className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-300 transition-colors">
            工具导航
          </Link>
          <Link href="/about" className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-300 transition-colors">
            关于
          </Link>
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-gray-500 hover:text-primary-600 transition-colors"
            aria-label="搜索"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-gray-500"
          aria-label="菜单"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Search Bar */}
      {searchOpen && (
        <div className="border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索文章、工具、关键词..."
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                autoFocus
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
              >
                搜索
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
          <div className="px-4 py-3 space-y-3">
            <Link
              href="/articles"
              className="block text-sm text-gray-600 dark:text-gray-300"
              onClick={() => setMenuOpen(false)}
            >
              文章
            </Link>
            <Link
              href="/tools"
              className="block text-sm text-gray-600 dark:text-gray-300"
              onClick={() => setMenuOpen(false)}
            >
              工具导航
            </Link>
            <Link
              href="/about"
              className="block text-sm text-gray-600 dark:text-gray-300"
              onClick={() => setMenuOpen(false)}
            >
              关于
            </Link>
            <form onSubmit={handleSearch} className="flex gap-2 pt-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索..."
                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm"
              />
              <button type="submit" className="px-3 py-2 bg-primary-600 text-white rounded-lg text-sm">
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
