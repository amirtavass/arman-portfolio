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
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const classId = searchParams.get("classId");

  const loginMutation = useLogin();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear errors when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "نام کاربری الزامی است";
    }

    if (!formData.password) {
      newErrors.password = "رمز عبور الزامی است";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await loginMutation.mutateAsync(formData);

      // Redirect to dashboard (classId handling is now done in dashboard)
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);

      // Handle different types of login errors
      if (error.response?.data?.message) {
        const message = error.response.data.message;
        if (
          message.includes("information") ||
          message.includes("اطلاعات") ||
          message.includes("password") ||
          message.includes("username")
        ) {
          setErrors({ general: "نام کاربری یا رمز عبور اشتباه است" });
        } else {
          setErrors({ general: message });
        }
      } else if (error.message) {
        setErrors({ general: "خطا در ورود: " + error.message });
      } else {
        setErrors({
          general: "خطایی در ورود رخ داده است. لطفاً دوباره تلاش کنید.",
        });
      }
    } finally {
      setIsSubmitting(false);
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

          {/* General Error Display */}
          {errors.general && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                نام کاربری
              </label>
              <input
                type="text"
                name="name"
                placeholder="نام کاربری"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.name ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
                value={formData.name}
                onChange={handleInputChange}
                disabled={isSubmitting}
                required
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                رمز عبور
              </label>
              <input
                type="password"
                name="password"
                placeholder="رمز عبور"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.password
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
                value={formData.password}
                onChange={handleInputChange}
                disabled={isSubmitting}
                required
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "در حال ورود..." : "ورود"}
            </button>
          </form>

          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-600 mb-4">کاربر جدید هستید؟</p>
            <Link
              href="/auth/register"
              className="inline-block bg-success hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              ابتدا ثبت نام کنید
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
