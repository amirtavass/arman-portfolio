import { getAllProducts } from "../data/products";
import ProductCard from "../components/ui/ProductCard";

function page() {
  const allProductsArray = getAllProducts();
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            تمام محصولات
          </h1>
          <p className="text-lg text-gray-600">همه تجهیزات شنا در یک مکان</p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allProductsArray.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
