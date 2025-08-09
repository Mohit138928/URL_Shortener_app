import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="bg-blue-600 shadow-lg flex-shrink-0">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-white text-lg sm:text-xl font-bold hover:text-blue-100 transition-colors"
            >
              URL Shortener
            </Link>
          </div>
          <div className="flex space-x-2 sm:space-x-4">
            <Link
              to="/"
              className={`px-2 sm:px-3 py-1 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition duration-200 ${
                location.pathname === "/"
                  ? "bg-blue-700 text-white"
                  : "text-blue-100 hover:bg-blue-500 hover:text-white"
              }`}
            >
              Home
            </Link>
            <Link
              to="/admin"
              className={`px-2 sm:px-3 py-1 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition duration-200 ${
                location.pathname === "/admin"
                  ? "bg-blue-700 text-white"
                  : "text-blue-100 hover:bg-blue-500 hover:text-white"
              }`}
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
