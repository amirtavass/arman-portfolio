"use client";
import { useAuth } from "@/app/contexts/authContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/app/auth/ProtectedRoute";
import Link from "next/link";

function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [selectedClass, setSelectedClass] = useState(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [registrationForm, setRegistrationForm] = useState({
    emergencyContact: "",
    emergencyPhone: "",
    medicalConditions: "",
    swimmingExperience: "beginner",
    goals: "",
  });

  // Check for selected class on mount - using window.location instead of useSearchParams
  useEffect(() => {
    // Check URL parameters manually for static compatibility
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const action = urlParams.get("action");

      if (action === "register") {
        const savedClass = localStorage.getItem("selectedClass");
        if (savedClass) {
          try {
            const classData = JSON.parse(savedClass);
            setSelectedClass(classData);
            if (classData.price === 0) {
              setShowRegistrationForm(true);
            }
          } catch (error) {
            console.error("Error parsing saved class:", error);
            localStorage.removeItem("selectedClass");
          }
        }
      }
    }
  }, []);

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("selectedClass");
    window.location.href = "/";
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert(`ثبت‌نام در کلاس "${selectedClass.title}" با موفقیت انجام شد!`);

      // Clear form and selections
      setSelectedClass(null);
      setShowRegistrationForm(false);
      setRegistrationForm({
        emergencyContact: "",
        emergencyPhone: "",
        medicalConditions: "",
        swimmingExperience: "beginner",
        goals: "",
      });
      localStorage.removeItem("selectedClass");

      // Navigate without useRouter for better static compatibility
      window.history.pushState({}, "", "/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      alert("خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.");
    }
  };

  const handleCancelSelection = () => {
    setSelectedClass(null);
    setShowRegistrationForm(false);
    localStorage.removeItem("selectedClass");
    window.history.pushState({}, "", "/dashboard");
  };

  const handleChargeBalance = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const amount = formData.get("amount");

    if (!amount || amount < 1000) {
      alert("حداقل مبلغ شارژ 1000 تومان است");
      return;
    }

    // In a real app, this would redirect to payment gateway
    alert(`درخواست شارژ ${parseInt(amount).toLocaleString()} تومان ارسال شد`);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-200 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                سلام {user?.name}
              </h1>
              <p className="text-lg text-gray-600">
                به داشبورد شخصی خود خوش آمدید
              </p>

              {/* User Info Card */}
              <div className="bg-blue-50 p-4 rounded-lg mt-6 max-w-md mx-auto">
                <h3 className="font-bold text-gray-800 mb-2">اطلاعات کاربری</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <strong>نام:</strong> {user?.name}
                  </p>
                  <p>
                    <strong>ایمیل:</strong> {user?.email}
                  </p>
                  <p>
                    <strong>موجودی:</strong> {user?.balance?.toLocaleString()}{" "}
                    تومان
                  </p>
                </div>

                {/* Simple Charge Form */}
                <form onSubmit={handleChargeBalance} className="mt-4">
                  <input
                    type="number"
                    name="amount"
                    placeholder="مبلغ به تومان"
                    min="1000"
                    className="w-full px-3 py-2 border rounded-lg text-gray-900 mb-2"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
                  >
                    شارژ حساب
                  </button>
                </form>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                خروج از حساب
              </button>
            </div>

            {/* Registration Form for Free Classes */}
            {showRegistrationForm && selectedClass && (
              <div className="mb-8 p-6 bg-blue-50 border border-blue-400 rounded-lg">
                <h3 className="text-xl font-bold text-blue-800 mb-4">
                  ثبت‌نام در کلاس: {selectedClass.title}
                </h3>
                <div className="bg-white p-4 rounded-lg mb-6">
                  <h4 className="font-bold text-lg">{selectedClass.title}</h4>
                  <p className="text-gray-600">{selectedClass.classType}</p>
                  <p className="text-green-600 font-bold">کلاس رایگان</p>
                  <p className="text-gray-600">
                    تاریخ:{" "}
                    {new Date(selectedClass.date).toLocaleDateString("fa-IR")}
                  </p>
                  <p className="text-gray-600">زمان: {selectedClass.time}</p>
                </div>

                <form onSubmit={handleRegistrationSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        نام و نام خانوادگی تماس اضطراری
                      </label>
                      <input
                        type="text"
                        required
                        value={registrationForm.emergencyContact}
                        onChange={(e) =>
                          setRegistrationForm({
                            ...registrationForm,
                            emergencyContact: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border rounded-lg text-gray-900"
                        placeholder="نام کامل شخص قابل تماس"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        شماره تماس اضطراری
                      </label>
                      <input
                        type="tel"
                        required
                        value={registrationForm.emergencyPhone}
                        onChange={(e) =>
                          setRegistrationForm({
                            ...registrationForm,
                            emergencyPhone: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border rounded-lg text-gray-900"
                        placeholder="09xxxxxxxxx"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      تجربه شنا
                    </label>
                    <select
                      value={registrationForm.swimmingExperience}
                      onChange={(e) =>
                        setRegistrationForm({
                          ...registrationForm,
                          swimmingExperience: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg text-gray-900"
                    >
                      <option value="beginner">مبتدی</option>
                      <option value="intermediate">متوسط</option>
                      <option value="advanced">پیشرفته</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      مشکلات پزشکی (در صورت وجود)
                    </label>
                    <textarea
                      value={registrationForm.medicalConditions}
                      onChange={(e) =>
                        setRegistrationForm({
                          ...registrationForm,
                          medicalConditions: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg text-gray-900"
                      rows="3"
                      placeholder="هیچ مشکل خاصی ندارم یا ذکر مشکلات پزشکی"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      اهداف از یادگیری شنا
                    </label>
                    <textarea
                      value={registrationForm.goals}
                      onChange={(e) =>
                        setRegistrationForm({
                          ...registrationForm,
                          goals: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg text-gray-900"
                      rows="3"
                      placeholder="اهداف و انتظارات خود را شرح دهید"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold"
                    >
                      تکمیل ثبت‌نام
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelSelection}
                      className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-bold"
                    >
                      انصراف
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Selected Paid Class */}
            {selectedClass &&
              !showRegistrationForm &&
              selectedClass.price > 0 && (
                <div className="mb-8 p-6 bg-yellow-50 border border-yellow-400 rounded-lg">
                  <h3 className="text-xl font-bold text-yellow-800 mb-4">
                    کلاس انتخاب شده برای ثبت‌نام
                  </h3>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-bold text-lg">{selectedClass.title}</h4>
                    <p className="text-gray-600">
                      قیمت: {selectedClass.price.toLocaleString()} تومان
                    </p>
                    <div className="mt-4 flex gap-4">
                      <button
                        onClick={() => alert("انتقال به صفحه پرداخت...")}
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
                      >
                        پرداخت و ثبت‌نام
                      </button>
                      <button
                        onClick={handleCancelSelection}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
                      >
                        انصراف
                      </button>
                    </div>
                  </div>
                </div>
              )}

            {/* Quick Actions - Only show when no selections active */}
            {!selectedClass && !showRegistrationForm && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    کلاس‌های شنا
                  </h3>
                  <p className="text-gray-600 mb-4">
                    مشاهده و ثبت‌نام در کلاس‌های مختلف
                  </p>
                  <Link
                    href="/"
                    className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark"
                  >
                    مشاهده تمام کلاس‌ها
                  </Link>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    فروشگاه
                  </h3>
                  <p className="text-gray-600 mb-4">خرید تجهیزات شنا</p>
                  <a
                    href="/products"
                    className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
                  >
                    تمام محصولات
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default DashboardPage;
