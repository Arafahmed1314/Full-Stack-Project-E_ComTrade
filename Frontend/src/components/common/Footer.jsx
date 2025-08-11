import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Shield,
  Truck,
  RefreshCw,
  Heart,
  ArrowUp,
} from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-900 text-white relative">
      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <h3 className="text-2xl font-bold">EtRaDe</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Your trusted e-commerce platform for all your shopping needs. We
              bring you quality products at competitive prices with excellent
              customer service.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-pink-400 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold border-b border-gray-700 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                "About Us",
                "Contact Us",
                "Privacy Policy",
                "Terms & Conditions",
                "FAQ",
                "Shipping Info",
                "Return Policy",
                "Size Guide",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors hover:pl-2 duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold border-b border-gray-700 pb-2">
              Categories
            </h4>
            <ul className="space-y-2">
              {[
                "Electronics",
                "Fashion",
                "Kitchen",
                "Gaming",
                "Wearables",
                "Photography",
                "Audio",
                "Computers",
                "Sports",
                "Beauty",
              ].map((category) => (
                <li key={category}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors hover:pl-2 duration-300"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold border-b border-gray-700 pb-2">
              Contact Info
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400">
                  123 Commerce Street, Business District, City 12345
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400">support@etrade.com</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <h5 className="font-semibold mb-3">Newsletter</h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-blue-500 text-white"
                />
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg transition-colors">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h6 className="font-semibold">Free Shipping</h6>
                <p className="text-sm text-gray-400">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h6 className="font-semibold">Secure Payment</h6>
                <p className="text-sm text-gray-400">100% Protected</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-purple-600 p-2 rounded-lg">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <h6 className="font-semibold">Easy Returns</h6>
                <p className="text-sm text-gray-400">30 days return policy</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-orange-600 p-2 rounded-lg">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h6 className="font-semibold">24/7 Support</h6>
                <p className="text-sm text-gray-400">Customer service</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <span className="text-gray-400">Accepted Payments:</span>
              <div className="flex space-x-2">
                <div className="bg-blue-600 p-2 rounded text-white font-bold text-xs flex items-center justify-center w-10 h-8">
                  VISA
                </div>
                <div className="bg-red-600 p-2 rounded text-white font-bold text-xs flex items-center justify-center w-10 h-8">
                  MC
                </div>
                <div className="bg-blue-800 p-2 rounded text-white font-bold text-xs flex items-center justify-center w-10 h-8">
                  AMEX
                </div>
                <div className="bg-yellow-500 p-2 rounded text-white font-bold text-xs flex items-center justify-center w-10 h-8">
                  PP
                </div>
              </div>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 EtRaDe. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
