import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";

const ProductShowcase = ({ products }) => {
  const [maxItems, setMaxItems] = useState(6); // Default for LG (2 rows * 3 cols)
  const navigate = useNavigate();
  console.log(products);

  // Load products from JSON
  useEffect(() => {
    const updateMaxItems = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setMaxItems(8); // XL screens → 2 rows * 4 cols
      } else if (width >= 1024) {
        setMaxItems(6); // LG screens → 2 rows * 3 cols
      } else {
        setMaxItems(4); // No limit for small screens
      }
    };

    updateMaxItems();
    window.addEventListener("resize", updateMaxItems);

    return () => window.removeEventListener("resize", updateMaxItems);
  }, []);

  return (
    <section className=" bg-gradient-to-br from-gray-50 to-gray-100 block w-full clear-both">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeInUp">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 transform transition-all duration-700 hover:scale-105">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products with exclusive
            deals
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.slice(5, maxItems + 5)?.map((product, index) => (
            <div
              key={product.id}
              onClick={() => navigate(`/products/${product.id}`)}
              className="animate-slideInUp"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <ProductCard product={product} viewMode="grid" />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div
          className="text-center mt-12 mb-8 animate-fadeInUp"
          style={{ animationDelay: "600ms" }}
        >
          <button
            onClick={() => navigate("/products")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 relative overflow-hidden group"
          >
            <span className="relative z-10">View All Products</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
