import { FaChalkboardTeacher } from "react-icons/fa";
import { FaCertificate } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa";

function CoachResume() {
  return (
    <section className="py-13 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-gray-800 font-bold text-3xl mb-4">رزومه مربی</h2>
          <p className="text-lg text-gray-600">
            با ۱۵ سال تجربه در آموزش شنا و کسب مدارک بین‌المللی
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 flex justify-center rounded-full items-center mx-auto mb-6">
              <FaChalkboardTeacher className="text-3xl text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              سابقه کاری{" "}
            </h3>
            <ul className="text-gray-600 space-y-2">
              <li>۱۵ سال سابقه آموزش شنا</li>
              <li>بیش از ۵۰۰ دانش‌آموز</li>
              <li>آموزش کودکان و بزرگسالان</li>
              <li>تدریس در باشگاه‌های معتبر</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 flex justify-center rounded-full items-center mx-auto mb-6">
              <FaCertificate className="text-3xl text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              گواهینامه‌ها{" "}
            </h3>
            <ul className="text-gray-600 space-y-2">
              <li>مدرک بین‌المللی شنا</li>
              <li>مربیگری درجه یک</li>
              <li>گواهینامه نجات‌گری</li>
              <li>مدرک آموزش کودکان</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 flex justify-center rounded-full items-center mx-auto mb-6">
              <FaTrophy className="text-3xl text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">افتخارات</h3>
            <ul className="text-gray-600 space-y-2">
              <li>مدال طلای کشوری ۱۳۸۵</li>
              <li>رکورددار استانی</li>
              <li>شرکت در المپیاد ملی</li>
              <li>قهرمان لیگ شنا</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CoachResume;
