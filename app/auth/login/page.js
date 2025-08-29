"use client";
import { useLogin } from "@/app/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

function LoginPage() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const classId = searchParams.get("classId");

  const loginMutation = useLogin();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginMutation.mutateAsync(formData);

      // Fix: Only redirect to register if classId exists AND is valid
      if (classId && classId.length === 24) {
        // MongoDB ObjectId length check
        router.push(`/register?classId=${classId}`);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              ورود کاربر
            </h1>
            <p className="text-gray-600">به حساب خود وارد شوید</p>
          </div>

          {loginMutation.error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              خطا در ورود. نام کاربری یا رمز عبور اشتباه است.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              placeholder="نام کاربری"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="رمز عبور"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              value={formData.password}
              onChange={handleInputChange}
              required
            />

            <button
              type="submit"
              disabled={loginMutation.isLoading}
              className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              {loginMutation.isLoading ? "در حال ورود..." : "ورود"}
            </button>
          </form>

          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-600 mb-4">کاربر جدید هستید؟</p>
            <Link
              href="register"
              className="inline-block bg-success hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              ابتدا ثبت نام کنید
            </Link>
          </div>

          <div className="text-center mt-4">
            <Link
              href="/forgot-password"
              className="text-primary hover:underline text-sm"
            >
              رمز عبور را فراموش کرده‌اید؟
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
