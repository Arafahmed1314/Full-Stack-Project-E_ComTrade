import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Camera } from "lucide-react";

const WriteReviewModal = ({ isOpen, onClose, product }) => {
  const [formData, setFormData] = useState({
    rating: 0,
    title: "",
    review: "",
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingClick = (rating) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 3) {
      alert("You can upload maximum 3 images");
      return;
    }

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            url: e.target.result,
            file,
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (imageId) => {
    setImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.rating === 0) {
      alert("Please select a rating");
      return;
    }
    if (!formData.title.trim()) {
      alert("Please enter a review title");
      return;
    }
    if (!formData.review.trim()) {
      alert("Please write your review");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      alert("Thank you for your review!");
      setIsSubmitting(false);
      onClose();
      // Reset form
      setFormData({
        rating: 0,
        title: "",
        review: "",
      });
      setImages([]);
    }, 1500);
  };

  const getRatingText = (rating) => {
    const texts = {
      1: "Poor",
      2: "Fair",
      3: "Good",
      4: "Very Good",
      5: "Excellent",
    };
    return texts[rating] || "";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Very Light Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/5"
            onClick={onClose}
          />

          {/* Simple Lightweight Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white rounded-lg shadow-lg w-full max-w-md"
          >
            {/* Simple Header */}
            <div className="bg-blue-600 px-4 py-3 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Write Review</h2>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-blue-700 rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingClick(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-5 h-5 transition-colors ${
                          star <= (hoverRating || formData.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                  {(hoverRating || formData.rating) > 0 && (
                    <span className="ml-2 text-sm text-gray-600">
                      {getRatingText(hoverRating || formData.rating)}
                    </span>
                  )}
                </div>
              </div>

              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Summary of your review"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Review */}
              <div>
                <label
                  htmlFor="review"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Review <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="review"
                  name="review"
                  value={formData.review}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Share your experience..."
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.review.length}/500
                </p>
              </div>

              {/* Photo Upload - Optional */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add Photos{" "}
                  <span className="text-xs text-gray-500">(Optional)</span>
                </label>

                {/* Upload Button */}
                <label className="cursor-pointer">
                  <div className="flex items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors">
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Camera className="w-5 h-5" />
                      <span className="text-sm">
                        Click to add photos (max 3)
                      </span>
                    </div>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>

                {/* Image Preview */}
                {images.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {images.map((image) => (
                      <div key={image.id} className="relative group">
                        <img
                          src={image.url}
                          alt="Preview"
                          className="w-full h-16 object-cover rounded border"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(image.id)}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors text-sm"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    formData.rating === 0 ||
                    !formData.title.trim() ||
                    !formData.review.trim()
                  }
                  className="flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WriteReviewModal;
