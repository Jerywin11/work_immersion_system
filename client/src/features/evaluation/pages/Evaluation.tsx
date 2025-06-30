import LayoutGrid from "@/common/components/GridLayout";
import TopNavigation from "@/common/components/navigation/MobileTopNav";
import { useRole } from "@/contexts/RoleContext";
import {
  CheckCircleIcon,
  DocumentTextIcon,
  UserIcon,
  UsersIcon,
  ChartBarIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

interface EvaluationData {
  title: string;
  sections: {
    name: string;
    criteria: {
      name: string;
      description: string;
      rating?: number;
      maxRating: number;
      feedback?: string;
    }[];
  }[];
  overallFeedback?: string;
  status: "pending" | "completed" | "in-progress";
  dueDate?: string;
  submittedDate?: string;
  evaluator?: string;
  student?: string;
  partner_industry?: string;
  quickActions?: {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
  }[];
}

const Evaluation = () => {
  const role = useRole();

  const getEvaluationData = (): EvaluationData => {
    switch (role) {
      case "student":
        return {
          title: "Your Evaluation",
          status: "completed",
          submittedDate: "June 15, 2023",
          evaluator: "Maria Santos",
          sections: [
            {
              name: "Technical Skills",
              criteria: [
                {
                  name: "Technical Knowledge",
                  description: "Demonstration of required technical skills",
                  rating: 4,
                  maxRating: 5,
                },
                {
                  name: "Problem Solving",
                  description: "Ability to troubleshoot and solve issues",
                  rating: 3,
                  maxRating: 5,
                },
              ],
            },
            {
              name: "Professionalism",
              criteria: [
                {
                  name: "Punctuality",
                  description: "Adherence to work schedule",
                  rating: 5,
                  maxRating: 5,
                },
                {
                  name: "Communication",
                  description: "Effectiveness in workplace communication",
                  rating: 4,
                  maxRating: 5,
                },
              ],
            },
          ],
          overallFeedback:
            "Excellent performance overall. Shows strong technical aptitude and professionalism. Could benefit from more initiative in problem-solving scenarios.",
          quickActions: [
            {
              title: "View Certificate",
              icon: DocumentTextIcon,
              color: "primary",
            },
            {
              title: "Request Review",
              icon: ClipboardDocumentCheckIcon,
              color: "secondary",
            },
          ],
        };

      case "coordinator":
        return {
          title: "Student Evaluations",
          status: "in-progress",
          dueDate: "June 30, 2023",
          sections: [
            {
              name: "Pending Evaluations",
              criteria: [
                {
                  name: "Juan Dela Cruz",
                  description: "Computer Systems Servicing NC II",
                  maxRating: 5,
                },
                {
                  name: "Maria Garcia",
                  description: "Computer Programming",
                  maxRating: 5,
                },
              ],
            },
            {
              name: "Completed Evaluations",
              criteria: [
                {
                  name: "Luis Reyes",
                  description: "Electronics",
                  rating: 4,
                  maxRating: 5,
                  feedback: "Excellent technical skills",
                },
              ],
            },
          ],
          quickActions: [
            {
              title: "New Evaluation",
              icon: DocumentTextIcon,
              color: "primary",
            },
            { title: "Generate Reports", icon: ChartBarIcon, color: "success" },
            { title: "Bulk Evaluate", icon: UsersIcon, color: "info" },
          ],
        };

      case "partner_industry":
        return {
          title: "Intern Evaluations",
          status: "pending",
          dueDate: "July 5, 2023",
          sections: [
            {
              name: "Performance Metrics",
              criteria: [
                {
                  name: "Work Quality",
                  description: "Quality of completed tasks",
                  maxRating: 5,
                },
                {
                  name: "Teamwork",
                  description: "Collaboration with colleagues",
                  maxRating: 5,
                },
              ],
            },
            {
              name: "Skill Development",
              criteria: [
                {
                  name: "Technical Growth",
                  description: "Improvement in technical abilities",
                  maxRating: 5,
                },
                {
                  name: "Professional Growth",
                  description: "Development of workplace professionalism",
                  maxRating: 5,
                },
              ],
            },
          ],
          quickActions: [
            {
              title: "Submit Evaluation",
              icon: ClipboardDocumentCheckIcon,
              color: "primary",
            },
            { title: "View Interns", icon: UserIcon, color: "info" },
          ],
        };

      default:
        return {
          title: "Evaluation",
          status: "pending",
          sections: [],
        };
    }
  };

  const evaluationData = getEvaluationData();

  return (
    <>
      <TopNavigation />

      <LayoutGrid
        sidebarTopOffset="100px"
        mainContent={
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-5 sm:px-6">
                <h1 className="text-2xl font-semibold text-gray-900">
                  {evaluationData.title}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      evaluationData.status === "completed"
                        ? "bg-emerald-100 text-emerald-800"
                        : evaluationData.status === "in-progress"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    {evaluationData.status === "completed"
                      ? "Completed"
                      : evaluationData.status === "in-progress"
                      ? "In Progress"
                      : "Pending"}
                  </span>

                  {evaluationData.dueDate && (
                    <div className="flex items-center text-sm text-gray-500">
                      <ClockIcon className="mr-1 h-4 w-4" />
                      Due: {evaluationData.dueDate}
                    </div>
                  )}

                  {evaluationData.submittedDate && (
                    <div className="flex items-center text-sm text-gray-500">
                      <CheckCircleIcon className="mr-1 h-4 w-4 text-emerald-500" />
                      Submitted: {evaluationData.submittedDate}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Evaluation Sections */}
            {evaluationData.sections.map((section, sectionIndex) => (
              <div
                key={sectionIndex}
                className="bg-white rounded-lg shadow-sm border border-gray-200"
              >
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h2 className="text-lg font-medium text-gray-900">
                    {section.name}
                  </h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {section.criteria.map((criterion, criterionIndex) => (
                    <div key={criterionIndex} className="px-6 py-4">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-base font-medium text-gray-800">
                            {criterion.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {criterion.description}
                          </p>
                        </div>
                        {criterion.rating !== undefined ? (
                          <div className="flex items-center">
                            <span className="text-lg font-semibold text-indigo-600">
                              {criterion.rating}
                            </span>
                            <span className="text-gray-400 mx-1">/</span>
                            <span className="text-gray-500">
                              {criterion.maxRating}
                            </span>
                          </div>
                        ) : (
                          <button className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Evaluate
                          </button>
                        )}
                      </div>
                      {criterion.feedback && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-md">
                          <p className="text-sm text-gray-700">
                            {criterion.feedback}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Overall Feedback */}
            {evaluationData.overallFeedback && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h2 className="text-lg font-medium text-gray-900">
                    Overall Feedback
                  </h2>
                </div>
                <div className="px-6 py-4">
                  <p className="text-gray-700">
                    {evaluationData.overallFeedback}
                  </p>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            {evaluationData.quickActions && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h2 className="text-lg font-medium text-gray-900">
                    Quick Actions
                  </h2>
                </div>
                <div className="p-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {evaluationData.quickActions.map((action, index) => {
                    const colorClasses = {
                      primary:
                        "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500",
                      secondary:
                        "bg-slate-600 hover:bg-slate-700 focus:ring-slate-500",
                      success:
                        "bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500",
                      info: "bg-sky-600 hover:bg-sky-700 focus:ring-sky-500",
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

export default Evaluation;
