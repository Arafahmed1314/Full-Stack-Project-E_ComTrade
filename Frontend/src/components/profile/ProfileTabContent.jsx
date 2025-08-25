import React from "react";
import { motion } from "framer-motion";
import PersonalInfoForm from "./PersonalInfoForm";
import AccountStats from "./AccountStats";

const ProfileTabContent = ({
  user,
  formData,
  isEditing,
  loading,
  errors,
  onInputChange,
  onSave,
  onCancel,
}) => {
  return (
    <motion.div
      key="profile"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="grid md:grid-cols-2 gap-8"
    >
      <PersonalInfoForm
        formData={formData}
        isEditing={isEditing}
        loading={loading}
        errors={errors}
        onInputChange={onInputChange}
        onSave={onSave}
        onCancel={onCancel}
      />

      <AccountStats user={user} />
    </motion.div>
  );
};

export default ProfileTabContent;
