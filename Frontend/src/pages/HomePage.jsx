import React, { useEffect } from "react";
import HeroSection from "../components/hero/HeroSection";
import ProductShowcase from "../components/product/ProductShowcase";
import CategorySection from "../components/category/CategorySection";
import ReviewSection from "../components/review/ReviewSection";
import { useSelector } from "react-redux";

import { useLocation } from "react-router-dom";
import { scrollToCategory } from "../utils/scrollUtils";

const HomePage = () => {
  const productsState = useSelector((state) => state.product);
  console.log(productsState);

  // Get the actual array of products
  const productList = productsState?.products?.products || [];

  // Scroll to category if query param exists
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    if (category) {
      setTimeout(() => {
        scrollToCategory(category, 80, 800);
      }, 200); // Wait for DOM to render
    }
  }, [location.search]);

  return (
    <div className="flex flex-col space-y-5">
      <HeroSection />
      <ProductShowcase products={productList} />
      <CategorySection />
      <ReviewSection />
    </div>
  );
};

export default HomePage;
