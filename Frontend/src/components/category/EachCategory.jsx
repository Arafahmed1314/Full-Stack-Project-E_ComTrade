/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "../product/ProductCard";
import { getCategoryId } from "../../utils/scrollUtils";

const EachCategory = ({ categoryName, products }) => {
  const [visibleProducts, setVisibleProducts] = useState(8); // Show 8 products initially (2 rows of 4)

  // Filter products by category if needed (already filtered in parent component)
  const categoryProducts = useMemo(() => {
    return products || [];
  }, [products]);

  // Get products to display
  const displayedProducts = categoryProducts.slice(0, visibleProducts);
  const hasMoreProducts = visibleProducts < categoryProducts.length;

  const handleLoadMore = () => {
    setVisibleProducts((prev) => Math.min(prev + 8, categoryProducts.length));
  };

  if (!categoryProducts.length) {
    return null;
  }

  return (
    <div className="mb-16" id={getCategoryId(categoryName)}>
      {/* Category Title */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 capitalize">
          {categoryName}
        </h3>
        <div className="text-sm text-gray-500">
          {categoryProducts.length} product
          {categoryProducts.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        <AnimatePresence>
          {displayedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                ease: "easeOut",
              }}
              className="cursor-pointer"
            >
              <ProductCard product={product} viewMode="grid" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Load More Button */}
      {hasMoreProducts && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <button
            onClick={handleLoadMore}
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300/50"
          >
            <span>Load More Products</span>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="ml-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full opacity-0 group-hover:opacity-100"
            />
          </button>
          <p className="mt-3 text-sm text-gray-500">
            Showing {displayedProducts.length} of {categoryProducts.length}{" "}
            products
          </p>
        </motion.div>
      )}

      {/* Show All Loaded Message */}
      {!hasMoreProducts && visibleProducts > 8 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 text-sm"
        >
          All {categoryProducts.length} products displayed
        </motion.div>
      )}
    </div>
  );
};

export default EachCategory;
