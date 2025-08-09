import { useState } from "react";
import axios from "axios";

const UrlShortener = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!originalUrl.trim()) {
      setError("Please enter a URL");
      return;
    }

    setLoading(true);
    setError("");
    setShortenedUrl("");

    try {
      const response = await axios.post(`${API_BASE_URL}/api/shorten`, {
        original_url: originalUrl.trim(),
      });

      setShortenedUrl(response.data.short_url);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortenedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const resetForm = () => {
    setOriginalUrl("");
    setShortenedUrl("");
    setError("");
    setCopied(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-lg h-fit">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 text-gray-800">
        URL Shortener
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div>
          <label
            htmlFor="url"
            className="block text-sm sm:text-base font-medium text-gray-700 mb-2"
          >
            Enter your long URL
          </label>
          <input
            type="url"
            id="url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="https://example.com/very/long/url"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm sm:text-base"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 sm:py-3 px-4 rounded-lg transition duration-200 text-sm sm:text-base"
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 sm:p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm sm:text-base">
          {error}
        </div>
      )}

      {shortenedUrl && (
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-base sm:text-lg font-semibold text-green-800 mb-2">
            Your shortened URL:
          </h3>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <input
              type="text"
              value={shortenedUrl}
              readOnly
              className="flex-1 px-2 sm:px-3 py-2 bg-white border border-green-300 rounded text-green-700 text-xs sm:text-sm"
            />
            <div className="flex space-x-2">
              <button
                onClick={copyToClipboard}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition duration-200 text-xs sm:text-sm"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
              <a
                href={shortenedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition duration-200 text-center text-xs sm:text-sm"
              >
                Test
              </a>
            </div>
          </div>
          <button
            onClick={resetForm}
            className="mt-3 text-green-600 hover:text-green-800 underline text-sm sm:text-base"
          >
            Shorten another URL
          </button>
        </div>
      )}
    </div>
  );
};

export default UrlShortener;
