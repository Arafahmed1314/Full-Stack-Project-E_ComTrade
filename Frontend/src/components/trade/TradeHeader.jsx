import React from "react";
import { Plus, Filter, Search, MessageCircle } from "lucide-react";

const TradeHeader = ({
  showMessages,
  setShowMessages,
  searchQuery,
  setSearchQuery,
  showMobileFilters,
  setShowMobileFilters,
  setShowCreatePost,
  selectedCategory,
  sortBy,
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Mobile Message Toggle */}
          <button
            onClick={() => setShowMessages(!showMessages)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <MessageCircle className="w-5 h-5 text-gray-600" />
          </button>

          <h1 className="text-xl font-bold text-gray-900">Trade Feed</h1>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Search & Filter */}
          <div className="flex items-center gap-1 lg:hidden">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-sm rounded-lg border border-gray-200 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 w-32"
              />
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className={`p-1.5 rounded-lg transition-colors relative ${
                showMobileFilters
                  ? "bg-indigo-100 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Filter className="w-4 h-4" />
              {/* Active Filter Indicator */}
              {(selectedCategory !== "All" || sortBy !== "newest") && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
              )}
            </button>
          </div>

          {/* Create Post Button */}
          <button
            onClick={() => setShowCreatePost(true)}
            className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center gap-1 text-sm"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Create</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TradeHeader;
