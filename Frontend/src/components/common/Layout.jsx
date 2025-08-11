import React from "react";
import Navbar from "../common/Navbar";
import HeroSection from "../hero/HeroSection";
import ProductShowcase from "../product/ProductShowcase.jsx";
import CategorySection from "../category/CategorySection";

const Layout = ({ children, showHero = false }) => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* {showHero && (
        <>
          <HeroSection />
          <ProductShowcase />
          <CategorySection />
        </>
      )} */}
      {children}
    </div>
  );
};

export default Layout;
