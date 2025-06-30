import { useLoginForm } from "@/hooks/useLoginForm";
import {
  AcademicCapIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  ClockIcon,
  UserGroupIcon,
  ChartBarIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
const Landing = () => {
  const {
    email,
    password,
    loading,
    onChangeEmail,
    onChangePassword,
    onSubmit,
    error,
  } = useLoginForm();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                <AcademicCapIcon className="h-8 w-8 text-white" />
                <span className="ml-2 text-xl font-semibold text-white">
                  MNVTHS
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <button className="px-6 py-2 text-sm font-medium text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-all duration-300">
                About the System
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative max-w-full h-[950px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/hero.png" // Replace with your actual image path
            alt="MNVTHS Campus"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-600 opacity-20"></div>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center z-10 px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto">
          <div>
            <h3 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-[2px_2px_0px_black]">
              MNVTHS Work Immersion Management
            </h3>

            <p className="text-base sm:text-sm text-white mb-6 sm:mb-8 drop-shadow-[2px_2px_0px_black]">
              A dedicated platform for Malasila National Vocational and
              Technological High School to manage student immersion programs
              with partner establishments. This system streamlines the
              coordination between students, faculty, and industry partners,
              ensuring a seamless immersion experience. It provides tools for
              tracking progress, accessing resources, and evaluating
              performance, making it easier for all stakeholders to stay
              informed and engaged.
            </p>
          </div>

          {/* Login Card */}
          <div className="flex justify-center lg:justify-center">
            <div className="w-full max-w-md">
              <form
                onSubmit={onSubmit}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl"
              >
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500/20 backdrop-blur-sm rounded-full mb-4">
                    <LockClosedIcon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Welcome Back
                  </h3>
                  <p className="text-blue-100/80">Sign in to your account</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-white/90 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your email"
                      value={email}
                      onChange={onChangeEmail}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-white/90 mb-2"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your password"
                      value={password}
                      onChange={onChangePassword}
                      required
                      disabled={loading}
                    />
                  </div>
                  {/* Error Message */}
                  {error && (
                    <div
                      role="alert"
                      className="flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mt-4 animate-fadeIn"
                    >
                      <svg
                        className="w-5 h-5 mr-2 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm1 15H9v-2h2v2zm0-4H9V5h2v6z" />
                      </svg>
                      <span className="text-sm font-medium">{error}</span>
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transform hover:scale-[1.02] transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <LockClosedIcon className="h-5 w-5 mr-2" />
                    {loading ? "Signing In..." : "Sign In"}
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      className="text-sm text-blue-200 hover:text-white underline decoration-blue-200 hover:decoration-white transition-colors duration-300"
                    >
                      Forgot your password?
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Features Section */}
      <div className="bg-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Work Immersion System Features
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Designed specifically for MNVTHS work immersion program needs
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: "Digital Documentation",
                icon: DocumentTextIcon,
                description:
                  "Replace paper-based processes with digital submissions and tracking",
                objectives: [1, 4],
              },
              {
                title: "Progress Monitoring",
                icon: ChartBarIcon,
                description:
                  "Real-time tracking of student attendance and activities",
                objectives: [2],
              },
              {
                title: "Daily Reporting",
                icon: ClockIcon,
                description:
                  "Students submit time-in/time-out with photo documentation",
                objectives: [3],
              },
              {
                title: "Evaluation System",
                icon: CheckCircleIcon,
                description:
                  "Structured performance assessment with digital certificates",
                objectives: [4],
              },
              {
                title: "Coordinator Tools",
                icon: UserGroupIcon,
                description:
                  "Centralized management of all immersion activities",
                objectives: [1, 2, 4],
              },
              {
                title: "Establishment Portal",
                icon: AcademicCapIcon,
                description: "Partner access for evaluation and feedback",
                objectives: [4],
              },
            ].map((feature, index) => (
              <div key={index} className="pt-6">
                <div className="flow-root bg-blue-50 rounded-lg px-6 pb-8 h-full">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                        <feature.icon className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-gray-600">{feature.description}</p>
                    <div className="mt-4">
                      <p className="text-xs font-medium text-blue-600">
                        Supports objectives: {feature.objectives.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <AcademicCapIcon className="h-10 w-10 text-blue-600 mx-auto" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              Malasila National Vocational and Technological High School
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Work Immersion Management System
            </p>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8 text-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} MNVTHS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
