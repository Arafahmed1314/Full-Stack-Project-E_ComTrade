import React from "react";
import {
  ShoppingCart,
  ArrowRight,
  Heart,
  Gift,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  const popularCategories = [
    { name: "Electronics", icon: Zap, color: "from-blue-500 to-cyan-500" },
    { name: "Fashion", icon: Heart, color: "from-pink-500 to-purple-500" },
    {
      name: "Home & Garden",
      icon: Gift,
      color: "from-green-500 to-emerald-500",
    },
    { name: "Sports", icon: Star, color: "from-orange-500 to-red-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      {/* Simplified Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-orange-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div className="space-y-8">
          {/* Empty Cart Icon */}
          <div className="relative mx-auto w-48 h-48">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-50" />
            <div className="absolute inset-4 bg-white rounded-full shadow-2xl flex items-center justify-center">
              <div>
                <ShoppingCart className="w-20 h-20 text-gray-400" />
              </div>
            </div>

            {/* Floating Sparkles */}
            <div className="absolute -top-4 -right-4">
              <Sparkles className="w-8 h-8 text-yellow-400" />
            </div>

            <div className="absolute -bottom-2 -left-6">
              <Sparkles className="w-6 h-6 text-blue-400" />
            </div>
          </div>

          {/* Main Message */}
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">
              Your Cart is{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Empty
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Looks like you haven't added anything to your cart yet. Let's find
              something amazing for you!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/products"
              className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Start Shopping</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>

            <Link
              to="/"
              className="group bg-white/80 backdrop-blur-xl text-gray-700 px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 flex items-center gap-3"
            >
              <Heart className="w-5 h-5" />
              <span>Browse Favorites</span>
            </Link>
          </div>

          {/* Popular Categories */}
          <div className="mt-12 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Popular Categories
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {popularCategories.map((category) => (
                <div key={category.name} className="group">
                  <Link
                    to={`/products?category=${category.name.toLowerCase()}`}
                    className="block bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20"
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300`}
                    >
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-center">
                      {category.name}
                    </h3>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Special Offer Banner */}
          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-2xl max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Gift className="w-6 h-6" />
              <h3 className="text-xl font-bold">Special Offer!</h3>
              <Gift className="w-6 h-6" />
            </div>
            <p className="text-lg mb-4">
              Get <strong>20% OFF</strong> on your first order + Free Shipping!
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-white text-orange-600 px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <span>Claim Offer</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
