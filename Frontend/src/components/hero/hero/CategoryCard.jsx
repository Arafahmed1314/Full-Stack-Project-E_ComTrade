import React from "react";
import { Sparkles } from "lucide-react";

const CategoryCard = ({ currentSlide, heroImages }) => {
  return (
    <div className="absolute bottom-20 right-8 hidden xl:block z-20">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 text-white min-w-[200px] shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="text-sm font-medium opacity-80">
            Featured Category
          </div>
        </div>
        <div className="text-xl font-bold mb-1">
          {heroImages[currentSlide].category}
        </div>
        <div className="text-green-400 font-semibold text-sm">
          {heroImages[currentSlide].discount}
        </div>
        <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-3 w-full transition-all duration-1000" />
      </div>
    </div>
  );
};

export default CategoryCard;
