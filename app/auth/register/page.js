"use client";
import { useState } from "react";
import { useRegister } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/app/contexts/LanguageContext";

function RegisterPage() {
  const { t } = useLanguage(); // ✅ FIXED: Ensure t is defined
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    password: "",
  });

  const router = useRouter();
  const registerMutation = useRegister();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerMutation.mutateAsync(formData);
      router.push("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  // ✅ FIXED: Add error boundary and safe defaults
  const safeT = (key, fallback = key) => {
    try {
      return t ? t(key) : fallback;
    } catch (error) {
      console.error("Translation error:", error);
      return fallback;
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 py-12">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {safeT("createAccount", "ثبت‌نام حساب کاربری")}
            </h1>
            <p className="text-gray-600">
              {safeT("registerFirst", "حساب خود را ایجاد کنید")}
            </p>
          </div>

          {registerMutation.error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {safeT("error", "خطا در ثبت‌نام. لطفا اطلاعات را بررسی کنید.")}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {safeT("username", "نام کاربری")} *
              </label>
              <input
                type="text"
                name="name"
                required
                className="text-gray-900 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {safeT("email", "ایمیل")} *
              </label>
              <input
                type="email"
                name="email"
                required
                className="text-gray-900 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {safeT("phone", "شماره تماس")} *
              </label>
              <input
                type="tel"
                name="phone"
                required
                className="text-gray-900 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {safeT("age", "سن")}
              </label>
              <input
                type="number"
                name="age"
                min="5"
                max="80"
                className="text-gray-900 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                value={formData.age}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {safeT("password", "رمز عبور")} *
              </label>
              <input
                type="password"
                name="password"
                required
                className="text-gray-900 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            <button
              type="submit"
              disabled={registerMutation.isLoading}
              className="w-full bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              {registerMutation.isLoading
                ? safeT("loading", "در حال بارگذاری") + "..."
                : safeT("registerButton", "ثبت‌نام")}
            </button>
          </form>

          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-600 mb-4">
              {safeT("alreadyHaveAccount", "قبلاً حساب دارید؟")}
            </p>
            <Link
              href="/auth/login"
              className="text-primary hover:underline font-medium"
            >
              {safeT("loginButton", "وارد شوید")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
