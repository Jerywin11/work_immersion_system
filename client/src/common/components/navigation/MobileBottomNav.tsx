import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface NavItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  path?: string;
  badgeCount?: number;
  onClick?: () => void;
}

interface MobileBottomNavProps {
  navItems: NavItem[];
  className?: string;
}

const MobileBottomNav = ({
  navItems,
  className = "",
}: MobileBottomNavProps) => {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      setVisible(currentScroll <= lastScroll || currentScroll <= 0);
      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleItemClick = (item: NavItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <div
      className={`lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      } ${className}`}
    >
      <div className="flex justify-around items-center py-3">
        {navItems.map((item) => (
          <NavButton
            key={item.name}
            item={item}
            onClick={() => handleItemClick(item)}
          />
        ))}
      </div>
    </div>
  );
};

interface NavButtonProps {
  item: NavItem;
  onClick: () => void;
}

const NavButton = ({ item, onClick }: NavButtonProps) => {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center text-xs w-full"
    >
      <div className="relative">
        <Icon className="w-6 h-6 text-gray-700" />
        {item.badgeCount && item.badgeCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {item.badgeCount}
          </span>
        )}
      </div>
      <span className="mt-1 text-gray-700">{item.name}</span>
    </button>
  );
};

export default MobileBottomNav;
