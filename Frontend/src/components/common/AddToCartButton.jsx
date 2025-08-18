import React, { useState } from "react";
import { ShoppingCart, Check, Loader } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import useCart from "../../hooks/useCart";

const AddToCartButton = ({
  productId,
  quantity = 1,
  className = "",
  variant = "primary",
  size = "md",
  children,
  disabled = false,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { addToCart } = useCart(dispatch);

  const handleAddToCart = async () => {
    if (!user.user) {
      // Toast notification will be shown by useCart hook
      return;
    }

    if (disabled || isAdding) return;

    setIsAdding(true);

    try {
      console.log("Adding to cart:", {
        productId,
        quantity,
        userExists: !!user.user,
      });
      const success = await addToCart(productId, quantity);
      console.log("Add to cart result:", success);

      if (success) {
        // Show success state
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsAdding(false);
    }
  };

  // Size variants
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg",
  };

  // Style variants
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    outline:
      "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent",
    ghost: "text-blue-600 hover:bg-blue-50 bg-transparent",
  };

  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";

  const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  // Success state
  if (showSuccess) {
    return (
      <button
        className={`${buttonClasses} bg-green-600 hover:bg-green-600`}
        disabled
      >
        <Check className="w-4 h-4" />
        <span>Added!</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={disabled || isAdding}
      className={buttonClasses}
    >
      {isAdding ? (
        <>
          <Loader className="w-4 h-4 animate-spin" />
          <span>Adding...</span>
        </>
      ) : (
        <>
          <ShoppingCart className="w-4 h-4" />
          <span>{children || "Add to Cart"}</span>
        </>
      )}
    </button>
  );
};

export default AddToCartButton;
