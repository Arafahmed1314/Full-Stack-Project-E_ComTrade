import React from "react";
import { LogOut, LogIn, UserPlus } from "lucide-react";

const AuthButtons = ({
  isMobile = false,
  isLoggedIn,
  setIsLoggedIn,
  setAuthView,
  setIsAuthModalOpen,
  setIsMobileMenuOpen,
  setIsUserDropdownOpen,
}) => {
  return (
    <div
      className={`space-y-2 ${
        isMobile ? "mt-4 pt-4 border-t border-gray-200/50" : ""
      }`}
    >
      {isLoggedIn ? (
        <button
          onClick={() => {
            setIsLoggedIn(false);
            if (isMobile) setIsMobileMenuOpen(false);
            setIsUserDropdownOpen(false);
          }}
          className={`flex items-center text-red-600 hover:text-red-700 hover:bg-red-50/50 transition-colors duration-200 ${
            isMobile
              ? "space-x-2 w-full px-3 py-2 rounded-lg"
              : "gap-3 w-full px-4 py-3 text-left"
          }`}
        >
          <LogOut className="w-4 h-4" />
          <span className="font-medium">Logout</span>
        </button>
      ) : (
        <>
          <button
            onClick={() => {
              setAuthView("login");
              setIsAuthModalOpen(true);
              if (isMobile) setIsMobileMenuOpen(false);
              setIsUserDropdownOpen(false);
            }}
            className={`flex items-center text-blue-600 hover:text-blue-700 hover:bg-blue-50/50 transition-colors duration-200 ${
              isMobile
                ? "space-x-2 w-full px-3 py-2 rounded-lg"
                : "gap-3 w-full px-4 py-3 text-left"
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span className="font-medium">Sign In</span>
          </button>
          <button
            onClick={() => {
              setAuthView("register");
              setIsAuthModalOpen(true);
              if (isMobile) setIsMobileMenuOpen(false);
              setIsUserDropdownOpen(false);
            }}
            className={`flex items-center text-green-600 hover:text-green-700 hover:bg-green-50/50 transition-colors duration-200 ${
              isMobile
                ? "space-x-2 w-full px-3 py-2 rounded-lg"
                : "gap-3 w-full px-4 py-3 text-left border-t border-gray-100"
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span className="font-medium">Sign Up</span>
          </button>
        </>
      )}
    </div>
  );
};

export default AuthButtons;
