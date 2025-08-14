import React, { useState } from "react";
import { X } from "lucide-react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthModal = ({ isOpen, onClose, initialView = "login" }) => {
  const [currentView, setCurrentView] = useState(initialView);

  const switchView = () => {
    setCurrentView(currentView === "login" ? "register" : "login");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 opacity-0 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container - Made wider and shorter */}
      <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl max-h-[85vh] overflow-y-auto transform scale-95 animate-modal-appear">
        {/* Glassmorphism Background */}
        <div className="relative bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          </button>

          {/* Content - Reduced padding for shorter height */}
          <div className="relative p-4 sm:p-5 lg:p-6 pt-6 sm:pt-8 lg:pt-10">
            {/* Logo/Brand */}

            {/* Form Container */}
            <div className="transition-opacity duration-300">
              {currentView === "login" ? (
                <LoginForm
                  onSwitchToRegister={() => setCurrentView("register")}
                />
              ) : (
                <RegisterForm onSwitchToLogin={() => setCurrentView("login")} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
