"use client";

import { useState } from "react";

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    phone: "",
  });
  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  return (
    <div className="min-h-screen bg-gray-200 py-12">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Form Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              ثبت‌نام در کلاس شنا
            </h1>
            <p className="text-gray-600">
              اطلاعات خود را وارد کنید تا با شما تماس بگیریم
            </p>
          </div>

          {/* Basic Form Structure */}
          <form className="space-y-6">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                نام و نام خانوادگی *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="text-gray-900 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
                placeholder="نام خود را وارد کنید"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            {/* Phone Field */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                شماره تماس *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                className="text-gray-900 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
                placeholder="09123456789"
                onChange={handleInputChange}
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                ایمیل *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="text-gray-900 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
                placeholder="example@email.com"
                onChange={handleInputChange}
              />
            </div>

            {/* Age Field */}
            <div>
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                سن *
              </label>
              <input
                type="number"
                id="age"
                name="age"
                required
                min="5"
                max="80"
                className="text-gray-900 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
                placeholder="سن خود را وارد کنید"
                onChange={handleInputChange}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-lg font-semibold transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2 outline-none"
            >
              ثبت‌نام
            </button>
          </form>

          {/* Demo Notice */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700 text-center">
              <strong>در نسخه کامل:</strong> اطلاعات شما در سامانه ذخیره شده و
              مربی با شما تماس خواهد گرفت.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
