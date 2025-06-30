import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-2">Page Not Found</p>
      <p className="text-gray-500 mb-6">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate("/app/dashboard")}
        className="inline-block px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-semibold transition"
      >
        Go back home
      </button>
    </div>
  );
};

export default NotFound;
