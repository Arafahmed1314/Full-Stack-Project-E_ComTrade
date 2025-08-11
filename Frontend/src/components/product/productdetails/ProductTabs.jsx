import React, { useState } from "react";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import WriteReviewModal from './WriteReviewModal';

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState("description");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const tabs = [
    { id: "description", label: "Description" },
    { id: "specifications", label: "Specifications" },
    { id: "reviews", label: "Reviews", count: product.reviews },
    { id: "shipping", label: "Shipping & Returns" },
  ];

  const specifications = {
    Brand: "TechCorp",
    Model: product.name,
    Color: "Multiple Options",
    Material: "Premium Quality",
    Warranty: "2 Years",
    "Country of Origin": "USA",
    Weight: "2.5 kg",
    Dimensions: "25 x 15 x 10 cm",
  };

  const reviews = [
    {
      id: 1,
      user: "John Smith",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      rating: 5,
      date: "2 days ago",
      comment:
        "Excellent product! Exceeded my expectations. The quality is outstanding and delivery was super fast.",
      helpful: 12,
      notHelpful: 1,
    },
    {
      id: 2,
      user: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      rating: 4,
      date: "1 week ago",
      comment:
        "Very good product overall. The only minor issue is the packaging could be better, but the product itself is fantastic.",
      helpful: 8,
      notHelpful: 0,
    },
    {
      id: 3,
      user: "Mike Davis",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      rating: 5,
      date: "2 weeks ago",
      comment: "Amazing quality and great value for money. Highly recommended!",
      helpful: 15,
      notHelpful: 2,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 overflow-x-auto">
        <nav className="flex space-x-2 sm:space-x-8 px-4 sm:px-6 min-w-max sm:min-w-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <span className="block sm:inline">{tab.label}</span>
              {tab.count && (
                <span className="ml-1 sm:ml-2 bg-gray-100 text-gray-600 px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-4 sm:p-6">
        {activeTab === "description" && (
          <div className="prose max-w-none">
            <h3 className="text-xl font-semibold mb-4">Product Description</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Experience the perfect blend of innovation and quality with our{" "}
              {product.name}. This exceptional product has been crafted with
              attention to detail and designed to meet the highest standards of
              performance and durability.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Key features include advanced technology integration, premium
              materials, and ergonomic design that ensures maximum comfort and
              efficiency. Whether you're a professional or enthusiast, this
              product delivers outstanding results.
            </p>
            <h4 className="text-lg font-semibold mb-3">Key Features:</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Premium quality construction with durable materials</li>
              <li>Advanced technology for enhanced performance</li>
              <li>Ergonomic design for maximum comfort</li>
              <li>Easy to use with intuitive controls</li>
              <li>Energy efficient and environmentally friendly</li>
              <li>Comprehensive warranty and support</li>
            </ul>
          </div>
        )}

        {activeTab === "specifications" && (
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-4">
              Technical Specifications
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              {Object.entries(specifications).map(([key, value]) => (
                <div
                  key={key}
                  className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-gray-100"
                >
                  <span className="font-medium text-gray-900 mb-1 sm:mb-0">
                    {key}
                  </span>
                  <span className="text-gray-600 text-sm sm:text-base">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
              <h3 className="text-lg sm:text-xl font-semibold">
                Customer Reviews
              </h3>
              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
              >
                Write a Review
              </button>
            </div>

            {/* Reviews Summary */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {product.rating}
                  </div>
                  <div className="flex justify-center sm:justify-start">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < product.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">
                    {product.reviews} reviews
                  </div>
                </div>
                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div
                      key={rating}
                      className="flex items-center space-x-2 mb-1"
                    >
                      <span className="text-sm w-3">{rating}</span>
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{
                            width: `${
                              rating === 5 ? 70 : rating === 4 ? 20 : 10
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-8">
                        {rating === 5 ? "70%" : rating === 4 ? "20%" : "10%"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-6">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <img
                      src={review.avatar}
                      alt={review.user}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mb-2">
                        <span className="font-medium text-sm sm:text-base">
                          {review.user}
                        </span>
                        <div className="flex items-center space-x-1 mt-1 sm:mt-0">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 sm:w-4 sm:h-4 ${
                                  i < review.rating
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs sm:text-sm text-gray-500 ml-2">
                            {review.date}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3 text-sm sm:text-base leading-relaxed">
                        {review.comment}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                        <button className="flex items-center space-x-1 text-xs sm:text-sm text-gray-600 hover:text-gray-900">
                          <ThumbsUp className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>Helpful ({review.helpful})</span>
                        </button>
                        <button className="flex items-center space-x-1 text-xs sm:text-sm text-gray-600 hover:text-gray-900">
                          <ThumbsDown className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>Not helpful ({review.notHelpful})</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "shipping" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-4">
                Shipping Information
              </h3>
              <div className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 text-sm sm:text-base">
                    Free Standard Shipping
                  </h4>
                  <p className="text-gray-600 text-sm">
                    2-3 business days for orders over $50
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 text-sm sm:text-base">
                    Express Shipping
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Next business day delivery - $9.99
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 text-sm sm:text-base">
                    International Shipping
                  </h4>
                  <p className="text-gray-600 text-sm">
                    5-10 business days - Starting at $19.99
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-4">
                Return Policy
              </h3>
              <div className="space-y-3 text-gray-700 text-sm sm:text-base">
                <p>
                  We offer a 30-day return policy for all unused items in
                  original packaging.
                </p>
                <p>
                  To initiate a return, please contact our customer service team
                  with your order number.
                </p>
                <p>
                  Return shipping is free for defective items or our error.
                  Customer is responsible for return shipping costs for other
                  returns.
                </p>
                <p>
                  Refunds will be processed within 5-7 business days after we
                  receive the returned item.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-4">
                Warranty
              </h3>
              <div className="text-gray-700 text-sm sm:text-base">
                <p className="mb-2">
                  This product comes with a 2-year manufacturer warranty
                  covering defects in materials and workmanship.
                </p>
                <p>
                  Warranty does not cover damage from misuse, accidents, or
                  normal wear and tear.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Write Review Modal */}
      <WriteReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        product={product}
      />
    </div>
  );
};

export default ProductTabs;
