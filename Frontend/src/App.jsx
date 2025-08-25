import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Footer from "./components/common/Footer";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import ProfilePage from "./pages/ProfilePage";
import ProductDetails from "./components/product/productdetails/ProductDetails";
import Navbar from "./components/common/navbar/Navbar";
import { useDispatch } from "react-redux";
import { checkAuth } from "./utils/checkAuth";
import { fetchProductFromApi } from "./utils/fetchProductFromApi";
import TradePage from "./pages/TradePage";
import ProfileDemo from "./components/demo/ProfileDemo";

// Component to conditionally render footer
const ConditionalFooter = () => {
  const location = useLocation();
  const hideFooterPaths = ["/trade"];

  if (hideFooterPaths.includes(location.pathname)) {
    return null;
  }

  return <Footer />;
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    checkAuth(dispatch);
    fetchProductFromApi(dispatch);
  }, [dispatch]);

  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Navbar />
        <main className="flex-grow overflow-hidden">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile-demo" element={<ProfileDemo />} />
            <Route path="/trade" element={<TradePage />} />
            <Route path="/products/:productId" element={<ProductDetails />} />
          </Routes>
        </main>
        <ConditionalFooter />
      </div>
    </Router>
  );
}

export default App;
