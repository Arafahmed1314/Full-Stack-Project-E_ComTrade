import { setUser } from '../../redux/userSlice';

export async function checkAuth(dispatch) {
    try {
        const res = await fetch(`http://localhost:5000/api/auth/verify-token`, {
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
