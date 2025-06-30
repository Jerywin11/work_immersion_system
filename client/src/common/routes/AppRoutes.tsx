// src/common/routes/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";

import Layout from "@/common/components/Layout";
import Dashboard from "@/features/dashboard/pages/Dashboard";
import NotFound from "@/features/not-found/pages/NotFound";
import Profile from "@/features/profile/pages/Profile";
import Requirements from "@/features/requirements/pages/Requirements";
import Evaluation from "@/features/evaluation/pages/Evaluation";
import Landing from "@/features/home/Landing";
import { RoleProvider } from "@/provider/RoleProvider";
import { useRoleType } from "@/hooks/Role";

import { ProtectedRoute } from "@/common/components/navigation/ProtectedRoute";
import StudentDashboard from "@/features/pages/Student";

import { useAuthWebSocket } from "@/hooks/websocket/Websocket";
export function AppRoutes() {
  const roleArray = useRoleType();
  const role = roleArray[0];
  useAuthWebSocket();
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <RoleProvider role={role}>
              <Layout />
            </RoleProvider>
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="requirements" element={<Requirements />} />
        <Route path="evaluation" element={<Evaluation />} />
        <Route path="students" element={<StudentDashboard />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
