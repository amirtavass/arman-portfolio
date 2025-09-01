"use client";
import { useAuth } from "@/app/contexts/authContext";
import Link from "next/link";
import ProtectedRoute from "@/app/auth/ProtectedRoute";

function DashboardPage() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = "/"; // Force redirect to home
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-200 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                سلام {user?.name}
              </h1>
              <p className="text-lg text-gray-600">
                به داشبورد شخصی خود خوش آمدید
              </p>

              {/* User Info Card */}
              <div className="bg-blue-50 p-4 rounded-lg mt-6 max-w-md mx-auto">
                <h3 className="font-bold text-gray-800 mb-2">اطلاعات کاربری</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <strong>نام:</strong> {user?.name}
                  </p>
                  <p>
                    <strong>ایمیل:</strong> {user?.email}
                  </p>
                  <p>
                    <strong>موجودی:</strong> {user?.balance?.toLocaleString()}{" "}
                    تومان
                  </p>
                  <p>
                    <strong>سطح مهارت:</strong> {user?.skillLevel}
                  </p>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                خروج از حساب
              </button>
            </div>

            {/* Success Message */}
            <div className="mb-8 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              ثبت‌نام شما با موفقیت انجام شد! اکنون می‌توانید برای کلاس‌های شنا
              ثبت‌نام کنید.
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  کلاس‌های شنا
                </h3>
                <p className="text-gray-600 mb-4">
                  مشاهده و ثبت‌نام در کلاس‌های مختلف
                </p>
                <Link
                  href="/"
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark"
                >
                  مشاهده کلاس‌ها
                </Link>
              </div>
              <div className="bg-green-50 p-6 rounded-lg text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  کلاس‌های من
                </h3>
                <p className="text-gray-600 mb-4">
                  مشاهده کلاس‌های ثبت‌نام شده
                </p>
                <button className="bg-success text-white px-6 py-2 rounded-lg hover:bg-green-700">
                  کلاس‌های من
                </button>
              </div>
            </div>

            {/* Rest of dashboard content remains the same */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Existing feature boxes */}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default DashboardPage;
