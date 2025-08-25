import React from "react";
import { Calendar, User, Shield } from "lucide-react";

const AccountStats = ({ user }) => {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-indigo-600" />
        Account Information
      </h3>

      <div className="space-y-6">
        {/* Account Status */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
          <div>
            <p className="font-medium text-gray-900">Account Status</p>
            <p className="text-sm text-gray-600">Your account is active</p>
          </div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>

        {/* Member Since */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
          <div>
            <p className="font-medium text-gray-900">Member Since</p>
            <p className="text-sm text-gray-600">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "Not available"}
            </p>
          </div>
          <Calendar className="w-5 h-5 text-blue-500" />
        </div>

        {/* Last Login */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
          <div>
            <p className="font-medium text-gray-900">Last Login</p>
            <p className="text-sm text-gray-600">
              {user?.lastLogin
                ? new Date(user.lastLogin).toLocaleDateString()
                : "Not available"}
            </p>
          </div>
          <User className="w-5 h-5 text-purple-500" />
        </div>

        {/* Registration Type */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
          <div>
            <p className="font-medium text-gray-900">Registration Type</p>
            <p className="text-sm text-gray-600">
              {user?.googleId ? "Google Account" : "Email Registration"}
            </p>
          </div>
          <Shield className="w-5 h-5 text-yellow-500" />
        </div>
      </div>
    </div>
  );
};

export default AccountStats;
