import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  Heart,
  Share2,
  ShoppingCart,
  Star,
  Filter,
  SortAsc,
} from "lucide-react";
import WishlistItem from "./WishlistItem";
import WishlistHeader from "./WishlistHeader";
import EmptyWishlist from "./EmptyWishlist";
import WishlistFilters from "./WishlistFilters";
import SimilarProducts from "./SimilarProducts";

const WishlistSection = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      brand: "SoundMaster Pro",
      price: 299.99,
      originalPrice: 399.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      rating: 4.8,
      reviews: 1547,
      availability: "In Stock",
      category: "Electronics",
      dateAdded: "2024-01-15",
      priceDropPercent: 15,
      isOnSale: true,
      freeShipping: true,
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      brand: "TechFit Elite",
      price: 199.99,
      originalPrice: 249.99,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 892,
      availability: "In Stock",
      category: "Electronics",
      dateAdded: "2024-01-10",
      priceDropPercent: 20,
      isOnSale: true,
      freeShipping: true,
    },
    {
      id: 3,
      name: "Designer Leather Backpack",
      brand: "StyleCraft Elite",
      price: 159.99,
      originalPrice: 199.99,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
      rating: 4.5,
      reviews: 654,
      availability: "Low Stock",
      category: "Fashion",
      dateAdded: "2024-01-08",
      priceDropPercent: 0,
      isOnSale: false,
      freeShipping: false,
    },
    {
      id: 4,
      name: "Ergonomic Office Chair",
      brand: "ComfortZone Pro",
      price: 299.99,
      originalPrice: 399.99,
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
      rating: 4.7,
      reviews: 421,
      availability: "Out of Stock",
      category: "Furniture",
      dateAdded: "2024-01-05",
      priceDropPercent: 0,
      isOnSale: false,
      freeShipping: true,
    },
  ]);

  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("dateAdded");
  const [filterBy, setFilterBy] = useState("all");

  const removeFromWishlist = (itemId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const moveToCart = (itemId) => {
    // Move to cart logic
    console.log("Moving to cart:", itemId);
    // Optionally remove from wishlist after adding to cart
    removeFromWishlist(itemId);
  };

  const shareWishlist = () => {
    // Share functionality
    console.log("Sharing wishlist...");
  };

  // Filter and sort logic
  const filteredAndSortedItems = wishlistItems
    .filter((item) => {
      if (filterBy === "all") return true;
      if (filterBy === "inStock") return item.availability === "In Stock";
      if (filterBy === "onSale") return item.isOnSale;
      if (filterBy === "category") return item.category === "Electronics";
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "dateAdded")
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "priceHigh") return b.price - a.price;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  if (wishlistItems.length === 0) {
    return <EmptyWishlist />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-100">
      {/* Simplified Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-400/10 to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-rose-400/10 to-red-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <WishlistHeader
          itemCount={wishlistItems.length}
          onShare={shareWishlist}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          {/* Filters Section - Always visible on large devices, at top level */}
          <div className="hidden xl:block mb-8">
            <WishlistFilters
              sortBy={sortBy}
              setSortBy={setSortBy}
              filterBy={filterBy}
              setFilterBy={setFilterBy}
              itemCount={filteredAndSortedItems.length}
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
            {/* Sidebar - Only SimilarProducts on large devices */}
            <div className="hidden xl:block xl:col-span-1">
              <div className="sticky top-8 space-y-6">
                <SimilarProducts wishlistItems={wishlistItems} />
              </div>
            </div>

            {/* Wishlist Items Section */}
            <div className="xl:col-span-3 space-y-6">
              {/* Mobile Filters */}
              <div className="xl:hidden">
                <WishlistFilters
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  filterBy={filterBy}
                  setFilterBy={setFilterBy}
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                  onClearFilters={() => {
                    setSortBy("dateAdded");
                    setFilterBy("all");
                  }}
                  totalItems={wishlistItems.length}
                  filteredItems={filteredAndSortedItems.length}
                />
              </div>

              {/* Stats and Actions */}
              <div className="bg-white/90 rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500 fill-current" />
                      My Wishlist
                    </h2>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">
                      {wishlistItems.length}{" "}
                      {wishlistItems.length === 1 ? "item" : "items"} saved
                    </p>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      onClick={shareWishlist}
                      className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-colors duration-200 text-sm"
                    >
                      <Share2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Share</span>
                    </button>

                    <button
                      onClick={() =>
                        setViewMode(viewMode === "grid" ? "list" : "grid")
                      }
                      className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-200 text-sm xl:hidden"
                    >
                      <Filter className="w-4 h-4" />
                      <span className="hidden sm:inline">
                        {viewMode === "grid" ? "List" : "Grid"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-6">
                  <div className="bg-green-50 rounded-xl p-3 sm:p-4 text-center">
                    <div className="text-lg sm:text-2xl font-bold text-green-700">
                      {
                        wishlistItems.filter(
                          (item) => item.availability === "In Stock"
                        ).length
                      }
                    </div>
                    <div className="text-xs sm:text-sm text-green-600">
                      In Stock
                    </div>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-3 sm:p-4 text-center">
                    <div className="text-lg sm:text-2xl font-bold text-orange-700">
                      {wishlistItems.filter((item) => item.isOnSale).length}
                    </div>
                    <div className="text-xs sm:text-sm text-orange-600">
                      On Sale
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-3 sm:p-4 text-center">
                    <div className="text-lg sm:text-2xl font-bold text-blue-700">
                      $
                      {wishlistItems
                        .reduce((sum, item) => sum + item.price, 0)
                        .toFixed(0)}
                    </div>
                    <div className="text-xs sm:text-sm text-blue-600">
                      Total Value
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-3 sm:p-4 text-center">
                    <div className="text-lg sm:text-2xl font-bold text-purple-700">
                      $
                      {wishlistItems
                        .reduce(
                          (sum, item) =>
                            sum + (item.originalPrice - item.price),
                          0
                        )
                        .toFixed(0)}
                    </div>
                    <div className="text-xs sm:text-sm text-purple-600">
                      Total Savings
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Drop Alerts */}
              {wishlistItems.some((item) => item.priceDropPercent > 0) && (
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-4 text-white shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Star className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold">🎉 Price Drops Alert!</h4>
                      <p className="text-sm opacity-90">
                        {
                          wishlistItems.filter(
                            (item) => item.priceDropPercent > 0
                          ).length
                        }{" "}
                        items in your wishlist have price drops!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Wishlist Items */}
              <div
                className={`${
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6"
                    : "space-y-4"
                }`}
              >
                <AnimatePresence>
                  {filteredAndSortedItems.map((item) => (
                    <div key={item.id}>
                      <WishlistItem
                        item={item}
                        onRemove={removeFromWishlist}
                        onMoveToCart={moveToCart}
                        viewMode={viewMode}
                      />
                    </div>
                  ))}
                </AnimatePresence>
              </div>

              {filteredAndSortedItems.length === 0 && (
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    No items match your filters
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your filters to see more items.
                  </p>
                </div>
              )}

              {/* Mobile Similar Products */}
              <div className="xl:hidden">
                <SimilarProducts wishlistItems={wishlistItems} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistSection;
