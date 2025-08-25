import React from "react";
import { motion } from "framer-motion";
import { User, Camera, Crown, Star, Edit3, X, Loader } from "lucide-react";

const ProfileHeader = ({
  user,
  formData,
  isEditing,
  loading,
  onEditToggle,
  onAvatarUpload,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 mb-8 shadow-2xl"
    >
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Avatar Section */}
          <div className="relative group">
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-500 p-1 shadow-xl">
              <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
                {formData.avatar ? (
                  <img
                    src={formData.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-16 h-16 text-gray-400" />
                )}
                {loading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full">
                    <Loader className="w-8 h-8 text-white animate-spin" />
                  </div>
                )}
              </div>
            </div>
            <label
              className={`absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                loading ? "pointer-events-none opacity-50" : ""
              }`}
            >
              <Camera className="w-4 h-4 text-gray-600" />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={onAvatarUpload}
                disabled={loading}
              />
            </label>
            {user?.emailVerified && (
              <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
                <Crown className="w-4 h-4 text-white" />
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center justify-center md:justify-start gap-2">
              {user?.name || "Your Name"}
              {user?.emailVerified && (
                <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
              )}
            </h1>
            <p className="text-white/80 text-lg mb-4">{user?.email}</p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                {user?.emailVerified ? "Verified Account" : "Unverified"}
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                {user?.googleId ? "Google User" : "Regular User"}
              </span>
            </div>
          </div>

          {/* Action Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEditToggle}
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 flex items-center gap-2"
          >
            {isEditing ? (
              <X className="w-4 h-4" />
            ) : (
              <Edit3 className="w-4 h-4" />
            )}
            {isEditing ? "Cancel" : "Edit Profile"}
          </motion.button>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-white to-transparent rounded-full blur-3xl"></div>
      </div>
    </motion.div>
  );
};

export default ProfileHeader;
