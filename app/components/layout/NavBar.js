import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto max-w-6xl px-4">
        <div className=" flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-primary">آرمان داریوشی</h1>
          </div>
          <div className="space-x-reverse md:block space-x-8">
            <Link
              dir="rtl"
              href="/"
              className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
            >
              صفحه اصلی
            </Link>
            <Link
              dir="rtl"
              href="/register"
              className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
            >
              ثبت‌نام
            </Link>
            <Link
              dir="rtl"
              href="/dashboard"
              className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
            >
              داشبورد
            </Link>
            <Link
              dir="rtl"
              href="/admin"
              className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
            >
              پنل مربی
            </Link>
          </div>
        </div>
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button className="text-gray-700 hover:text-primary">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
