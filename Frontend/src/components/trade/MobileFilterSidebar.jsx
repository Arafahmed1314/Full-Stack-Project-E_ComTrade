import React from "react";
import { Filter } from "lucide-react";
import TradeFilters from "./TradeFilters";

const MobileFilterSidebar = ({
  isMobile,
  showMobileFilters,
  setShowMobileFilters,
  categories,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  setSearchQuery,
}) => {
  if (!isMobile) return null;

  return (
    <>
      {/* Subtle backdrop for closing */}
      {showMobileFilters && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowMobileFilters(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full bg-white z-50 shadow-2xl w-80 max-w-full transform transition-transform duration-300 ${
          showMobileFilters ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            </div>
            <button
              onClick={() => setShowMobileFilters(false)}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
            >
              ✕
            </button>
          </div>

          {/* Filter Content */}
          <div className="space-y-6">
            <TradeFilters
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />

            {/* Apply Button */}
            <button
              onClick={() => setShowMobileFilters(false)}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Apply Filters
            </button>

            {/* Clear All Filters */}
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSortBy("newest");
                setSearchQuery("");
                setShowMobileFilters(false);
              }}
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileFilterSidebar;
