import React, { useState } from "react";
import { X, Upload, Camera, Sparkles } from "lucide-react";

const CreateTradePost = ({ onClose, onSubmit, categories }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    location: "",
    images: [], // preview URLs for UI
  });
  const [imageFiles, setImageFiles] = useState([]); // actual File objects

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (files) => {
    const allowed = Array.from(files).slice(0, 3 - formData.images.length);
    const imageUrls = allowed.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...imageUrls],
    }));
    setImageFiles((prev) => [...prev, ...allowed]);
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.category) {
      alert("Please fill in all required fields");
      return;
    }

    const tags = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    // Convert image files to base64 strings so they persist when stored in DB
    const filesToConvert = imageFiles.slice(0, 3);
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
      });

    if (filesToConvert.length > 0) {
      Promise.all(filesToConvert.map(toBase64))
        .then((base64Images) => {
          onSubmit({
            ...formData,
            tags,
            images: base64Images,
          });
          // cleanup previews
          formData.images.forEach((url) => URL.revokeObjectURL(url));
          setFormData((prev) => ({ ...prev, images: [] }));
          setImageFiles([]);
        })
        .catch((err) => {
          console.error("Image conversion failed", err);
          alert("Failed to process images");
        });
    } else {
      onSubmit({
        ...formData,
        tags,
        images: [],
      });
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 border-b border-gray-200/50">
          <div className="absolute inset-0 bg-transparent rounded-t-2xl"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-600 rounded-xl shadow-sm">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Create Trade Post
                </h2>
                <p className="text-sm text-gray-500">
                  Share something amazing with the community
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-gray-100/80 transition-all duration-200 group"
            >
              <X className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="What amazing item are you trading?"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Tell us about your item and what you're looking for..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 text-gray-900 placeholder-gray-500 resize-none"
              required
            />
          </div>

          {/* Category and Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 text-gray-900"
                required
              >
                <option value="">Choose category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="City, State"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Tags
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="gaming, tech, vintage, collectible (comma separated)"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              Photos (1 up to 3)
            </label>

            <div className="relative group">
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center bg-white hover:border-indigo-400 transition-all duration-300 cursor-pointer">
                <div className="flex flex-col items-center space-y-3">
                  <div className="p-4 bg-gray-100 rounded-2xl shadow-sm group-hover:scale-105 transition-transform duration-200">
                    <Camera className="w-8 h-8 text-gray-700" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-700 mb-1">
                      <label className="text-indigo-600 cursor-pointer hover:text-indigo-700 font-semibold">
                        Choose photos
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e.target.files)}
                          className="hidden"
                        />
                      </label>
                      {" or drag and drop"}
                    </p>
                    <p className="text-sm text-gray-500">
                      PNG, JPG up to 10MB each
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Preview */}
            {formData.images.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="relative overflow-hidden rounded-xl border-2 border-gray-200 shadow-sm bg-white">
                      <img
                        src={image}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover group-hover:scale-110 transition-transform duration-200"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow hover:scale-105 transition-transform duration-200"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-sm hover:bg-indigo-700 transition-all duration-200"
            >
              Create Trade Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTradePost;
