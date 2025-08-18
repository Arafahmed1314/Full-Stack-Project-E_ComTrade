import React, { useEffect } from "react";
import { Heart, ShoppingCart, User } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useCart from "../../../hooks/useCart";
import useWishlist from "../../../hooks/useWishlist";

const ActionIcons = ({
  isUserDropdownOpen,
  setIsUserDropdownOpen,
  isSearchExpanded,
}) => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fetchCart } = useCart(dispatch);
  const { fetchWishlist } = useWishlist(dispatch);

  // Fetch cart and wishlist on component mount
  useEffect(() => {
    if (user.user) {
      fetchCart();
      fetchWishlist();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.user]); // Removed fetchCart and fetchWishlist from dependencies to prevent infinite loop

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleWishlistClick = () => {
    navigate("/wishlist");
  };
  return (
    <div
      className={`flex items-center space-x-2 ${
        isSearchExpanded ? "hidden lg:flex" : "flex"
      }`}
    >
      {/* Wishlist */}
      <button
        onClick={handleWishlistClick}
        className="relative p-3 bg-white/70 backdrop-blur-sm rounded-full hover:bg-white/90 transition-all duration-200 hover:scale-110 group shadow-lg"
      >
        <Heart className="w-5 h-5 text-gray-600 group-hover:text-red-500 transition-colors duration-200" />
        {wishlist.totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg">
            {wishlist.totalItems}
          </span>
        )}
      </button>

      {/* Cart */}
      <button
        onClick={handleCartClick}
        className="relative p-3 bg-white/70 backdrop-blur-sm rounded-full hover:bg-white/90 transition-all duration-200 hover:scale-110 group shadow-lg"
      >
        <ShoppingCart className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
        {cart.totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg">
            {cart.totalItems}
          </span>
        )}
      </button>

      {/* User Dropdown Button */}
      <button
        onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
        className="relative p-3 bg-white/70 backdrop-blur-sm rounded-full hover:bg-white/90 transition-all duration-200 hover:scale-110 group shadow-lg flex justify-center items-center"
      >
        {user.user ? (
          <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 font-semibold group-hover:bg-green-100 group-hover:text-green-600 transition-all duration-200">
            {user.user.name.slice(0, 1).toUpperCase()}
          </span>
        ) : (
          <User className="w-5 h-5 text-gray-600 group-hover:text-green-600 transition-colors duration-200" />
        )}
      </button>
    </div>
  );
};

export default ActionIcons;
