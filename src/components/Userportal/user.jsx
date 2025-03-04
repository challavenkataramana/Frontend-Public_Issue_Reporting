import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaBook,
  FaCheckCircle,
  FaSignOutAlt,
} from "react-icons/fa";

const User = () => {
  const [isOpenDesktop, setIsOpenDesktop] = useState(false);
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [userDetails, setUserDetails] = useState(null);
  
  const navigate = useNavigate();
  let timeoutId = null;

  useEffect(() => {
    fetchUserDetails();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/issues/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUserDetails(data);
      } else {
        console.error("Error fetching user details:", data.error);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const toggleMobileMenu = () => setIsOpenMobile(!isOpenMobile);
  const closeMobileMenu = () => setIsOpenMobile(false);

  const yourprofile = (name) => {
    navigate("/profile",{state:{  tab: name,
      email: userDetails?.email,}});
    closeMobileMenu();
  };

  const handleLogout = () => {  
    localStorage.removeItem("usertoken");
    window.location.replace("/home");
  };

  const handleDesktopOpen = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setIsOpenDesktop(true);
    }, 200);
  };

  const handleDesktopClose = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setIsOpenDesktop(false);
    }, 200);
  };


  return (
    <>
      <button
        onClick={() => isMobile && toggleMobileMenu()}
        onMouseEnter={handleDesktopOpen}
        className="p-2 lg:mr-30  ml-4"
      >
        <FaUserCircle className="w-10 h-10 text-gray-700 hover:text-black transition cursor-pointer" />
      </button>

      {!isMobile && isOpenDesktop && (
        <div
          className="fixed right-15 mt-3 flex rounded-lg transition-opacity ease-in-out z-50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
          onClick={() => setIsOpenDesktop(false)}
        >
          <div
            className="bg-white p-6 rounded-lg  shadow-lg w-70 relative"
            onMouseLeave={handleDesktopClose}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-900"
              onClick={() => setIsOpenDesktop(false)}
            >
              &times;
            </button>

            <div className="flex flex-col items-center text-center mt-10 w-full max-w-xs">
              <FaUserCircle className="w-16 h-16 text-gray-500 mb-2" />
              {userDetails ? (
                <>
                  <p className="text-lg font-semibold w-full max-w-xs break-all overflow-hidden whitespace-normal">
                    {userDetails?.name}
                  </p>
                  <p className="text-gray-500 w-full max-w-xs break-all overflow-hidden whitespace-normal">
                    {userDetails?.email}
                  </p>
                </>
              ) : (
                <p className="text-gray-500">Loading user details...</p>
              )}
            </div>

            <hr className="my-4" />

            <div className="space-y-3">
              <button
                className="flex items-center w-full p-3 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer"
                onClick={()=> yourprofile("totalRaisedIssues")}
              >
                <FaBook className="mr-2" /> Total Reported Issues
              </button>
              <button
                className="flex items-center w-full p-3 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer"
                onClick={()=> yourprofile("solvedIssues")}
              >
                <FaCheckCircle className="mr-2" /> Solved Issues
              </button>
              <button
                className="flex items-center w-full p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="mr-2" /> Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {isMobile && (
        <div
          className={`fixed inset-0 z-50 transition-opacity ${
            isOpenMobile ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
          onClick={closeMobileMenu}
        >
          <div
            className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
              isOpenMobile ? "translate-x-0" : "-translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-900"
              onClick={closeMobileMenu}
            >
              &times;
            </button>

            <div className="flex flex-col items-center text-center mt-10 w-full max-w-xs">
              <FaUserCircle className="w-16 h-16 text-gray-500 mb-2" />
              {userDetails ? (
                <>
                  <p className="text-lg font-semibold w-full max-w-xs break-all overflow-hidden whitespace-normal">
                    {userDetails?.name}
                  </p>
                  <p className="text-gray-500 w-full max-w-xs break-all overflow-hidden whitespace-normal">
                    {userDetails?.email}
                  </p>
                </>
              ) : (
                <p className="text-gray-500">Loading user details...</p>
              )}
            </div>

            <hr className="my-4" />

            <div className="space-y-3 px-4">
              <button
                className="flex items-center w-full p-3 bg-gray-100 rounded-lg hover:bg-gray-200"
                onClick={()=> yourprofile("totalRaisedIssues")}
              >
                <FaBook className="mr-2" />
                  Total Reported Issues
              </button>
              <button
                className="flex items-center w-full p-3 bg-gray-100 rounded-lg hover:bg-gray-200"
                onClick={()=> yourprofile("solvedIssues")}
              >
                <FaCheckCircle className="mr-2" /> Solved Issues
              </button>
              <button
                className="flex items-center w-full p-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="mr-2" /> Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
