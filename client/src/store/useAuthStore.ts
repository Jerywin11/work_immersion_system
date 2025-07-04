// src/store/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Role = string;

export interface User {
    id: number;
    email: string;
    role: Role;
    status: string;
}

interface AuthState {
    user: User | null;
    setUser: (user: User | null) => void;
    clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            clearUser: () => set({ user: null }),
        }),
        {
            name: "auth-storage",
        }
    )
);
