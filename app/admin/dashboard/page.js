"use client";
import { useAdmin } from "@/app/contexts/AdminContext";
import {
  useClasses,
  useCreateClass,
  useUpdateClass,
  useDeleteClass,
} from "@/app/hooks/useClasses";
import {
  useProducts,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} from "@/app/hooks/useProducts";
import AdminProtectedRoute from "@/app/admin/AdminProtectedRoute";
import { useState, useRef } from "react";

function AdminDashboardPage() {
  const { admin, logout } = useAdmin();
  const { data: classes, isLoading: classesLoading } = useClasses();
  const { data: products, isLoading: productsLoading } = useProducts();

  const createClass = useCreateClass();
  const updateClass = useUpdateClass();
  const deleteClass = useDeleteClass();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [activeTab, setActiveTab] = useState("classes");
  const [showClassForm, setShowClassForm] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef(null);

  // Form states
  const [classForm, setClassForm] = useState({
    title: "",
    classType: "کلاس خصوصی ۱۲ جلسه",
    description: "",
    duration: 60,
    date: "",
    time: "",
    maxStudents: 10,
    price: 0,
    instructor: "مربی اول",
    location: "استخر اصلی",
  });

  const [productForm, setProductForm] = useState({
    name: "",
    price: 0,
    category: "swimwear",
    description: "",
    image: "/images/default-product.jpg",
    inStock: true,
  });

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  // Image upload handler - Fixed to work with backend
  const handleImageUpload = async (file) => {
    if (!file) return null;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file); // Make sure field name matches backend

      const response = await fetch("http://localhost:4000/upload/product", {
        method: "POST",
        body: formData,
        credentials: "include", // Important for session-based auth
      });

      const result = await response.json();

      if (response.ok && result.success) {
        console.log("Upload successful:", result);
        return result.imagePath;
      } else {
        console.error("Upload failed:", result);
        throw new Error(result.message || "Upload failed");
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("خطا در آپلود تصویر: " + error.message);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  // Class form handlers
  const handleClassSubmit = async (e) => {
    e.preventDefault();
    try {
      const classData = {
        ...classForm,
        date: new Date(classForm.date),
      };

      if (editingClass) {
        await updateClass.mutateAsync({
          id: editingClass._id,
          ...classData,
        });
        setEditingClass(null);
      } else {
        await createClass.mutateAsync(classData);
      }

      setShowClassForm(false);
      resetClassForm();
    } catch (error) {
      console.error("Class operation failed:", error);
      if (error.response?.status === 403) {
        alert(
          "شما اجازه انجام این عملیات را ندارید. لطفاً از حساب مدیر استفاده کنید."
        );
      } else {
        alert("خطا در عملیات کلاس: " + (error.message || "خطای ناشناخته"));
      }
    }
  };

  // Product form handlers
  const handleProductSubmit = async (e) => {
    e.preventDefault();

    try {
      let finalProductData = { ...productForm };

      // Handle file upload if a file is selected
      if (fileInputRef.current?.files[0]) {
        const uploadedImagePath = await handleImageUpload(
          fileInputRef.current.files[0]
        );
        if (uploadedImagePath) {
          finalProductData.image = uploadedImagePath;
        } else {
          // If upload failed, don't proceed
          return;
        }
      }

      if (editingProduct) {
        await updateProduct.mutateAsync({
          id: editingProduct._id,
          ...finalProductData,
        });
        setEditingProduct(null);
      } else {
        await createProduct.mutateAsync(finalProductData);
      }

      setShowProductForm(false);
      resetProductForm();

      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Product operation failed:", error);
      if (error.response?.status === 403) {
        alert(
          "شما اجازه انجام این عملیات را ندارید. لطفاً از حساب مدیر استفاده کنید."
        );
      } else {
        alert("خطا در عملیات محصول: " + (error.message || "خطای ناشناخته"));
      }
    }
  };

  const resetClassForm = () => {
    setClassForm({
      title: "",
      classType: "کلاس خصوصی ۱۲ جلسه",
      description: "",
      duration: 60,
      date: "",
      time: "",
      maxStudents: 10,
      price: 0,
      instructor: "مربی اول",
      location: "استخر اصلی",
    });
  };

  const resetProductForm = () => {
    setProductForm({
      name: "",
      price: 0,
      category: "swimwear",
      description: "",
      image: "/images/default-product.jpg",
      inStock: true,
    });
  };

  const handleEditClass = (cls) => {
    setEditingClass(cls);
    setClassForm({
      title: cls.title,
      classType: cls.classType,
      description: cls.description || "",
      duration: cls.duration,
      date: new Date(cls.date).toISOString().split("T")[0],
      time: cls.time,
      maxStudents: cls.maxStudents,
      price: cls.price,
      instructor: cls.instructor,
      location: cls.location || "استخر اصلی",
    });
    setShowClassForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description || "",
      image: product.image || "/images/default-product.jpg",
      inStock: product.inStock !== undefined ? product.inStock : true,
    });
    setShowProductForm(true);
  };

  const handleDeleteClass = async (classId) => {
    if (window.confirm("آیا از حذف این کلاس اطمینان دارید؟")) {
      try {
        await deleteClass.mutateAsync(classId);
      } catch (error) {
        console.error("Delete failed:", error);
        if (error.response?.status === 403) {
          alert(
            "شما اجازه حذف کلاس را ندارید. لطفاً از حساب مدیر استفاده کنید."
          );
        } else {
          alert("خطا در حذف کلاس: " + (error.message || "خطای ناشناخته"));
        }
      }
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("آیا از حذف این محصول اطمینان دارید؟")) {
      try {
        await deleteProduct.mutateAsync(productId);
      } catch (error) {
        console.error("Delete failed:", error);
        if (error.response?.status === 403) {
          alert(
            "شما اجازه حذف محصول را ندارید. لطفاً از حساب مدیر استفاده کنید."
          );
        } else {
          alert("خطا در حذف محصول: " + (error.message || "خطای ناشناخته"));
        }
      }
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
                  onClick={() => {
                    setEditingClass(null);
                    resetClassForm();
                    setShowClassForm(true);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  ایجاد کلاس جدید
                </button>
              </div>

              {/* Class Form */}
              {showClassForm && (
                <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                  <h3 className="text-lg font-bold mb-4">
                    {editingClass ? "ویرایش کلاس" : "کلاس جدید"}
                  </h3>
                  <form
                    onSubmit={handleClassSubmit}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        عنوان
                      </label>
                      <input
                        type="text"
                        required
                        value={classForm.title}
                        onChange={(e) =>
                          setClassForm({ ...classForm, title: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        نوع کلاس
                      </label>
                      <select
                        value={classForm.classType}
                        onChange={(e) =>
                          setClassForm({
                            ...classForm,
                            classType: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border rounded-lg"
                      >
                        <option value="کلاس خصوصی ۱۲ جلسه">
                          کلاس خصوصی ۱۲ جلسه
                        </option>
                        <option value="کلاس پدر و فرزند">
                          کلاس پدر و فرزند
                        </option>
                        <option value="کلاس آمادگی مسابقات">
                          کلاس آمادگی مسابقات
                        </option>
                        <option value="سانس آزاد استخر">سانس آزاد استخر</option>
                        <option value="جلسه آزمایشی رایگان">
                          جلسه آزمایشی رایگان
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        مدت زمان (دقیقه)
                      </label>
                      <input
                        type="number"
                        required
                        value={classForm.duration}
                        onChange={(e) =>
                          setClassForm({
                            ...classForm,
                            duration: parseInt(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        تاریخ
                      </label>
                      <input
                        type="date"
                        required
                        value={classForm.date}
                        onChange={(e) =>
                          setClassForm({ ...classForm, date: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        زمان
                      </label>
                      <input
                        type="time"
                        required
                        value={classForm.time}
                        onChange={(e) =>
                          setClassForm({ ...classForm, time: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        حداکثر دانشجو
                      </label>
                      <input
                        type="number"
                        required
                        value={classForm.maxStudents}
                        onChange={(e) =>
                          setClassForm({
                            ...classForm,
                            maxStudents: parseInt(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        قیمت (تومان)
                      </label>
                      <input
                        type="number"
                        required
                        value={classForm.price}
                        onChange={(e) =>
                          setClassForm({
                            ...classForm,
                            price: parseInt(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        مربی
                      </label>
                      <select
                        value={classForm.instructor}
                        onChange={(e) =>
                          setClassForm({
                            ...classForm,
                            instructor: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border rounded-lg"
                      >
                        <option value="مربی اول">مربی اول</option>
                        <option value="مربی دوم">مربی دوم</option>
                        <option value="هر دو مربی">هر دو مربی</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium mb-2">
                        توضیحات
                      </label>
                      <textarea
                        value={classForm.description}
                        onChange={(e) =>
                          setClassForm({
                            ...classForm,
                            description: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border rounded-lg"
                        rows="3"
                      />
                    </div>
                    <div className="col-span-2 flex gap-4">
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                      >
                        {editingClass ? "به‌روزرسانی" : "ایجاد"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowClassForm(false);
                          setEditingClass(null);
                        }}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
                      >
                        انصراف
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Classes Table */}
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
                        <th className="px-4 py-2 text-right">تاریخ</th>
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
                          <td className="px-4 py-2">
                            {new Date(cls.date).toLocaleDateString("fa-IR")}
                          </td>
                          <td className="px-4 py-2 text-center">
                            <button
                              onClick={() => handleEditClass(cls)}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm mr-2"
                            >
                              ویرایش
                            </button>
                            <button
                              onClick={() => handleDeleteClass(cls._id)}
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
                  onClick={() => {
                    setEditingProduct(null);
                    resetProductForm();
                    setShowProductForm(true);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  ایجاد محصول جدید
                </button>
              </div>

              {/* Product Form */}
              {showProductForm && (
                <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                  <h3 className="text-lg font-bold mb-4">
                    {editingProduct ? "ویرایش محصول" : "محصول جدید"}
                  </h3>
                  <form
                    onSubmit={handleProductSubmit}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        نام محصول
                      </label>
                      <input
                        type="text"
                        required
                        value={productForm.name}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            name: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        قیمت (تومان)
                      </label>
                      <input
                        type="number"
                        required
                        value={productForm.price}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            price: parseInt(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        دسته‌بندی
                      </label>
                      <select
                        value={productForm.category}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            category: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border rounded-lg"
                      >
                        <option value="swimwear">مایو شنا</option>
                        <option value="swimgoggles">عینک شنا</option>
                        <option value="swimfins">فین شنا</option>
                        <option value="swimequipment">تجهیزات شنا</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        آپلود تصویر
                        {isUploading && (
                          <span className="text-blue-600 text-sm">
                            {" "}
                            (در حال آپلود...)
                          </span>
                        )}
                      </label>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        disabled={isUploading}
                        className="w-full px-3 py-2 border rounded-lg disabled:opacity-50"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium mb-2">
                        توضیحات
                      </label>
                      <textarea
                        value={productForm.description}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            description: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border rounded-lg"
                        rows="3"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={productForm.inStock}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              inStock: e.target.checked,
                            })
                          }
                          className="mr-2"
                        />
                        <span className="text-sm font-medium">
                          موجود در انبار
                        </span>
                      </label>
                    </div>
                    <div className="col-span-2 flex gap-4">
                      <button
                        type="submit"
                        disabled={isUploading}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
                      >
                        {editingProduct ? "به‌روزرسانی" : "ایجاد"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowProductForm(false);
                          setEditingProduct(null);
                          if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                          }
                        }}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
                      >
                        انصراف
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Products Table */}
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
                        <th className="px-4 py-2 text-right">وضعیت</th>
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
                          <td className="px-4 py-2">
                            <span
                              className={`px-2 py-1 rounded text-xs ${
                                product.inStock
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {product.inStock ? "موجود" : "ناموجود"}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-center">
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm mr-2"
                            >
                              ویرایش
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product._id)}
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
