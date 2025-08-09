import { useState, useEffect } from "react";
import axios from "axios";

const AdminPage = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_BASE_URL = "http://localhost:5000";

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/urls`);
      setUrls(response.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch URLs");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-full max-w-7xl mx-auto sm:p-4 lg:p-6">
      <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 lg:p-6 h-full flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
            Admin Dashboard
          </h1>
          <button
            onClick={fetchUrls}
            className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200 text-sm sm:text-base"
          >
            Refresh
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 sm:p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm sm:text-base">
            {error}
          </div>
        )}

        <div className="mb-4 sm:mb-6 sm:grid flex sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
            <h3 className="text-sm sm:text-lg font-semibold text-blue-800">
              Total URLs
            </h3>
            <p className="text-lg sm:text-2xl font-bold text-blue-600">
              {urls.length}
            </p>
          </div>
          <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
            <h3 className="text-sm sm:text-lg font-semibold text-green-800">
              Total Visits
            </h3>
            <p className="text-lg sm:text-2xl font-bold text-green-600">
              {urls.reduce((total, url) => total + url.visits, 0)}
            </p>
          </div>
          <div className="bg-purple-50 p-3 sm:p-4 rounded-lg">
            <h3 className="text-sm sm:text-lg font-semibold text-purple-800">
              Avg Visits/URL
            </h3>
            <p className="text-lg sm:text-2xl font-bold text-purple-600">
              {urls.length > 0
                ? (
                    urls.reduce((total, url) => total + url.visits, 0) /
                    urls.length
                  ).toFixed(1)
                : 0}
            </p>
          </div>
        </div>

        {urls.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500 text-base sm:text-lg">No URLs found</p>
          </div>
        ) : (
          <div className="flex-1 overflow-hidden">
            {/* Mobile Card Layout */}
            <div className="block sm:hidden h-full overflow-y-auto space-y-3">
              {urls.map((url) => (
                <div
                  key={url._id}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <code className="px-2 py-1 bg-gray-100 rounded text-xs font-mono text-gray-900">
                        {url.short_code}
                      </code>
                      <button
                        onClick={() =>
                          copyToClipboard(`${API_BASE_URL}/${url.short_code}`)
                        }
                        className="ml-2 text-gray-400 hover:text-gray-600 text-sm"
                        title="Copy short URL"
                      >
                        📋
                      </button>
                    </div>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        url.visits > 0
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {url.visits} visits
                    </span>
                  </div>

                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-1">Original URL:</p>
                    <a
                      href={url.original_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline text-sm break-all"
                      title={url.original_url}
                    >
                      {url.original_url}
                    </a>
                  </div>

                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-1">Created:</p>
                    <p className="text-sm text-gray-700">
                      {formatDate(url.created_at)}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={`${API_BASE_URL}/${url.short_code}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-center text-sm transition duration-200"
                    >
                      Test URL
                    </a>
                    <button
                      onClick={() => copyToClipboard(url.original_url)}
                      className="flex-1 px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm transition duration-200"
                    >
                      Copy Original
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table Layout */}
            <div className="hidden sm:block h-full overflow-x-auto overflow-y-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Short Code
                    </th>
                    <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Original URL
                    </th>
                    <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Visits
                    </th>
                    <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {urls.map((url) => (
                    <tr key={url._id} className="hover:bg-gray-50">
                      <td className="px-2 sm:px-4 lg:px-6 py-2 sm:py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <code className="px-1 sm:px-2 py-1 bg-gray-100 rounded text-xs sm:text-sm font-mono text-gray-900">
                            {url.short_code}
                          </code>
                          <button
                            onClick={() =>
                              copyToClipboard(
                                `${API_BASE_URL}/${url.short_code}`
                              )
                            }
                            className="ml-1 sm:ml-2 text-gray-400 hover:text-gray-600 text-xs sm:text-sm"
                            title="Copy short URL"
                          >
                            📋
                          </button>
                        </div>
                      </td>
                      <td className="px-2 sm:px-4 lg:px-6 py-2 sm:py-4">
                        <div className="max-w-xs truncate">
                          <a
                            href={url.original_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline text-xs sm:text-sm"
                            title={url.original_url}
                          >
                            {url.original_url}
                          </a>
                        </div>
                      </td>
                      <td className="px-2 sm:px-4 lg:px-6 py-2 sm:py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-1.5 sm:px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            url.visits > 0
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {url.visits}
                        </span>
                      </td>
                      <td className="px-2 sm:px-4 lg:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                        {formatDate(url.created_at)}
                      </td>
                      <td className="px-2 sm:px-4 lg:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                        <div className="flex items-center gap-3">
                          <a
                            href={`${API_BASE_URL}/${url.short_code}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Test
                          </a>
                          <button
                            onClick={() => copyToClipboard(url.original_url)}
                            className="text-white hover:text-gray-400"
                          >
                            Copy
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
