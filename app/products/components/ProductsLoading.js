function ProductsLoading() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
        >
          <div className="w-full aspect-square bg-gray-200" />
          <div className="p-4 sm:p-6">
            <div className="h-4 bg-gray-200 rounded mb-2" />
            <div className="h-6 bg-gray-200 rounded mb-4" />
            <div className="h-10 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductsLoading;
