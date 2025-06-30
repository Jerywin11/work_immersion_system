import LayoutGrid from "@/common/components/GridLayout";
import TopNavigation from "@/common/components/navigation/MobileTopNav";
import { useRole } from "@/contexts/RoleContext";
import {
  UserIcon,
  AcademicCapIcon,
  ClockIcon,
  CheckCircleIcon,
  PencilIcon,
  TrashIcon,
  DocumentTextIcon,
  ArrowPathIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

interface Student {
  id: string;
  name: string;
  program: string;
  status: "active" | "completed" | "pending";
  hoursCompleted: number;
  hoursRequired: number;
  lastReportDate?: string;
  evaluationStatus?: "pending" | "submitted" | "overdue";
  partnerIndustry?: string;
}

const StudentManagement = () => {
  const role = useRole();

  // Mock student data
  const students: Student[] = [
    {
      id: "ST001",
      name: "Juan Dela Cruz",
      program: "Computer Systems Servicing NC II",
      status: "active",
      hoursCompleted: 96,
      hoursRequired: 240,
      lastReportDate: "2023-06-15",
      evaluationStatus: "submitted",
      partnerIndustry: "Tech Solutions Inc.",
    },
    {
      id: "ST002",
      name: "Maria Garcia",
      program: "Computer Programming",
      status: "active",
      hoursCompleted: 120,
      hoursRequired: 240,
      lastReportDate: "2023-06-14",
      evaluationStatus: "pending",
      partnerIndustry: "WebDev Co.",
    },
    {
      id: "ST003",
      name: "Luis Reyes",
      program: "Electronics",
      status: "completed",
      hoursCompleted: 240,
      hoursRequired: 240,
      lastReportDate: "2023-05-30",
      evaluationStatus: "submitted",
      partnerIndustry: "ElectroTech",
    },
  ];

  const getRoleSpecificActions = () => {
    if (role === "coordinator") {
      return [
        {
          icon: PencilIcon,
          color: "blue",
          label: "Edit Student",
          action: (studentId: string) => console.log("Edit student", studentId),
        },
        {
          icon: TrashIcon,
          color: "red",
          label: "Delete Student",
          action: (studentId: string) =>
            console.log("Delete student", studentId),
        },
        {
          icon: ArrowPathIcon,
          color: "purple",
          label: "Change Status",
          action: (studentId: string) =>
            console.log("Change status", studentId),
        },
      ];
    } else if (role === "partner_industry") {
      return [
        {
          icon: DocumentTextIcon,
          color: "green",
          label: "Give Feedback",
          action: (studentId: string) =>
            console.log("Give feedback", studentId),
        },
        {
          icon: PlusIcon,
          color: "blue",
          label: "Add Task",
          action: (studentId: string) => console.log("Add task", studentId),
        },
      ];
    }
    return [];
  };

  const actions = getRoleSpecificActions();

  return (
    <>
      <TopNavigation />

      <LayoutGrid
        sidebarTopOffset="100px"
        mainContent={
          <div className="space-y-6">
            {/* Header with role-specific title */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-5 sm:px-6">
                <h1 className="text-2xl font-semibold text-gray-900">
                  {role === "coordinator"
                    ? "Student Management"
                    : "Assigned Interns"}
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                  {role === "coordinator"
                    ? "Manage all students in the immersion program"
                    : "View and manage your assigned interns"}
                </p>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="relative flex-grow">
                    <input
                      type="text"
                      placeholder="Search students..."
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <select className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                      <option>All Programs</option>
                      <option>Computer Systems</option>
                      <option>Computer Programming</option>
                      <option>Electronics</option>
                    </select>
                    <select className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                      <option>All Statuses</option>
                      <option>Active</option>
                      <option>Completed</option>
                      <option>Pending</option>
                    </select>
                    {role === "coordinator" && (
                      <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Add Student
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Students Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Student
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Program
                      </th>
                      {role === "coordinator" && (
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Partner Industry
                        </th>
                      )}
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Hours
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Last Report
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Evaluation
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {students.map((student) => (
                      <tr key={student.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <UserIcon className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {student.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {student.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {student.program}
                          </div>
                        </td>
                        {role === "coordinator" && (
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {student.partnerIndustry}
                            </div>
                          </td>
                        )}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {student.hoursCompleted}/{student.hoursRequired}
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                            <div
                              className="bg-blue-600 h-1.5 rounded-full"
                              style={{
                                width: `${
                                  (student.hoursCompleted /
                                    student.hoursRequired) *
                                  100
                                }%`,
                              }}
                            ></div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              student.status === "active"
                                ? "bg-green-100 text-green-800"
                                : student.status === "completed"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {student.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.lastReportDate || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {student.evaluationStatus && (
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                student.evaluationStatus === "submitted"
                                  ? "bg-green-100 text-green-800"
                                  : student.evaluationStatus === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {student.evaluationStatus}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            {actions.map((action, index) => (
                              <button
                                key={index}
                                onClick={() => action.action(student.id)}
                                className={`inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-${action.color}-600 hover:bg-${action.color}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${action.color}-500`}
                                title={action.label}
                              >
                                <action.icon className="h-3 w-3 mr-1" />
                                {action.label}
                              </button>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-blue-100">
                      <AcademicCapIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">
                        Total Students
                      </p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {students.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-green-100">
                      <CheckCircleIcon className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">
                        Active Students
                      </p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {students.filter((s) => s.status === "active").length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-amber-100">
                      <ClockIcon className="h-6 w-6 text-amber-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">
                        Evaluations Pending
                      </p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {
                          students.filter(
                            (s) => s.evaluationStatus === "pending"
                          ).length
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      />
    </>
  );
};

export default StudentManagement;
