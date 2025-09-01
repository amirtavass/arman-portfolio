"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/contexts/authContext";
import { useCart } from "@/app/contexts/CartContext";
import { useAdmin } from "@/app/contexts/AdminContext";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { MdShoppingCart, MdMenu, MdClose, MdLanguage } from "react-icons/md";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { language, toggleLanguage, t } = useLanguage();
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
    setIsMenuOpen(false);
    window.location.href = "/";
  };

  const handleAdminLogout = async () => {
    await adminLogout();
    setIsMenuOpen(false);
    window.location.href = "/";
  };

  // Function to check if route is active
  const isActiveRoute = (route) => {
    if (route === "/" && pathname === "/") return true;
    if (route !== "/" && pathname.startsWith(route)) return true;
    return false;
  };

  // Show loading spinner while checking auth status
  if (userLoading || adminLoading) {
    return (
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex justify-between items-center h-18">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.jpg"
                alt="parsswim"
                width={800}
                height={360}
                className="h-12 w-auto sm:h-14 logo-bg-fix"
                priority
              />
            </Link>
            <div className="text-gray-600">{t("loading")}...</div>
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
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.jpg"
                alt="parsswim"
                width={800}
                height={360}
                className="h-12 w-auto sm:h-14 logo-bg-fix"
                priority
              />
            </Link>

            {/* Shopping Cart - Available to ALL users except admins */}
            {!adminAuth && (
              <Link
                href="/cart"
                className={`relative p-2 transition-colors ${
                  isActiveRoute("/cart")
                    ? "text-primary"
                    : "text-gray-600 hover:text-primary"
                }`}
              >
                <MdShoppingCart className="w-6 h-6" />
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
            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              title={language === "fa" ? "Switch to English" : "تغییر به فارسی"}
            >
              <MdLanguage className="w-5 h-5" />
              <span className="text-sm font-medium">
                {language === "fa" ? "EN" : "FA"}
              </span>
            </button>

            {/* Links available to ALL users except admins */}
            {!adminAuth && (
              <>
                <Link
                  href="/"
                  className={`transition-colors relative ${
                    isActiveRoute("/")
                      ? "text-primary font-medium"
                      : "text-gray-700 hover:text-primary"
                  }`}
                >
                  {t("home")}
                  {isActiveRoute("/") && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"></span>
                  )}
                </Link>
                <Link
                  href="/articles"
                  className={`transition-colors relative ${
                    isActiveRoute("/articles")
                      ? "text-primary font-medium"
                      : "text-gray-700 hover:text-primary"
                  }`}
                >
                  {t("articles")}
                  {isActiveRoute("/articles") && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"></span>
                  )}
                </Link>
                <Link
                  href="/products"
                  className={`transition-colors relative ${
                    isActiveRoute("/products")
                      ? "text-primary font-medium"
                      : "text-gray-700 hover:text-primary"
                  }`}
                >
                  {t("products")}
                  {isActiveRoute("/products") && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"></span>
                  )}
                </Link>
              </>
            )}

            {/* Admin Status */}
            {adminAuth ? (
              <div className="flex items-center gap-4 bg-blue-50 px-4 py-2 rounded-lg">
                <span className="text-blue-700 font-medium">
                  {language === "fa" ? "مدیر" : "Admin"}: {admin?.username}
                </span>
                <Link
                  href="/admin/dashboard"
                  className={`transition-colors ${
                    isActiveRoute("/admin")
                      ? "text-blue-900 font-medium"
                      : "text-blue-700 hover:text-blue-900"
                  }`}
                >
                  {t("adminPanel")}
                </Link>
                <button
                  onClick={handleAdminLogout}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                >
                  {t("adminLogout")}
                </button>
              </div>
            ) : userAuth ? (
              /* Regular User Menu */
              <>
                <Link
                  href="/dashboard"
                  className={`transition-colors relative ${
                    isActiveRoute("/dashboard")
                      ? "text-primary font-medium"
                      : "text-gray-700 hover:text-primary"
                  }`}
                >
                  {t("dashboard")}
                  {isActiveRoute("/dashboard") && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"></span>
                  )}
                </Link>
                <span className="text-gray-600">
                  {t("hello")}
                  {user?.name}
                </span>
                <button
                  onClick={handleUserLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  {t("logout")}
                </button>
              </>
            ) : (
              /* Guest Menu */
              <>
                <Link
                  href="/auth/login"
                  className={`transition-colors relative ${
                    isActiveRoute("/auth/login")
                      ? "text-primary font-medium"
                      : "text-gray-700 hover:text-primary"
                  }`}
                >
                  {t("login")}
                  {isActiveRoute("/auth/login") && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"></span>
                  )}
                </Link>
                <Link
                  href="/auth/register"
                  className={`transition-colors px-4 py-2 rounded-lg ${
                    isActiveRoute("/auth/register")
                      ? "bg-primary-dark text-white"
                      : "bg-primary hover:bg-primary-dark text-white"
                  }`}
                >
                  {t("register")}
                </Link>
                <Link
                  href="/admin/login"
                  className={`text-sm transition-colors ${
                    isActiveRoute("/admin/login")
                      ? "text-blue-800 font-medium"
                      : "text-blue-600 hover:text-blue-700"
                  }`}
                >
                  {t("adminLogin")}
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile menu links (only show for non-admin users) */}
              {!adminAuth && (
                <>
                  <Link
                    href="/"
                    className={`block px-3 py-2 transition-colors ${
                      isActiveRoute("/")
                        ? "text-primary font-medium bg-blue-50"
                        : "text-gray-700 hover:text-primary hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("home")}
                  </Link>
                  <Link
                    href="/articles"
                    className={`block px-3 py-2 transition-colors ${
                      isActiveRoute("/articles")
                        ? "text-primary font-medium bg-blue-50"
                        : "text-gray-700 hover:text-primary hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("articles")}
                  </Link>
                  <Link
                    href="/products"
                    className={`block px-3 py-2 transition-colors ${
                      isActiveRoute("/products")
                        ? "text-primary font-medium bg-blue-50"
                        : "text-gray-700 hover:text-primary hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("products")}
                  </Link>
                </>
              )}

              {/* Mobile Admin/User Menu */}
              {adminAuth ? (
                /* Admin Mobile Menu */
                <>
                  <div className="px-3 py-2 text-blue-700 font-medium bg-blue-50 mx-3 rounded">
                    {language === "fa" ? "مدیر" : "Admin"}: {admin?.username}
                  </div>
                  <Link
                    href="/admin/dashboard"
                    className={`block px-3 py-2 mx-3 transition-colors ${
                      isActiveRoute("/admin")
                        ? "text-blue-900 font-medium bg-blue-100"
                        : "text-blue-700 hover:text-blue-900"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("adminPanel")}
                  </Link>
                  <button
                    onClick={handleAdminLogout}
                    className="block w-full text-left px-3 py-2 bg-blue-600 text-white rounded-lg mx-3 mt-2"
                  >
                    {t("adminLogout")}
                  </button>
                </>
              ) : userAuth ? (
                /* Regular User Mobile Menu */
                <>
                  <Link
                    href="/dashboard"
                    className={`block px-3 py-2 transition-colors ${
                      isActiveRoute("/dashboard")
                        ? "text-primary font-medium bg-blue-50"
                        : "text-gray-700 hover:text-primary hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("dashboard")}
                  </Link>
                  <div className="px-3 py-2 text-gray-600">
                    {t("hello")} {user?.name}
                  </div>
                  <button
                    onClick={handleUserLogout}
                    className="block w-full text-left px-3 py-2 bg-red-500 text-white rounded-lg mx-3 mt-2"
                  >
                    {t("logout")}
                  </button>
                </>
              ) : (
                /* Guest Mobile Menu */
                <>
                  <Link
                    href="/auth/login"
                    className={`block px-3 py-2 transition-colors ${
                      isActiveRoute("/auth/login")
                        ? "text-primary font-medium bg-blue-50"
                        : "text-gray-700 hover:text-primary hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("login")}
                  </Link>
                  <Link
                    href="/auth/register"
                    className={`block px-3 py-2 mx-3 rounded-lg transition-colors ${
                      isActiveRoute("/auth/register")
                        ? "bg-primary-dark text-white"
                        : "bg-primary text-white hover:bg-primary-dark"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("register")}
                  </Link>
                  <Link
                    href="/admin/login"
                    className={`block px-3 py-2 transition-colors ${
                      isActiveRoute("/admin/login")
                        ? "text-blue-800 font-medium bg-blue-50"
                        : "text-blue-600 hover:text-blue-700 hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("adminLogin")}
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
