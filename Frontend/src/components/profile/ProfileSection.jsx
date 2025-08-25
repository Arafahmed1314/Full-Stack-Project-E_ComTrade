import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";

// Import custom hooks
import { useProfileForm } from "../../hooks/useProfileForm";
import { usePasswordForm } from "../../hooks/usePasswordForm";

// Import components
import ProfileHeader from "./ProfileHeader";
import TabNavigation from "./TabNavigation";
import ProfileTabContent from "./ProfileTabContent";
import SecuritySettings from "./SecuritySettings";
import PreferencesSettings from "./PreferencesSettings";

const ProfileSection = () => {
  const user = useSelector((state) => state.user.user);

  // State management
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  // Custom hooks for form management
  const {
    formData,
    loading: profileLoading,
    errors: profileErrors,
    handleInputChange,
    handleAvatarUpload,
    saveProfile,
    resetForm,
  } = useProfileForm();

  const {
    passwordData,
    showCurrentPassword,
    showNewPassword,
    loading: passwordLoading,
    errors: passwordErrors,
    handlePasswordChange,
    toggleCurrentPasswordVisibility,
    toggleNewPasswordVisibility,
    changePassword,
    resetPasswordForm,
  } = usePasswordForm();

  // Event handlers
  const handleEditToggle = () => {
    if (isEditing) {
      resetForm(); // Reset form data if canceling edit
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    const result = await saveProfile();
    if (result.success) {
      setIsEditing(false);
    }
    // Error handling is done in the hook via toast
  };

  const handleCancel = () => {
    resetForm();
    setIsEditing(false);
  };

  const handlePasswordUpdate = async () => {
    const result = await changePassword();
    if (result.success) {
      setIsChangingPassword(false);
    }
    // Error handling is done in the hook via toast
  };

  const handleTogglePasswordChange = () => {
    setIsChangingPassword(!isChangingPassword);
    if (isChangingPassword) {
      resetPasswordForm();
    }
  };

  const handleCancelPasswordChange = () => {
    setIsChangingPassword(false);
    resetPasswordForm();
  };

  const handleSavePreferences = () => {
    // TODO: Implement API call to save preferences
    console.log("Saving preferences");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <ProfileTabContent
            user={user}
            formData={formData}
            isEditing={isEditing}
            loading={profileLoading}
            errors={profileErrors}
            onInputChange={handleInputChange}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        );

      case "security":
        return (
          <motion.div
            key="security"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <SecuritySettings
              user={user}
              isChangingPassword={isChangingPassword}
              passwordData={passwordData}
              showCurrentPassword={showCurrentPassword}
              showNewPassword={showNewPassword}
              loading={passwordLoading}
              errors={passwordErrors}
              onPasswordChange={handlePasswordChange}
              onPasswordUpdate={handlePasswordUpdate}
              onTogglePasswordChange={handleTogglePasswordChange}
              onToggleCurrentPasswordVisibility={
                toggleCurrentPasswordVisibility
              }
              onToggleNewPasswordVisibility={toggleNewPasswordVisibility}
              onCancelPasswordChange={handleCancelPasswordChange}
            />
          </motion.div>
        );

      case "preferences":
        return (
          <motion.div
            key="preferences"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <PreferencesSettings onSavePreferences={handleSavePreferences} />
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Profile Header */}
      <ProfileHeader
        user={user}
        formData={formData}
        isEditing={isEditing}
        loading={profileLoading}
        onEditToggle={handleEditToggle}
        onAvatarUpload={handleAvatarUpload}
      />

      {/* Tab Navigation */}
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      <AnimatePresence mode="wait">{renderTabContent()}</AnimatePresence>
    </div>
  );
};

export default ProfileSection;
