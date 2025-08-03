"use client";
import { useState } from "react";
import Button from "./Button";
import Link from "next/link";
import { allProducts } from "@/app/data/products";
import ProductCard from "./ProductCard";

function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState("swimwear");
  const currentProducts = allProducts[activeCategory];
  return (
    <section className="bg-gray-50 py-10">
      <div className="px-4 mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="text-gray-800 font-bold text-3xl mb-4 ">
            فروشگاه تجهیزات شنا
          </h2>
          <p className="text-lg text-gray-600 ">بهترین کیفیت با قیمت مناسب</p>
        </div>
        <div className="flex gap-3 mb-8 justify-center">
          {/* Column 1: buttons */}
          <div className="bg-gray-100 w-full max-w-md md:w-auto rounded-lg p-1 flex flex-col md:flex-row  gap-1">
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
        {/* Column 2: Products */}
        <div className="mb-8">
          <h3 className="font-bold  text-gray-700 text-xl  text-center mb-4">
            محصولات ویژه
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Column 3: CTA & Info */}
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
