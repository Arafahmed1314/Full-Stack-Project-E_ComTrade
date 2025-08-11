import React, { useState } from "react";
import {
  Heart,
  ShoppingCart,
  Star,
  Plus,
  Minus,
  Share2,
  Shield,
  Truck,
  RefreshCw,
  Award,
} from "lucide-react";

const ProductInfo = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discountPercentage = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const variants = [
    {
      name: "Default",
      price: product.price,
      originalPrice: product.originalPrice,
    },
    {
      name: "Premium",
      price: product.price + 50,
      originalPrice: product.originalPrice + 50,
    },
    {
      name: "Deluxe",
      price: product.price + 100,
      originalPrice: product.originalPrice + 100,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Product Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {product.name}
        </h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < product.rating
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-lg font-medium text-gray-700 ml-2">
              {product.rating}
            </span>
          </div>
          <span className="text-gray-500">({product.reviews} reviews)</span>
          <span className="text-green-600 font-medium">In Stock</span>
        </div>
      </div>

      {/* Price Section */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center space-x-4 mb-2">
          <span className="text-3xl font-bold text-gray-900">
            ${variants[selectedVariant].price}
          </span>
          {variants[selectedVariant].originalPrice >
            variants[selectedVariant].price && (
            <>
              <span className="text-xl text-gray-500 line-through">
                ${variants[selectedVariant].originalPrice}
              </span>
              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                -{discountPercentage}%
              </span>
            </>
          )}
        </div>
        <p className="text-sm text-gray-600">
          Free shipping on orders over $50
        </p>
      </div>

      {/* Product Variants */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Choose Variant
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {variants.map((variant, index) => (
            <button
              key={index}
              onClick={() => setSelectedVariant(index)}
              className={`p-3 rounded-lg border-2 text-center transition-all ${
                selectedVariant === index
                  ? "border-blue-600 bg-blue-50 text-blue-600"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="font-medium">{variant.name}</div>
              <div className="text-sm text-gray-600">${variant.price}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Quantity Selector */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Quantity</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={decreaseQuantity}
              className="p-2 hover:bg-gray-100 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 py-2 font-medium min-w-[60px] text-center">
              {quantity}
            </span>
            <button
              onClick={increaseQuantity}
              className="p-2 hover:bg-gray-100 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <span className="text-gray-600">Only 12 items left in stock</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <div className="flex space-x-4">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors">
            <ShoppingCart className="w-5 h-5" />
            <span>Add to Cart</span>
          </button>
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`p-4 rounded-lg border-2 transition-all ${
              isWishlisted
                ? "border-red-500 bg-red-50 text-red-500"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <Heart
              className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`}
            />
          </button>
          <button className="p-4 rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 px-6 rounded-lg font-semibold transition-colors">
          Buy Now
        </button>
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 gap-4 pt-6 border-t">
        <div className="flex items-center space-x-3">
          <div className="bg-green-100 p-2 rounded-lg">
            <Truck className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <div className="font-medium">Free Delivery</div>
            <div className="text-sm text-gray-600">2-3 business days</div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Shield className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <div className="font-medium">2 Year Warranty</div>
            <div className="text-sm text-gray-600">Manufacturer warranty</div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="bg-purple-100 p-2 rounded-lg">
            <RefreshCw className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <div className="font-medium">30-Day Returns</div>
            <div className="text-sm text-gray-600">No questions asked</div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="bg-yellow-100 p-2 rounded-lg">
            <Award className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <div className="font-medium">Premium Support</div>
            <div className="text-sm text-gray-600">24/7 customer service</div>
          </div>
        </div>
      </div>

      {/* Quick Details */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">Quick Details</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Category:</span>
            <span className="font-medium ml-2">{product.category}</span>
          </div>
          <div>
            <span className="text-gray-600">SKU:</span>
            <span className="font-medium ml-2">
              #{product.id.toString().padStart(6, "0")}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Weight:</span>
            <span className="font-medium ml-2">2.5 kg</span>
          </div>
          <div>
            <span className="text-gray-600">Dimensions:</span>
            <span className="font-medium ml-2">25x15x10 cm</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
