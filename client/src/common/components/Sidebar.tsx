import React from "react";
import { Link, useLocation } from "react-router-dom";
import type { NavItem } from "@/hooks/NavItems";
import { useMobileNavItems } from "@/hooks/NavItems";

interface SidebarProps {
  sidebarTitle?: string;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  sidebarTitle = "Sidebar",
  className = "border border-gray-200 p-6 rounded-lg",
}) => {
  const location = useLocation();
  const items: NavItem[] = useMobileNavItems();

  return (
    <aside className={`bg-white ${className}`}>
      <div className="px-4 py-5 sm:px-6 border border-gray-200">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          {sidebarTitle}
        </h3>
      </div>

      <nav className="space-y-1">
        {items.map(({ name, icon: Icon, path, badgeCount }) => {
          const isActive = location.pathname === path;

          return (
            <Link
              key={name}
              to={path}
              className={`group border-l-4 px-3 py-2 flex items-center text-sm font-medium ${
                isActive
                  ? "bg-blue-50 border-blue-500 text-blue-700"
                  : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon
                className={`mr-3 h-5 w-5 ${
                  isActive
                    ? "text-blue-500 group-hover:text-blue-700"
                    : "text-gray-400 group-hover:text-gray-500"
                }`}
              />
              <span className="flex-1">{name}</span>
              {badgeCount && badgeCount > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                  {badgeCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
