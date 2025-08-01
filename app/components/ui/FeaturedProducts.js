"use client";
import { useState } from "react";
import Button from "./Button";

const products = {
  swimwear: [
    {
      id: 1,
      name: "مایو حرفه‌ای نایک",
      price: "450,000",
      image: "🏊‍♂️",
      inStock: true,
    },
    {
      id: 2,
      name: "مایو اسپیدو ضد کلر",
      price: "380,000",
      image: "🏊‍♀️",
      inStock: true,
    },
    {
      id: 3,
      name: "مایو آرنا مسابقات",
      price: "520,000",
      image: "🏊‍♂️",
      inStock: false,
    },
    {
      id: 4,
      name: "مایو کودکان رنگی",
      price: "280,000",
      image: "🧒",
      inStock: true,
    },
  ],
  goggles: [
    {
      id: 5,
      name: "عینک شنا اسپیدو",
      price: "180,000",
      image: "👓",
      inStock: true,
    },
    {
      id: 6,
      name: "عینک آرنا حرفه‌ای",
      price: "220,000",
      image: "👓",
      inStock: true,
    },
    {
      id: 7,
      name: "عینک کودکان",
      price: "120,000",
      image: "👓",
      inStock: true,
    },
  ],
  accessories: [
    { id: 8, name: "تخته شنا", price: "85,000", image: "🏄‍♂️", inStock: true },
    { id: 9, name: "فین شنا", price: "150,000", image: "🦢", inStock: true },
    { id: 10, name: "کلاه شنا", price: "45,000", image: "🧢", inStock: true },
  ],
};

function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState("swimwear");
  return (
    <section className="bg-gray-50 py-10">
      <div className="px-4 mx-auto max-w-6xl">
        <div className="text-center mb-5">
          <h2 className="text-gray-800 font-bold text-3xl mb-4 ">
            فروشگاه تجهیزات شنا
          </h2>
          <p className="text-lg text-gray-600 ">بهترین کیفیت با قیمت مناسب</p>
        </div>
        <div className="grid grid-rows-3 gap-3 items-center justify-center">
          {/* Column 1: Products */}
          <div className="space-y-4 space-x-3">
            <h3 className="font-bold text-xl mb-6">دسته‌بندی محصولات</h3>
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
          {/* Column 2: Products */}
          <div className="text-center">
            <h3 className="font-bold  text-gray-700 text-xl mb-4">
              محصولات ویژه
            </h3>
            <div className="grid grid-cols-2 gap-4"></div>
          </div>

          {/* Column 3: CTA & Info */}
          <div>
            <h3 className="font-bold  text-gray-700 text-xl mb-6">
              فروشگاه کامل
            </h3>
            {/* CTA button + benefits */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
