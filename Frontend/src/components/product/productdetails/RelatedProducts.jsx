import React from "react";
import { motion } from "framer-motion";
import { Star, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import AddToCartButton from "../../common/AddToCartButton";
import AddToWishlistButton from "../../common/AddToWishlistButton";

const RelatedProducts = ({ currentProduct, allProducts }) => {
  // Filter related products based on category, excluding current product
  const relatedProducts = allProducts
    .filter(
      (product) =>
        product.category === currentProduct.category &&
        product.id !== currentProduct.id
    )
    .slice(0, 4); // Show only 4 related products

  if (relatedProducts.length === 0) {
    return null;
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Related Products</h2>
        <Link
          to={`/products?category=${currentProduct.category.toLowerCase()}`}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product, index) => (
          <motion.div
            key={product.id}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white rounded-lg shadow-sm border hover:shadow-lg transition-all duration-300"
          >
            {/* Product Image */}
            <div className="relative overflow-hidden rounded-t-lg">
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>

              {/* Discount Badge */}
              {product.discount && (
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                  -{product.discount}%
                </div>
              )}

              {/* Quick Actions */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <AddToWishlistButton
                  productId={product._id || product.id}
                  className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 mb-2 block"
                  variant="icon"
                  size="sm"
                />
              </div>

              {/* Quick View Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Link
                  to={`/product/${product.id}`}
                  className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Quick View
                </Link>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500 uppercase tracking-wide">
                  {product.category}
                </span>
                <div className="flex items-center">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-gray-600 ml-1">
                    {product.rating}
                  </span>
                </div>
              </div>

              <Link to={`/product/${product.id}`}>
                <h3 className="font-medium text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                  {product.name}
                </h3>
              </Link>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-900">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                <AddToCartButton
                  productId={product._id || product.id}
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                  variant="icon"
                  size="sm"
                >
                  <ShoppingCart className="w-4 h-4" />
                </AddToCartButton>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
