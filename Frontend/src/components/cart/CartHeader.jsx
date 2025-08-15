import React from "react";
import { ShoppingCart, ArrowLeft, Gift, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const CartHeader = ({ itemCount }) => {
  return (
    <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Back Button & Title */}
          <div className="flex items-center gap-4">
            <Link
              to="/products"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-300 group"
            >
              <div className="w-10 h-10 bg-gray-100 hover:bg-blue-100 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <ArrowLeft className="w-5 h-5" />
              </div>
              <span className="hidden sm:block font-medium">
                Continue Shopping
              </span>
            </Link>

            <div className="h-8 w-px bg-gray-300"></div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
                {itemCount > 0 && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                    {itemCount}
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Your Cart
                </h1>
                <p className="text-gray-600 text-sm">
                  {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
                </p>
              </div>
            </div>
          </div>

          {/* Special Offers Badge */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
              <Gift className="w-4 h-4" />
              <span className="text-sm font-semibold">
                Free Gift on Orders $200+
              </span>
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mt-6 flex items-center justify-center lg:justify-start">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                1
              </div>
              <span className="text-blue-600 font-semibold">Cart</span>
            </div>
            <div className="w-12 h-px bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-sm font-bold">
                2
              </div>
              <span className="text-gray-600">Checkout</span>
            </div>
            <div className="w-12 h-px bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-sm font-bold">
                3
              </div>
              <span className="text-gray-600">Payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartHeader;
