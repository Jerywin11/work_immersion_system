import { useRoleType } from "@/hooks/Role";
import {
  HomeIcon,
  DocumentTextIcon,
  UserIcon,
  UsersIcon,
  ChartBarIcon,
  CameraIcon,
  DocumentCheckIcon,
  IdentificationIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export interface NavItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  badgeCount?: number;
}

export function useMobileNavItems(): NavItem[] {
  const roleArray = useRoleType();
  const role = roleArray[0];

  const commonItems: NavItem[] = [
    {
      name: "Dashboard",
      icon: HomeIcon,
      path: `/app/dashboard`,
    },
    {
      name: "Profile",
      icon: UserIcon,
      path: `/app/profile`,
    },
    {
      name: "Requirements",
      icon: DocumentCheckIcon,
      path: "/app/requirements",
      badgeCount: 2,
    },
    {
      name: "Evaluation",
      icon: ChartBarIcon,
      path: "/app/evaluation",
    },
  ];

  switch (role) {
    case "student":
      return [
        ...commonItems,
        {
          name: "Daily Reports",
          icon: CameraIcon,
          path: "/app/student/daily-reports",
        },
        {
          name: "Time Logs",
          icon: ClockIcon,
          path: "/app/student/time-logs",
        },
      ];

    case "coordinator":
      return [
        ...commonItems,
        {
          name: "Students",
          icon: UsersIcon,
          path: "/app/students",
        },
        {
          name: "Progress Reports",
          icon: DocumentTextIcon,
          path: "/app/coordinator/progress-reports",
        },
        {
          name: "Certificates",
          icon: IdentificationIcon,
          path: "/app/coordinator/certificates",
        },
      ];

    case "partner_industry":
      return [
        ...commonItems,
        {
          name: "Interns",
          icon: UsersIcon,
          path: "/app/students",
        },
        {
          name: "Time Logs",
          icon: ClockIcon,
          path: "/app/partner_industry/time-logs",
        },
        {
          name: "Analytics",
          icon: ChartBarIcon,
          path: "/app/partner_industry/analytics",
        },
      ];

    default:
      return commonItems;
  }
}
