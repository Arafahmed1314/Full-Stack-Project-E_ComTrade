import React, { useState, useEffect } from "react";
import productsData from "../../data/products.json";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductShowcase = () => {
  const [products, setProducts] = useState([]);
  const [likedProducts, setLikedProducts] = useState(new Set());
  const [maxItems, setMaxItems] = useState(6); // Default for LG (2 rows * 3 cols)
  const navigate = useNavigate();

  // Load products from JSON
  useEffect(() => {
    setProducts(productsData.products);

    const updateMaxItems = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setMaxItems(8); // XL screens → 2 rows * 4 cols
      } else if (width >= 1024) {
        setMaxItems(6); // LG screens → 2 rows * 3 cols
      } else {
        setMaxItems(productsData.products.length); // No limit for small screens
      }
    };

    updateMaxItems();
    window.addEventListener("resize", updateMaxItems);

    return () => window.removeEventListener("resize", updateMaxItems);
  }, []);

  const toggleWishlist = (productId) => {
    setLikedProducts((prevLiked) => {
      const newLiked = new Set(prevLiked);
      if (newLiked.has(productId)) {
        newLiked.delete(productId);
      } else {
        newLiked.add(productId);
      }
      return newLiked;
    });
  };

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
          {products.slice(0, maxItems).map((product, index) => {
            const discount = Math.round(
              ((product.originalPrice - product.price) /
                product.originalPrice) *
                100
            );
            const isLiked = likedProducts.has(product.id);

            return (
              <div
                key={product.id}
                className="group bg-white p-6 rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden animate-slideInUp border border-gray-100"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-pressed={isLiked}
                  aria-label={
                    isLiked ? "Remove from wishlist" : "Add to wishlist"
                  }
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300 transform hover:scale-110"
                >
                  <Heart
                    size={20}
                    className={`transition-all duration-300 ${
                      isLiked
                        ? "fill-red-500 text-red-500 scale-110"
                        : "text-gray-600 hover:text-red-500"
                    }`}
                  />
                </button>

                {/* Product Image */}
                <div className="relative mb-4 overflow-hidden rounded-lg">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-48 object-cover rounded-lg transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className={`absolute top-2 left-2 ${product.badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse`}
                  >
                    {product.badge}
                  </div>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </div>

                {/* Product Info */}
                <div className="mb-2">
                  <span className="text-sm text-blue-600 font-medium hover:text-blue-800 transition-colors duration-200">
                    {product.brand}
                  </span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full ml-2 hover:bg-gray-200 transition-colors duration-200">
                    {product.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg transition-all duration-300 hover:scale-125 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Price & Discount */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      ${product.price}
                    </span>
                    <span className="text-sm text-gray-500 line-through ml-2">
                      ${product.originalPrice}
                    </span>
                  </div>
                  <span className="bg-green-100 text-green-800 text-sm font-bold px-3 py-1 rounded-full shadow-sm hover:shadow-md transition-shadow duration-200 animate-bounce">
                    -{discount}%
                  </span>
                </div>

                {/* Add to Cart */}
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-semibold">
                  Add to Cart
                </button>
              </div>
            );
          })}
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
    // <h1>Hello</h1>
  );
};

export default ProductShowcase;
