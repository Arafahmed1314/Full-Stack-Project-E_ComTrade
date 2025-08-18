import { setUser } from "../../redux/userSlice";
// import { setUser } from "../redux/userSlice";
import toast from "react-hot-toast";
export async function authProvider(authData, url, dispatch, actionType, onSuccess) {
    let body = {};

    try {
        if (actionType === "login") {
            body = {
                email: authData.email,
                password: authData.password,
                logintype: "manual",
            };
        } else if (actionType === "register") {
            body = {
                name: authData.username,
                email: authData.email,
                password: authData.password,
                registrationType: "manual",
            };
        }

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(body),
        });
        const result = await response.json();
        if (response.ok) {
            // Set user in Redux state on successful login/register
            if (result.user && dispatch) {
                dispatch(setUser(result.user));
            }
            toast.success(result.message || "Authentication successful");

            // Call success callback if provided - added delay to ensure state is updated
            if (onSuccess) {
                console.log("Auth success - calling callback");
                setTimeout(() => {
                    onSuccess();
                }, 100);
            }

        } else {
            console.log("Authentication failed");
            toast.error(result.message || "Something went wrong");
        }
    } catch (error) {
        toast.error("Network or server error", error);
    }
    // Reduced delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500));
}
export async function logOut(dispatch) {
    try {
        const response = await fetch(`http://localhost:5000/api/auth/logout`, {
            method: "POST",
            credentials: "include",
        });
        const result = await response.json();
        if (response.ok) {
            // Clear Redux user state
            if (dispatch) {
                dispatch(setUser(null));
            }
            toast.success(result.message || "Logout successful");
        } else {
            toast.error(result.message || "Something went wrong");
        }
    } catch (error) {
        toast.error("Network or server error", error);
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
}
