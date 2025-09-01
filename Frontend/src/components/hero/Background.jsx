import React from "react";

const Background = ({ currentSlide, heroImages }) => {
  return (
    <>
      {/* Main Background Carousel */}
      <div className="absolute inset-0">
        <div className="absolute inset-0">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
            style={{
              backgroundImage: `url(${heroImages[currentSlide].url})`,
            }}
          >
            {/* Enhanced overlay with gradient mesh */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-purple-900/50 to-black/70"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Simplified Background Elements */}
      <div className="absolute inset-0 overflow-x-hidden">
        {/* Static gradient orbs */}
        <div className="absolute top-20 -left-40 w-80 h-80 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl opacity-30 pointer-events-none" />
        <div className="absolute bottom-20 -right-40 w-80 h-80 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl opacity-40 pointer-events-none" />
      </div>
    </>
  );
};

export default Background;
