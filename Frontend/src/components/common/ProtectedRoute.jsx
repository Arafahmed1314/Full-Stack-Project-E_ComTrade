import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { User, Lock, LogIn } from "lucide-react";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  const isLoading = useSelector((state) => state.user.isLoading);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Authentication Required
          </h2>

          <p className="text-gray-600 mb-6">
            You need to be logged in to access your profile. Please sign in to
            continue.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => (window.location.href = "/")}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            Go to Home & Sign In
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
