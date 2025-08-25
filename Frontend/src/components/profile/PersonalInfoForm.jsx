import React from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Save } from "lucide-react";

const PersonalInfoForm = ({
  formData,
  isEditing,
  loading,
  errors,
  onInputChange,
  onSave,
  onCancel,
}) => {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <User className="w-5 h-5 text-indigo-600" />
        Personal Information
      </h3>

      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onInputChange}
            disabled={!isEditing || loading}
            className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 disabled:bg-gray-50 ${
              errors?.name
                ? "border-red-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                : "border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            }`}
          />
          {errors?.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onInputChange}
              disabled={true} // Email should not be editable
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={onInputChange}
              disabled={!isEditing || loading}
              placeholder="Enter your phone number"
              className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-300 disabled:bg-gray-50 ${
                errors?.phone
                  ? "border-red-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  : "border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              }`}
            />
          </div>
          {errors?.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <textarea
              name="address"
              value={formData.address}
              onChange={onInputChange}
              disabled={!isEditing || loading}
              placeholder="Enter your address"
              rows="3"
              className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-300 disabled:bg-gray-50 resize-none ${
                errors?.address
                  ? "border-red-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  : "border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              }`}
            />
          </div>
          {errors?.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      {isEditing && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-3 mt-6"
        >
          <button
            onClick={onSave}
            disabled={loading}
            className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:shadow-lg"
            } text-white`}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300"
          >
            Cancel
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default PersonalInfoForm;
