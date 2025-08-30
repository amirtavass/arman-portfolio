"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useClasses } from "@/app/hooks/useClasses";
import { useAuth } from "@/app/contexts/authContext";
import {
  MdAccessTime,
  MdCalendarToday,
  MdGroup,
  MdLocationOn,
} from "react-icons/md";

function ClassRegister() {
  const [selectedClass, setSelectedClass] = useState(null);
  const router = useRouter();
  const { data: classes, isLoading, error } = useClasses();
  const { isAuthenticated } = useAuth();

  const handleSelectClass = (cls) => {
    if (!isAuthenticated) {
      // Not logged in - redirect to login without class ID
      router.push("/auth/login");
    } else {
      // Logged in - save selected class to localStorage and go to dashboard
      localStorage.setItem("selectedClass", JSON.stringify(cls));

      // Always redirect to dashboard - let dashboard handle free vs paid classes
      router.push("/dashboard?action=register");
    }
  };

  const getButtonText = (cls) => {
    if (cls.currentStudents >= cls.maxStudents) {
      return "کلاس پر است";
    }

    if (!isAuthenticated) {
      return "ورود و ثبت‌نام";
    }

    // For authenticated users, show appropriate text based on class type
    if (cls.price === 0) {
      return "ثبت‌نام رایگان";
    } else {
      return "انتخاب و ثبت‌نام";
    }
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">در حال بارگذاری کلاس‌ها...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <div className="text-red-600 mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            خطا در بارگذاری
          </h3>
          <p className="text-gray-600">در بارگذاری کلاس‌ها خطایی رخ داده است</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg"
          >
            تلاش مجدد
          </button>
        </div>
      </section>
    );
  }

  if (!classes || classes.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            ثبت‌نام کلاس‌های شنا
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            انتخاب کلاس مناسب برای هر سن و سطح
          </p>
          <div className="bg-gray-100 p-8 rounded-lg">
            <p className="text-gray-600 mb-4">
              در حال حاضر کلاسی برای ثبت‌نام موجود نیست.
            </p>
            <p className="text-gray-500">لطفاً بعداً دوباره بررسی کنید.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            ثبت‌نام کلاس‌های شنا
          </h2>
          <p className="text-lg text-gray-600">
            انتخاب کلاس مناسب برای هر سن و سطح
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {classes.map((cls) => (
            <div
              key={cls._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden border hover:shadow-xl transition-shadow"
            >
              <div
                className={`text-white p-6 text-center ${
                  cls.price === 0 ? "bg-green-600" : "bg-primary"
                }`}
              >
                <h3 className="text-xl font-bold mb-2">{cls.title}</h3>
                <div className="text-3xl font-bold">
                  {cls.price === 0 ? "رایگان" : cls.price.toLocaleString()}
                </div>
                {cls.price > 0 && (
                  <div className="text-sm opacity-90">تومان</div>
                )}
                {cls.price === 0 && (
                  <div className="text-sm opacity-90">جلسه آزمایشی</div>
                )}
              </div>
              <div className="p-6">
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <MdAccessTime className="ml-3 text-primary w-5 h-5" />
                    <span>{cls.duration} دقیقه</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MdCalendarToday className="ml-3 text-primary w-5 h-5" />
                    <span>
                      {new Date(cls.date).toLocaleDateString("fa-IR")} -{" "}
                      {cls.time}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MdGroup className="ml-3 text-primary w-5 h-5" />
                    <span>
                      {cls.maxStudents - cls.currentStudents} جای خالی از{" "}
                      {cls.maxStudents}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MdLocationOn className="ml-3 text-primary w-5 h-5" />
                    <span>{cls.location || "استخر اصلی"}</span>
                  </div>
                </div>
                {cls.description && (
                  <p className="text-gray-600 mb-6">{cls.description}</p>
                )}
                <button
                  onClick={() => handleSelectClass(cls)}
                  disabled={cls.currentStudents >= cls.maxStudents}
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    cls.currentStudents >= cls.maxStudents
                      ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                      : cls.price === 0
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-success hover:bg-green-700 text-white"
                  }`}
                >
                  {getButtonText(cls)}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ClassRegister;
