// src/hooks/useLoginForm.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "@/services/authService";
import { useAuthStore } from "@/store/useAuthStore";

export function useLoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const setUser = useAuthStore((state) => state.setUser);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const data = await loginService(email, password);
            setUser({
                id: data.id,
                email: data.email,
                role: data.role,
                status: data.status,
            });
            navigate("/app/dashboard");
        } catch (err: any) {
            setError(err.message);
            setTimeout(() => setError(null), 5000);
        } finally {
            setLoading(false);
        }
    };

    return {
        email,
        password,
        loading,
        error,
        onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
        onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
        onSubmit,
    };
}
