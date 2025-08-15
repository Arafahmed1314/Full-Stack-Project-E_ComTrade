import React from "react";
import { Star, Plus, Heart, Eye } from "lucide-react";

const RecommendedItems = () => {
  const recommendedProducts = [
    {
      id: 101,
      name: "Wireless Mouse",
      brand: "TechPro",
      price: 29.99,
      originalPrice: 39.99,
      image:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop",
      rating: 4.5,
      reviews: 234,
    },
    {
      id: 102,
      name: "USB-C Cable",
      brand: "PowerLink",
      price: 19.99,
      originalPrice: 24.99,
      image:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=200&fit=crop",
      rating: 4.7,
      reviews: 567,
    },
    {
      id: 103,
      name: "Phone Stand",
      brand: "StandMaster",
      price: 15.99,
      originalPrice: 22.99,
      image:
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=200&h=200&fit=crop",
      rating: 4.3,
      reviews: 189,
    },
  ];

  return (
    <div className="bg-white/90 rounded-2xl p-6 shadow-lg border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Heart className="w-5 h-5 text-pink-500" />
        You Might Also Like
      </h3>

      <div className="space-y-4">
        {recommendedProducts.map((product) => (
          <div
            key={product.id}
            className="group bg-white/60 rounded-xl p-4 hover:shadow-lg transition-all duration-300 border border-white/20"
          >
            <div className="flex gap-3">
              {/* Product Image */}
              <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Eye className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 text-sm truncate">
                  {product.name}
                </h4>
                <p className="text-xs text-gray-600 mb-1">{product.brand}</p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
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
                    ({product.reviews})
                  </span>
                </div>

                {/* Price & Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 text-sm">
                      ${product.price}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-xs text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>

                  <button className="w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-md">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <button className="w-full mt-4 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl font-semibold hover:from-blue-100 hover:to-purple-100 hover:text-blue-700 transition-all duration-300">
        View More Recommendations
      </button>
    </div>
  );
};

export default RecommendedItems;
