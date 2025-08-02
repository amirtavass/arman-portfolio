"use client";
import { useState } from "react";
import {
  MdAccessTime,
  MdCalendarToday,
  MdGroup,
  MdLocationOn,
} from "react-icons/md";

const classes = [
  {
    id: 1,
    title: "کلاس مبتدی بزرگسالان",
    duration: "12 جلسه",
    price: "3,600,000",
    schedule: "شنبه و دوشنبه ۱۰-۱۱",
    capacity: "۳ نفر",
    location: "استخر یادگار امام",
    description: "آموزش از صفر برای بزرگسالان",
  },
  {
    id: 2,
    title: "کلاس کودکان ۶-۱۲ سال",
    duration: "16 جلسه",
    price: "3,400,000",
    schedule: "یکشنبه و چهارشنبه ۱۶-۱۷",
    capacity: "۴ نفر",
    location: "استخر انقلاب",
    description: "آموزش شنا با بازی و سرگرمی",
  },
];

function ClassRegister() {
  const [selectedClass, setSelectedClass] = useState(null);

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
              key={cls.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden border"
            >
              <div className="bg-primary text-white p-6 text-center">
                <h3 className="text-xl font-bold mb-2">{cls.title}</h3>
                <div className="text-3xl font-bold">{cls.price}</div>
                <div className="text-sm opacity-90">تومان</div>
              </div>
              <div className="p-6">
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <MdAccessTime className="ml-3 text-primary w-5 h-5" />
                    <span>{cls.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MdCalendarToday className="ml-3 text-primary w-5 h-5" />
                    <span>{cls.schedule}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MdGroup className="ml-3 text-primary w-5 h-5" />
                    <span>حداکثر {cls.capacity}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MdLocationOn className="ml-3 text-primary w-5 h-5" />
                    <span>{cls.location}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">{cls.description}</p>
                <button
                  onClick={() => setSelectedClass(cls.id)}
                  className="w-full bg-success hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  انتخاب و ثبت‌نام
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
