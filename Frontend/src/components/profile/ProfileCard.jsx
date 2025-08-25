import React from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Star,
  Crown,
} from "lucide-react";

const ProfileCard = ({ user, isEditing, formData, onInputChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
    >
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <User className="w-5 h-5 text-indigo-600" />
        Profile Information
      </h3>

      <div className="space-y-4">
        {/* Name */}
        <div className="group">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onInputChange}
              disabled={!isEditing}
              placeholder="Enter your full name"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Email */}
        <div className="group">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
            {user?.emailVerified && (
              <span className="ml-2 inline-flex items-center gap-1 px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                <Star className="w-3 h-3" />
                Verified
              </span>
            )}
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="email"
              value={user?.email || ""}
              disabled={true}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 cursor-not-allowed text-gray-600"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
        </div>

        {/* Phone */}
        <div className="group">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={onInputChange}
              disabled={!isEditing}
              placeholder="Enter your phone number"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Address */}
        <div className="group">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
            <textarea
              name="address"
              value={formData.address}
              onChange={onInputChange}
              disabled={!isEditing}
              placeholder="Enter your address"
              rows="3"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 disabled:bg-gray-50 disabled:cursor-not-allowed resize-none"
            />
          </div>
        </div>
      </div>

      {/* Account Stats */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Shield className="w-4 h-4 text-indigo-600" />
          Account Details
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
            <Calendar className="w-4 h-4 text-blue-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Member Since</p>
              <p className="text-xs text-gray-600">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "Not available"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
            <Crown className="w-4 h-4 text-purple-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Account Type</p>
              <p className="text-xs text-gray-600">
                {user?.googleId ? "Google Account" : "Regular Account"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
