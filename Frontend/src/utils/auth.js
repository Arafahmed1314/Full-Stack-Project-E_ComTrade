import { setUser } from "../../redux/userSlice";
import toast from "react-hot-toast";
export async function authProvider(authData, url, dispatch) {
    try {
        const body = {
            name: authData.username,
            email: authData.email,
            password: authData.password,
            registrationType: "manual",
        };
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(body),
        });
        const result = await response.json();
        if (response.ok) {
            dispatch(setUser(result.user));
            toast.success(result.message || "Registration successful");
        } else {
            console.log("user already exist");
            toast.error(result.message || "Something went wrong");
        }
    } catch (error) {
        toast.error("Network or server error", error);
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
}