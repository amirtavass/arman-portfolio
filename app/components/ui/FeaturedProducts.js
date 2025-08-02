"use client";
import { useState } from "react";
import Button from "./Button";
import { MdShoppingCart } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";

const products = {
  swimwear: [
    {
      id: 1,
      name: "مایو حرفه‌ای نایک",
      price: "450,000",
      image: "/images/swimwear/swimwear-1.jpg",
      inStock: true,
    },
    {
      id: 2,
      name: "مایو اسپیدو ضد کلر",
      price: "380,000",
      image: "/images/swimwear/swimwear-2.jpg",
      inStock: true,
    },
    {
      id: 3,
      name: "مایو آرنا مسابقات",
      price: "520,000",
      image: "/images/swimwear/swimwear-3.jpg",
      inStock: false,
    },
    {
      id: 4,
      name: "مایو کودکان رنگی",
      price: "280,000",
      image: "/images/swimwear/swimwear-4.jpg",
      inStock: true,
    },
  ],
  swimgoggles: [
    {
      id: 5,
      name: "عینک شنا اسپیدو",
      price: "180,000",
      image: "/images/swimgoggles/goggles-1.jpg",
      inStock: true,
    },
    {
      id: 6,
      name: "عینک آرنا حرفه‌ای",
      price: "220,000",
      image: "/images/swimgoggles/goggles-2.jpg",
      inStock: true,
    },
    {
      id: 7,
      name: "عینک کودکان",
      price: "120,000",
      image: "/images/swimgoggles/goggles-3.jpg",
      inStock: true,
    },
  ],
  swimfins: [
    {
      id: 12,
      name: " فین اسپیدو",
      price: "850,000",
      image: "/images/swimfin/fin-1.jpg",
      inStock: true,
    },
    {
      id: 13,
      name: " فین میسیسیپی",
      price: "450,000",
      image: "/images/swimfin/fin-2.jpg",
      inStock: false,
    },
  ],
  swimequipment: [
    {
      id: 8,
      name: "  کیف شنا نایک",
      price: "85,000",
      image: "/images/equipment/backpack-1.jpg",
      inStock: true,
    },
    {
      id: 9,
      name: "کیف شنا اسپیدو",
      price: "45,000",
      image: "/images/equipment/backpack-2.jpg",
      inStock: true,
    },
    {
      id: 10,
      name: " کلاه شناحرفه ای",
      price: "150,000",
      image: "/images/equipment/cap-1.jpg",
      inStock: true,
    },
    {
      id: 11,
      name: "کلاه شنا اسپیدو",
      price: "85,000",
      image: "/images/equipment/cap-2.jpg",
      inStock: true,
    },
  ],
};

function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState("swimwear");
  const currentProducts = products[activeCategory];
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
          {/* Column 1: Products */}
          <div className="bg-gray-100 rounded-lg p-1 flex flex-wrap gap-1">
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
              <div
                key={product.id}
                className="bg-white border rounded-xl hover:shadow-lg transition-shadow p-6 "
              >
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    quality={80}
                  />
                </div>
                <h3 className="text-center font-bold text-lg text-gray-700 ">
                  {product.name}
                </h3>
                <div className="text-center mb-4">
                  <span className="text-2xl font-bold  text-gray-700 ">
                    {product.price}
                  </span>
                  <span className="text-gray-500 mr-2">تومان</span>
                </div>
                <div className="text-center mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-lg font-medium ${
                      product.inStock
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.inStock ? "در انبار" : "ناموجود"}
                  </span>
                </div>
                <button
                  disabled={!product.inStock}
                  className={`w-full rounded-lg font-medium  transition-colors 
                  ${
                    product.inStock
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <MdShoppingCart className="inline ml-2 w-4 h-4" />
                  {product.inStock ? "افزودن به سبد" : "ناموجود"}
                </button>
              </div>
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
