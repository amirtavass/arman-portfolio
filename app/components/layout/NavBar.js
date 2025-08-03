"use client";
import Link from "next/link";
import { useState } from "react";
import { FaSwimmer } from "react-icons/fa";
import { useTheme } from "../../contexts/ThemeContext";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDark, setIsDark } = useTheme();

  function handleToggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }
  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto max-w-6xl px-4">
        <div className=" flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <FaSwimmer className="text-2xl text-primary" />
            <h1 className="text-xl font-bold text-primary">آرمان داریوشی</h1>
          </div>
          <div className="space-x-reverse hidden md:block space-x-8">
            <Link
              dir="rtl"
              href="/"
              className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
            >
              صفحه اصلی
            </Link>
            <Link
              dir="rtl"
              href="/products"
              className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
            >
              محصولات
            </Link>
            <Link
              dir="rtl"
              href="/register"
              className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
            >
              ثبت‌نام
            </Link>

            <Link
              dir="rtl"
              href="/login"
              className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
            >
              ورود
            </Link>
            <Link
              dir="rtl"
              href="/dashboard"
              className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
            >
              داشبورد
            </Link>
            <Link
              dir="rtl"
              href="/admin"
              className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
            >
              پنل مربی
            </Link>
            <Link
              dir="rtl"
              href="/articles"
              className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
            >
              مقالات
            </Link>
            {/* Dark Mode Button - Desktop */}
            {/* <button
              onClick={() => setIsDark(!isDark)}
              className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
            >
              {isDark ? "☀️" : "🌙"}
            </button> */}
          </div>
        </div>
        {/* Mobile menu button */}

        <div className="md:hidden flex items-center space-x-3">
          {/* Dark Mode Button - Mobile */}
          {/* <button
            onClick={() => setIsDark(!isDark)}
            className="text-gray-700 hover:text-primary p-2"
          >
            {isDark ? "☀️" : "🌙"}
          </button> */}

          {/* Hamburger Button */}
          <button
            className="text-gray-700 hover:text-primary"
            onClick={handleToggleMenu}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-3 py-2 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                صفحه اصلی
              </Link>
              <Link
                href="/products"
                className="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                محصولات
              </Link>
              <Link
                href="/register"
                className="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                ثبت‌نام
              </Link>
              <Link
                dir="rtl"
                href="/login"
                className="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                ورود
              </Link>
              <Link
                href="/dashboard"
                className="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                داشبورد
              </Link>
              <Link
                href="/admin"
                className="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                پنل مربی
              </Link>
              <Link
                href="/articles"
                className="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                مقالات
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
