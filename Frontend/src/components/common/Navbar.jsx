import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  Home,
  Package,
  Grid3X3,
  Info,
  Mail,
} from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for demonstration
  const cartCount = 3;
  const wishlistCount = 5;

  const categories = [
    "Men's Clothing",
    "Women's Clothing",
    "Electronics",
    "Jewelry",
    "Accessories",
  ];

  const navigationItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Products", href: "/products", icon: Package },
    { name: "Categories", href: "#", icon: Grid3X3, hasDropdown: true },
    { name: "About", href: "/about", icon: Info },
    { name: "Contact", href: "/contact", icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // Here you would typically navigate to search results
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (!isSearchExpanded) {
      setTimeout(() => {
        const desktopInput = document.getElementById("search-input");
        const mobileInput = document.getElementById("search-input-mobile");
        if (desktopInput) desktopInput.focus();
        if (mobileInput) mobileInput.focus();
      }, 200);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-200/20"
            : "bg-white/60 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} className="flex-shrink-0">
              <a href="/" className="flex items-center space-x-3">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg"
                >
                  <span className="text-white font-bold text-xl">E</span>
                  <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl opacity-20"
                  />
                </motion.div>
                <motion.span
                  whileHover={{
                    scale: 1.05,
                    textShadow: "0 0 8px rgba(37, 99, 235, 0.5)",
                  }}
                  className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent"
                >
                  EtRaDe
                </motion.span>
              </a>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <div key={item.name} className="relative">
                  {item.hasDropdown ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setIsCategoriesOpen(true)}
                      onMouseLeave={() => setIsCategoriesOpen(false)}
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.name}</span>
                        <ChevronDown
                          className="w-4 h-4 transition-transform duration-200"
                          style={{
                            transform: isCategoriesOpen
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                          }}
                        />
                      </motion.button>

                      <AnimatePresence>
                        {isCategoriesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-48 bg-white/90 backdrop-blur-lg rounded-lg shadow-lg border border-gray-200/20 py-2"
                          >
                            {categories.map((category) => (
                              <motion.a
                                key={category}
                                href={`/category/${category
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}`}
                                className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 transition-colors duration-200"
                                whileHover={{ x: 4 }}
                              >
                                {category}
                              </motion.a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <motion.a
                      href={item.href}
                      className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                      whileHover={{ scale: 1.05 }}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </motion.a>
                  )}
                </div>
              ))}
            </div>

            {/* Search and Action Icons */}
            <div className="flex items-center space-x-4">
              {/* Search - Desktop Version */}
              <div className="relative hidden lg:block">
                <motion.div
                  animate={{ width: isSearchExpanded ? 250 : 40 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="relative"
                >
                  {!isSearchExpanded ? (
                    <motion.button
                      onClick={toggleSearch}
                      className="w-10 h-10 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/90 transition-colors duration-200 cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Search className="w-5 h-5 text-gray-600" />
                    </motion.button>
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
                        onBlur={() =>
                          !searchQuery && setIsSearchExpanded(false)
                        }
                        placeholder="Search products..."
                        className="w-full pl-10 pr-4 py-2 bg-white/70 backdrop-blur-sm border border-gray-300/50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                        autoFocus
                      />
                    </motion.form>
                  )}
                </motion.div>
              </div>

              {/* Search - Mobile Version */}
              <div className="relative lg:hidden">
                <motion.div
                  animate={{ width: isSearchExpanded ? 200 : 40 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="relative"
                >
                  {!isSearchExpanded ? (
                    <motion.button
                      onClick={toggleSearch}
                      className="w-10 h-10 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/90 transition-colors duration-200 cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Search className="w-5 h-5 text-gray-600" />
                    </motion.button>
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
                        id="search-input-mobile"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onBlur={() =>
                          !searchQuery && setIsSearchExpanded(false)
                        }
                        placeholder="Search..."
                        className="w-full pl-10 pr-4 py-2 bg-white/70 backdrop-blur-sm border border-gray-300/50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-sm"
                        autoFocus
                      />
                    </motion.form>
                  )}
                </motion.div>
              </div>

              {/* Action Icons - Hidden on mobile when search is expanded */}
              <AnimatePresence>
                <motion.div
                  className={`flex items-center space-x-2 ${
                    isSearchExpanded ? "hidden lg:flex" : "flex"
                  }`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Wishlist */}
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative p-3 bg-white/70 backdrop-blur-sm rounded-full hover:bg-white/90 transition-all duration-300 group shadow-lg"
                  >
                    <Heart className="w-5 h-5 text-gray-600 group-hover:text-red-500 transition-colors duration-300" />
                    {wishlistCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg"
                      >
                        <motion.span
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {wishlistCount}
                        </motion.span>
                      </motion.span>
                    )}
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute inset-0 bg-red-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </motion.button>

                  {/* Cart */}
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative p-3 bg-white/70 backdrop-blur-sm rounded-full hover:bg-white/90 transition-all duration-300 group shadow-lg"
                  >
                    <ShoppingCart className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
                    {cartCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg"
                      >
                        <motion.span
                          animate={{
                            scale: cartCount > 0 ? [1, 1.3, 1] : [1],
                            rotate: cartCount > 0 ? [0, 10, -10, 0] : [0],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {cartCount}
                        </motion.span>
                      </motion.span>
                    )}
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute inset-0 bg-blue-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </motion.button>

                  {/* User */}
                  <motion.button
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative p-3 bg-white/70 backdrop-blur-sm rounded-full hover:bg-white/90 transition-all duration-300 group shadow-lg"
                  >
                    <User className="w-5 h-5 text-gray-600 group-hover:text-green-600 transition-colors duration-300" />
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute inset-0 bg-green-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </motion.button>
                </motion.div>
              </AnimatePresence>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 bg-white/70 backdrop-blur-sm rounded-full hover:bg-white/90 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-600" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-600" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
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
                {navigationItems.map((item) => (
                  <div key={item.name}>
                    {item.hasDropdown ? (
                      <div>
                        <motion.button
                          onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                          className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-colors duration-200"
                          whileHover={{ x: 4 }}
                        >
                          <div className="flex items-center space-x-2">
                            <item.icon className="w-4 h-4" />
                            <span className="font-medium">{item.name}</span>
                          </div>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isCategoriesOpen ? "rotate-180" : ""
                            }`}
                          />
                        </motion.button>

                        <AnimatePresence>
                          {isCategoriesOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="ml-6 mt-2 space-y-1"
                            >
                              {categories.map((category) => (
                                <motion.a
                                  key={category}
                                  href={`/category/${category
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")}`}
                                  className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-colors duration-200"
                                  whileHover={{ x: 4 }}
                                >
                                  {category}
                                </motion.a>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <motion.a
                        href={item.href}
                        className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-colors duration-200"
                        whileHover={{ x: 4 }}
                      >
                        <item.icon className="w-4 h-4" />
                        <span className="font-medium">{item.name}</span>
                      </motion.a>
                    )}
                  </div>
                ))}

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
      </motion.nav>

      {/* Spacer to prevent content from hiding behind fixed navbar - Dynamic height */}
      <div className="h-16 lg:h-20 flex-shrink-0"></div>
    </>
  );
};

export default Navbar;
