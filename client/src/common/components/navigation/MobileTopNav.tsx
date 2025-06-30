import { useState } from "react";
import {
  MoonIcon,
  SunIcon,
  BellIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useLogout } from "@/hooks/useLogout";
const TopNavigation = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationCount] = useState(3); // Mock notification count
  const logout = useLogout();
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // You would typically also toggle a dark mode class on the document here
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand logo/name */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
              MNVTHS Immersion
            </span>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-1 rounded-full text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <SunIcon className="h-6 w-6" />
              ) : (
                <MoonIcon className="h-6 w-6" />
              )}
            </button>

            {/* Notifications */}
            <button className="p-1 rounded-full text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 relative focus:outline-none focus:ring-2 focus:ring-blue-500">
              <BellIcon className="h-6 w-6" />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
            {/* Profile */}
            <button className="p-1 rounded-full text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <UserCircleIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavigation;
