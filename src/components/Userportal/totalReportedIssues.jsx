import React, { useState, useEffect, useRef } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

export const TotalReportedProblems = ({ useremail }) => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!useremail) return;

    const fetchIssues = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/issues/user-issues/${useremail}`
        );
        const data = await response.json();
        setIssues(data);
      } catch (err) {
        setError(err || "Failed to fetch issues");
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, [useremail]);

  return (
    <div className="p-0">
      {loading ? (
        <p className="text-center text-gray-500">Loading issues...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : issues.length > 0 ? (
        <div
          className="flex flex-col gap-5 overflow-y-auto max-h-[500px] p-2"
          ref={scrollRef}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {issues.map((issue) => (
            <div
              key={issue._id}
              className="flex flex-col md:flex-row items-start justify-between p-4 rounded-lg shadow-md bg-white"
            >
              {issue.image && (
                <img
                  src={`http://localhost:5000${issue.image}`}
                  alt="Issue"
                  className="w-full md:w-1/3 h-40 object-cover rounded-lg"
                />
              )}

              <div className="flex flex-col w-full md:w-2/3 p-3">
                <h4 className="text-lg font-bold mb-2">{issue.title}</h4>
                <p className="text-gray-700">{issue.description}</p>
                <div className="flex items-center mt-2 text-gray-600">
                  <FaMapMarkerAlt className="mr-1 text-blue-500" />
                  {issue.location}
                </div>
              </div>

              <div className="mt-3 md:mt-0 md:self-center">
                <div className="shadow-md bg-white rounded-lg p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      issue.status === "Pending"
                        ? "bg-yellow-200 text-yellow-700"
                        : issue.status === "Processing"
                        ? "bg-blue-200 text-blue-700"
                        : "bg-green-200 text-green-700"
                    }`}
                  >
                    {issue.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No issues reported yet.</p>
      )}
    </div>
  );
};
