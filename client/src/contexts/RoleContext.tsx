// src/common/contexts/RoleContext.ts
import { createContext, useContext } from "react";
import type { Role } from "@/hooks/Role";

export const RoleContext = createContext<Role>("student");
export const useRole = () => useContext(RoleContext);
