import React, { useState } from "react";
import {
  Heart,
  ShoppingCart,
  Share2,
  Star,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Truck,
  Eye,
} from "lucide-react";

const WishlistItem = ({ item, onRemove, onMoveToCart, viewMode }) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => onRemove(item.id), 300);
  };

  const handleMoveToCart = () => {
    if (item.availability === "In Stock") {
      onMoveToCart(item.id);
    }
  };

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case "In Stock":
        return "text-green-600 bg-green-100";
      case "Low Stock":
        return "text-orange-600 bg-orange-100";
      case "Out of Stock":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getAvailabilityIcon = (availability) => {
    switch (availability) {
      case "In Stock":
        return CheckCircle;
      case "Low Stock":
        return AlertCircle;
      case "Out of Stock":
        return AlertCircle;
      default:
        return AlertCircle;
    }
  };

  const AvailabilityIcon = getAvailabilityIcon(item.availability);

  if (viewMode === "list") {
    return (
      <div
        className={`bg-white/90 rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 ${
          isRemoving ? "opacity-50 scale-95" : ""
        }`}
      >
        <div className="flex gap-6">
          {/* Product Image */}
          <div className="relative w-32 h-32 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 group">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {item.isOnSale && (
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                -{item.priceDropPercent}%
              </div>
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Eye className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Product Details */}
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
                  {item.name}
                </h3>
                <p className="text-gray-600 font-medium">{item.brand}</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(item.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {item.rating} ({item.reviews} reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-900">
                    ${item.price}
                  </span>
                  {item.originalPrice > item.price && (
                    <span className="text-lg text-gray-500 line-through">
                      ${item.originalPrice}
                    </span>
                  )}
                </div>
                {item.priceDropPercent > 0 && (
                  <div className="flex items-center gap-1 text-green-600 text-sm font-semibold mt-1">
                    <TrendingDown className="w-4 h-4" />
                    <span>Price dropped {item.priceDropPercent}%!</span>
                  </div>
                )}
              </div>
            </div>

            {/* Status and Features */}
            <div className="flex items-center gap-4 text-sm">
              <div
                className={`flex items-center gap-1 px-2 py-1 rounded-full ${getAvailabilityColor(
                  item.availability
                )}`}
              >
                <AvailabilityIcon className="w-3 h-3" />
                <span className="font-medium">{item.availability}</span>
              </div>

              {item.freeShipping && (
                <div className="flex items-center gap-1 text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                  <Truck className="w-3 h-3" />
                  <span className="font-medium">Free Shipping</span>
                </div>
              )}

              <span className="text-gray-500">
                Added {new Date(item.dateAdded).toLocaleDateString()}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleMoveToCart}
                  disabled={item.availability === "Out of Stock"}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium">
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>

              <button
                onClick={handleRemove}
                className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors duration-200 text-sm font-medium"
              >
                <Heart className="w-4 h-4 fill-current" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View
  return (
    <div
      className={`bg-white/90 rounded-2xl p-4 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 group ${
        isRemoving ? "opacity-50 scale-95" : ""
      }`}
    >
      {/* Product Image */}
      <div className="relative w-full h-48 bg-gray-100 rounded-xl overflow-hidden mb-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {item.isOnSale && (
            <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
              -{item.priceDropPercent}%
            </div>
          )}
          {item.freeShipping && (
            <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
              Free Ship
            </div>
          )}
        </div>

        {/* Actions Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200">
              <Eye className="w-5 h-5 text-gray-700" />
            </button>
            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200">
              <Share2 className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Remove Button */}
        <button
          onClick={handleRemove}
          className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 hover:scale-110 transition-all duration-200"
        >
          <Heart className="w-4 h-4 text-red-500 fill-current" />
        </button>
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm">
            {item.name}
          </h3>
          <p className="text-gray-600 text-sm">{item.brand}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(item.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600">({item.reviews})</span>
        </div>

        {/* Price */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              ${item.price}
            </span>
            {item.originalPrice > item.price && (
              <span className="text-sm text-gray-500 line-through">
                ${item.originalPrice}
              </span>
            )}
          </div>
          {item.priceDropPercent > 0 && (
            <div className="flex items-center gap-1 text-green-600 text-xs font-semibold">
              <TrendingDown className="w-3 h-3" />
              <span>Price dropped!</span>
            </div>
          )}
        </div>

        {/* Availability */}
        <div
          className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(
            item.availability
          )}`}
        >
          <AvailabilityIcon className="w-3 h-3" />
          <span>{item.availability}</span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleMoveToCart}
          disabled={item.availability === "Out of Stock"}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>
            {item.availability === "Out of Stock"
              ? "Out of Stock"
              : "Add to Cart"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default WishlistItem;
