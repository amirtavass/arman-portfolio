"use client";
import Link from "next/link";
import { useAuth } from "@/app/contexts/authContext";
import { useAdmin } from "@/app/contexts/AdminContext";
import { useLanguage } from "@/app/contexts/LanguageContext";

function MobileMenu({ pathname, onClose }) {
  const { isAuthenticated: userAuth, user, logout: userLogout } = useAuth();
  const { isAuthenticated: adminAuth, admin, logout: adminLogout } = useAdmin();
  const { language, t } = useLanguage();

  const handleUserLogout = async () => {
    await userLogout();
    onClose();
    window.location.href = "/";
  };

  const handleAdminLogout = async () => {
    await adminLogout();
    onClose();
    window.location.href = "/";
  };

  const isActiveRoute = (route) => pathname.startsWith(route);

  return (
    <div className="md:hidden bg-white border-t border-gray-200">
      <div className="px-2 pt-2 pb-3 space-y-1">
        {/* Mobile menu links (only show for non-admin users) */}
        {!adminAuth && (
          <>
            <Link
              href="/"
              className={`block px-3 py-2 transition-colors ${
                pathname === "/"
                  ? "text-primary font-medium bg-blue-50"
                  : "text-gray-700 hover:text-primary hover:bg-gray-50"
              }`}
              onClick={onClose}
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
              onClick={onClose}
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
              onClick={onClose}
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
              onClick={onClose}
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
              onClick={onClose}
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
              onClick={onClose}
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
              onClick={onClose}
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
              onClick={onClose}
            >
              {t("adminLogin")}
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default MobileMenu;
