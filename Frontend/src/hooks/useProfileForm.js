import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import { profileAPI, validateProfileData } from "../utils/profileAPI";
import toast from "react-hot-toast";

export const useProfileForm = () => {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        avatar: ""
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        console.log('useProfileForm: user changed in Redux:', {
            ...user,
            avatar: user?.avatar ? 'base64 image' : null
        });

        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                address: user.address || "",
                avatar: user.avatar || ""
            });

            console.log('useProfileForm: form data updated:', {
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                address: user.address || "",
                avatar: user.avatar ? 'base64 image' : ""
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ""
            });
        }
    };

    const handleAvatarUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            setErrors({
                ...errors,
                avatar: 'Please select a valid image file (JPEG, PNG, GIF, or WebP)'
            });
            return;
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            setErrors({
                ...errors,
                avatar: 'Image size must be less than 5MB'
            });
            return;
        }

        setLoading(true);
        setErrors({
            ...errors,
            avatar: ""
        });

        try {
            // Convert to base64
            const base64 = await convertFileToBase64(file);

            // Update form data with base64 image
            setFormData({
                ...formData,
                avatar: base64
            });

            // Auto-save avatar immediately
            const result = await profileAPI.updateProfile({
                name: formData.name,
                avatar: base64,
                phone: formData.phone,
                address: formData.address,
            });

            if (result.success) {
                dispatch(setUser(result.user));
                toast.success('Avatar updated successfully!');
            } else {
                throw new Error(result.error || 'Failed to update avatar');
            }

            setLoading(false);
        } catch (error) {
            setLoading(false);
            setErrors({
                ...errors,
                avatar: 'Failed to upload avatar. Please try again.'
            });
            toast.error('Failed to upload avatar. Please try again.');
            console.error('Avatar upload error:', error);
        }
    };

    // Helper function to convert file to base64 with compression
    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            img.onload = () => {
                // Set max dimensions
                const MAX_WIDTH = 400;
                const MAX_HEIGHT = 400;

                let { width, height } = img;

                // Calculate new dimensions
                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height = (height * MAX_WIDTH) / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width = (width * MAX_HEIGHT) / height;
                        height = MAX_HEIGHT;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                // Draw and compress
                ctx.drawImage(img, 0, 0, width, height);
                const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8); // 80% quality
                resolve(compressedBase64);
            };

            img.onerror = () => reject(new Error('Failed to load image'));
            img.src = URL.createObjectURL(file);
        });
    };

    const saveProfile = async () => {
        // Validate form data
        const validation = validateProfileData(formData);
        if (!validation.isValid) {
            setErrors(validation.errors);
            return { success: false, errors: validation.errors };
        }

        setLoading(true);
        setErrors({});

        try {
            console.log('Sending profile update:', {
                name: formData.name,
                avatar: formData.avatar ? 'base64 image' : null,
                phone: formData.phone,
                address: formData.address,
            });

            const result = await profileAPI.updateProfile({
                name: formData.name,
                avatar: formData.avatar,
                phone: formData.phone,
                address: formData.address,
            });

            console.log('Profile update result:', {
                ...result,
                user: result.user ? { ...result.user, avatar: result.user.avatar ? 'base64 image' : null } : null
            });

            if (result.success) {
                // Update Redux store with new user data
                console.log('Updating Redux store with user:', {
                    ...result.user,
                    avatar: result.user.avatar ? 'base64 image' : null
                });
                dispatch(setUser(result.user));
                setLoading(false);
                return { success: true, message: result.message };
            } else {
                setLoading(false);
                return { success: false, error: result.error };
            }
        } catch (error) {
            setLoading(false);
            return { success: false, error: error.message };
        }
    };

    const resetForm = () => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                address: user.address || "",
                avatar: user.avatar || ""
            });
        }
        setErrors({});
    };

    return {
        formData,
        loading,
        errors,
        handleInputChange,
        handleAvatarUpload,
        saveProfile,
        resetForm
    };
};
