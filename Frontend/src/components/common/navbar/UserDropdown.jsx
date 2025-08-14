import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Package } from "lucide-react";
import AuthButtons from "./AuthButtons";

const UserDropdown = ({
  isUserDropdownOpen,
  isLoggedIn,
  setIsLoggedIn,
  setAuthView,
  setIsAuthModalOpen,
  setIsUserDropdownOpen,
}) => {
  return (
    <div className="relative user-dropdown-container">
      <AnimatePresence>
        {isUserDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-lg rounded-xl shadow-xl border border-white/20 overflow-hidden z-50"
          >
            {!isLoggedIn ? (
              <AuthButtons
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setAuthView={setAuthView}
                setIsAuthModalOpen={setIsAuthModalOpen}
                setIsUserDropdownOpen={setIsUserDropdownOpen}
              />
            ) : (
              <div className="space-y-0">
                {/* Profile */}
                <button className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-all duration-200 flex items-center gap-3">
                  <User className="w-4 h-4" />
                  My Profile
                </button>
                {/* Orders */}
                <button className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-all duration-200 flex items-center gap-3 border-t border-gray-100">
                  <Package className="w-4 h-4" />
                  My Orders
                </button>
                <div className="border-t border-gray-100">
                  <AuthButtons
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    setAuthView={setAuthView}
                    setIsAuthModalOpen={setIsAuthModalOpen}
                    setIsUserDropdownOpen={setIsUserDropdownOpen}
                  />
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDropdown;
