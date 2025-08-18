import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWishlist from "../../hooks/useWishlist";
import { Heart, ShoppingCart } from "lucide-react";
import AddToCartButton from "../common/AddToCartButton";

const WishlistSection = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user);
  const wishlist = useSelector((state) => state?.wishlist);
  const { fetchWishlist, removeFromWishlist } = useWishlist(dispatch);

  // Fetch wishlist on component mount
  useEffect(() => {
    if (user.user) {
      fetchWishlist();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.user]);

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
  };

  // Loading state
  if (wishlist?.loading && wishlist?.items?.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  // Empty wishlist state
  if (!wishlist?.loading && wishlist?.items?.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-32 h-32 bg-gradient-to-br from-pink-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
            <Heart className="w-16 h-16 text-red-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Your wishlist is empty
          </h2>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Discover amazing products and save your favorites here. Start
            building your dream collection!
          </p>
          <button
            onClick={() => (window.location.href = "/products")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold hover:shadow-lg hover:scale-105 active:scale-95"
          >
            Explore Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">My Wishlist</h1>
          <p className="text-lg text-gray-600 mb-4">
            {wishlist.totalItems} {wishlist.totalItems === 1 ? "item" : "items"}{" "}
            saved for later
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Wishlist Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist?.items?.map((item) => (
            <div
              key={item._id}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img
                  src={item.product?.images?.[0] || "/placeholder-image.jpg"}
                  alt={item.product?.title || "Product"}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Discount Badge */}
                {item.product?.originalPrice &&
                  item.product.originalPrice > item.product.price && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2.5 py-1 rounded-full text-xs font-semibold shadow-md">
                      -
                      {Math.round(
                        ((item.product.originalPrice - item.product.price) /
                          item.product.originalPrice) *
                          100
                      )}
                      %
                    </div>
                  )}

                {/* Wishlist Heart (showing it's in wishlist) */}
                <div className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md">
                  <Heart className="w-4 h-4 text-red-500 fill-current" />
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5">
                {/* Category */}
                <span className="text-xs text-blue-600 font-medium uppercase tracking-wide bg-blue-50 px-2 py-1 rounded-full">
                  {item.product?.category}
                </span>

                {/* Product Name */}
                <h3 className="mt-3 text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {item.product?.title}
                </h3>

                {/* Rating (if available) */}
                {item.product?.rating && (
                  <div className="mt-2 flex items-center">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => {
                        const rating =
                          typeof item.product.rating === "object"
                            ? item.product.rating.rate
                            : item.product.rating;
                        return (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(rating)
                                ? "fill-current"
                                : "text-gray-300"
                            }`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        );
                      })}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      (
                      {typeof item.product.rating === "object"
                        ? item.product.rating.rate?.toFixed(1)
                        : typeof item.product.rating === "number"
                        ? item.product.rating.toFixed(1)
                        : item.product.rating}
                      )
                    </span>
                  </div>
                )}

                {/* Price */}
                <div className="mt-3 flex items-center space-x-2">
                  <span className="text-2xl font-bold text-gray-900">
                    ${item.product?.price}
                  </span>
                  {item.product?.originalPrice &&
                    item.product.originalPrice > item.product.price && (
                      <span className="text-sm text-gray-500 line-through">
                        ${item.product.originalPrice}
                      </span>
                    )}
                </div>

                {/* Actions */}
                <div className="mt-5 space-y-3">
                  {/* Add to Cart Button */}
                  <AddToCartButton
                    productId={item.product?._id}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 flex items-center justify-center"
                    size="md"
                  >
                    Add to Cart
                  </AddToCartButton>

                  {/* Secondary Actions */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        const productId =
                          item.product?.id || item.product?._id?.toString();
                        window.location.href = `/products/${productId}`;
                      }}
                      className="bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-2.5 px-3 rounded-lg transition-all duration-200 text-sm border border-gray-200 hover:border-gray-300"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() =>
                        handleRemoveFromWishlist(item.product?._id)
                      }
                      className="bg-red-50 hover:bg-red-100 text-red-600 font-medium py-2.5 px-3 rounded-lg transition-all duration-200 text-sm border border-red-200 hover:border-red-300"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Error State */}
        {wishlist.error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{wishlist.error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistSection;
