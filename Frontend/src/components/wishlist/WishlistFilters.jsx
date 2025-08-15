import React from "react";
import {
  Filter,
  Grid3X3,
  List,
  SortAsc,
  Calendar,
  DollarSign,
  Tag,
  Package,
  RotateCcw,
} from "lucide-react";

const WishlistFilters = ({
  sortBy,
  setSortBy,
  filterBy,
  setFilterBy,
  viewMode,
  setViewMode,
  onClearFilters,
  totalItems,
  filteredItems,
}) => {
  const sortOptions = [
    { value: "dateAdded", label: "Date Added", icon: Calendar },
    { value: "priceHigh", label: "Price: High to Low", icon: DollarSign },
    { value: "priceLow", label: "Price: Low to High", icon: DollarSign },
    { value: "name", label: "Name A-Z", icon: SortAsc },
    { value: "rating", label: "Rating", icon: Tag },
  ];

  const filterOptions = [
    { value: "all", label: "All Items", count: totalItems },
    { value: "inStock", label: "In Stock", count: 0 },
    { value: "lowStock", label: "Low Stock", count: 0 },
    { value: "outOfStock", label: "Out of Stock", count: 0 },
    { value: "onSale", label: "On Sale", count: 0 },
    { value: "freeShipping", label: "Free Shipping", count: 0 },
  ];

  const hasActiveFilters = filterBy !== "all" || sortBy !== "dateAdded";

  return (
    <div className="bg-white/90 rounded-2xl p-4 md:p-6 shadow-lg border border-gray-200 backdrop-blur-sm">
      <div className="flex flex-col gap-4">
        {/* Top Row - Results Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Package className="w-4 h-4" />
            <span className="hidden sm:inline">
              Showing {filteredItems} of {totalItems} items
            </span>
            <span className="sm:hidden">
              {filteredItems}/{totalItems} items
            </span>
          </div>

          {/* View Mode - Always visible on right */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 font-medium hidden md:inline">
              View:
            </span>
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200 ${
                  viewMode === "grid"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200 ${
                  viewMode === "list"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Row - Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Sort Dropdown */}
          <div className="relative flex-1 sm:flex-none">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto appearance-none bg-gray-100 border border-gray-200 rounded-xl px-4 py-2.5 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <SortAsc className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>

          {/* Filter Dropdown */}
          <div className="relative flex-1 sm:flex-none">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="w-full sm:w-auto appearance-none bg-gray-100 border border-gray-200 rounded-xl px-4 py-2.5 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {filterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors duration-200 font-medium py-2.5 px-4 sm:px-2 bg-gray-50 sm:bg-transparent rounded-xl sm:rounded-none"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-600 font-medium">
              Active filters:
            </span>

            {sortBy !== "dateAdded" && (
              <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                <span>
                  Sort: {sortOptions.find((opt) => opt.value === sortBy)?.label}
                </span>
                <button
                  onClick={() => setSortBy("dateAdded")}
                  className="ml-1 hover:text-blue-900"
                >
                  ×
                </button>
              </div>
            )}

            {filterBy !== "all" && (
              <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                <span>
                  Filter:{" "}
                  {filterOptions.find((opt) => opt.value === filterBy)?.label}
                </span>
                <button
                  onClick={() => setFilterBy("all")}
                  className="ml-1 hover:text-green-900"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistFilters;
