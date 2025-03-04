import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { io } from "socket.io-client";
import { Header } from "./department-header";
import Footer from "../home/footer";
import { FaBell } from "react-icons/fa";

const socket = io("http://localhost:5000");

export const DepartmentIntroduction = () => {
  const [department, setDepartment] = useState(null);
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [loading, setLoading] = useState(true); // Added loading state
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("departmenttoken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded", decoded);
        setEmail(decoded.email);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchDepartmentData = async () => {
      if (email) {
        try {
          const res = await fetch(`http://localhost:5000/api/issues/dept/${email}`);
          const data = await res.json();
          setDepartment(data.departmentDetails);

          if (data.departmentDetails?._id) {
            const issuesRes = await fetch(
              `http://localhost:5000/api/issues/department/${data.departmentDetails._id}`
            );
            const detailsData = await issuesRes.json();
            setDetails(detailsData);
          }
        } catch (error) {
          console.error("Error fetching data", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDepartmentData();
  }, [email]);

  useEffect(() => {
    if (department) {
      console.log("Socket connected:", socket.id); 
      const handleNewIssue = (data) => {
        console.log(data);
        if (data.departmentId === department._id) {
          setNotifications((prev) => [...prev, data]);
        }
      };

      socket.on("new_issue", handleNewIssue);

      return () => {
        socket.off("new_issue", handleNewIssue);
      };
    }
  }, [department]);

  const handleDashboard = () => navigate("/department/dashboard");
  const clearNotifications = () => {
    setNotifications([]);
    setShowNotifications(false);
  };

  return (
    <>
      <Header />

      <div className="relative bg-cover bg-center h-50 flex items-center p-5 mt-15 mb-5 justify-center text-black">
        <div className="bg-gray-200 bg-opacity-50 p-5 rounded-lg">
          <h2 className="text-3xl font-bold">
            Welcome to {department?.name || "Loading..."} 
          </h2>
          <p className="text-lg mt-2">
            Report, Track, and Resolve Public Infrastructure Together
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <p className="text-gray-500 text-lg">Fetching department details...</p>
          </div>
        ) : details ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold">Total Issues</h3>
                <p className="text-3xl text-blue-600 font-semibold">{details.issues || 0}</p>
              </div>
              <div className="bg-green-100 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold">Resolution %</h3>
                <p className="text-3xl text-green-600 font-semibold">{details?.resolutionRate || 0}</p>
              </div>
              <div className="bg-red-100 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold">Pending</h3>
                <p className="text-3xl text-red-600 font-semibold">{details?.pendingIssues || 0}</p>
              </div>
            </div>

            <div className="text-center mt-10">
              <button
                onClick={handleDashboard}
                className="bg-blue-600 cursor-pointer text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-blue-700">
                Open Dashboard
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-32">
            <p className="text-gray-500 text-lg">No details found for this department.</p>
          </div>
        )}
      </div>

      <div className="fixed top-2 right-4">
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700">
           <FaBell className="text-xl" />
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              {notifications.length}
            </span>
          )}
        </button>
      </div>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="fixed top-16 right-4 w-64 bg-white shadow-lg rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold">Notifications</h3>
            <button onClick={clearNotifications} className="text-red-500 text-sm">
              Clear All
            </button>
          </div>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div key={index} className="p-2 border-b border-gray-200">
                <p className="text-sm font-semibold">{notification.title}</p>
                <p className="text-xs text-gray-600">{notification.description}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No new notifications</p>
          )}
        </div>
      )}

      <Footer />
    </>
  );
};
