import React from "react";
import {
  Heart,
  ShoppingBag,
  Star,
  TrendingUp,
  Gift,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const EmptyWishlist = ({ onBrowseProducts }) => {
  const features = [
    {
      icon: Heart,
      title: "Save Favorites",
      description: "Keep track of items you love for easy access later",
    },
    {
      icon: Star,
      title: "Price Tracking",
      description: "Get notified when prices drop on your saved items",
    },
    {
      icon: Gift,
      title: "Share Lists",
      description: "Share your wishlist with friends and family",
    },
    {
      icon: TrendingUp,
      title: "Smart Recommendations",
      description: "Discover similar products based on your preferences",
    },
  ];

  const suggestions = [
    "Latest Fashion Trends",
    "Electronics & Gadgets",
    "Home & Garden",
    "Beauty & Personal Care",
    "Sports & Outdoor",
  ];

  return (
    <div className="min-h-[600px] flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        {/* Main Illustration */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-200/50 to-purple-200/50 animate-pulse"></div>
            <Heart className="w-16 h-16 text-pink-400 relative z-10" />
            <div className="absolute top-4 right-4 w-4 h-4 bg-yellow-400 rounded-full animate-bounce">
              <Sparkles className="w-3 h-3 text-white m-0.5" />
            </div>
            <div className="absolute bottom-6 left-6 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Main Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Your Wishlist is Empty
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Start adding items you love to create your perfect collection
          </p>

          <button
            onClick={onBrowseProducts}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Browse Products</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="bg-white/80 rounded-2xl p-6 border border-gray-200 hover:border-blue-300 transition-all duration-200 hover:shadow-lg"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <IconComponent className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Quick Suggestions */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">
            Popular Categories
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={onBrowseProducts}
                className="px-4 py-2 bg-white text-gray-700 rounded-xl border border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-all duration-200 text-sm font-medium"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/80 rounded-xl p-4 border border-gray-200">
            <div className="text-2xl font-bold text-blue-600 mb-1">10K+</div>
            <div className="text-sm text-gray-600">Products</div>
          </div>
          <div className="bg-white/80 rounded-xl p-4 border border-gray-200">
            <div className="text-2xl font-bold text-green-600 mb-1">500+</div>
            <div className="text-sm text-gray-600">Brands</div>
          </div>
          <div className="bg-white/80 rounded-xl p-4 border border-gray-200">
            <div className="text-2xl font-bold text-purple-600 mb-1">24/7</div>
            <div className="text-sm text-gray-600">Support</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyWishlist;
