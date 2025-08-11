import React, { useState } from "react";
import {
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  Star,
  DollarSign,
  Tag,
  Grid3X3,
  List,
  SlidersHorizontal,
} from "lucide-react";

const ProductFilter = ({ isOpen, onClose }) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    rating: true,
    brand: false,
  });

  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    priceRange: [0, 2000],
    rating: 0,
    brands: [],
    sortBy: "featured",
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const categories = [
    { name: "Electronics", count: 45 },
    { name: "Fashion", count: 32 },
    { name: "Kitchen", count: 28 },
    { name: "Gaming", count: 24 },
    { name: "Wearables", count: 18 },
    { name: "Photography", count: 15 },
    { name: "Audio", count: 22 },
    { name: "Computers", count: 35 },
    { name: "Sports", count: 19 },
    { name: "Beauty", count: 26 },
  ];

  const brands = [
    "Apple",
    "Samsung",
    "Sony",
    "Nike",
    "Adidas",
    "Canon",
    "LG",
    "HP",
    "Dell",
    "Microsoft",
  ];

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Customer Rating" },
    { value: "newest", label: "Newest First" },
    { value: "bestseller", label: "Best Sellers" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Filter Panel */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
        w-80 lg:w-full bg-white lg:bg-transparent
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        overflow-y-auto lg:overflow-visible
        border-r lg:border-r-0 border-gray-200
      `}
      >
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 lg:p-0 space-y-6">
          {/* Sort By - Desktop */}
          <div className="hidden lg:block">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={selectedFilters.sortBy}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* View Options - Desktop */}
          <div className="hidden lg:flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">View:</span>
            <button className="p-2 bg-white rounded-md shadow-sm hover:bg-gray-50">
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-white rounded-md">
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Price Range */}
          <div className="border-b border-gray-200 pb-6">
            <button
              onClick={() => toggleSection("price")}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                Price Range
              </h3>
              {expandedSections.price ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>

            {expandedSections.price && (
              <div className="mt-4 space-y-4">
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={selectedFilters.priceRange[0]}
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={selectedFilters.priceRange[1]}
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>$0</span>
                  <span>$2000+</span>
                </div>
              </div>
            )}
          </div>

          {/* Categories */}
          <div className="border-b border-gray-200 pb-6">
            <button
              onClick={() => toggleSection("category")}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Tag className="w-5 h-5 mr-2 text-blue-600" />
                Categories
              </h3>
              {expandedSections.category ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>

            {expandedSections.category && (
              <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
                {categories.map((category) => (
                  <label
                    key={category.name}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-3 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{category.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      ({category.count})
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Customer Rating */}
          <div className="border-b border-gray-200 pb-6">
            <button
              onClick={() => toggleSection("rating")}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-500" />
                Customer Rating
              </h3>
              {expandedSections.rating ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>

            {expandedSections.rating && (
              <div className="mt-4 space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <label
                    key={rating}
                    className="flex items-center p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="rating"
                      className="mr-3 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-gray-700">& Up</span>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Brands */}
          <div className="border-b border-gray-200 pb-6">
            <button
              onClick={() => toggleSection("brand")}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <SlidersHorizontal className="w-5 h-5 mr-2 text-purple-600" />
                Brands
              </h3>
              {expandedSections.brand ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>

            {expandedSections.brand && (
              <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
                <input
                  type="text"
                  placeholder="Search brands..."
                  className="w-full p-2 border border-gray-300 rounded-md mb-3"
                />
                {brands.map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="mr-3 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{brand}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Clear Filters */}
          <div className="pt-4">
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors">
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductFilter;
