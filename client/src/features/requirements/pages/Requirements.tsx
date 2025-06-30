import LayoutGrid from "@/common/components/GridLayout";
import TopNavigation from "@/common/components/navigation/MobileTopNav";
import { useRole } from "@/contexts/RoleContext";

import {
  DocumentTextIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

interface Requirement {
  id: string;
  title: string;
  description: string;
  status: "submitted" | "pending" | "approved" | "rejected";
  submittedDate?: string;
  approvedDate?: string;
  file?: {
    name: string;
    size: string;
    type: string;
  };
  feedback?: string;
}

const Requirements = () => {
  const role = useRole();
  // Mock requirements data based on role
  const getRequirementsData = (): Requirement[] => {
    switch (role) {
      case "student":
        return [
          {
            id: "1",
            title: "Parent's Consent Form",
            description: "Signed consent form from parent/guardian",
            status: "submitted",
            submittedDate: "June 1, 2023",
            file: {
              name: "consent_form.pdf",
              size: "250KB",
              type: "PDF",
            },
          },
          {
            id: "2",
            title: "Medical Certificate",
            description: "Recent medical clearance certificate",
            status: "approved",
            submittedDate: "May 28, 2023",
            approvedDate: "May 30, 2023",
            file: {
              name: "medical_certificate.pdf",
              size: "180KB",
              type: "PDF",
            },
          },
          {
            id: "3",
            title: "Waiver Form",
            description: "Liability waiver form",
            status: "pending",
          },
        ];
      case "coordinator":
        return [
          {
            id: "1",
            title: "Student Evaluation Forms",
            description: "Completed evaluation forms for all students",
            status: "pending",
            submittedDate: "June 15, 2023",
            feedback: "Need to complete evaluations for 3 more students",
          },
          {
            id: "2",
            title: "Monthly Report",
            description: "Monthly immersion progress report",
            status: "submitted",
            submittedDate: "June 5, 2023",
          },
          {
            id: "3",
            title: "Orientation Materials",
            description: "Updated orientation presentation",
            status: "approved",
            submittedDate: "May 20, 2023",
            approvedDate: "May 22, 2023",
          },
          {
            id: "4",
            title: "Safety Guidelines",
            description: "Latest safety procedures and protocols",
            status: "submitted",
            submittedDate: "June 1, 2023",
          },
          {
            id: "5",
            title: "Code of Conduct",
            description: "Revised code of conduct document",
            status: "approved",
            submittedDate: "May 25, 2023",
            approvedDate: "May 27, 2023",
          },
          {
            id: "6",
            title: "Internship Agreement",
            description: "Signed internship agreement form",
            status: "submitted",
            submittedDate: "June 3, 2023",
          },
          {
            id: "7",
            title: "Feedback Form",
            description: "Student feedback on internship experience",
            status: "pending",
            submittedDate: "June 4, 2023",
          },
          {
            id: "8",
            title: "Project Proposal",
            description: "Proposal for new project initiatives",
            status: "rejected",
            submittedDate: "May 28, 2023",
            feedback: "Requires additional details",
          },
          {
            id: "9",
            title: "Training Schedule",
            description: "Schedule for upcoming training sessions",
            status: "approved",
            submittedDate: "June 2, 2023",
            approvedDate: "June 4, 2023",
          },
          {
            id: "10",
            title: "Equipment Inventory",
            description: "List of available equipment and tools",
            status: "submitted",
            submittedDate: "June 5, 2023",
          },
        ];
      case "partner_industry":
        return [
          {
            id: "1",
            title: "Company Profile",
            description: "Updated company profile document",
            status: "approved",
            submittedDate: "May 15, 2023",
            approvedDate: "May 17, 2023",
          },
          {
            id: "2",
            title: "Internship Agreement",
            description: "Signed agreement with school",
            status: "submitted",
            submittedDate: "June 1, 2023",
          },
          {
            id: "3",
            title: "Safety Guidelines",
            description: "Updated workplace safety guidelines",
            status: "pending",
          },
        ];
      default:
        return [];
    }
  };

  const requirements = getRequirementsData();

  const getStatusIcon = (status: Requirement["status"]) => {
    switch (status) {
      case "approved":
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case "submitted":
        return <ClockIcon className="h-5 w-5 text-blue-500" />;
      case "rejected":
        return <ExclamationCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusText = (status: Requirement["status"]) => {
    switch (status) {
      case "approved":
        return "Approved";
      case "submitted":
        return "Under Review";
      case "rejected":
        return "Rejected";
      default:
        return "Pending Submission";
    }
  };

  const getStatusColor = (status: Requirement["status"]) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "submitted":
        return "bg-blue-100 text-blue-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <>
      <TopNavigation />

      <LayoutGrid
        mainContent={
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-5 ">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {role === "student"
                        ? "My Requirements"
                        : role === "coordinator"
                        ? "Student Requirements"
                        : "Company Requirements"}
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                      {
                        requirements.filter((r) => r.status === "approved")
                          .length
                      }{" "}
                      of {requirements.length} requirements completed
                    </p>
                  </div>
                  {role === "student" && (
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      <DocumentTextIcon className="-ml-1 mr-2 h-5 w-5" />
                      Upload Document
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white overflow-hidden">
              <div className="p-6">
                <div className="mb-2 flex justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Completion Progress
                  </span>
                  <span className="text-sm font-medium text-gray-500">
                    {Math.round(
                      (requirements.filter((r) => r.status === "approved")
                        .length /
                        requirements.length) *
                        100
                    )}
                    %
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{
                      width: `${
                        (requirements.filter((r) => r.status === "approved")
                          .length /
                          requirements.length) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Requirements List */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-5 ">
                <h2 className="text-lg font-medium text-gray-900">
                  {role === "student"
                    ? "My Documents"
                    : role === "coordinator"
                    ? "Student Documents"
                    : "Company Documents"}
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {requirements.map((requirement) => (
                  <div key={requirement.id} className="px-6 py-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        {getStatusIcon(requirement.status)}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-gray-900">
                            {requirement.title}
                          </h3>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              requirement.status
                            )}`}
                          >
                            {getStatusText(requirement.status)}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {requirement.description}
                        </p>

                        {requirement.file && (
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <DocumentTextIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            <span>
                              {requirement.file.name} ({requirement.file.size})
                            </span>
                          </div>
                        )}

                        {requirement.submittedDate && (
                          <p className="mt-2 text-xs text-gray-500">
                            Submitted: {requirement.submittedDate}
                          </p>
                        )}

                        {requirement.approvedDate && (
                          <p className="mt-1 text-xs text-green-600">
                            Approved: {requirement.approvedDate}
                          </p>
                        )}

                        {requirement.feedback && (
                          <div className="mt-2 p-2 bg-yellow-50 rounded-md">
                            <p className="text-xs text-yellow-700">
                              <ExclamationCircleIcon className="inline mr-1 h-4 w-4" />
                              {requirement.feedback}
                            </p>
                          </div>
                        )}

                        <div className="mt-4 flex space-x-3">
                          {role === "student" &&
                            requirement.status !== "approved" && (
                              <>
                                <button
                                  type="button"
                                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                  {requirement.status === "pending"
                                    ? "Upload"
                                    : "Re-upload"}
                                </button>
                                {requirement.status === "rejected" && (
                                  <button
                                    type="button"
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                  >
                                    View Feedback
                                  </button>
                                )}
                              </>
                            )}

                          {role !== "student" && (
                            <>
                              <button
                                type="button"
                                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Download
                              </button>
                              {requirement.status === "submitted" && (
                                <div className="flex space-x-2">
                                  <button
                                    type="button"
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                  >
                                    Approve
                                  </button>
                                  <button
                                    type="button"
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                  >
                                    Reject
                                  </button>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      />
    </>
  );
};

export default Requirements;
