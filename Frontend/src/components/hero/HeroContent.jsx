import React from "react";
import { ArrowRight, Grid3X3 } from "lucide-react";

const HeroContent = () => {
  return (
    <div className="lg:col-span-7 text-white space-y-4 lg:space-y-5 flex flex-col justify-center">
      {/* Main Headline */}
      <div className="space-y-3 lg:space-y-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight">
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Discover
          </span>
          <br />
          <span className="text-white">Your Perfect</span>
          <br />
          <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Style
          </span>
        </h1>
      </div>

      {/* Subtitle */}
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 max-w-2xl leading-relaxed font-light">
        Explore our{" "}
        <span className="text-blue-400 font-semibold">curated collection</span>{" "}
        of premium products across fashion, electronics, jewelry, and more. Find
        exactly what you're looking for at{" "}
        <span className="text-green-400 font-semibold">unbeatable prices</span>.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 pt-3 lg:pt-4">
        <button className="group relative bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center space-x-2 lg:space-x-3 transition-all duration-300 hover:from-blue-500 hover:to-purple-600 hover:scale-105">
          <span>Shop Now</span>
          <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 group-hover:translate-x-2 transition-transform duration-300" />
        </button>

        <button className="group relative bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center space-x-2 lg:space-x-3 transition-all duration-300 hover:bg-white/20 hover:scale-105">
          <Grid3X3 className="w-5 h-5 lg:w-6 lg:h-6" />
          <span>Browse Categories</span>
        </button>
      </div>
    </div>
  );
};

export default HeroContent;
