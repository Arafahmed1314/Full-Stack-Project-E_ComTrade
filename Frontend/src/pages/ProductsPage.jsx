import React, { useCallback } from "react";
import ProductSection from "../components/product/ProductSection";
import { useSelector } from "react-redux";
import { useProductFilter } from "../hooks/useProductFilter";

const ProductsPage = () => {
  const productsState = useSelector((state) => state.product || {});

  // Use the custom hook for filtering
  const {
    filters,
    isLoading,
    error,
    updateFilters,
    clearFilters,
    updateSort,
    updateSearch,
  } = useProductFilter();

  const products = productsState?.products?.products || [];
  const productData = products.map((product) => ({
    _id: product._id, // Keep the original _id for cart operations
    id: product.id,
    title: product.title || product.name,
    price: product.price,
    originalPrice: product.originalPrice || product.price * 1.2, // fallback if no original price
    category: product.category,
    images: product.images || [product.image], // handle both arrays and single image
    rating:
      typeof product.rating === "object" ? product.rating.rate : product.rating,
    reviews:
      typeof product.rating === "object"
        ? product.rating.count
        : product.reviews,
    brand: product.brand || "",
    badge: product.badge || "",
    badgeColor: product.badgeColor || "bg-red-500",
  }));

  // Handle filter changes from ProductFilter component
  const handleFilterChange = useCallback(
    (newFilters) => {
      updateFilters(newFilters);
    },
    [updateFilters]
  );

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ProductSection
        products={productData || []}
        productPagination={productsState?.products?.pagination}
        isLoading={isLoading}
        onFilterChange={handleFilterChange}
        onSortChange={updateSort}
        onSearchChange={updateSearch}
        onClearFilters={clearFilters}
        currentFilters={filters}
      />
    </div>
  );
};

export default ProductsPage;
