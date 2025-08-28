"use client";
import Image from "next/image";
import { MdShoppingCart } from "react-icons/md";
import { useCart } from "@/app/contexts/CartContext";
import { useAuth } from "@/app/contexts/authContext";
import { useRouter } from "next/navigation";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      router.push(`/auth/login?productId=${product.id}`);
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: parseInt(product.price.replace(/[^\d]/g, "")), // Convert price to number
      image: product.image,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          quality={80}
        />
      </div>
      <h3 className="font-bold text-lg mb-2 text-center">{product.name}</h3>
      <div className="text-center mb-4">
        <span className="text-2xl font-bold text-primary">{product.price}</span>
        <span className="text-gray-500 mr-2">تومان</span>
      </div>
      <div className="text-center mb-4">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
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
        onClick={handleAddToCart}
        className={`w-full py-2 rounded-lg font-medium transition-colors ${
          product.inStock
            ? "bg-success hover:bg-green-700 text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        <MdShoppingCart className="inline ml-2 w-4 h-4" />
        {product.inStock
          ? isAuthenticated
            ? "افزودن به سبد"
            : "ورود و خرید"
          : "ناموجود"}
      </button>
    </div>
  );
}

export default ProductCard;
