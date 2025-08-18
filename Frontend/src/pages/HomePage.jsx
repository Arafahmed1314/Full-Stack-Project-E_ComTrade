import React from "react";
import HeroSection from "../components/hero/HeroSection";
import ProductShowcase from "../components/product/ProductShowcase";
import CategorySection from "../components/category/CategorySection";
import ReviewSection from "../components/review/ReviewSection";
import { useSelector } from "react-redux";

const HomePage = () => {
  const productsState = useSelector((state) => state.product);
  console.log(productsState);

  // Get the actual array of products
  const productList = productsState?.products?.products || [];

  return (
    <div className="flex flex-col space-y-5">
      <HeroSection />
      <ProductShowcase products={productList} />
      {/* <CategorySection products={productList} /> */}
      <ReviewSection />
    </div>
  );
};

export default HomePage;
