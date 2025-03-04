import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./report.css";
const Report = () => {
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("Finance");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartmentNames = async () => {
      setLoadingDepartments(true);
      try {
        const response = await fetch(
          "http://localhost:5000/api/issues/getdepartments"
        );
        const data = await response.json();
        if (!response) {
          throw new Error(data.error || "Failed to fetch");
        }

        const formattedDepartments = data.map((dept) => ({
          _id: dept._id,
          name: dept.name,
          image: `http://localhost:5000/uploadLogos/${dept.image}`,
        }));
        setDepartments(formattedDepartments);
      } catch (error) {
        console.log("Error fetching details", error);
      } finally {
        setLoadingDepartments(false);
      }
    };
    fetchDepartmentNames();
  }, []);

  const isLogin = () => {
    return localStorage.getItem("usertoken") !== null;
  };

  const handleReportClick = () => {
    if (!isLogin()) {
      alert("You must be logged in to report any problem");
      return;
    }

    if (!selectedDepartment) {
      alert("Select a department");
      return;
    }
    const selectedDept = departments.find(
      (dept) => dept.name === selectedDepartment
    );
    
    if (!selectedDept) {
      alert("Please select a department first.");
      return;
    }
    navigate(`/departments`, { state: { department: selectedDept } });
  };

  return (
    <div className="px-4">
      <div className="bg-white p-3 my-3 mt-7 shadow-lg rounded flex flex-col lg:space-x-3 space-y-1 lg:flex-row items-center lg:ml-30 w-full max-w-full lg:max-w-[500px] mx-auto">
        <div className="w-full relative">
          <label className="absolute top-1 left-3 bg-white px-1 text-xs text-gray-500">
            Select Department
          </label>

          <select
            className="w-full mt-3 px-2 pt-3 pb-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-200"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            disabled={loadingDepartments}
          >
            <option value="" hidden>
              Select a department
            </option>
            {departments.map((dept) => (
              <option key={departments._id} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full">
          <button
            className="w-full py-1.5 mt-1.5 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition disabled:opacity-50 cursor-pointer"
            onClick={handleReportClick}
            disabled={loadingDepartments || departments.length === 0}
          >
            Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Report;
