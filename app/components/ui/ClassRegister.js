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

  const handleSelectClass = (classId) => {
    if (!isAuthenticated) {
      // Not logged in - redirect to login with classId
      router.push(`/auth/login?classId=${classId}`);
    } else {
      // Logged in - go directly to dashboard with classId
      router.push(`/dashboard?classId=${classId}&action=register`);
    }
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <div>در حال بارگذاری کلاس‌ها...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <div>خطا در بارگذاری کلاس‌ها</div>
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
          {classes?.map((cls) => (
            <div
              key={cls._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden border"
            >
              <div className="bg-primary text-white p-6 text-center">
                <h3 className="text-xl font-bold mb-2">{cls.title}</h3>
                <div className="text-3xl font-bold">
                  {cls.price === 0 ? "رایگان" : cls.price.toLocaleString()}
                </div>
                {cls.price > 0 && (
                  <div className="text-sm opacity-90">تومان</div>
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
                    <span>{cls.location}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">{cls.description}</p>
                <button
                  onClick={() => handleSelectClass(cls._id)}
                  disabled={cls.currentStudents >= cls.maxStudents}
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    cls.currentStudents >= cls.maxStudents
                      ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                      : "bg-success hover:bg-green-700 text-white"
                  }`}
                >
                  {cls.currentStudents >= cls.maxStudents
                    ? "کلاس پر است"
                    : isAuthenticated
                    ? "انتخاب و ثبت‌نام"
                    : "ورود و ثبت‌نام"}
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
