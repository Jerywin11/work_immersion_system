// src/common/contexts/RoleProvider.tsx
import React from "react";
import { RoleContext } from "@/contexts/RoleContext";
import type { Role } from "@/hooks/Role";

export const RoleProvider = ({
  role,
  children,
}: {
  role: Role;
  children: React.ReactNode;
}) => {
  return <RoleContext.Provider value={role}>{children}</RoleContext.Provider>;
};
