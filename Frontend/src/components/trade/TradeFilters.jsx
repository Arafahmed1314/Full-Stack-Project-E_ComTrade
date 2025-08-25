import React from "react";
import {
  SlidersHorizontal,
  Calendar,
  Heart,
  ArrowRightLeft,
} from "lucide-react";

const TradeFilters = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
}) => {
  const sortOptions = [
    { value: "newest", label: "Newest First", icon: Calendar },
    { value: "oldest", label: "Oldest First", icon: Calendar },
    { value: "mostLiked", label: "Most Liked", icon: Heart },
    { value: "mostRequested", label: "Most Requested", icon: ArrowRightLeft },
  ];

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal className="w-5 h-5 text-indigo-600" />
        <h3 className="font-semibold text-gray-900">Filters & Sort</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Categories */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Categories
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === "All"
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Sort By
          </label>
          <div className="grid grid-cols-2 gap-2">
            {sortOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <button
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    sortBy === option.value
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeFilters;
