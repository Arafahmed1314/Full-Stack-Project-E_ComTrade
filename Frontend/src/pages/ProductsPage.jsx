import React from "react";
import ProductSection from "../components/product/ProductSection";
import { useSelector } from "react-redux";

const ProductsPage = () => {
  const productsState = useSelector((state) => state.product || {});

  return (
    <div>
      <ProductSection
        products={productsState?.products?.products || []}
        productPagination={productsState?.products?.pagination}
      />
    </div>
  );
};

export default ProductsPage;
