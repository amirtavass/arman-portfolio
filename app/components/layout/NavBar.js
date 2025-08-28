"use client";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/contexts/authContext";
import { useCart } from "@/app/contexts/CartContext";
import { MdShoppingCart, MdMenu, MdClose } from "react-icons/md";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const { getTotalItems } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
    window.location.href = "/";
  };

  // Don't render nav items while checking auth status
  if (isLoading) {
    return (
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary">
                آرمان داریوشی
              </span>
            </Link>
            <div>در حال بارگذاری...</div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Shopping Cart */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary">
                آرمان داریوشی
              </span>
            </Link>

            {/* Shopping Cart - Only show when authenticated */}
            {isAuthenticated && (
              <Link
                href="/cart"
                className="relative p-2 text-gray-600 hover:text-primary transition-colors"
              >
                <MdShoppingCart className="w-6 h-6" />
                {/* Cart badge with actual count */}
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
            )}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              خانه
            </Link>
            <Link
              href="/articles"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              مقالات
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              فروشگاه
            </Link>

            {/* Conditional Navigation based on auth status */}
            {!isAuthenticated ? (
              <>
                <Link
                  href="/auth/login"
                  className="text-gray-700 hover:text-primary transition-colors"
                >
                  ورود
                </Link>
                <Link
                  href="/register"
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors"
                >
                  ثبت‌نام
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-primary transition-colors"
                >
                  داشبورد
                </Link>
                <span className="text-gray-600">سلام {user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  خروج
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-primary transition-colors"
            >
              {isMenuOpen ? (
                <MdClose className="w-6 h-6" />
              ) : (
                <MdMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 text-gray-700 hover:text-primary"
              >
                خانه
              </Link>
              <Link
                href="/articles"
                className="block px-3 py-2 text-gray-700 hover:text-primary"
              >
                مقالات
              </Link>
              <Link
                href="/products"
                className="block px-3 py-2 text-gray-700 hover:text-primary"
              >
                فروشگاه
              </Link>

              {!isAuthenticated ? (
                <>
                  <Link
                    href="/auth/login"
                    className="block px-3 py-2 text-gray-700 hover:text-primary"
                  >
                    ورود
                  </Link>
                  <Link
                    href="/register"
                    className="block px-3 py-2 bg-primary text-white rounded-lg mx-3"
                  >
                    ثبت‌نام
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/dashboard"
                    className="block px-3 py-2 text-gray-700 hover:text-primary"
                  >
                    داشبورد
                  </Link>
                  <div className="px-3 py-2 text-gray-600">
                    سلام {user?.name}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 bg-red-500 text-white rounded-lg mx-3"
                  >
                    خروج
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
