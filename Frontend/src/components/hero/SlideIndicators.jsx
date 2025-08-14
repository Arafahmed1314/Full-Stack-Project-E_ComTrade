import React from "react";

const SlideIndicators = ({ heroImages, currentSlide, onSlideChange }) => {
  return (
    <div className="absolute bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
      {heroImages.map((image, index) => (
        <button
          key={index}
          onClick={() => onSlideChange(index)}
          className={`relative transition-all duration-300 hover:scale-110 ${
            index === currentSlide
              ? "w-12 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              : "w-4 h-4 bg-white/50 hover:bg-white/80 rounded-full"
          }`}
        >
          {index === currentSlide && (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-300" />
          )}
        </button>
      ))}
    </div>
  );
};

export default SlideIndicators;
