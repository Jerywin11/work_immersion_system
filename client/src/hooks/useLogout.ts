import { useNavigate } from "react-router-dom";

export function useLogout() {
    const navigate = useNavigate();

    const logout = async () => {
        try {
            const res = await fetch("http://localhost:3000/logout", {
                method: "POST",
                credentials: "include", // important to clear cookie
            });
            if (res.ok) {
                // Optionally clear any local user state/context here
                navigate("/"); // redirect to landing or login page
            } else {
                console.error("Logout failed");
            }
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    return logout;
}
