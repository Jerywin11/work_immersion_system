import { createContext, useState, type ReactNode } from "react";
import type { Role } from "@/store/useAuthStore"; // adjust path as needed

interface User {
  id: number;
  email: string;
  role: Role;
  status: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
