"use client";
import { useProducts } from "@/app/hooks/useProducts";
import ProductCard from "@/app/components/ui/ProductCard";
import { memo } from "react";

const ProductsContent = memo(function ProductsContent() {
  const { data: products, error } = useProducts();

  if (error) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          خطا در بارگذاری
        </h3>
        <p className="text-gray-600 mb-6">
          متأسفانه در بارگذاری محصولات خطایی رخ داده است.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg"
        >
          تلاش مجدد
        </button>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 text-6xl mb-4">📦</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          محصولی یافت نشد
        </h3>
        <p className="text-gray-600">هیچ محصولی در حال حاضر موجود نیست.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
});

export default ProductsContent;
