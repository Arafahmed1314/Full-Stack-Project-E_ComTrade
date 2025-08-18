import React, { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Truck, Heart, Shield, Package } from "lucide-react";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import EmptyCart from "./EmptyCart";
import CartHeader from "./CartHeader";
import RecommendedItems from "./RecommendedItems";
import { useSelector, useDispatch } from "react-redux";
import useCart from "../../hooks/useCart";

const CartSection = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const { fetchCart, updateQuantity, removeFromCart } = useCart(dispatch);

  // Fetch cart on component mount
  useEffect(() => {
    if (user.user) {
      fetchCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.user]); // Removed fetchCart from dependencies to prevent infinite loop

  // Handle quantity update
  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      return removeFromCart(itemId);
    }
    return updateQuantity(itemId, newQuantity);
  };

  // Handle item removal
  const handleRemoveItem = (itemId) => {
    return removeFromCart(itemId);
  };

  // Calculate totals (fallback if backend doesn't provide)
  const subtotal = cart.items.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  );

  // Loading state
  if (cart.loading && cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (cart.error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-red-600 mb-4">{cart.error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty cart check
  if (cart.items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Simplified Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-60">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/10 to-orange-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <CartHeader itemCount={cart.totalItems || cart.items.length} />

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Progress Indicator */}
              <div className="bg-white/80 rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <Package className="w-5 h-5 text-blue-600" />
                    Shopping Progress
                  </h3>
                  <span className="text-sm text-gray-600">Step 1 of 3</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-1/3 transition-all duration-300" />
                  </div>
                  <span className="text-xs font-medium text-gray-600">33%</span>
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span className="text-blue-600 font-medium">Cart</span>
                  <span>Checkout</span>
                  <span>Payment</span>
                </div>
              </div>

              {/* Free Shipping Banner */}
              {(cart.totalPrice || subtotal) > 100 && (
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-4 text-white shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold">🎉 Congratulations!</h4>
                      <p className="text-sm opacity-90">
                        You've qualified for FREE shipping!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Cart Items */}
              <div className="space-y-4">
                <AnimatePresence>
                  {cart.items.map((item) => (
                    <div key={item._id || item.id}>
                      <CartItem
                        item={{
                          id: item._id || item.id,
                          name: item.product?.title || item.name,
                          brand: item.product?.brand || "Brand",
                          price: item.price || item.product?.price || 0,
                          quantity: item.quantity,
                          image: item.product?.images?.[0] || item.image,
                          inStock: true,
                          category: item.product?.category || "Category",
                        }}
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemove={handleRemoveItem}
                      />
                    </div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Trust Badges */}
              <div className="bg-white/70 rounded-2xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  Why Shop With Us?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-white/60 rounded-xl">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-800">
                        Secure Payment
                      </h4>
                      <p className="text-xs text-gray-600">
                        256-bit SSL encryption
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/60 rounded-xl">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Truck className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-800">
                        Fast Delivery
                      </h4>
                      <p className="text-xs text-gray-600">2-3 business days</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/60 rounded-xl">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Heart className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-800">
                        Easy Returns
                      </h4>
                      <p className="text-xs text-gray-600">30-day guarantee</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cart Summary Section */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                <CartSummary
                  subtotal={cart.totalPrice || subtotal}
                  total={cart.totalPrice || subtotal}
                  itemCount={cart.totalItems || cart.items.length}
                />

                <RecommendedItems />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSection;
