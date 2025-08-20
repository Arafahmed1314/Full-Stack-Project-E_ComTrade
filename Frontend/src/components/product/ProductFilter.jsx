import React, { useState, useEffect } from "react";
import {
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  Star,
  DollarSign,
  Tag,
} from "lucide-react";
import useCategories from "../../hooks/useCategories";

const ProductFilter = ({
  initialCategory,
  products,
  isOpen,
  onClose,
  onFilterChange,
  onClearFilters,
  currentFilters,
}) => {
  const { categories: allCategories } = useCategories(); // Get all categories from API
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    rating: true,
  });

  const [localFilters, setLocalFilters] = useState({
    category: initialCategory || currentFilters?.category || "",
    minPrice: currentFilters?.minPrice || "",
    maxPrice: currentFilters?.maxPrice || "",
    rating: currentFilters?.rating || "",
  });

  // ✅ Simple: when initialCategory changes, update the filter once
  useEffect(() => {
    if (initialCategory) {
      const newFilters = {
        category: initialCategory,
        minPrice: "",
        maxPrice: "",
        rating: "",
      };
      setLocalFilters(newFilters);

      // Apply filter once - ignore eslint warning, this is intentional
      if (onFilterChange) {
        onFilterChange({ category: initialCategory });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCategory]); // Only depend on initialCategory

  // Apply filters when user manually changes them (no automatic triggers)

  // ✅ toggle section expand/collapse
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // ✅ handle filter change - SIMPLE VERSION
  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...localFilters, [filterType]: value };
    setLocalFilters(newFilters);

    // If "All Categories" is selected (empty value), clear the category filter
    if (filterType === "category" && value === "") {
      const filtersWithoutCategory = { ...newFilters };
      delete filtersWithoutCategory.category;

      if (onFilterChange) {
        onFilterChange(filtersWithoutCategory);
      }
      return;
    }

    // Remove empty values before sending to parent
    const cleanFilters = {};
    Object.entries(newFilters).forEach(([key, val]) => {
      if (val !== "" && val !== null && val !== undefined) {
        cleanFilters[key] = val;
      }
    });

    if (onFilterChange) {
      onFilterChange(cleanFilters);
    }
  };

  // ✅ clear filters
  const handleClearFilters = () => {
    const emptyFilters = {
      category: "",
      minPrice: "",
      maxPrice: "",
      rating: "",
    };
    setLocalFilters(emptyFilters);

    if (onClearFilters) {
      onClearFilters();
    } else if (onFilterChange) {
      onFilterChange({});
    }
  };

  // ✅ Use categories from API (all categories) instead of filtered products
  const categories =
    allCategories.length > 0
      ? allCategories
      : [...new Set(products?.map((product) => product.category) || [])];

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
      <div className="space-y-6">
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
              <div className="mt-4 space-y-2">
                <div className="flex items-center p-2">
                  <input
                    type="radio"
                    name="category"
                    value=""
                    checked={localFilters.category === ""}
                    onChange={(e) =>
                      handleFilterChange("category", e.target.value)
                    }
                    className="mr-3 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">All Categories</span>
                </div>
                {categories.map((category) => (
                  <div key={category} className="flex items-center p-2">
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={localFilters.category === category}
                      onChange={(e) =>
                        handleFilterChange("category", e.target.value)
                      }
                      className="mr-3 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-gray-700 capitalize">{category}</span>
                  </div>
                ))}
              </div>
            )}
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
                    placeholder="Min Price"
                    value={localFilters.minPrice}
                    onChange={(e) =>
                      handleFilterChange("minPrice", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="number"
                    placeholder="Max Price"
                    value={localFilters.maxPrice}
                    onChange={(e) =>
                      handleFilterChange("maxPrice", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
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
                <div className="flex items-center p-2">
                  <input
                    type="radio"
                    name="rating"
                    value=""
                    checked={localFilters.rating === ""}
                    onChange={(e) =>
                      handleFilterChange("rating", e.target.value)
                    }
                    className="mr-3 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">All Ratings</span>
                </div>
                {[4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center p-2">
                    <input
                      type="radio"
                      name="rating"
                      value={rating}
                      checked={localFilters.rating === rating.toString()}
                      onChange={(e) =>
                        handleFilterChange("rating", e.target.value)
                      }
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
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Clear Filters */}
          <div className="pt-4">
            <button
              onClick={handleClearFilters}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductFilter;
