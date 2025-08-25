/* eslint-disable no-unused-vars */
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import NavigationItems from "./NavigationItems";
import AuthButtons from "./AuthButtons";

const MobileMenu = ({
  isMobileMenuOpen,
  navigationItems,
  categories,
  isCategoriesOpen,
  setIsCategoriesOpen,
  isLoggedIn,
  setIsLoggedIn,
  setAuthView,
  setIsAuthModalOpen,
  setIsMobileMenuOpen,
  setIsUserDropdownOpen,
  searchQuery,
  setSearchQuery,
  handleSearchSubmit,
}) => {
  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden bg-white/90 backdrop-blur-lg border-t border-gray-200/20"
        >
          <div className="px-4 py-4 space-y-2">
            <NavigationItems
              navigationItems={navigationItems}
              categories={categories}
              isMobile={true}
              isCategoriesOpen={isCategoriesOpen}
              setIsCategoriesOpen={setIsCategoriesOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />

            <AuthButtons
              isMobile={true}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              setAuthView={setAuthView}
              setIsAuthModalOpen={setIsAuthModalOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
              setIsUserDropdownOpen={setIsUserDropdownOpen}
            />

            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="mt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 bg-white/70 border border-gray-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                />
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
