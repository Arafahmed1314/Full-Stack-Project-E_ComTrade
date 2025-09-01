import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import {
  PersonalInformationForm,
  ShippingAddressForm,
  PaymentInformationForm,
  OrderSummary,
} from "./forms";

const OrderForm = ({ isOpen, onClose, cartTotal }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Order Data:", data);
      setIsSubmitting(false);
      setIsSuccess(true);

      // Auto close after success
      setTimeout(() => {
        setIsSuccess(false);
        reset();
        onClose();
      }, 3000);
    }, 2000);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      reset();
      setIsSuccess(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        />

        {/* Modal */}
        <div className="relative z-[9999] flex items-center justify-center min-h-screen p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-lg lg:max-w-2xl xl:max-w-3xl bg-white rounded-xl shadow-lg overflow-hidden max-h-[95vh] overflow-y-auto relative z-[9999]"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 p-4 z-[10000] flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800">Order Details</h2>
              <button
                onClick={handleClose}
                disabled={isSubmitting}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Success State */}
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 bg-white z-[10001] flex items-center justify-center"
                >
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                    >
                      <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      Order Placed Successfully!
                    </h3>
                    <p className="text-gray-600">
                      Thank you for your purchase. You'll receive a confirmation
                      email shortly.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form Content */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
              {/* Form Fields */}
              <PersonalInformationForm register={register} errors={errors} />
              <ShippingAddressForm register={register} errors={errors} />
              <PaymentInformationForm register={register} errors={errors} />

              {/* Order Summary */}
              <div className="my-2">
                <OrderSummary cartTotal={cartTotal} />
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-gray-800 text-sm transition-colors disabled:opacity-50"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all text-sm"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Place Order
                      <span className="bg-white/20 px-2 py-1 rounded text-xs ml-2">
                        ${cartTotal.toFixed(2)}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );

  // Use React Portal to render modal at body level
  return ReactDOM.createPortal(modalContent, document.body);
};

export default OrderForm;
