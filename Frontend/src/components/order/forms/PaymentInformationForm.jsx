import React from "react";
import { CreditCard, Lock, Calendar, Shield } from "lucide-react";

const PaymentInformationForm = ({ register, errors }) => {
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
              errors.cardName ? "border-red-300 bg-red-50" : "border-gray-300"
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
                  errors.cvv ? "border-red-300 bg-red-50" : "border-gray-300"
                }`}
                placeholder="123"
                maxLength="4"
              />
            </div>
            {errors.cvv && (
              <p className="text-red-500 text-sm mt-1">{errors.cvv.message}</p>
            )}
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">
              Your payment information is secured with 256-bit SSL encryption
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentInformationForm;
