/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import ProductFilter from "./ProductFilter";
import {
  Filter,
  Search,
  Grid3X3,
  List,
  ChevronDown,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ProductSection = ({ products, productPagination }) => {
  // const [products] = useState(productsData.products || []);
  const [filteredProducts, setFilteredProducts] = useState(products || []);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // Use client-side pagination for filtered/sorted products
  const productsPerPage = 12;
  const totalPages = Math.ceil(
    (filteredProducts?.length || 0) / productsPerPage
  );

  // Calculate which products to show for current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = Array.isArray(filteredProducts)
    ? filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
    : [];

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  // console.log(filteredProducts);

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Customer Rating" },
    { value: "newest", label: "Newest First" },
    { value: "bestseller", label: "Best Sellers" },
  ];

  useEffect(() => {
    let filtered = Array.isArray(products) ? [...products] : [];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product?.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered = filtered.sort((a, b) => (a?.price || 0) - (b?.price || 0));
        break;
      case "price-high":
        filtered = filtered.sort((a, b) => (b?.price || 0) - (a?.price || 0));
        break;
      case "rating":
        filtered = filtered.sort((a, b) => (b?.rating || 0) - (a?.rating || 0));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, sortBy, products]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top when page changes for better user experience
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
              <p className="text-gray-600 mt-1">
                Showing {filteredProducts?.length || 0} of{" "}
                {products?.length || 0} products
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative flex-1 max-w-md lg:max-w-lg">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6 relative">
          {/* Filter Sidebar - Different behavior for mobile vs desktop */}
          <AnimatePresence>
            {isFilterOpen && (
              <>
                {/* Mobile Overlay - Transparent background */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                  onClick={() => setIsFilterOpen(false)}
                />

                {/* Filter Sidebar */}
                <motion.div
                  initial={{
                    width: 0,
                    opacity: 0,
                    x: isMobile ? -320 : 0,
                  }}
                  animate={{
                    width: 320,
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    width: 0,
                    opacity: 0,
                    x: isMobile ? -320 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex-shrink-0 overflow-hidden fixed lg:static top-0 left-0 h-full lg:h-auto z-50 lg:z-auto"
                >
                  <div className="w-80 h-full lg:h-auto bg-white/95 backdrop-blur-md lg:bg-white rounded-none lg:rounded-lg shadow-2xl lg:shadow-sm border-r lg:border p-6 overflow-y-auto">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold flex items-center">
                        <SlidersHorizontal className="w-5 h-5 mr-2" />
                        Filters
                      </h2>
                      <button
                        onClick={() => setIsFilterOpen(false)}
                        className="p-1 hover:bg-gray-100 rounded-full"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <ProductFilter
                      isOpen={true}
                      onClose={() => setIsFilterOpen(false)}
                    />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Main Content - Flex-grow to take remaining space */}
          <div className="flex-1 min-w-0">
            {/* Filter Toggle Button */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white border border-gray-300 rounded-lg py-3 px-4 text-gray-700 hover:bg-gray-50 mb-6 transition-all duration-300"
            >
              <Filter className="w-5 h-5" />
              <span>{isFilterOpen ? "Hide Filters" : "Show Filters"}</span>
              <motion.div
                animate={{ rotate: isFilterOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                {/* Sort Dropdown */}
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700">
                    Sort by:
                  </label>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-3 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* View Toggle */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">
                    View:
                  </span>
                  <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 ${
                        viewMode === "grid"
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 ${
                        viewMode === "list"
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {currentProducts.length > 0 ? (
              <>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${viewMode}-${isFilterOpen}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className={`
                      ${
                        viewMode === "grid"
                          ? `grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${
                              !isMobile && isFilterOpen ? "" : "xl:grid-cols-4"
                            }`
                          : "space-y-4"
                      }
                    `}
                  >
                    {currentProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.05,
                          ease: "easeOut",
                        }}
                      >
                        <ProductCard product={product} viewMode={viewMode} />
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* Pagination */}
                {totalPages > 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="mt-12 flex flex-col items-center space-y-4"
                  >
                    <div className="text-sm text-gray-600">
                      Showing {indexOfFirstProduct + 1} to{" "}
                      {Math.min(
                        indexOfLastProduct,
                        filteredProducts?.length || 0
                      )}{" "}
                      of {filteredProducts?.length || 0} products
                    </div>
                    <nav className="flex items-center space-x-1">
                      <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage <= 1}
                        className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Previous
                      </button>

                      {/* Dynamic pagination numbers */}
                      {(() => {
                        const delta = 2;
                        const range = [];
                        const rangeWithDots = [];

                        for (
                          let i = Math.max(2, currentPage - delta);
                          i <= Math.min(totalPages - 1, currentPage + delta);
                          i++
                        ) {
                          range.push(i);
                        }

                        if (currentPage - delta > 2) {
                          rangeWithDots.push(1, "...");
                        } else {
                          rangeWithDots.push(1);
                        }

                        rangeWithDots.push(...range);

                        if (currentPage + delta < totalPages - 1) {
                          rangeWithDots.push("...", totalPages);
                        } else if (totalPages > 1) {
                          rangeWithDots.push(totalPages);
                        }

                        return rangeWithDots.map((number, index) => (
                          <button
                            key={index}
                            onClick={() => number !== "..." && paginate(number)}
                            disabled={number === "..."}
                            className={`px-3 py-2 text-sm font-medium border-t border-b border-gray-300 transition-colors ${
                              currentPage === number
                                ? "bg-blue-600 text-white border-blue-600"
                                : number === "..."
                                ? "bg-white text-gray-400 cursor-not-allowed"
                                : "text-gray-700 bg-white hover:bg-gray-50"
                            }`}
                          >
                            {number}
                          </button>
                        ));
                      })()}

                      <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage >= totalPages}
                        className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Next
                      </button>
                    </nav>
                  </motion.div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
