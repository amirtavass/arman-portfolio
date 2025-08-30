"use client";
import { useState } from "react";
import Button from "./Button";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { useProducts, useProductsByCategory } from "@/app/hooks/useProducts";

function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState("swimwear");

  // Use API data instead of hardcoded products
  const { data: currentProducts, isLoading } =
    useProductsByCategory(activeCategory);

  // Fallback to all products if category-specific hook doesn't work
  const { data: allProducts } = useProducts();

  // Filter products by category if useProductsByCategory doesn't work
  const displayProducts =
    currentProducts ||
    allProducts?.filter((product) => product.category === activeCategory) ||
    [];

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

        <div className="flex gap-3 mb-8 justify-center">
          {/* Category buttons */}
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

        {/* Products */}
        <div className="mb-8">
          <h3 className="font-bold text-gray-700 text-xl text-center mb-4">
            محصولات ویژه
          </h3>

          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">در حال بارگذاری محصولات...</p>
            </div>
          ) : displayProducts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {displayProducts.slice(0, 8).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">محصولی در این دسته‌بندی یافت نشد.</p>
            </div>
          )}
        </div>

        {/* CTA & Info */}
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
