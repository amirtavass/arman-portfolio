"use client";
import { useAdminLogin } from "@/app/hooks/useAdminAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/app/contexts/LanguageContext";

function AdminLoginPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();
  const adminLoginMutation = useAdminLogin();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminLoginMutation.mutateAsync(formData);
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Admin login failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {" "}
              {t("adminLogin")}
            </h1>
          </div>

          {adminLoginMutation.error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {t("error")}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="username"
              placeholder={t("adminUserName")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder={t("adminPassword")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.password}
              onChange={handleInputChange}
              required
            />

            <button
              type="submit"
              disabled={adminLoginMutation.isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              {t("adminLogin")}
            </button>
          </form>

          <div className="text-center mt-6">
            <Link href="/" className="text-blue-600 hover:underline text-sm">
              {t("back")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;
