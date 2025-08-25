import React from "react";
import ProtectedRoute from "../components/common/ProtectedRoute";
import ProfileSection from "../components/profile/ProfileSection";

const ProfilePage = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <ProfileSection />
      </div>
    </ProtectedRoute>
  );
};

export default ProfilePage;
