import React, { useState, useEffect } from "react";
import productsData from "../../data/products.json";
import {
  Monitor,
  Gamepad2,
  Smartphone,
  Watch,
  Camera,
  Headphones,
  Laptop,
  ChefHat,
  Shirt,
  Dumbbell,
  Sparkles,
} from "lucide-react";

const CategorySection = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Extract unique categories from products data
    const uniqueCategories = [
      ...new Set(productsData.products.map((product) => product.category)),
    ];

    // Create category objects with icons and additional info
    const categoryData = uniqueCategories.map((category) => {
      const productsInCategory = productsData.products.filter(
        (product) => product.category === category
      );
      const categoryInfo = getCategoryInfo(category);

      return {
        name: category,
        count: productsInCategory.length,
        icon: categoryInfo.icon,
        color: categoryInfo.color,
        bgGradient: categoryInfo.bgGradient,
        description: categoryInfo.description,
        image: categoryInfo.image,
      };
    });

    setCategories(categoryData);
  }, []);

  const getCategoryInfo = (category) => {
    const categoryMap = {
      Electronics: {
        icon: Smartphone,
        color: "text-blue-600",
        bgGradient: "from-blue-500 to-blue-600",
        description: "Latest gadgets and electronics",
        image:
          "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=400&fit=crop",
      },
      Gaming: {
        icon: Gamepad2,
        color: "text-purple-600",
        bgGradient: "from-purple-500 to-purple-600",
        description: "Gaming gear and accessories",
        image:
          "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&h=400&fit=crop",
      },
      Kitchen: {
        icon: ChefHat,
        color: "text-orange-600",
        bgGradient: "from-orange-500 to-orange-600",
        description: "Kitchen appliances and tools",
        image:
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
      },
      Wearables: {
        icon: Watch,
        color: "text-green-600",
        bgGradient: "from-green-500 to-green-600",
        description: "Smart watches and fitness trackers",
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      },
      Photography: {
        icon: Camera,
        color: "text-indigo-600",
        bgGradient: "from-indigo-500 to-indigo-600",
        description: "Cameras and photography gear",
        image:
          "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop",
      },
      Audio: {
        icon: Headphones,
        color: "text-red-600",
        bgGradient: "from-red-500 to-red-600",
        description: "Headphones and audio equipment",
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      },
      Computers: {
        icon: Laptop,
        color: "text-gray-600",
        bgGradient: "from-gray-500 to-gray-600",
        description: "Laptops and computer accessories",
        image:
          "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
      },
      Fashion: {
        icon: Shirt,
        color: "text-pink-600",
        bgGradient: "from-pink-500 to-pink-600",
        description: "Trendy clothing and accessories",
        image:
          "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop",
      },
      Sports: {
        icon: Dumbbell,
        color: "text-emerald-600",
        bgGradient: "from-emerald-500 to-emerald-600",
        description: "Sports and fitness equipment",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
      },
      Beauty: {
        icon: Sparkles,
        color: "text-rose-600",
        bgGradient: "from-rose-500 to-rose-600",
        description: "Beauty and skincare products",
        image:
          "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
      },
    };

    return (
      categoryMap[category] || {
        icon: Monitor,
        color: "text-gray-600",
        bgGradient: "from-gray-500 to-gray-600",
        description: "Explore this category",
        image:
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop",
      }
    );
  };

  const handleCategoryClick = (categoryName) => {
    // Future routing will be implemented here
    console.log(`Navigate to /products/${categoryName.toLowerCase()}`);
    // For now, just log the action
    alert(`Navigating to ${categoryName} products page (to be implemented)`);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-white to-gray-50 block w-full clear-both">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className="text-center mb-16 animate-fadeInUp"
          style={{ animationDelay: "200ms" }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover products from your favorite categories with curated
            collections
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 auto-rows-fr">
          {categories.map((category, index) => {
            const IconComponent = category.icon;

            return (
              <div
                key={category.name}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-102 cursor-pointer overflow-hidden border border-gray-100 animate-slideInUp mx-2"
                style={{
                  animationDelay: `${index * 150 + 400}ms`,
                  minHeight: "320px",
                }}
                onClick={() => handleCategoryClick(category.name)}
              >
                {/* Background Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${category.bgGradient} opacity-70 group-hover:opacity-80 transition-opacity duration-300`}
                  ></div>

                  {/* Icon */}
                  <div className="absolute top-4 left-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>

                  {/* Product Count Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-bold">
                    {category.count} items
                  </div>
                </div>

                {/* Category Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {category.description}
                  </p>

                  {/* Explore Button */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
                      Explore now
                    </span>
                    <div className="w-8 h-8 bg-gray-100 group-hover:bg-blue-100 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
                      <svg
                        className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-all duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div
          className="text-center mt-16 animate-fadeInUp"
          style={{ animationDelay: "1000ms" }}
        >
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for?
          </p>
          <button className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-3 rounded-xl font-semibold hover:from-gray-900 hover:to-black transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            Browse All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
