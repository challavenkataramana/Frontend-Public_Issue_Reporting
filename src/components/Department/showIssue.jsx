import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaChartLine } from "react-icons/fa";

export const ShowIssue = ({ department }) => {
  const [totalIssues, setTotalIssues] = useState("");
  const [resolutionRate, setResolutionRate] = useState("");
  console.log(department._id);
  useEffect(() => {
    const fetchProblemCount = async () => {
      if (department) {
        const response = await fetch(
          `http://localhost:5000/api/issues/department/${department._id}`
        );
        const data = await response.json();
        setTotalIssues(data.issues);
        setResolutionRate(data.resolutionRate);
      }
    };
    fetchProblemCount();
  }, [department]);

  return (
    <>
      <div className="bg-white shadow-lg flex gap-5 justify-between items-center rounded-lg p-6 mt-4">
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-green-600">
            {totalIssues}
          </span>
          <div className="flex items-center space-x-3">
            <FaCheckCircle className="text-green-500 text-2xl" />
            <span className="text-lg font-medium">Total Issues </span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-blue-600">
            {resolutionRate}%
          </span>
          <div className="flex items-center space-x-3">
            <FaChartLine className="text-blue-500 text-2xl" />
            <span className="text-lg font-medium">Resolution Rate</span>
          </div>
        </div>
      </div>
    </>
  );
};
