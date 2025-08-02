import Link from "next/link";

function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">ورود</h1>
            <p className="text-gray-600">به حساب خود وارد شوید</p>
          </div>

          {/* Login Form */}
          <form className="space-y-6">
            <input
              type="email"
              placeholder="ایمیل یا نام کاربری"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
            <input
              type="password"
              placeholder="رمز عبور"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-semibold transition-colors"
            >
              ورود
            </button>
          </form>

          {/* Register Link */}
          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-600 mb-4">کاربر جدید هستید؟</p>
            <Link
              href="/register"
              className="inline-block bg-success hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              ابتدا ثبت نام کنید
            </Link>
          </div>

          {/* Forgot Password */}
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
