import React, { useState, useEffect } from "react";
import Background from "./Background";
import HeroContent from "./HeroContent";
import ProductShowcase from "./ProductShowcase";
import SlideIndicators from "./SlideIndicators";
import CategoryCard from "./CategoryCard";
import { heroImages, SLIDE_INTERVAL } from "./constants";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="w-full pb-32 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 lg:flex lg:items-center">
      <Background currentSlide={currentSlide} heroImages={heroImages} />

      {/* Main Content */}
      <div className="relative z-10 w-full h-full flex items-center py-8 lg:py-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-screen lg:min-h-0">
            <HeroContent />
            <ProductShowcase
              currentSlide={currentSlide}
              heroImages={heroImages}
            />
          </div>
        </div>
      </div>

      <SlideIndicators
        heroImages={heroImages}
        currentSlide={currentSlide}
        onSlideChange={goToSlide}
      />

      <CategoryCard currentSlide={currentSlide} heroImages={heroImages} />
    </section>
  );
};

export default HeroSection;
