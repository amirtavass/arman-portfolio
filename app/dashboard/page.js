function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-200 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              سلام علی رضایی
            </h1>
            <p className="text-lg text-gray-600">
              به داشبورد شخصی خود خوش آمدید
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Class Booking Box */}
            <div className="bg-gray-100 rounded-xl shadow-lg p-8 text-center opacity-60">
              <div className="w-16 h-16 bg-blue-100 flex justify-center rounded-full items-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                رزرو کلاس
              </h3>
              <p className="text-gray-600 mb-6">انتخاب تاریخ و زمان کلاس شنا</p>
              <button
                disabled
                className="bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold cursor-not-allowed"
              >
                غیرفعال
              </button>
              <p className="text-sm text-blue-600 mt-4">
                این قابلیت در نسخه کامل فعال خواهد بود.
              </p>
            </div>

            {/* Online Payment Box */}
            <div className="bg-gray-100 rounded-xl shadow-lg p-8 text-center opacity-60">
              <div className="w-16 h-16 bg-green-100 flex justify-center rounded-full items-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                پرداخت آنلاین
              </h3>
              <p className="text-gray-600 mb-6">پرداخت امن هزینه کلاس‌ها</p>
              <button
                disabled
                className="bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold cursor-not-allowed"
              >
                غیرفعال
              </button>
              <p className="text-sm text-blue-600 mt-4">
                این قابلیت در نسخه کامل فعال خواهد بود.
              </p>
            </div>

            {/* Available Dates Box */}
            <div className="bg-gray-100 rounded-xl shadow-lg p-8 text-center opacity-60">
              <div className="w-16 h-16 bg-purple-100 flex justify-center rounded-full items-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                مشاهده تاریخ‌های آزاد
              </h3>
              <p className="text-gray-600 mb-6">
                بررسی تاریخ‌های در دسترس مربی
              </p>
              <button
                disabled
                className="bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold cursor-not-allowed"
              >
                غیرفعال
              </button>
              <p className="text-sm text-blue-600 mt-4">
                این قابلیت در نسخه کامل فعال خواهد بود.
              </p>
            </div>
          </div>

          {/* Overall Demo Notice */}
          <div className="mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="text-center">
              <h4 className="text-lg font-bold text-yellow-800 mb-2">
                نسخه آزمایشی
              </h4>
              <p className="text-yellow-700">
                این داشبورد نمایی از امکانات نسخه کامل است. در نسخه نهایی، تمام
                قابلیت‌ها فعال و کاربردی خواهند بود.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
