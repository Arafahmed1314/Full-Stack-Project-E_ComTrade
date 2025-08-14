import React from "react";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";

const ProductCard = ({ product, viewMode = "grid" }) => {
  // Handle different data structures for backwards compatibility
  const productData = {
    id: product.id,
    title: product.title || product.name,
    price: product.price,
    originalPrice: product.originalPrice || product.price * 1.2, // fallback if no original price
    category: product.category,
    images: product.images || [product.image], // handle both arrays and single image
    rating:
      typeof product.rating === "object" ? product.rating.rate : product.rating,
    reviews:
      typeof product.rating === "object"
        ? product.rating.count
        : product.reviews,
    brand: product.brand || "",
    badge: product.badge || "",
    badgeColor: product.badgeColor || "bg-red-500",
  };

  const discountPercentage = productData.originalPrice
    ? Math.round(
        ((productData.originalPrice - productData.price) /
          productData.originalPrice) *
          100
      )
    : 0;

  if (viewMode === "list") {
    return (
      <div className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 flex">
        {/* Product Image */}
        <div className="relative w-48 flex-shrink-0">
          <img
            src={productData.images[0]}
            alt={productData.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {discountPercentage > 0 && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              -{discountPercentage}%
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <span className="text-xs text-blue-600 font-medium uppercase tracking-wide">
              {productData.category}
            </span>
            <h3 className="mt-1 text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {productData.title}
            </h3>
            <div className="flex items-center mt-2 space-x-1">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < productData.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                ({productData.reviews})
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900">
                ${productData.price}
              </span>
              {productData.originalPrice > productData.price && (
                <span className="text-sm text-gray-500 line-through">
                  ${productData.originalPrice}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600 hover:text-red-500 transition-colors">
                <Heart className="w-4 h-4" />
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Product Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={productData.images[0]}
          alt={productData.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            -{discountPercentage}%
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute top-2 right-2 flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
            <Heart className="w-3 h-3 text-gray-600 hover:text-red-500" />
          </button>
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
            <Eye className="w-3 h-3 text-gray-600 hover:text-blue-500" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3">
        {/* Category */}
        <span className="text-xs text-blue-600 font-medium uppercase tracking-wide">
          {productData.category}
        </span>

        {/* Product Name */}
        <h3 className="mt-1 text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {productData.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center mt-2 space-x-1">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < productData.rating
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({productData.reviews})</span>
        </div>

        {/* Price */}
        <div className="mt-2 flex items-center space-x-2">
          <span className="text-lg font-bold text-gray-900">
            ${productData.price}
          </span>
          {productData.originalPrice > productData.price && (
            <span className="text-xs text-gray-500 line-through">
              ${productData.originalPrice}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button className="mt-3 w-full bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-700 py-2 px-3 rounded-lg transition-all duration-300 font-medium text-sm">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
