import React from "react";
import { Menu, X } from "lucide-react";

const MobileMenuButton = ({ isMobileMenuOpen, toggleMobileMenu }) => {
  return (
    <button
      onClick={toggleMobileMenu}
      className="lg:hidden p-2 bg-white/70 backdrop-blur-sm rounded-full hover:bg-white/90 transition-all duration-200 hover:scale-110"
    >
      {isMobileMenuOpen ? (
        <X className="w-5 h-5 text-gray-600" />
      ) : (
        <Menu className="w-5 h-5 text-gray-600" />
      )}
    </button>
  );
};

export default MobileMenuButton;
