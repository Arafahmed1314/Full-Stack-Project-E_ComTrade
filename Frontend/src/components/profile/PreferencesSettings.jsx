import React from "react";
import { Sparkles, Save } from "lucide-react";

const PreferencesSettings = ({ onSavePreferences }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          Preferences
        </h3>

        <div className="space-y-6">
          {/* Notification Preferences */}
          <NotificationPreferences />

          {/* Display Preferences */}
          <DisplayPreferences />

          {/* Save Button */}
          <button
            onClick={onSavePreferences}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

const NotificationPreferences = () => (
  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
    <h4 className="font-medium text-gray-900 mb-3">Notification Preferences</h4>
    <div className="space-y-3">
      <PreferenceToggle label="Email notifications" defaultChecked={true} />
      <PreferenceToggle label="Order updates" defaultChecked={true} />
      <PreferenceToggle label="Marketing emails" defaultChecked={false} />
    </div>
  </div>
);

const DisplayPreferences = () => (
  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
    <h4 className="font-medium text-gray-900 mb-3">Display Preferences</h4>
    <div className="space-y-3">
      <PreferenceToggle label="Dark mode" defaultChecked={false} />
      <div>
        <label className="block text-gray-700 mb-2">Language</label>
        <select className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
          <option>German</option>
        </select>
      </div>
    </div>
  </div>
);

const PreferenceToggle = ({ label, defaultChecked }) => (
  <label className="flex items-center justify-between">
    <span className="text-gray-700">{label}</span>
    <input
      type="checkbox"
      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
      defaultChecked={defaultChecked}
    />
  </label>
);

export default PreferencesSettings;
