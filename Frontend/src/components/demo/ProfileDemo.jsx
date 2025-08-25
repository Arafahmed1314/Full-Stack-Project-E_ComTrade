import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/userSlice";
import ProfileSection from "../profile/ProfileSection";

// Demo component to show profile with sample data
const ProfileDemo = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Set sample user data for demo
    const sampleUser = {
      _id: "demo-user-123",
      name: "John Doe",
      email: "john.doe@example.com",
      emailVerified: true,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      createdAt: "2024-01-15T10:30:00Z",
      lastLogin: "2025-08-25T08:15:00Z",
      googleId: null, // Regular user, not Google
      isActive: true,
    };

    dispatch(setUser(sampleUser));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <ProfileSection />
    </div>
  );
};

export default ProfileDemo;
