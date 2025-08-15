import React, { useState } from "react";
import {
  Trash2,
  Plus,
  Minus,
  Heart,
  Star,
  Shield,
  Truck,
  AlertTriangle,
  Check,
} from "lucide-react";

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleRemove = () => {
    onRemove(item.id);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="bg-white/90 rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Product Image */}
        <div className="relative flex-shrink-0">
          <div className="w-full lg:w-32 h-48 lg:h-32 bg-gray-100 rounded-xl overflow-hidden group">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {!item.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white text-sm font-semibold bg-red-500 px-2 py-1 rounded">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-200"
          >
            <Heart
              className={`w-4 h-4 ${
                isWishlisted ? "text-red-500 fill-current" : "text-gray-400"
              }`}
            />
          </button>
        </div>

        {/* Product Details */}
        <div className="flex-1 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                  {item.name}
                </h3>
                {item.freeShipping && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
                    <Truck className="w-3 h-3" />
                    Free Shipping
                  </span>
                )}
              </div>

              <p className="text-gray-600 text-sm font-medium">{item.brand}</p>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>
                  Color: <strong>{item.color}</strong>
                </span>
                <span>
                  Size: <strong>{item.size}</strong>
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
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

              {/* Warranty & Stock Status */}
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1 text-blue-600">
                  <Shield className="w-3 h-3" />
                  <span>{item.warranty} Warranty</span>
                </div>
                <div
                  className={`flex items-center gap-1 ${
                    item.inStock ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.inStock ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <AlertTriangle className="w-3 h-3" />
                  )}
                  <span>{item.inStock ? "In Stock" : "Out of Stock"}</span>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="text-right space-y-1">
              <div className="flex items-center gap-2 justify-end">
                <span className="text-2xl font-bold text-gray-900">
                  ${item.price.toFixed(2)}
                </span>
                {item.originalPrice > item.price && (
                  <span className="text-sm text-gray-500 line-through">
                    ${item.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {item.originalPrice > item.price && (
                <div className="text-green-600 text-sm font-semibold">
                  Save ${(item.originalPrice - item.price).toFixed(2)}
                </div>
              )}
              <div className="text-xs text-gray-500">
                ${(item.price * item.quantity).toFixed(2)} total
              </div>
            </div>
          </div>

          {/* Quantity Controls & Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              {/* Quantity Controls */}
              <div className="flex items-center bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-3 py-1 min-w-[40px] text-center font-semibold">
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-colors duration-200"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <span className="text-sm text-gray-600">
                Qty: {item.quantity}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors duration-200 text-sm font-medium"
              >
                <Heart
                  className={`w-4 h-4 ${
                    isWishlisted ? "text-red-500 fill-current" : ""
                  }`}
                />
                <span className="hidden sm:block">
                  {isWishlisted ? "Saved" : "Save for Later"}
                </span>
              </button>

              <div className="w-px h-4 bg-gray-300"></div>

              <button
                onClick={handleRemove}
                className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors duration-200 text-sm font-medium"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:block">Remove</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
