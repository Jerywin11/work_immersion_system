import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <h1 className="text-6xl font-bold text-red-600 mb-4">403</h1>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
        Unauthorized Access
      </h2>
      <p className="mb-6 text-center text-gray-600 dark:text-gray-400 max-w-md">
        You do not have permission to view this page. Please contact your
        administrator if you believe this is an error.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go to Home
      </button>
    </div>
  );
};

export default Unauthorized;
