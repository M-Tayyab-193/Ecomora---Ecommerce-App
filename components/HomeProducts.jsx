import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext";
import Loader from "@/components/Loader";

const HomeProducts = () => {
  const { products, router, productsLoading } = useAppContext();

  return (
    <div className="flex flex-col items-center pt-14">
      <p className="text-2xl font-medium text-left w-full">Popular products</p>
      <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-6 pb-14 w-full">
        {productsLoading ? (
          <Loader />
        ) : (
          products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        )}
      </div>
      {!productsLoading && (
        <button
          onClick={() => {
            router.push("/all-products");
          }}
          className="px-12 py-2.5 border hover:border-orange-500 rounded text-gray-500/70 hover:bg-slate-50/90 transition mt-4"
        >
          See more
        </button>
      )}
    </div>
  );
};

export default HomeProducts;
