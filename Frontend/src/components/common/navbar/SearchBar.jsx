import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const SearchBar = ({
  isSearchExpanded,
  setIsSearchExpanded,
  searchQuery,
  setSearchQuery,
  handleSearchSubmit,
}) => {
  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (!isSearchExpanded) {
      setTimeout(() => {
        const searchInput = document.getElementById("search-input");
        if (searchInput) searchInput.focus();
      }, 200);
    }
  };

  return (
    <div className="relative">
      <motion.div
        animate={{
          width: isSearchExpanded
            ? window.innerWidth >= 1024
              ? 250
              : 200
            : 40,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative"
      >
        {!isSearchExpanded ? (
          <button
            onClick={toggleSearch}
            className="w-10 h-10 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/90 transition-all duration-200 hover:scale-110"
          >
            <Search className="w-5 h-5 text-gray-600" />
          </button>
        ) : (
          <motion.form
            onSubmit={handleSearchSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600 z-10" />
            <input
              id="search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onBlur={() => !searchQuery && setIsSearchExpanded(false)}
              placeholder={
                window.innerWidth >= 1024 ? "Search products..." : "Search..."
              }
              className="w-full pl-10 pr-4 py-2 bg-white/70 backdrop-blur-sm border border-gray-300/50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-sm lg:text-base"
              autoFocus
            />
          </motion.form>
        )}
      </motion.div>
    </div>
  );
};

export default SearchBar;
