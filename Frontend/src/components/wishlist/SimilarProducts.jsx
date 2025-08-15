import React, { useState } from "react";
import {
  Heart,
  ShoppingCart,
  Star,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Eye,
} from "lucide-react";

const SimilarProducts = ({ wishlistItems }) => {
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Mock similar products based on wishlist items
  const getSimilarProducts = () => {
    return [
      {
        id: "sim1",
        name: "Premium Wireless Headphones Pro",
        brand: "AudioTech",
        price: 299,
        originalPrice: 399,
        image: "/api/placeholder/300/300",
        rating: 4.8,
        reviews: 1247,
        category: "Electronics",
        isNew: true,
        discount: 25,
      },
      {
        id: "sim2",
        name: "Smart Fitness Watch Ultra",
        brand: "FitTech",
        price: 249,
        originalPrice: 299,
        image: "/api/placeholder/300/300",
        rating: 4.6,
        reviews: 892,
        category: "Electronics",
        isPopular: true,
        discount: 17,
      },
      {
        id: "sim3",
        name: "Designer Leather Backpack",
        brand: "StyleCraft",
        price: 159,
        originalPrice: 199,
        image: "/api/placeholder/300/300",
        rating: 4.7,
        reviews: 654,
        category: "Fashion",
        isNew: false,
        discount: 20,
      },
      {
        id: "sim4",
        name: "Ergonomic Office Chair",
        brand: "ComfortZone",
        price: 399,
        originalPrice: 499,
        image: "/api/placeholder/300/300",
        rating: 4.9,
        reviews: 1156,
        category: "Furniture",
        isPopular: true,
        discount: 20,
      },
      {
        id: "sim5",
        name: "Professional Camera Lens",
        brand: "PhotoPro",
        price: 599,
        originalPrice: 699,
        image: "/api/placeholder/300/300",
        rating: 4.8,
        reviews: 432,
        category: "Electronics",
        isNew: true,
        discount: 14,
      },
      {
        id: "sim6",
        name: "Luxury Skincare Set",
        brand: "GlowBeauty",
        price: 89,
        originalPrice: 129,
        image: "/api/placeholder/300/300",
        rating: 4.5,
        reviews: 987,
        category: "Beauty",
        isPopular: false,
        discount: 31,
      },
    ];
  };

  const similarProducts = getSimilarProducts();

  if (wishlistItems?.length === 0) {
    return null;
  }

  return (
    <div className="bg-white/90 rounded-2xl p-4 md:p-6 shadow-lg border border-gray-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900">
              You Might Also Like
            </h3>
            <p className="text-xs md:text-sm text-gray-600">
              Based on your wishlist preferences
            </p>
          </div>
        </div>

        <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm self-start sm:self-auto">
          <span className="hidden sm:inline">View All</span>
          <span className="sm:hidden">More</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-3 md:gap-4">
        {similarProducts.slice(0, 3).map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            {/* Product Image */}
            <div className="relative w-full h-36 sm:h-40 bg-gray-100 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Badges */}
              <div className="absolute top-1.5 left-1.5 flex flex-col gap-1">
                {product.isNew && (
                  <div className="bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full font-semibold">
                    New
                  </div>
                )}
                {product.isPopular && (
                  <div className="bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full font-semibold flex items-center gap-1">
                    <TrendingUp className="w-2.5 h-2.5" />
                    <span className="hidden sm:inline">Popular</span>
                    <span className="sm:hidden">Hot</span>
                  </div>
                )}
                {product.discount > 0 && (
                  <div className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-semibold">
                    -{product.discount}%
                  </div>
                )}
              </div>

              {/* Quick Actions - Only show on larger screens */}
              <div
                className={`absolute inset-0 bg-black/20 md:flex items-center justify-center gap-2 transition-opacity duration-300 hidden ${
                  hoveredProduct === product.id ? "opacity-100" : "opacity-0"
                }`}
              >
                <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200">
                  <Heart className="w-4 h-4 text-gray-700" />
                </button>
                <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200">
                  <Eye className="w-4 h-4 text-gray-700" />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-3 md:p-4 space-y-2 md:space-y-3">
              <div>
                <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 leading-tight">
                  {product.name}
                </h4>
                <p className="text-gray-600 text-xs mt-1">{product.brand}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-600">
                  <span className="hidden sm:inline">
                    {product.rating} ({product.reviews})
                  </span>
                  <span className="sm:hidden">({product.reviews})</span>
                </span>
              </div>

              {/* Price */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-base md:text-lg font-bold text-gray-900">
                    ${product.price}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-xs md:text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                {product.discount > 0 && (
                  <div className="text-green-600 text-xs font-semibold">
                    Save ${product.originalPrice - product.price}!
                  </div>
                )}
              </div>

              {/* Add to Cart Button */}
              <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 md:py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 text-sm">
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200">
        <div className="text-center">
          <p className="text-xs md:text-sm text-gray-600 mb-3">
            <span className="hidden sm:inline">
              Discover more products tailored to your interests
            </span>
            <span className="sm:hidden">Discover more products</span>
          </p>
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 text-sm">
            <Sparkles className="w-4 h-4" />
            <span>Explore More</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimilarProducts;
