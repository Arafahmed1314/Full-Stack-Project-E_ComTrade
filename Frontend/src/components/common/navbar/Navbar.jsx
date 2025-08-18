/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AuthModal } from "../../auth";
import {
  Logo,
  SearchBar,
  ActionIcons,
  NavigationItems,
  UserDropdown,
  MobileMenu,
  MobileMenuButton,
} from "./index";
import { categories, navigationItems, mockData } from "./constants";
import { useSelector } from "react-redux";

const Navbar = () => {
  // State management
  const user = useSelector((state) => state.user);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(user !== null);

  // Effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync local isLoggedIn state with Redux user state
  useEffect(() => {
    setIsLoggedIn(user.user !== null);
  }, [user.user]);

  useEffect(() => {
    if (!isUserDropdownOpen) return;

    const handleClickOutside = (event) => {
      if (!event.target.closest(".user-dropdown-container")) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isUserDropdownOpen]);

  // Event handlers
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <NavigationItems
                navigationItems={navigationItems}
                categories={categories}
                isCategoriesOpen={isCategoriesOpen}
                setIsCategoriesOpen={setIsCategoriesOpen}
              />
            </div>

            {/* Search and Action Icons */}
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <SearchBar
                isSearchExpanded={isSearchExpanded}
                setIsSearchExpanded={setIsSearchExpanded}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearchSubmit={handleSearchSubmit}
              />

              {/* Action Icons */}
              <ActionIcons
                isUserDropdownOpen={isUserDropdownOpen}
                setIsUserDropdownOpen={setIsUserDropdownOpen}
                isSearchExpanded={isSearchExpanded}
              />

              {/* User Dropdown */}
              <UserDropdown
                isUserDropdownOpen={isUserDropdownOpen}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setAuthView={setAuthView}
                setIsAuthModalOpen={setIsAuthModalOpen}
                setIsUserDropdownOpen={setIsUserDropdownOpen}
              />

              {/* Mobile Menu Button */}
              <MobileMenuButton
                isMobileMenuOpen={isMobileMenuOpen}
                toggleMobileMenu={toggleMobileMenu}
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          isMobileMenuOpen={isMobileMenuOpen}
          navigationItems={navigationItems}
          categories={categories}
          isCategoriesOpen={isCategoriesOpen}
          setIsCategoriesOpen={setIsCategoriesOpen}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setAuthView={setAuthView}
          setIsAuthModalOpen={setIsAuthModalOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          setIsUserDropdownOpen={setIsUserDropdownOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearchSubmit={handleSearchSubmit}
        />
      </motion.nav>

      {/* Spacer */}
      <div className="h-16 lg:h-20 flex-shrink-0"></div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialView={authView}
      />
    </>
  );
};

export default Navbar;
