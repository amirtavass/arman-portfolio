"use client";
import { useDeleteProduct } from "@/app/hooks/useProducts";

function ProductsTable({ products, onEdit }) {
  const deleteProduct = useDeleteProduct();

  const handleDelete = async (productId) => {
    if (window.confirm("آیا از حذف این محصول اطمینان دارید؟")) {
      try {
        await deleteProduct.mutateAsync(productId);
      } catch (error) {
        alert("خطا در حذف: " + error.message);
      }
    }
  };

  return (
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
                  onClick={() => onEdit(product)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm mr-2"
                >
                  ویرایش
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
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
  );
}

export default ProductsTable;
