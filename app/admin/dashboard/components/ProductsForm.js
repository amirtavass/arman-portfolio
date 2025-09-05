"use client";
import { useState, useRef } from "react";
import { useCreateProduct, useUpdateProduct } from "@/app/hooks/useProducts";

function ProductForm({ editingProduct, onClose }) {
  const [formData, setFormData] = useState({
    name: editingProduct?.name || "",
    price: editingProduct?.price || 0,
    category: editingProduct?.category || "swimwear",
    description: editingProduct?.description || "",
    image: editingProduct?.image || "/images/default-product.jpg",
    inStock:
      editingProduct?.inStock !== undefined ? editingProduct.inStock : true,
  });

  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const handleImageUpload = async (file) => {
    if (!file) return null;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file); // Field name matches backend expectation

      // FIXED: Use dynamic API URL based on environment
      const getApiUrl = () => {
        if (typeof window !== "undefined") {
          if (
            window.location.hostname === "localhost" ||
            window.location.hostname === "127.0.0.1"
          ) {
            return "http://localhost:4000";
          }
          return "https://parsswim-backend-production.up.railway.app";
        }
        return "http://localhost:4000";
      };

      const apiBaseUrl = getApiUrl();

      const response = await fetch(`${apiBaseUrl}/upload/product`, {
        method: "POST",
        body: formData,
        credentials: "include", // Important for session-based auth
      });

      const result = await response.json();

      if (response.ok && result.success) {
        console.log("Upload successful:", result);
        return result.imagePath; // Should return clean path like: /uploads/images/filename.jpg
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let finalProductData = { ...formData };

      // Handle file upload if a file is selected
      if (fileInputRef.current?.files[0]) {
        const uploadedImagePath = await handleImageUpload(
          fileInputRef.current.files[0]
        );
        if (uploadedImagePath) {
          finalProductData.image = uploadedImagePath;
        } else {
          return; // Don't proceed if upload failed
        }
      }

      if (editingProduct) {
        await updateProduct.mutateAsync({
          id: editingProduct._id,
          ...finalProductData,
        });
      } else {
        await createProduct.mutateAsync(finalProductData);
      }

      onClose();

      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Product operation failed:", error);
      alert("خطا در عملیات محصول: " + (error.message || "خطای ناشناخته"));
    }
  };

  return (
    <div className="mb-6 p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-bold mb-4">
        {editingProduct ? "ویرایش محصول" : "محصول جدید"}
      </h3>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">نام محصول</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="نام محصول"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">قیمت (تومان)</label>
          <input
            type="number"
            required
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: parseInt(e.target.value) })
            }
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="قیمت"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">دسته‌بندی</label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
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
              <span className="text-blue-600 text-sm"> (در حال آپلود...)</span>
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
          <label className="block text-sm font-medium mb-2">توضیحات</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-lg"
            rows="3"
            placeholder="توضیحات محصول"
          />
        </div>

        <div className="col-span-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.inStock}
              onChange={(e) =>
                setFormData({ ...formData, inStock: e.target.checked })
              }
              className="mr-2"
            />
            <span className="text-sm font-medium">موجود در انبار</span>
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
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
          >
            انصراف
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
