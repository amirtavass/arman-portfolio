"use client";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/contexts/authContext";
import { useCart } from "@/app/contexts/CartContext";
import { useAdmin } from "@/app/contexts/AdminContext";
import { MdShoppingCart, MdMenu, MdClose } from "react-icons/md";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    isAuthenticated: userAuth,
    user,
    logout: userLogout,
    isLoading: userLoading,
  } = useAuth();
  const {
    isAuthenticated: adminAuth,
    admin,
    logout: adminLogout,
    isLoading: adminLoading,
  } = useAdmin();
  const { getTotalItems } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleUserLogout = async () => {
    await userLogout();
    setIsMenuOpen(false); // Close mobile menu
    window.location.href = "/";
  };

  const handleAdminLogout = async () => {
    await adminLogout();
    setIsMenuOpen(false); // Close mobile menu
    window.location.href = "/";
  };

  // Show loading spinner while checking auth status
  if (userLoading || adminLoading) {
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

            {/* Shopping Cart - Available to ALL users except admins */}
            {!adminAuth && (
              <Link
                href="/cart"
                className="relative p-2 text-gray-600 hover:text-primary transition-colors"
              >
                <MdShoppingCart className="w-6 h-6" />
                {/* Show cart count for all users */}
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
            )}
          </div>

          {/* Desktop Menu - CONDITIONAL RENDERING based on auth status */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            {/* Links available to ALL users except admins */}
            {!adminAuth && (
              <>
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
              </>
            )}

            {/* 🔒 ADMIN STATUS: Show admin info if logged in as admin */}
            {adminAuth ? (
              <div className="flex items-center gap-4 bg-blue-50 px-4 py-2 rounded-lg">
                <span className="text-blue-700 font-medium">
                  مدیر: {admin?.username}
                </span>
                <Link
                  href="/admin/dashboard"
                  className="text-blue-700 hover:text-blue-900"
                >
                  پنل مدیریت
                </Link>
                <button
                  onClick={handleAdminLogout}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                >
                  خروج مدیر
                </button>
              </div>
            ) : userAuth ? (
              /* 🔒 REGULAR USER: Show user menu (NO admin login option when user is logged in) */
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-primary transition-colors"
                >
                  داشبورد
                </Link>
                <span className="text-gray-600">سلام {user?.name}</span>
                <button
                  onClick={handleUserLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  خروج
                </button>
              </>
            ) : (
              /* 🔒 GUEST USER: Show login/register + admin login */
              <>
                <Link
                  href="/auth/login"
                  className="text-gray-700 hover:text-primary transition-colors"
                >
                  ورود هنرجو
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors"
                >
                  ثبت‌نام
                </Link>
                <Link
                  href="/admin/login"
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  ورود مدیر
                </Link>
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

        {/* Mobile Menu - Same conditional logic */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile menu links (only show for non-admin users) */}
              {!adminAuth && (
                <>
                  <Link
                    href="/"
                    className="block px-3 py-2 text-gray-700 hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    خانه
                  </Link>
                  <Link
                    href="/articles"
                    className="block px-3 py-2 text-gray-700 hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    مقالات
                  </Link>
                  <Link
                    href="/products"
                    className="block px-3 py-2 text-gray-700 hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    فروشگاه
                  </Link>
                </>
              )}

              {/* Mobile Admin/User Menu */}
              {adminAuth ? (
                /* Admin Mobile Menu */
                <>
                  <div className="px-3 py-2 text-blue-700 font-medium bg-blue-50 mx-3 rounded">
                    مدیر: {admin?.username}
                  </div>
                  <Link
                    href="/admin/dashboard"
                    className="block px-3 py-2 text-blue-700 hover:text-blue-900 mx-3"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    پنل مدیریت
                  </Link>
                  <button
                    onClick={handleAdminLogout}
                    className="block w-full text-left px-3 py-2 bg-blue-600 text-white rounded-lg mx-3 mt-2"
                  >
                    خروج مدیر
                  </button>
                </>
              ) : userAuth ? (
                /* Regular User Mobile Menu (NO admin login option) */
                <>
                  <Link
                    href="/dashboard"
                    className="block px-3 py-2 text-gray-700 hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    داشبورد
                  </Link>
                  <div className="px-3 py-2 text-gray-600">
                    سلام {user?.name}
                  </div>
                  <button
                    onClick={handleUserLogout}
                    className="block w-full text-left px-3 py-2 bg-red-500 text-white rounded-lg mx-3 mt-2"
                  >
                    خروج
                  </button>
                </>
              ) : (
                /* Guest Mobile Menu */
                <>
                  <Link
                    href="/auth/login"
                    className="block px-3 py-2 text-gray-700 hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    ورود هنرجو
                  </Link>
                  <Link
                    href="/auth/register"
                    className="block px-3 py-2 bg-primary text-white rounded-lg mx-3"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    ثبت‌نام
                  </Link>
                  <Link
                    href="/admin/login"
                    className="block px-3 py-2 text-blue-600 hover:text-blue-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    ورود مدیر
                  </Link>
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
