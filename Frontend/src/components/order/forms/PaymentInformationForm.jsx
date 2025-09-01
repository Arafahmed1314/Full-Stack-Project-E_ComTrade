import React, { useState } from "react";
import { CreditCard, Lock, Calendar, Shield } from "lucide-react";

const PaymentInformationForm = ({ register, errors }) => {
  const [paymentType, setPaymentType] = useState("cash");
  const [onlineMethod, setOnlineMethod] = useState("bkash");
  const [phone, setPhone] = useState("");
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [verifying, setVerifying] = useState(false);

  // Handler for phone verification
  const handleVerifyPhone = (e) => {
    e.preventDefault();
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setShowOtp(true);
    }, 500);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
          <CreditCard className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Payment Information
          </h3>
          <p className="text-sm text-gray-600">Secure payment details</p>
        </div>
      </div>

      {/* Payment Type Selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Payment Method *
        </label>
        <div className="flex gap-4">
          <button
            type="button"
            className={`px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${
              paymentType === "cash"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white border-gray-300 text-gray-700 hover:bg-blue-50"
            }`}
            onClick={() => setPaymentType("cash")}
          >
            Cash
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${
              paymentType === "online"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white border-gray-300 text-gray-700 hover:bg-blue-50"
            }`}
            onClick={() => setPaymentType("online")}
          >
            Online
          </button>
        </div>
      </div>

      {/* Online Method Selector */}
      {paymentType === "online" && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Online Method *
          </label>
          <div className="flex gap-2 flex-wrap">
            {["bkash", "rocket", "nagad", "visa"].map((method) => (
              <button
                key={method}
                type="button"
                className={`px-4 py-2 rounded-lg border text-sm font-semibold capitalize transition-all ${
                  onlineMethod === method
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-purple-50"
                }`}
                onClick={() => setOnlineMethod(method)}
              >
                {method === "visa"
                  ? "Visa Card"
                  : method.charAt(0).toUpperCase() + method.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Visa Card Fields */}
      {paymentType === "online" && onlineMethod === "visa" && (
        <>
          {/* Card Number, Name, Expiry, CVV fields (as before) */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Number *
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                <input
                  type="text"
                  {...register("cardNumber", {
                    required: "Card number is required",
                    pattern: {
                      value: /^\d{16}$/,
                      message: "Please enter a valid 16-digit card number",
                    },
                  })}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.cardNumber
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="1234 5678 9012 3456"
                  maxLength="16"
                />
              </div>
              {errors.cardNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.cardNumber.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cardholder Name *
              </label>
              <input
                type="text"
                {...register("cardName", {
                  required: "Cardholder name is required",
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.cardName
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder="Name on card"
              />
              {errors.cardName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.cardName.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    {...register("expiryDate", {
                      required: "Expiry date is required",
                      pattern: {
                        value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                        message: "Please enter valid date (MM/YY)",
                      },
                    })}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.expiryDate
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="MM/YY"
                    maxLength="5"
                  />
                </div>
                {errors.expiryDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.expiryDate.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVV *
                </label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    {...register("cvv", {
                      required: "CVV is required",
                      pattern: {
                        value: /^\d{3,4}$/,
                        message: "Please enter a valid CVV",
                      },
                    })}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.cvv
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="123"
                    maxLength="4"
                  />
                </div>
                {errors.cvv && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.cvv.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* bKash, Rocket, Nagad: Phone and OTP */}
      {paymentType === "online" &&
        ["bkash", "rocket", "nagad"].includes(onlineMethod) && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number *
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="e.g. 01XXXXXXXXX"
                maxLength="11"
              />
              {!phoneVerified && !showOtp && (
                <button
                  type="button"
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  onClick={handleVerifyPhone}
                  disabled={verifying || phone.length !== 11}
                >
                  {verifying ? "Verifying..." : "Verify"}
                </button>
              )}
            </div>
            {showOtp && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter OTP *
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter OTP"
                  maxLength="6"
                />
              </div>
            )}
          </>
        )}

      {/* Security Note */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mt-4">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-medium text-blue-800">
            Your payment information is secured with 256-bit SSL encryption
          </span>
        </div>
      </div>
    </div>
  );
};

export default PaymentInformationForm;
