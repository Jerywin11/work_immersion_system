import { useAuthStore } from "@/store/useAuthStore";

export function useRoleType() {
    const user = useAuthStore((state) => state.user);

    if (user?.role) {

        return [user.role] as const;
    }

    return ["student"] as const;
}

export type Role = (ReturnType<typeof useRoleType>)[number];
