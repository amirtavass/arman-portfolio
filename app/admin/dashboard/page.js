"use client";
import { useAdmin } from "@/app/contexts/AdminContext";
import {
  useClasses,
  useCreateClass,
  useDeleteClass,
} from "@/app/hooks/useClasses";
import {
  useProducts,
  useCreateProduct,
  useDeleteProduct,
} from "@/app/hooks/useProducts";
import AdminProtectedRoute from "@/app/admin/AdminProtectedRoute";
import { useState } from "react";

function AdminDashboardPage() {
  const { admin, logout } = useAdmin();
  const { data: classes, isLoading: classesLoading } = useClasses();
  const { data: products, isLoading: productsLoading } = useProducts();

  const createClass = useCreateClass();
  const deleteClass = useDeleteClass();
  const createProduct = useCreateProduct();
  const deleteProduct = useDeleteProduct();

  const [activeTab, setActiveTab] = useState("classes");

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  const handleCreateClass = async () => {
    try {
      await createClass.mutateAsync({
        title: "کلاس جدید",
        classType: "کلاس خصوصی ۱۲ جلسه",
        duration: 60,
        date: new Date(),
        time: "14:00",
        maxStudents: 10,
        price: 500000,
        instructor: "مربی اول",
      });
      alert("کلاس با موفقیت ایجاد شد!");
    } catch (error) {
      alert("خطا در ایجاد کلاس");
    }
  };

  const handleCreateProduct = async () => {
    try {
      await createProduct.mutateAsync({
        name: "محصول جدید",
        price: 100000,
        category: "swimwear",
        inStock: true,
        image: "/images/default-product.jpg",
      });
      alert("محصول با موفقیت ایجاد شد!");
    } catch (error) {
      alert("خطا در ایجاد محصول");
    }
  };

  return (
    <AdminProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        {/* Admin Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-800">پنل مدیریت</h1>
              <div className="flex items-center gap-4">
                <span className="text-gray-600">سلام {admin?.username}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  خروج
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Content */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Tabs */}
          <div className="mb-8">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab("classes")}
                className={`px-6 py-3 rounded-lg font-medium ${
                  activeTab === "classes"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                مدیریت کلاس‌ها
              </button>
              <button
                onClick={() => setActiveTab("products")}
                className={`px-6 py-3 rounded-lg font-medium ${
                  activeTab === "products"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                مدیریت محصولات
              </button>
            </div>
          </div>

          {/* Classes Tab */}
          {activeTab === "classes" && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">مدیریت کلاس‌ها</h2>
                <button
                  onClick={handleCreateClass}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  ایجاد کلاس جدید
                </button>
              </div>

              {classesLoading ? (
                <div>در حال بارگذاری کلاس‌ها...</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-right">عنوان</th>
                        <th className="px-4 py-2 text-right">نوع کلاس</th>
                        <th className="px-4 py-2 text-right">قیمت</th>
                        <th className="px-4 py-2 text-center">عملیات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {classes?.map((cls) => (
                        <tr key={cls._id} className="border-b">
                          <td className="px-4 py-2">{cls.title}</td>
                          <td className="px-4 py-2">{cls.classType}</td>
                          <td className="px-4 py-2">
                            {cls.price.toLocaleString()} تومان
                          </td>
                          <td className="px-4 py-2 text-center">
                            <button
                              onClick={() => deleteClass.mutate(cls._id)}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                            >
                              حذف
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Products Tab */}
          {activeTab === "products" && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">مدیریت محصولات</h2>
                <button
                  onClick={handleCreateProduct}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  ایجاد محصول جدید
                </button>
              </div>

              {productsLoading ? (
                <div>در حال بارگذاری محصولات...</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-right">نام</th>
                        <th className="px-4 py-2 text-right">قیمت</th>
                        <th className="px-4 py-2 text-right">دسته‌بندی</th>
                        <th className="px-4 py-2 text-center">عملیات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products?.map((product) => (
                        <tr key={product._id} className="border-b">
                          <td className="px-4 py-2">{product.name}</td>
                          <td className="px-4 py-2">
                            {product.price.toLocaleString()} تومان
                          </td>
                          <td className="px-4 py-2">{product.category}</td>
                          <td className="px-4 py-2 text-center">
                            <button
                              onClick={() => deleteProduct.mutate(product._id)}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                            >
                              حذف
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </AdminProtectedRoute>
  );
}

export default AdminDashboardPage;
