import React from "react";

const Logo = () => {
  return (
    <div className="flex-shrink-0">
      <a href="/" className="flex items-center space-x-3">
        <div className="relative w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-xl">E</span>
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
          EtRaDe
        </span>
      </a>
    </div>
  );
};

export default Logo;
