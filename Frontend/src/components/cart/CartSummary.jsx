import React, { useState } from "react";
import {
  CreditCard,
  Shield,
  Truck,
  Tag,
  ArrowRight,
  Lock,
  Check,
  X,
} from "lucide-react";
import { OrderForm } from "../order";

const CartSummary = ({ subtotal, total }) => {
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);

  // Calculate values
  const discount = appliedCoupon ? subtotal * (appliedCoupon.discount || 0) : 0;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = (subtotal - discount) * 0.08;
  const finalTotal = subtotal - discount + shipping + tax;

  const validCoupons = {
    SAVE10: { discount: 0.1, description: "10% off your order" },
    WELCOME20: { discount: 0.2, description: "20% off for new customers" },
    FREESHIP: { discount: 0, freeShipping: true, description: "Free shipping" },
  };

  const applyCoupon = () => {
    setIsApplyingCoupon(true);
    setCouponError("");

    setTimeout(() => {
      if (validCoupons[couponCode.toUpperCase()]) {
        setAppliedCoupon({
          code: couponCode.toUpperCase(),
          ...validCoupons[couponCode.toUpperCase()],
        });
        setCouponCode("");
      } else {
        setCouponError("Invalid coupon code");
      }
      setIsApplyingCoupon(false);
    }, 1000);
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false);
      // Show order form instead of navigating
      setShowOrderForm(true);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Order Summary */}
      <div className="bg-white/90 rounded-2xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-blue-600" />
          Order Summary
        </h3>

        <div className="space-y-4">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal</span>
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span className="font-semibold">-${discount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between text-gray-700">
            <span className="flex items-center gap-2">
              Shipping
              {shipping === 0 && (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                  FREE
                </span>
              )}
            </span>
            <span className="font-semibold">
              {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
            </span>
          </div>

          <div className="flex justify-between text-gray-700">
            <span>Tax</span>
            <span className="font-semibold">${tax.toFixed(2)}</span>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between text-lg font-bold text-gray-900">
              <span>Total</span>
              <span className="text-blue-600">
                ${(total || finalTotal).toFixed(2)}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Including all taxes and fees
            </p>
          </div>
        </div>
      </div>

      {/* Coupon Section */}
      <div className="bg-white/90 rounded-2xl p-6 shadow-lg border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Tag className="w-4 h-4 text-purple-600" />
          Coupon Code
        </h4>

        {appliedCoupon ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                <div>
                  <span className="font-semibold text-green-800">
                    {appliedCoupon.code}
                  </span>
                  <p className="text-sm text-green-600">
                    {appliedCoupon.description}
                  </p>
                </div>
              </div>
              <button
                onClick={removeCoupon}
                className="text-green-600 hover:text-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="flex-1 px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <button
                onClick={applyCoupon}
                disabled={!couponCode.trim() || isApplyingCoupon}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isApplyingCoupon ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Apply"
                )}
              </button>
            </div>

            {couponError && (
              <p className="text-red-500 text-sm">{couponError}</p>
            )}

            <div className="text-xs text-gray-600">
              <p>
                Try:{" "}
                <span className="font-mono bg-gray-100 px-1 rounded">
                  SAVE10
                </span>{" "}
                or{" "}
                <span className="font-mono bg-gray-100 px-1 rounded">
                  WELCOME20
                </span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Security Badge */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-4 border border-green-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <Lock className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-sm">
              Secure Checkout
            </h4>
            <p className="text-xs text-gray-600">
              Your payment info is protected with 256-bit SSL encryption
            </p>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={handleCheckout}
        disabled={isCheckingOut}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative z-10 flex items-center justify-center gap-3">
          {isCheckingOut ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Shield className="w-5 h-5" />
              <span>Secure Checkout</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </>
          )}
        </div>
      </button>

      {/* Payment Methods */}
      <div className="text-center space-y-3">
        <p className="text-sm text-gray-600">We accept</p>
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-8 bg-white rounded border border-gray-200 flex items-center justify-center text-xs font-bold text-blue-600">
            VISA
          </div>
          <div className="w-12 h-8 bg-white rounded border border-gray-200 flex items-center justify-center text-xs font-bold text-pink-600">
            bKash
          </div>
          <div className="w-12 h-8 bg-white rounded border border-gray-200 flex items-center justify-center text-xs font-bold text-purple-600">
            Rocket
          </div>
        </div>
      </div>

      {/* Free Shipping Progress */}
      {subtotal < 100 && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-200">
          <div className="flex items-center gap-2 mb-2">
            <Truck className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-semibold text-orange-800">
              Add ${(100 - subtotal).toFixed(2)} more for FREE shipping!
            </span>
          </div>
          <div className="w-full bg-orange-200 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full transition-all duration-500"
              style={{ width: `${(subtotal / 100) * 100}%` }}
            />
          </div>
          <p className="text-xs text-orange-600 mt-1">
            {((subtotal / 100) * 100).toFixed(0)}% complete
          </p>
        </div>
      )}

      {/* Order Form Modal */}
      <OrderForm
        isOpen={showOrderForm}
        onClose={() => setShowOrderForm(false)}
        cartTotal={finalTotal}
      />
    </div>
  );
};

export default CartSummary;
