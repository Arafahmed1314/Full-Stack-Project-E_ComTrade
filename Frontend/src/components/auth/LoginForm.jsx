import React, { useState } from "react";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import SocialButtons from "./SocialButtons";

const LoginForm = ({ onSwitchToRegister }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Login data:", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6 lg:p-8 opacity-0 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 animate-slide-up">
          Welcome Back
        </h2>
        <p className="text-sm sm:text-base text-gray-600 animate-fade-in-delay">
          Sign in to your account to continue
        </p>
      </div>

      {/* Social Login */}
      <SocialButtons />

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-3 bg-white text-gray-500 font-medium">
            Or continue with username
          </span>
        </div>
      </div>

      {/* Login Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-6"
      >
        {/* Username Field */}
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              className={`w-full pl-10 pr-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.username
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200 bg-gray-50/50 hover:bg-white focus:bg-white"
              } text-gray-900 placeholder-gray-500`}
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message:
                    "Username can only contain letters, numbers, and underscores",
                },
              })}
            />
          </div>
          {errors.username && (
            <p className="mt-1 text-sm text-red-600 animate-shake">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className={`w-full pl-10 pr-12 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.password
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200 bg-gray-50/50 hover:bg-white focus:bg-white"
              } text-gray-900 placeholder-gray-500`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600 animate-shake">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              {...register("rememberMe")}
            />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <button
            type="button"
            className="text-sm text-blue-600 hover:text-blue-500 font-medium transition-colors text-left sm:text-right"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2.5 sm:py-3 px-4 font-semibold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 relative overflow-hidden hover:scale-[1.02] active:scale-[0.98] ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          }`}
        >
          {isSubmitting && (
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}
          <span className={isSubmitting ? "opacity-0" : "opacity-100"}>
            Sign In
          </span>
        </button>
      </form>

      {/* Switch to Register */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={onSwitchToRegister}
            className="text-blue-600 hover:text-blue-500 font-semibold transition-colors"
          >
            Sign up for free
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
