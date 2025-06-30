import LayoutGrid from "@/common/components/GridLayout";
import TopNavigation from "@/common/components/navigation/MobileTopNav";
import { useRole } from "@/contexts/RoleContext";

import {
  CheckCircleIcon,
  CalendarIcon,
  CameraIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

interface DashboardData {
  welcomeMessage: string;
  progress?: {
    title: string;
    current: number;
    total: number;
    percentage: number;
    nextCheckpoint?: string;
    daysUntilCheckpoint?: number;
  };
  tasks?: {
    title: string;
    due: string;
    completed: boolean;
  }[];
  events?: {
    title: string;
    date: string;
  }[];
  quickActions?: {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
  }[];
  stats?: {
    title: string;
    value: number | string;
    description: string;
    bgColor: string;
    textColor: string;
  }[];
}

const Dashboard = () => {
  const role = useRole();
  const getDashboardData = (): DashboardData => {
    switch (role) {
      case "student":
        return {
          welcomeMessage: "Welcome back, Student!",
          progress: {
            title: "Work Immersion Progress",
            current: 12,
            total: 30,
            percentage: 40,
            nextCheckpoint: "Mid-term Evaluation",
            daysUntilCheckpoint: 3,
          },
          tasks: [
            { title: "Submit daily report", due: "Today", completed: false },
            { title: "Upload work photos", due: "Tomorrow", completed: false },
            { title: "Self-evaluation form", due: "June 30", completed: true },
          ],
          events: [
            { title: "coordinator Meeting", date: "June 29, 10:00 AM" },
            { title: "Skills Workshop", date: "July 5, 1:00 PM" },
          ],
          quickActions: [
            { title: "Time In", icon: CalendarIcon, color: "primary" },
            { title: "Daily Report", icon: DocumentTextIcon, color: "success" },
            { title: "Upload Photos", icon: CameraIcon, color: "info" },
          ],
        };
      case "coordinator":
        return {
          welcomeMessage: "Welcome back, coordinator!",
          stats: [
            {
              title: "Students Supervised",
              value: 24,
              description: "Total this semester",
              bgColor: "bg-indigo-50",
              textColor: "text-indigo-800",
            },
            {
              title: "Current Interns",
              value: 8,
              description: "Active now",
              bgColor: "bg-emerald-50",
              textColor: "text-emerald-800",
            },
            {
              title: "Pending Evaluations",
              value: 3,
              description: "Need review",
              bgColor: "bg-amber-50",
              textColor: "text-amber-800",
            },
          ],
          tasks: [
            { title: "Review Juan's report", due: "Today", completed: false },
            {
              title: "Schedule evaluations",
              due: "Tomorrow",
              completed: false,
            },
            { title: "Submit monthly report", due: "June 30", completed: true },
          ],
          quickActions: [
            { title: "Add Student", icon: DocumentTextIcon, color: "primary" },
            {
              title: "Create Evaluation",
              icon: CheckCircleIcon,
              color: "success",
            },
            {
              title: "Generate Reports",
              icon: DocumentTextIcon,
              color: "secondary",
            },
          ],
        };
      case "partner_industry":
        return {
          welcomeMessage: "Welcome back, Tech Solutions Inc.!",
          stats: [
            {
              title: "Current Interns",
              value: 5,
              description: "Active now",
              bgColor: "bg-indigo-50",
              textColor: "text-indigo-800",
            },
            {
              title: "Available Slots",
              value: 3,
              description: "Remaining",
              bgColor: "bg-slate-50",
              textColor: "text-slate-800",
            },
            {
              title: "Pending Approvals",
              value: 2,
              description: "Applications",
              bgColor: "bg-amber-50",
              textColor: "text-amber-800",
            },
          ],
          events: [
            { title: "Orientation Day", date: "June 29, 9:00 AM" },
            { title: "Evaluation Deadline", date: "July 5, 5:00 PM" },
          ],
          quickActions: [
            {
              title: "Add Evaluation",
              icon: DocumentTextIcon,
              color: "primary",
            },
            { title: "View Interns", icon: DocumentTextIcon, color: "info" },
            {
              title: "Request More",
              icon: DocumentTextIcon,
              color: "secondary",
            },
          ],
        };
      default:
        return {
          welcomeMessage: "Welcome!",
        };
    }
  };

  const dashboardData = getDashboardData();

  return (
    <>
      <TopNavigation />

      <LayoutGrid
        sidebarTopOffset="100px"
        mainContent={
          <div className="space-y-6">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-md p-6 text-white">
              <h1 className="text-2xl font-bold">
                {dashboardData.welcomeMessage}
              </h1>
              {dashboardData.tasks && (
                <p className="mt-2 opacity-90">
                  You have{" "}
                  {dashboardData.tasks.filter((t) => !t.completed).length}{" "}
                  pending tasks today.
                </p>
              )}
            </div>

            {/* Progress or Stats Section */}
            {dashboardData.progress && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    {dashboardData.progress.title}
                  </h3>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-blue-700">
                        Days Completed
                      </span>
                      <span className="text-sm font-medium text-gray-500">
                        {dashboardData.progress.current}/
                        {dashboardData.progress.total} days
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{
                          width: `${dashboardData.progress.percentage}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-blue-800">
                        Next Checkpoint
                      </h4>
                      <p className="mt-1 text-lg font-semibold text-blue-900">
                        {dashboardData.progress.nextCheckpoint}
                      </p>
                      <p className="mt-1 text-sm text-blue-700">
                        in {dashboardData.progress.daysUntilCheckpoint} days
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-green-800">
                        Current Status
                      </h4>
                      <p className="mt-1 text-lg font-semibold text-green-900">
                        On Track
                      </p>
                      <p className="mt-1 text-sm text-green-700">
                        Keep up the good work!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {dashboardData.stats && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Overview
                  </h3>
                </div>
                <div className="p-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {dashboardData.stats.map((stat, index) => (
                    <div
                      key={index}
                      className={`${stat.bgColor} p-4 rounded-lg`}
                    >
                      <h4 className={`text-sm font-medium ${stat.textColor}`}>
                        {stat.title}
                      </h4>
                      <p className="mt-1 text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-sm text-gray-600">
                        {stat.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modified Tasks and Quick Actions Layout */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Tasks Section - now col-span-2 when coordinator */}
              <div className={role === "coordinator" ? "lg:col-span-2" : ""}>
                {dashboardData.tasks && (
                  <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
                    <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Your Tasks
                      </h3>
                    </div>
                    <div className="p-6">
                      <ul className="divide-y divide-gray-200">
                        {dashboardData.tasks.map((task, index) => (
                          <li key={index} className="py-3">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={task.completed}
                                readOnly
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <div className="ml-3">
                                <p
                                  className={`text-sm font-medium ${
                                    task.completed
                                      ? "text-gray-500 line-through"
                                      : "text-gray-900"
                                  }`}
                                >
                                  {task.title}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Due: {task.due}
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <button className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        View All Tasks
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Actions for coordinator - moved to right column */}
              {role === "coordinator" && dashboardData.quickActions && (
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
                    <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Quick Actions
                      </h3>
                    </div>
                    <div className="p-6 grid grid-cols-1 gap-4">
                      {dashboardData.quickActions.map((action, index) => {
                        const colorClasses = {
                          primary:
                            "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500",
                          secondary:
                            "bg-slate-600 hover:bg-slate-700 focus:ring-slate-500",
                          success:
                            "bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500",
                          warning:
                            "bg-amber-600 hover:bg-amber-700 focus:ring-amber-500",
                          danger:
                            "bg-rose-600 hover:bg-rose-700 focus:ring-rose-500",
                          info: "bg-sky-600 hover:bg-sky-700 focus:ring-sky-500",
                        };

                        return (
                          <button
                            key={index}
                            className={`inline-flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                              colorClasses[
                                action.color as keyof typeof colorClasses
                              ]
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 w-full`}
                          >
                            <action.icon className="-ml-1 mr-2 h-5 w-5" />
                            {action.title}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Events Section - only show if not coordinator or if there's space */}
              {dashboardData.events && (
                <div
                  className={
                    role === "coordinator" ? "lg:col-span-3" : "lg:col-span-1"
                  }
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Upcoming Events
                      </h3>
                    </div>
                    <div className="p-6">
                      <ul className="divide-y divide-gray-200">
                        {dashboardData.events.map((event, index) => (
                          <li key={index} className="py-3">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 bg-blue-500 rounded-md p-2">
                                <CalendarIcon className="h-5 w-5 text-white" />
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">
                                  {event.title}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {event.date}
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <button className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        View Calendar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions for other roles (keep at bottom) */}
            {role !== "coordinator" && dashboardData.quickActions && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Quick Actions
                  </h3>
                </div>
                <div className="p-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {dashboardData.quickActions.map((action, index) => {
                    const colorClasses = {
                      blue: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
                      green:
                        "bg-green-600 hover:bg-green-700 focus:ring-green-500",
                      purple:
                        "bg-purple-600 hover:bg-purple-700 focus:ring-purple-500",
                      yellow:
                        "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500",
                    };

                    return (
                      <button
                        key={index}
                        className={`inline-flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                          colorClasses[
                            action.color as keyof typeof colorClasses
                          ]
                        } focus:outline-none focus:ring-2 focus:ring-offset-2`}
                      >
                        <action.icon className="-ml-1 mr-2 h-5 w-5" />
                        {action.title}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        }
      />
    </>
  );
};

export default Dashboard;
