import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductImageGallery from "./ProductImageGallery";
import ProductInfo from "./ProductInfo";
import ProductTabs from "./ProductTabs";
import RelatedProducts from "./RelatedProducts";
import ProductBreadcrumb from "./ProductBreadcrumb";
import { ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Get products array from Redux
  const products = useSelector(
    (state) => state.product?.products?.products || []
  );

  useEffect(() => {
    if (!products || products.length === 0) return;

    // Find product by ID - convert both to strings for comparison
    const foundProduct = products.find(
      (p) => String(p.id) === String(productId)
    );

    if (foundProduct) {
      // Normalize the product data to match component expectations
      const normalizedProduct = {
        ...foundProduct,
        name: foundProduct.title, // Map title to name
        originalPrice: foundProduct.price * 1.2, // Create original price (20% higher)
        images: foundProduct.images || [foundProduct.image], // Ensure images array exists
        rating: foundProduct.rating?.rate || foundProduct.rating || 0, // Extract rating number
        reviews: foundProduct.rating?.count || 0, // Extract review count
        // Ensure we preserve both id formats for compatibility
        id: foundProduct.id,
        _id: foundProduct._id || foundProduct.id, // Some products might not have _id
      };

      setProduct(normalizedProduct);

      // Get related products from the same category (max 4)
      const related = products
        .filter(
          (p) =>
            p.category === foundProduct.category &&
            String(p.id) !== String(foundProduct.id)
        )
        .slice(0, 4)
        .map((p) => ({
          ...p,
          name: p.title,
          originalPrice: p.price * 1.2,
          images: p.images || [p.image],
          rating: p.rating?.rate || p.rating || 0,
          reviews: p.rating?.count || 0,
          // Ensure proper ID fields
          id: p.id,
          _id: p._id || p.id,
        }));
      setRelatedProducts(related);
    } else {
      setProduct(null);
    }

    setLoading(false);
  }, [productId, products]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h2>
          <button
            onClick={() => navigate("/products")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <ProductBreadcrumb product={product} />

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <ProductImageGallery product={product} />
          <ProductInfo product={product} />
        </div>

        {/* Product Details Tabs */}
        <ProductTabs product={product} />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <RelatedProducts
            currentProduct={product}
            allProducts={relatedProducts}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
