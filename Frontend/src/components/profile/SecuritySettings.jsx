import React from "react";
import { Shield, Key, Eye, EyeOff, Save } from "lucide-react";
import { motion } from "framer-motion";

const SecuritySettings = ({
  user,
  isChangingPassword,
  passwordData,
  showCurrentPassword,
  showNewPassword,
  loading,
  errors,
  onPasswordChange,
  onPasswordUpdate,
  onTogglePasswordChange,
  onToggleCurrentPasswordVisibility,
  onToggleNewPasswordVisibility,
  onCancelPasswordChange,
}) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Shield className="w-5 h-5 text-indigo-600" />
          Security Settings
        </h3>

        {user?.googleId ? (
          <GoogleAccountSecurity />
        ) : (
          <RegularAccountSecurity
            isChangingPassword={isChangingPassword}
            passwordData={passwordData}
            showCurrentPassword={showCurrentPassword}
            showNewPassword={showNewPassword}
            loading={loading}
            errors={errors}
            onPasswordChange={onPasswordChange}
            onPasswordUpdate={onPasswordUpdate}
            onTogglePasswordChange={onTogglePasswordChange}
            onToggleCurrentPasswordVisibility={
              onToggleCurrentPasswordVisibility
            }
            onToggleNewPasswordVisibility={onToggleNewPasswordVisibility}
            onCancelPasswordChange={onCancelPasswordChange}
          />
        )}
      </div>
    </div>
  );
};

const GoogleAccountSecurity = () => (
  <div className="text-center py-8">
    <div className="w-20 h-20 bg-gradient-to-tr from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
      <Shield className="w-10 h-10 text-white" />
    </div>
    <h4 className="text-lg font-medium text-gray-900 mb-2">
      Google Account Security
    </h4>
    <p className="text-gray-600 mb-4">
      Your account is secured by Google. Password management is handled by
      Google.
    </p>
    <button className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300">
      Manage Google Security
    </button>
  </div>
);

const RegularAccountSecurity = ({
  isChangingPassword,
  passwordData,
  showCurrentPassword,
  showNewPassword,
  loading,
  errors,
  onPasswordChange,
  onPasswordUpdate,
  onTogglePasswordChange,
  onToggleCurrentPasswordVisibility,
  onToggleNewPasswordVisibility,
  onCancelPasswordChange,
}) => (
  <div className="space-y-6">
    {/* Password Security Status */}
    <div className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-200">
      <div className="flex items-center gap-3">
        <Key className="w-5 h-5 text-amber-600" />
        <div>
          <p className="font-medium text-amber-900">Password Security</p>
          <p className="text-sm text-amber-700">Last changed: Never</p>
        </div>
      </div>
    </div>

    {/* Change Password Section */}
    {!isChangingPassword ? (
      <button
        onClick={onTogglePasswordChange}
        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
      >
        <Key className="w-4 h-4" />
        Change Password
      </button>
    ) : (
      <PasswordChangeForm
        passwordData={passwordData}
        showCurrentPassword={showCurrentPassword}
        showNewPassword={showNewPassword}
        loading={loading}
        errors={errors}
        onPasswordChange={onPasswordChange}
        onPasswordUpdate={onPasswordUpdate}
        onToggleCurrentPasswordVisibility={onToggleCurrentPasswordVisibility}
        onToggleNewPasswordVisibility={onToggleNewPasswordVisibility}
        onCancelPasswordChange={onCancelPasswordChange}
      />
    )}
  </div>
);

const PasswordChangeForm = ({
  passwordData,
  showCurrentPassword,
  showNewPassword,
  loading,
  errors,
  onPasswordChange,
  onPasswordUpdate,
  onToggleCurrentPasswordVisibility,
  onToggleNewPasswordVisibility,
  onCancelPasswordChange,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Current Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Current Password
        </label>
        <div className="relative">
          <input
            type={showCurrentPassword ? "text" : "password"}
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={onPasswordChange}
            disabled={loading}
            className={`w-full px-4 py-3 pr-10 rounded-xl border transition-all duration-300 disabled:bg-gray-50 ${
              errors?.currentPassword
                ? "border-red-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                : "border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            }`}
          />
          <button
            type="button"
            onClick={onToggleCurrentPasswordVisibility}
            disabled={loading}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed"
          >
            {showCurrentPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
        {errors?.currentPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>
        )}
      </div>

      {/* New Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          New Password
        </label>
        <div className="relative">
          <input
            type={showNewPassword ? "text" : "password"}
            name="newPassword"
            value={passwordData.newPassword}
            onChange={onPasswordChange}
            disabled={loading}
            className={`w-full px-4 py-3 pr-10 rounded-xl border transition-all duration-300 disabled:bg-gray-50 ${
              errors?.newPassword
                ? "border-red-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                : "border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            }`}
          />
          <button
            type="button"
            onClick={onToggleNewPasswordVisibility}
            disabled={loading}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed"
          >
            {showNewPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
        {errors?.newPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
        )}
      </div>

      {/* Confirm New Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Confirm New Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={passwordData.confirmPassword}
          onChange={onPasswordChange}
          disabled={loading}
          className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 disabled:bg-gray-50 ${
            errors?.confirmPassword
              ? "border-red-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              : "border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          }`}
        />
        {errors?.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onPasswordUpdate}
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
              Updating...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Update Password
            </>
          )}
        </button>
        <button
          onClick={onCancelPasswordChange}
          disabled={loading}
          className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </div>
    </motion.div>
  );
};

export default SecuritySettings;
