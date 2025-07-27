import Link from "next/link";

function Footer() {
  return (
    <div className="mt-0  py-5 text-white bg-gray-800">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* right side (coach info) */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-bold mb-2">آرمان داریوشی</h3>
            <p className="text-gray-300">مربی شنا و طراح گرافیک</p>
            <p className="text-gray-300">تلفن:09179143267</p>
            <p className="text-gray-300">ایمیل: arman@example.com</p>
          </div>
          {/* Right side content */}
          <div className="text-center md:text-left">
            <div className="flex gap-6 mb-3 justify-center md:justify-start">
              <Link
                href="/"
                className="text-gray-300 hover:text-white transition-colors"
              >
                صفحه اصلی
              </Link>
              <Link
                href="/register"
                className="text-gray-300 hover:text-white transition-colors"
              >
                ثبت‌نام
              </Link>
              <Link
                href="/graphic-design"
                className="text-gray-300 hover:text-white transition-colors"
              >
                طراحی گرافیک
              </Link>
            </div>
            <p className="text-gray-400 text-sm">
              © 1404 آرمان داریوشی. تمام حقوق محفوظ است.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
