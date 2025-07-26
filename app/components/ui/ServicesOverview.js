import { FaSwimmer } from "react-icons/fa";
import { MdDesignServices } from "react-icons/md";
export default function ServicesOverview() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-gray-800 font-bold text-3xl mb-4 ">خدمات ما</h2>
          <p className="text-lg text-gray-600 ">
            آرمان داریوشی در دو حوزه تخصصی خدمات ارائه می‌دهد
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 flex justify-center rounded-full items-center mx-auto mb-6">
              <FaSwimmer className="text-3xl text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">آموزش شنا</h3>
            <p className="text-gray-600 mb-6">
              آموزش حرفه‌ای شنا برای تمام سنین از مبتدی تا پیشرفته با ۱۵ سال
              تجربه
            </p>
            <button className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              ادامه مطالب
            </button>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 flex justify-center items-center rounded-full mx-auto mb-6">
              <MdDesignServices className="text-3xl text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              طراحی گرافیک
            </h3>
            <p className="text-gray-600 mb-6">
              طراحی حرفه‌ای لوگو، بروشور، پوستر و تمام نیازهای گرافیکی شما
            </p>
            <a
              href="/graphic-design"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              مشاهده نمونه کارها
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
