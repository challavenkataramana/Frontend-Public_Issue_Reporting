import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Header } from "./department-header";
import {
  FaExclamationCircle,
  FaCheckCircle,
  FaArrowLeft,
  FaMapMarkerAlt,
  FaBars,
} from "react-icons/fa";

export const DepartmentDashboard = () => {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [selectedSection, setSelectedSection] = useState(
    localStorage.getItem("departmentTab") || "totalDepartmentIssues"
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("departmenttoken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setEmail(decoded.email);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  const fetchDepartmentIssues = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/issues/departments/${email}`
      );
      const data = await response.json();
      setIssues(data.issues);
      setDepartment(data.departmentDetails);
    } catch (e) {
      console.error("Error fetching issues:", e);
    }
  };

  useEffect(() => {
    if (!email) return;
    fetchDepartmentIssues();
  }, [email]);

  useEffect(() => {
    localStorage.setItem("departmentTab", selectedSection);
  }, [selectedSection]);

  const updateIssueStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/issues/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        console.log(`Issue ${id} updated to ${newStatus}`);
        fetchDepartmentIssues();
      } else {
        console.error("Failed to update issue status");
      }
    } catch (error) {
      console.error("Error updating issue status:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="sm:hidden fixed top-3 right-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 bg-white rounded-lg shadow-md"
        >
          <FaBars className="text-xl" />
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 h-screen  w-3/4 sm:w-1/4 bg-white shadow-md transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out sm:translate-x-0 sm:relative sm:flex sm:flex-col p-6`}
      >
        <button
          className="flex items-center text-gray-700 font-semibold mb-6 text-lg cursor-pointer"
          onClick={() => navigate("/department-Introduction")}
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>
        <ul className="space-y-4">
          <li
            className={`flex items-center cursor-pointer p-3 rounded-md text-md ${
              selectedSection === "totalDepartmentIssues"
                ? "bg-blue-100 text-blue-500 font-bold"
                : "hover:bg-gray-200"
            }`}
            onClick={() => {
              setSelectedSection("totalDepartmentIssues");
              setIsSidebarOpen(false);
            }}
          >
            <FaExclamationCircle className="mr-2" /> Total Reported Issues
          </li>
          <li
            className={`flex items-center cursor-pointer p-3 rounded-md text-md ${
              selectedSection === "solvedDepartmentIssues"
                ? "bg-blue-100 text-blue-500 font-bold"
                : "hover:bg-gray-200"
            }`}
            onClick={() => {
              setSelectedSection("solvedDepartmentIssues");
              setIsSidebarOpen(false);
            }}
          >
            <FaCheckCircle className="mr-2" /> Solved Issues
          </li>
        </ul>

        <button
          onClick={() => setIsSidebarOpen(false)}
          className="sm:hidden absolute top-4 right-4 text-gray-700 text-xl"
        >
          Close
        </button>
      </div>

      <div className="w-full sm:w-3/4 p-8">
        <h3 className="text-2xl font-bold mb-6">{department.name} Dashboard</h3>

        {selectedSection === "totalDepartmentIssues" && (
          <div className="w-full">
            {issues.length > 0 ? (
              <div className="flex flex-col gap-5 overflow-y-auto lg:mr-35 max-h-[500px] p-2">
                {issues.map((issue, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row items-start justify-between p-4 rounded-lg shadow-md bg-white"
                  >
                    {issue.image && (
                      <img
                        src={`http://localhost:5000${issue.image}`}
                        alt={issue.title}
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

                    <div className="mt-3 flex flex-row md:mt-25 gap-4 md:self-center ">
                      {issue.status !== "Processing" &&
                        issue.status !== "Solved" && (
                          <div className="shadow-md rounded-lg cursor-pointer p-2 bg-yellow-200 text-yellow-700">
                            <button
                              className="px-1 text-sm cursor-pointer font-semibold"
                              onClick={() =>
                                updateIssueStatus(issue._id, "Processing")
                              }
                            >
                              Processing
                            </button>
                          </div>
                        )}
                      {issue.status !== "Solved" && (
                        <div className="shadow-md rounded-lg p-2 cursor-pointer bg-green-700 text-white">
                          <button
                            className="px-1 text-sm font-semibold cursor-pointer"
                            onClick={() =>
                              updateIssueStatus(issue._id, "Solved")
                            }
                          >
                            Solved
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No reported issues found.</p>
            )}
          </div>
        )}

        {selectedSection === "solvedDepartmentIssues" && (
          <div className="w-full">
            {issues.filter((issue) => issue.status.toLowerCase() === "solved")
              .length > 0 ? (
              <div className="flex flex-col gap-5 overflow-y-auto lg:mr-35 max-h-[500px] p-2">
                {issues
                  .filter((issue) => issue.status === "Solved")
                  .map((issue, index) => (
                    <div
                      key={index}
                      className="flex flex-col md:flex-row items-start justify-between p-4 rounded-lg shadow-md bg-white"
                    >
                      {issue.image && (
                        <img
                          src={`http://localhost:5000${issue.image}`}
                          alt={issue.title}
                          className="w-full md:w-1/3 h-40 object-cover rounded-lg"
                        />
                      )}

                      <div className="flex flex-col w-full md:w-2/3 p-3">
                        <h4 className="text-lg font-bold mb-2">
                          {issue.title}
                        </h4>
                        <p className="text-gray-700">{issue.description}</p>
                        <div className="flex items-center mt-2 text-gray-600">
                          <FaMapMarkerAlt className="mr-1 text-blue-500" />
                          {issue.location}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-gray-500">No solved issues found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
