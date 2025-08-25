import toast from "react-hot-toast";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// API utility for profile management
export const profileAPI = {
    // Get user profile
    getProfile: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch profile');
            }

            return {
                success: true,
                user: data.user,
                message: data.message
            };
        } catch (error) {
            console.error('Get profile error:', error);
            toast.error(error.message || 'Failed to load profile');
            return {
                success: false,
                error: error.message
            };
        }
    },

    // Update user profile
    updateProfile: async (profileData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profileData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to update profile');
            }

            toast.success(data.message || 'Profile updated successfully');
            return {
                success: true,
                user: data.user,
                message: data.message
            };
        } catch (error) {
            console.error('Update profile error:', error);
            toast.error(error.message || 'Failed to update profile');
            return {
                success: false,
                error: error.message
            };
        }
    },

    // Change password
    changePassword: async (passwordData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/user/profile/change-password`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to change password');
            }

            toast.success(data.message || 'Password changed successfully');
            return {
                success: true,
                message: data.message
            };
        } catch (error) {
            console.error('Change password error:', error);
            toast.error(error.message || 'Failed to change password');
            return {
                success: false,
                error: error.message
            };
        }
    },

    // Upload avatar (if you want to implement file upload)
    uploadAvatar: async (file) => {
        try {
            const formData = new FormData();
            formData.append('avatar', file);

            const response = await fetch(`${API_BASE_URL}/api/user/profile/avatar`, {
                method: 'POST',
                credentials: 'include',
                body: formData, // Don't set Content-Type header for FormData
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to upload avatar');
            }

            toast.success(data.message || 'Avatar updated successfully');
            return {
                success: true,
                avatarUrl: data.avatarUrl,
                message: data.message
            };
        } catch (error) {
            console.error('Upload avatar error:', error);
            toast.error(error.message || 'Failed to upload avatar');
            return {
                success: false,
                error: error.message
            };
        }
    }
};

// Utility function for form validation
export const validateProfileData = (formData) => {
    const errors = {};

    if (!formData.name || formData.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters long';
    }

    if (formData.phone && !/^\+?[\d\s\-()]+$/.test(formData.phone)) {
        errors.phone = 'Please enter a valid phone number';
    }

    if (formData.address && formData.address.trim().length < 5) {
        errors.address = 'Address must be at least 5 characters long';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

// Utility function for password validation
export const validatePasswordData = (passwordData) => {
    const errors = {};

    if (!passwordData.currentPassword) {
        errors.currentPassword = 'Current password is required';
    }

    if (!passwordData.newPassword) {
        errors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 6) {
        errors.newPassword = 'New password must be at least 6 characters long';
    }

    if (!passwordData.confirmPassword) {
        errors.confirmPassword = 'Please confirm your new password';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }

    if (passwordData.currentPassword === passwordData.newPassword) {
        errors.newPassword = 'New password must be different from current password';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

// Utility function for handling API errors
export const handleAPIError = (error, defaultMessage = 'An error occurred') => {
    console.error('API Error:', error);

    if (error.response) {
        // Server responded with error status
        const message = error.response.data?.message || defaultMessage;
        toast.error(message);
        return message;
    } else if (error.request) {
        // Network error
        const message = 'Network error. Please check your connection.';
        toast.error(message);
        return message;
    } else {
        // Other error
        const message = error.message || defaultMessage;
        toast.error(message);
        return message;
    }
};
