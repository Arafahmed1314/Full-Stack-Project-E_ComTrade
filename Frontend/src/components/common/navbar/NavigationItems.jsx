/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const NavigationItems = ({
  navigationItems,
  categories,
  isMobile = false,
  isCategoriesOpen,
  setIsCategoriesOpen,
}) => {
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
                    className={`bg-white/90 backdrop-blur-lg rounded-lg shadow-lg border border-gray-200/20 py-2 ${
                      isMobile
                        ? "ml-6 mt-2 space-y-1"
                        : "absolute top-full left-0 mt-2 w-48"
                    }`}
                  >
                    {categories.map((category) => (
                      <Link
                        key={category}
                        to={`/category/${category
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className={`block text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 transition-colors duration-200 ${
                          isMobile ? "px-3 py-2 rounded-lg" : "px-4 py-2"
                        }`}
                      >
                        {category}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              to={item.href}
              className={`flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 ${
                isMobile
                  ? "space-x-2 px-3 py-2 hover:bg-blue-50/50 rounded-lg"
                  : "space-x-1"
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.name}</span>
            </Link>
          )}
        </div>
      ))}
    </>
  );
};

export default NavigationItems;
