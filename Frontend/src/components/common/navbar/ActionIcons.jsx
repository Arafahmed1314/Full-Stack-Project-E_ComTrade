import React from "react";
import { Heart, ShoppingCart, User } from "lucide-react";

const ActionIcons = ({
  wishlistCount,
  cartCount,
  isUserDropdownOpen,
  setIsUserDropdownOpen,
  isSearchExpanded,
}) => {
  return (
    <div
      className={`flex items-center space-x-2 ${
        isSearchExpanded ? "hidden lg:flex" : "flex"
      }`}
    >
      {/* Wishlist */}
      <button className="relative p-3 bg-white/70 backdrop-blur-sm rounded-full hover:bg-white/90 transition-all duration-200 hover:scale-110 group shadow-lg">
        <Heart className="w-5 h-5 text-gray-600 group-hover:text-red-500 transition-colors duration-200" />
        {wishlistCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg">
            {wishlistCount}
          </span>
        )}
      </button>

      {/* Cart */}
      <button className="relative p-3 bg-white/70 backdrop-blur-sm rounded-full hover:bg-white/90 transition-all duration-200 hover:scale-110 group shadow-lg">
        <ShoppingCart className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg">
            {cartCount}
          </span>
        )}
      </button>

      {/* User Dropdown Button */}
      <button
        onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
        className="relative p-3 bg-white/70 backdrop-blur-sm rounded-full hover:bg-white/90 transition-all duration-200 hover:scale-110 group shadow-lg"
      >
        <User className="w-5 h-5 text-gray-600 group-hover:text-green-600 transition-colors duration-200" />
      </button>
    </div>
  );
};

export default ActionIcons;
