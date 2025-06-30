import type { ReactNode } from "react";
import Sidebar from "@/common/components/Sidebar";

interface LayoutGridProps {
  mainContent: ReactNode;
  sidebarTitle?: string;
  className?: string;
  sidebarTopOffset?: string;
}

const LayoutGrid = ({
  mainContent,
  className = "",
  sidebarTopOffset = "90px",
}: LayoutGridProps) => {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-8 gap-6">
        {/* Left Sidebar - spans 2 columns */}
        <div className="lg:col-span-2">
          <div
            className="sticky top-[20px] bg-white shadow rounded-lg h-fit"
            style={{ top: sidebarTopOffset }}
          >
            <Sidebar />
          </div>
        </div>

        {/* Right Main Content - spans 6 columns */}
        <div
          className="lg:col-span-6 mt-8 border border-gray-200 p-6 rounded-lg"
          style={{ top: sidebarTopOffset }}
        >
          {mainContent}
        </div>
      </div>
    </div>
  );
};

export default LayoutGrid;
