
import React, { useState, useEffect } from "react";
import { Header } from "../home/header";
import { useLocation, useNavigate } from "react-router-dom";
import {SolvedIssues} from "./solvedIssues";
import { TotalReportedProblems } from "./totalReportedIssues";
import {
  FaExclamationCircle,
  FaCheckCircle,
  FaArrowLeft,
} from "react-icons/fa";

export const UserProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const name = location.state?.tab || localStorage.getItem("tab");
  const userEmail = location.state?.email || localStorage.getItem("userEmail");
  const [selectedSection, setSelectedSection] = useState(name);

  useEffect(() => {
    localStorage.setItem("tab", selectedSection);
    if (userEmail) {
      localStorage.setItem("userEmail", userEmail);
    }
  }, [selectedSection, userEmail]);

  useEffect(() => {
    if (location.state?.tab) {
      setSelectedSection(location.state.tab);
    }
  }, [location.state?.tab]);

  const getSectionTitle = () => {
    switch (selectedSection) {
      case "totalRaisedIssues":
        return "Total Reported Issues";
      case "solvedIssues":
        return "Solved Issues";
      default:
        return "Your Account";
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col sm:flex-row lg:ml-32 ml-0 mt-10">
        <div className="hidden sm:block w-1/4 p-5 ">
          <button
            className="flex items-center text-black-900 font-semibold mb-6 text-lg cursor-pointer"
            onClick={() => navigate("/home")}
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
          <ul className="space-y-3">
            <li
              className={`flex items-center cursor-pointer p-4 rounded-md text-md ${
                selectedSection === "totalRaisedIssues"
                  ? "bg-blue-100 text-blue-500 font-bold"
                  : "bg-white"
              }`}
              onClick={() => setSelectedSection("totalRaisedIssues")}
            >
              <FaExclamationCircle className="mr-2" /> Total Reported Issues
            </li>
            <li
              className={`flex items-center cursor-pointer p-4 rounded-md text-md ${
                selectedSection === "solvedIssues"
                  ? "bg-blue-100 text-blue-500 font-bold"
                  : "bg-white"
              }`}
              onClick={() => setSelectedSection("solvedIssues")}
            >
              <FaCheckCircle className="mr-2" /> Solved Issues
            </li>
          </ul>
        </div>

        <div className="w-full sm:w-3/4  lg:mr-30 p-3  mr-3 ">
          <h3 className="text-2xl font-semibold mb-5 ml-3">
            {window.innerWidth < 768 ? getSectionTitle() : "Your Account"}
          </h3>
          {selectedSection === "totalRaisedIssues" && (
            <div className="w-full">
              <TotalReportedProblems useremail={userEmail} />
            </div>
          )}
          {selectedSection === "solvedIssues" && (
            <div className="w-full">
                 <SolvedIssues useremail={userEmail} />
            </div>
          )}
          {selectedSection === "profile" && (
            <div className="w-full">
              <h3 className="text-2xl font-bold">
                Welcome to your profile page
              </h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
