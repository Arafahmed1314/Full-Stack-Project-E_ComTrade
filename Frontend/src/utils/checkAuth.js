/* eslint-disable no-unused-vars */
import { setUser } from '../../redux/userSlice';

export async function checkAuth(dispatch) {
    try {
        const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await fetch(`${API_BASE_URL}/api/auth/verify-token`, {
            credentials: "include", // Send cookies
        });
        const data = await res.json();

        if (res.ok) {
            dispatch(setUser(data.user));

        } else {
            dispatch(setUser(null));
        }
    } catch (err) {
        dispatch(setUser(null));
    }
}
