import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Truck, Heart, Shield, Package } from "lucide-react";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import EmptyCart from "./EmptyCart";
import CartHeader from "./CartHeader";
import RecommendedItems from "./RecommendedItems";

const CartSection = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      brand: "SoundMaster Pro",
      price: 299.99,
      originalPrice: 399.99,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      color: "Midnight Black",
      size: "Universal",
      inStock: true,
      rating: 4.8,
      reviews: 1547,
      warranty: "2 Years",
      freeShipping: true,
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      brand: "TechFit Elite",
      price: 199.99,
      originalPrice: 249.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      color: "Space Gray",
      size: "42mm",
      inStock: true,
      rating: 4.6,
      reviews: 892,
      warranty: "1 Year",
      freeShipping: true,
    },
    {
      id: 3,
      name: "Luxury Leather Backpack",
      brand: "Heritage Craft",
      price: 149.99,
      originalPrice: 199.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
      color: "Cognac Brown",
      size: "Large",
      inStock: false,
      rating: 4.9,
      reviews: 2341,
      warranty: "Lifetime",
      freeShipping: false,
    },
  ]);

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter((item) => item.id !== id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = appliedCoupon ? subtotal * 0.1 : 0;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;

  if (cartItems.length === 0) {
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
        <CartHeader itemCount={cartItems.length} />

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
              {subtotal > 100 && (
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
                  {cartItems.map((item) => (
                    <div key={item.id}>
                      <CartItem
                        item={item}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeItem}
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
                  subtotal={subtotal}
                  discount={discount}
                  shipping={shipping}
                  tax={tax}
                  total={total}
                  appliedCoupon={appliedCoupon}
                  setAppliedCoupon={setAppliedCoupon}
                  isCheckingOut={isCheckingOut}
                  setIsCheckingOut={setIsCheckingOut}
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
