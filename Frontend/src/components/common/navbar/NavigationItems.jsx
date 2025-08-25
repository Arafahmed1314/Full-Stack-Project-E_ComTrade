/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { scrollToCategory, scrollToHome } from "../../../utils/scrollUtils";

const NavigationItems = ({
  navigationItems,
  categories,
  isMobile = false,
  isCategoriesOpen,
  setIsCategoriesOpen,
  setIsMobileMenuOpen,
}) => {
  const navigate = useNavigate();

  // Function to handle category click and scroll to section
  const handleCategoryClick = (category) => {
    // Close dropdown and mobile menu
    setIsCategoriesOpen(false);
    if (isMobile && setIsMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }

    // Smooth scroll to the category section with custom duration
    scrollToCategory(category, 80, 1000);
  };

  // Function to handle navigation item clicks with smooth scrolling
  const handleNavigation = (e, item) => {
    e.preventDefault();

    // Close mobile menu if open
    if (isMobile && setIsMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }

    // Special handling for Home - scroll to home section smoothly
    if (item.name === "Home" && window.location.pathname === "/") {
      scrollToHome(1000);
    } else {
      // Navigate to the page
      navigate(item.href);
      // If navigating to home, scroll to home section after a brief delay
      if (item.href === "/") {
        setTimeout(() => scrollToHome(800), 100);
      }
    }
  };

  return (
    <>
      {navigationItems.map((item) => (
        <div key={item.name} className="relative">
          {item.hasDropdown ? (
            <div
              className="relative"
              onMouseEnter={() => !isMobile && setIsCategoriesOpen(true)}
              onMouseLeave={() => !isMobile && setIsCategoriesOpen(false)}
            >
              <button
                onClick={() =>
                  isMobile && setIsCategoriesOpen(!isCategoriesOpen)
                }
                className={`flex items-center justify-between w-full text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 ${
                  isMobile
                    ? "px-3 py-2 hover:bg-blue-50/50 rounded-lg space-x-2"
                    : "space-x-1 hover:scale-105 transform"
                }`}
              >
                <div className="flex items-center space-x-1">
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isCategoriesOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              <AnimatePresence>
                {isCategoriesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: 10, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`bg-white/90 backdrop-blur-lg rounded-lg shadow-lg border border-gray-200/20 py-2 z-50 ${
                      isMobile
                        ? "ml-6 mt-2 space-y-1"
                        : "absolute top-full left-0 mt-2 w-48"
                    }`}
                  >
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        className={`w-full text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 transition-colors duration-200 ${
                          isMobile ? "px-3 py-2 rounded-lg" : "px-4 py-2"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <a
              href={item.href}
              onClick={(e) => handleNavigation(e, item)}
              className={`flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 cursor-pointer ${
                isMobile
                  ? "space-x-2 px-3 py-2 hover:bg-blue-50/50 rounded-lg"
                  : "space-x-1 hover:scale-105 transform"
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.name}</span>
            </a>
          )}
        </div>
      ))}
    </>
  );
};

export default NavigationItems;
