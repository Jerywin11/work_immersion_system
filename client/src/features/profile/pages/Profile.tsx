import LayoutGrid from "@/common/components/GridLayout";
import TopNavigation from "@/common/components/navigation/MobileTopNav";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { useRole } from "@/contexts/RoleContext";

interface ProfileData {
  name: string;
  email: string;
  profileImage: string;
  contactNumber?: string;
  program?: string;
  yearLevel?: string;
  birthDate?: string;
  address?: string;
  company?: string;
  position?: string;
  industry?: string;
  immersionDetails?: {
    studentsSupervised?: number;
    currentInterns?: number;
    company?: string;
    coordinator?: string;
    startDate?: string;
    endDate?: string;
    hoursRequired?: number;
    hoursCompleted?: number;
  };
}

const Profile = () => {
  const role = useRole();

  // Mock profile data based on role
  const getProfileData = (): ProfileData => {
    const commonData = {
      name: "",
      email: "",
      profileImage: "/default-profile.png",
      contactNumber: "+63 912 345 6789",
    };

    switch (role) {
      case "student":
        return {
          ...commonData,
          name: "Juan Dela Cruz",
          email: "juan.delacruz@student.mnvths.edu",
          program: "Computer Systems Servicing NC II",
          yearLevel: "Grade 12",
          birthDate: "May 15, 2005",
          address: "123 Main St, Malasila, North Cotabato",
          immersionDetails: {
            company: "Tech Solutions Inc.",
            coordinator: "Maria Santos",
            startDate: "June 1, 2023",
            endDate: "July 30, 2023",
            hoursRequired: 240,
            hoursCompleted: 96,
          },
        };
      case "coordinator":
        return {
          ...commonData,
          name: "Maria Santos",
          email: "maria.santos@mnvths.edu",
          position: "Immersion Coordinator",
          immersionDetails: {
            studentsSupervised: 24,
            currentInterns: 8,
          },
        };
      case "partner_industry":
        return {
          ...commonData,
          name: "Tech Solutions Inc.",
          email: "contact@techsolutions.com",
          industry: "Information Technology",
          address: "456 Tech Park, Makati City",
          immersionDetails: {
            currentInterns: 5,
          },
        };
      default:
        return commonData;
    }
  };

  const profile = getProfileData();
  const completed = profile.immersionDetails?.hoursCompleted ?? 0;
  const required = profile.immersionDetails?.hoursRequired ?? 1; // avoid divide-by-zero

  const progressPercent = Math.min((completed / required) * 100, 100);

  return (
    <>
      <TopNavigation />

      <LayoutGrid
        sidebarTopOffset="100px"
        mainContent={
          <div className="space-y-6">
            {/* Profile Header */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-500 h-24"></div>
              <div className="px-6 pb-6 -mt-12">
                <div className="flex items-end justify-between">
                  <div className="flex items-end">
                    <img
                      className="h-24 w-24 rounded-full border-4 border-white bg-white"
                      src={profile.profileImage}
                      alt="Profile"
                    />
                    <div className="ml-4 mb-2">
                      <h1 className="text-2xl font-bold text-gray-900">
                        {profile.name}
                      </h1>
                      <p className="text-blue-600">
                        {profile.program ||
                          profile.position ||
                          profile.industry}
                      </p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Basic Information
                </h3>
              </div>
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="mt-1 text-sm text-gray-900">
                      {profile.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Contact Number
                    </p>
                    <p className="mt-1 text-sm text-gray-900">
                      {profile.contactNumber}
                    </p>
                  </div>
                  {profile.yearLevel && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Year Level
                      </p>
                      <p className="mt-1 text-sm text-gray-900">
                        {profile.yearLevel}
                      </p>
                    </div>
                  )}
                  {profile.birthDate && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Birth Date
                      </p>
                      <p className="mt-1 text-sm text-gray-900">
                        {profile.birthDate}
                      </p>
                    </div>
                  )}
                  {profile.address && (
                    <div className="sm:col-span-2">
                      <p className="text-sm font-medium text-gray-500">
                        Address
                      </p>
                      <p className="mt-1 text-sm text-gray-900">
                        {profile.address}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Role-Specific Information */}
            {role === "student" && profile.immersionDetails && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    Work Immersion Details
                  </h3>
                </div>
                <div className="px-6 py-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Company
                      </p>
                      <p className="mt-1 text-sm text-gray-900">
                        {profile.immersionDetails.company}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        coordinator
                      </p>
                      <p className="mt-1 text-sm text-gray-900">
                        {profile.immersionDetails.coordinator}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Start Date
                      </p>
                      <p className="mt-1 text-sm text-gray-900">
                        {profile.immersionDetails.startDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        End Date
                      </p>
                      <p className="mt-1 text-sm text-gray-900">
                        {profile.immersionDetails.endDate}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-sm font-medium text-gray-500">
                      Hours Completed:{" "}
                      <span className="text-blue-600">
                        {profile.immersionDetails.hoursCompleted}/
                        {profile.immersionDetails.hoursRequired}
                      </span>
                    </p>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${progressPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {role === "coordinator" && profile.immersionDetails && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    Supervision Details
                  </h3>
                </div>
                <div className="px-6 py-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-blue-800">
                        Total Students Supervised
                      </h4>
                      <p className="mt-1 text-2xl font-semibold text-blue-900">
                        {profile.immersionDetails.studentsSupervised}
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-green-800">
                        Current Interns
                      </h4>
                      <p className="mt-1 text-2xl font-semibold text-green-900">
                        {profile.immersionDetails.currentInterns}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {role === "partner_industry" && profile.immersionDetails && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    Internship Program
                  </h3>
                </div>
                <div className="px-6 py-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-blue-800">
                        Current Interns
                      </h4>
                      <p className="mt-1 text-2xl font-semibold text-blue-900">
                        {profile.immersionDetails.currentInterns}
                      </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-purple-800">
                        Available Slots
                      </h4>
                      <p className="mt-1 text-2xl font-semibold text-purple-900">
                        3
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Documents Section - Only for students */}
            {role === "student" && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    Required Documents
                  </h3>
                </div>
                <div className="px-6 py-4">
                  <div className="space-y-4">
                    {[
                      "Parent's Consent Form",
                      "Medical Certificate",
                      "Waiver Form",
                    ].map((doc) => (
                      <div
                        key={doc}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-md"
                      >
                        <div className="flex items-center">
                          <div className="p-2 bg-blue-100 rounded-md">
                            <DocumentTextIcon className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="ml-4">
                            <h4 className="text-sm font-medium text-gray-900">
                              {doc}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {doc === "Waiver Form"
                                ? "Not submitted"
                                : "PDF, 250KB"}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            doc === "Waiver Form"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {doc === "Waiver Form" ? "Pending" : "Submitted"}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Upload Documents
                  </button>
                </div>
              </div>
            )}
          </div>
        }
      />
    </>
  );
};

export default Profile;
