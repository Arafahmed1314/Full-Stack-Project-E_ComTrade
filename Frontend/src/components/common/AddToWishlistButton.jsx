import React, { useState } from "react";
import { Heart, Check, Loader } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import useWishlist from "../../hooks/useWishlist";

const AddToWishlistButton = ({
  productId,
  className = "",
  variant = "icon",
  size = "md",
  children,
  disabled = false,
  isInWishlist = false,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { addToWishlist, removeFromWishlist } = useWishlist(dispatch);

  const handleWishlistToggle = async () => {
    if (!user.user) {
      // Toast notification will be shown by useWishlist hook
      return;
    }

    if (disabled || isAdding) return;

    setIsAdding(true);

    try {
      console.log("Toggling wishlist:", {
        productId,
        isInWishlist,
        userExists: !!user.user,
      });

      let success;
      if (isInWishlist) {
        // Remove from wishlist - need to find the item ID
        // For now, we'll use productId, but you might need to adjust this
        success = await removeFromWishlist(productId);
      } else {
        // Add to wishlist
        success = await addToWishlist(productId);
      }

      console.log("Wishlist toggle result:", success);

      if (success) {
        // Show success state
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
      }
    } catch (error) {
      console.error("Failed to toggle wishlist:", error);
    } finally {
      setIsAdding(false);
    }
  };

  // Size variants
  const sizeClasses = {
    sm: "p-1.5",
    md: "p-2",
    lg: "p-3",
  };

  // Variant styles
  const getVariantStyles = () => {
    if (variant === "icon") {
      return `${
        sizeClasses[size]
      } rounded-full hover:bg-gray-100 transition-all duration-200 ${
        isInWishlist || showSuccess
          ? "text-red-500 hover:text-red-600"
          : "text-gray-400 hover:text-red-500"
      }`;
    }

    // Button variant
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg";
    const disabledStyles = disabled
      ? "opacity-50 cursor-not-allowed"
      : "hover:shadow-md active:scale-95";

    return `${baseStyles} ${sizeClasses[size]} ${disabledStyles}`;
  };

  const buttonContent = () => {
    if (isAdding) {
      return (
        <>
          <Loader
            className={`${
              size === "sm" ? "w-3 h-3" : size === "lg" ? "w-6 h-6" : "w-4 h-4"
            } animate-spin`}
          />
          {children && <span className="ml-2">Adding...</span>}
        </>
      );
    }

    if (showSuccess) {
      return (
        <>
          <Check
            className={`${
              size === "sm" ? "w-3 h-3" : size === "lg" ? "w-6 h-6" : "w-4 h-4"
            } text-green-500`}
          />
          {children && <span className="ml-2">Added!</span>}
        </>
      );
    }

    return (
      <>
        <Heart
          className={`${
            size === "sm" ? "w-3 h-3" : size === "lg" ? "w-6 h-6" : "w-4 h-4"
          } ${isInWishlist ? "fill-current" : ""}`}
        />
        {children && <span className="ml-2">{children}</span>}
      </>
    );
  };

  return (
    <button
      onClick={handleWishlistToggle}
      disabled={disabled || isAdding}
      className={`${getVariantStyles()} ${className}`}
      title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      {buttonContent()}
    </button>
  );
};

export default AddToWishlistButton;
