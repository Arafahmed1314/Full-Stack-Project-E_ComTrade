import React from "react";
import { Heart, Star, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddToCartButton from "../common/AddToCartButton";
import AddToWishlistButton from "../common/AddToWishlistButton";
const ProductCard = ({ product, viewMode = "grid" }) => {
  const navigate = useNavigate();

  // Fix rating and reviews extraction from API data
  const ratingValue =
    typeof product.rating === "object"
      ? product.rating.rate
      : typeof product.rating === "number"
      ? product.rating
      : 0;
  const reviewsCount =
    typeof product.rating === "object"
      ? product.rating.count
      : product.reviews || 0;

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  if (viewMode === "list") {
    return (
      <div className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 flex">
        {/* Product Image */}
        <div className="relative w-48 flex-shrink-0">
          <img
            src={product.images[0]}
            alt={product.title}
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
              {product.category}
            </span>
            <h3 className="mt-1 text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {product.title}
            </h3>
            <div className="flex items-center mt-2 space-x-1">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < ratingValue
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">({reviewsCount})</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900">
                ${product.price}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <AddToWishlistButton
                productId={product._id || product.id}
                variant="icon"
                size="sm"
              />
              <AddToCartButton
                productId={product._id || product.id}
                size="sm"
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group relative rounded-xl bg-white border border-gray-200 shadow-sm transition-all duration-300 overflow-hidden
      hover:shadow-xl hover:border-blue-400 hover:-translate-y-2 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50"
    >
      {/* Product Image Container */}
      <div className="relative overflow-hidden cursor-pointer bg-gray-50">
        <img
          onClick={() => navigate(`/products/${product.id}`)}
          src={product.images[0]}
          alt={product.title}
          className="w-full h-44 object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold shadow">
            -{discountPercentage}%
          </div>
        )}
        {/* Quick Actions */}
        <div className="absolute top-2 right-2 flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <AddToWishlistButton
            productId={product._id || product.id}
            variant="icon"
            size="lg"
            className="bg-white rounded-full border border-gray-200 hover:bg-blue-50 p-2"
          />
        </div>
      </div>
      {/* Product Info */}
      <div className="p-3">
        {/* Category */}
        <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">
          {product.category}
        </span>
        {/* Product Name */}
        <h3 className="mt-1 text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.title}
        </h3>
        {/* Rating */}
        <div className="flex items-center mt-2 space-x-1">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < ratingValue
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400">({reviewsCount})</span>
        </div>
        {/* Price */}
        <div className="mt-2 flex items-center space-x-2">
          <span className="text-lg font-bold text-blue-600">
            ${product.price}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-gray-400 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
        {/* Add to Cart Button */}
        <AddToCartButton
          productId={product._id || product.id}
          size="sm"
          variant="ghost"
          className="mt-3 w-full bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition-all duration-200"
        />
      </div>
    </div>
  );
};

export default ProductCard;
