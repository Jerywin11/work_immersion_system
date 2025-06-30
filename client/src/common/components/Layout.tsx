import React from "react";
import { Outlet } from "react-router-dom";
import { useRouteProgress } from "@/hooks/useRouteProgress";

const Layout: React.FC = () => (
  useRouteProgress(),
  (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <main className="flex-1 w-full">
          {/* Remove padding here - it will be handled by individual pages/components */}
          <div className="w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
);

export default Layout;
