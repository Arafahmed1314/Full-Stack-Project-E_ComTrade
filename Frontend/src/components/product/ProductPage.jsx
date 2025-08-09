import React from "react";
import StoryModeShopping from "./StoryModeShopping";
import Navbar from "../common/Navbar";

const ProductPage = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Navbar with transparent background for the story mode */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Story Mode Shopping Experience */}
      <StoryModeShopping />
    </div>
  );
};

export default ProductPage;
