import React from "react";
import HeroSection from "../components/hero/HeroSection";
import ProductShowcase from "../components/product/ProductShowcase";
import CategorySection from "../components/category/CategorySection";
import ReviewSection from "../components/review/ReviewSection";

const HomePage = () => {
  return (
    <div className="flex flex-col space-y-5">
      <HeroSection />
      <ProductShowcase />
      <CategorySection />
      <ReviewSection />
    </div>
  );
};

export default HomePage;
