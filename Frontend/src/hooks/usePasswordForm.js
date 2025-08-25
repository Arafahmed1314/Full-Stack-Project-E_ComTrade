import { useState } from "react";
import { profileAPI, validatePasswordData } from "../utils/profileAPI";

export const usePasswordForm = () => {
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({
            ...passwordData,
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

    const toggleCurrentPasswordVisibility = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const changePassword = async () => {
        // Validate password data
        const validation = validatePasswordData(passwordData);
        if (!validation.isValid) {
            setErrors(validation.errors);
            return { success: false, errors: validation.errors };
        }

        setLoading(true);
        setErrors({});

        try {
            const result = await profileAPI.changePassword(passwordData);
            setLoading(false);

            if (result.success) {
                resetPasswordForm();
                return { success: true, message: result.message };
            } else {
                return { success: false, error: result.error };
            }
        } catch (error) {
            setLoading(false);
            return { success: false, error: error.message };
        }
    };

    const resetPasswordForm = () => {
        setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        });
        setShowCurrentPassword(false);
        setShowNewPassword(false);
        setErrors({});
    };

    return {
        passwordData,
        showCurrentPassword,
        showNewPassword,
        loading,
        errors,
        handlePasswordChange,
        toggleCurrentPasswordVisibility,
        toggleNewPasswordVisibility,
        changePassword,
        resetPasswordForm
    };
};
