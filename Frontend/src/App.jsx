import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Footer from "./components/common/Footer";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import ProductDetails from "./components/product/productdetails/ProductDetails";
import Navbar from "./components/common/navbar/Navbar";
import { useDispatch } from "react-redux";
import { checkAuth } from "./utils/checkAuth";
import { fetchProductFromApi } from "./utils/fetchProductFromApi";
import Trade from "./components/trade/Trade";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    checkAuth(dispatch);
    fetchProductFromApi(dispatch);
  }, [dispatch]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/trade" element={<Trade />} />
            <Route path="/products/:productId" element={<ProductDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
