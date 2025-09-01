"use client";
import { Suspense } from "react";
import ProductsLoading from "./components/ProductsLoading";
import ProductsContent from "./components/ProductsContent";

function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            تمام محصولات
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            همه تجهیزات شنا در یک مکان
          </p>
        </div>

        <Suspense fallback={<ProductsLoading />}>
          <ProductsContent />
        </Suspense>
      </div>
    </div>
  );
}

export default ProductsPage;
