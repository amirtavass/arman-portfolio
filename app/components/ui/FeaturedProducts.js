"use client";
import { useState, Suspense } from "react";
import Button from "./Button";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { useProductsByCategory } from "@/app/hooks/useProducts";

// Simple loading skeleton
function ProductsGridSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
        >
          <div className="w-full aspect-square bg-gray-200" />
          <div className="p-4">
            <div className="h-4 bg-gray-200 rounded mb-2" />
            <div className="h-6 bg-gray-200 rounded mb-4" />
            <div className="h-10 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Simple products grid that fetches data
function ProductsGrid({ category }) {
  const { data: products, isLoading } = useProductsByCategory(category);

  if (isLoading) {
    return <ProductsGridSkeleton />;
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">محصولی در این دسته‌بندی یافت نشد.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {products.slice(0, 8).map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}

function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState("swimwear");

  return (
    <section className="bg-gray-50 py-10">
      <div className="px-4 mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="text-gray-800 font-bold text-3xl mb-4">
            فروشگاه تجهیزات شنا
          </h2>
          <p className="text-lg text-gray-600">بهترین کیفیت با قیمت مناسب</p>
        </div>

        {/* Category Buttons */}
        <div className="flex gap-3 mb-8 justify-center">
          <div className="bg-gray-100 w-full max-w-md md:w-auto rounded-lg p-1 flex flex-col md:flex-row gap-1">
            <Button
              active={activeCategory === "swimwear"}
              onClick={() => setActiveCategory("swimwear")}
            >
              مایو شنا
            </Button>
            <Button
              active={activeCategory === "swimgoggles"}
              onClick={() => setActiveCategory("swimgoggles")}
            >
              عینک
            </Button>
            <Button
              active={activeCategory === "swimfins"}
              onClick={() => setActiveCategory("swimfins")}
            >
              فین شنا
            </Button>
            <Button
              active={activeCategory === "swimequipment"}
              onClick={() => setActiveCategory("swimequipment")}
            >
              تجهیزات
            </Button>
          </div>
        </div>

        {/* Products Grid with Suspense */}
        <div className="mb-8">
          <h3 className="font-bold text-gray-700 text-xl text-center mb-4">
            محصولات ویژه
          </h3>

          <Suspense fallback={<ProductsGridSkeleton />}>
            <ProductsGrid category={activeCategory} />
          </Suspense>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link
            href="/products"
            className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
          >
            مشاهده همه محصولات
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
