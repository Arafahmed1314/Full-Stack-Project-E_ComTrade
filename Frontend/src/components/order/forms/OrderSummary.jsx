import React from "react";
import { Package, Truck, DollarSign } from "lucide-react";

const OrderSummary = ({ cartTotal }) => {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
          <Package className="w-5 h-5 text-orange-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Order Summary</h3>
          <p className="text-sm text-gray-600">Review your order details</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-medium">${(cartTotal * 0.85).toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <span className="text-gray-600">Shipping:</span>
          <div className="text-right">
            <span className="font-medium text-green-600">FREE</span>
            <p className="text-xs text-gray-500">Standard delivery</p>
          </div>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <span className="text-gray-600">Tax:</span>
          <span className="font-medium">${(cartTotal * 0.08).toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center py-3 border-t-2 border-gray-300">
          <span className="text-lg font-semibold text-gray-800">Total:</span>
          <span className="text-2xl font-bold text-blue-600">
            ${cartTotal.toFixed(2)}
          </span>
        </div>

        <div className="space-y-3 pt-4">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Truck className="w-4 h-4 text-green-500" />
            <span>Free standard shipping (5-7 business days)</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <DollarSign className="w-4 h-4 text-blue-500" />
            <span>30-day money-back guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
