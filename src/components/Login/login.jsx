import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import {useNavigate} from "react-router-dom"
const Login = ({ setIsLoggedIn }) => {
  const navigate=useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Citizens");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");

  const handleLogin = async () => {
   
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password,role: selectedRole  }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed");
        setMessage("");
        return;
      }

      setMessage("Login successful! Redirecting...");
      setError("");

      if (selectedRole === "Admin") {
        localStorage.setItem("admintoken", data.token);
      } else if (selectedRole === "Department") {
        localStorage.setItem("departmenttoken", data.token);
      } else {
        localStorage.setItem("usertoken", data.token);
      }

      setTimeout(() => {
        setShowPopup(false);
        setIsLoggedIn(true);
        setMessage("");
        
        if (selectedRole === "Admin") {
          navigate("/admin-home");
        } else if (selectedRole === "Department") {
          navigate("/department-Introduction",{state :{name:data.name}});
        }

      }, 2000);
    } catch (err) {
      setError("Something went wrong. Try again later.");
      setMessage("");
    }
  };

  const handleRegister = async () => {
    if (selectedRole !== "Citizens") {
      setError("Only Citizens registration is available.");
      setMessage("");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password,role: selectedRole  }),

      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registration failed");
        setMessage("");
        return;
      }

      localStorage.setItem("usertoken", data.token);

      setMessage("Login successful! Redirecting...");
      setError("");
      setTimeout(() => {
        setIsRegistering(false);
        setShowPopup(false);
        setIsLoggedIn(true);
        setMessage("");
      }, 2000);
    } catch (err) {
      setError("Something went wrong. Try again later.");
      setMessage("");
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowPopup(true)}
        className="text-white bg-blue-500 xl:mr-30 md:mr-20 sm:mr-0 px-4 py-2 rounded cursor-pointer"
      >
        Login
      </button>

      {showPopup && (
        <>
          <div
            className="fixed inset-0 flex items-center justify-center z-100"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
            onClick={() => setShowPopup(false)}
          >
            <div
              className="bg-white p-6 rounded-lg m-3 shadow-lg w-100 relative "
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl text-gray-700 font-sans mb-3 text-left ">
                {isRegistering ? "Register" : "Login"}
              </h2>

              <div className="flex justify-start ">
                {["Citizens", "Department", "Admin"].map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      setSelectedRole(role);
                      setIsRegistering(false);
                    }}
                    className={`px-1 py-1  text-left border-b-2 ${
                      selectedRole === role
                        ? "border-black-500"
                        : "border-transparent"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>

              <hr className=" border-gray-400 mb-3" />
              {message && (
                <p className="text-green-700 text-center mb-2">{message}</p>
              )}
              {error && (
                <p className="text-red-500 text-center mb-2">{error}</p>
              )}

              {isRegistering && (
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-2 border mb-2 rounded"
                  onChange={(e) => setName(e.target.value)}
                />
              )}

              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border mb-2 rounded"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 border mb-4 rounded"
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                onClick={isRegistering ? handleRegister : handleLogin}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition"
              >
                {isRegistering ? "Sign Up" : "Login"}
              </button>

              {selectedRole === "Citizens" && (
                <p className="text-sm text-gray-600 mt-2 text-center">
                  {isRegistering ? (
                    <>
                      Already have an account?{" "}
                      <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => setIsRegistering(false)}
                      >
                        Login
                      </span>
                    </>
                  ) : (
                    <>
                      Don't have an account?{" "}
                      <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => setIsRegistering(true)}
                      >
                        Sign Up
                      </span>
                    </>
                  )}
                </p>
              )}

              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-7 right-6 text-gray-900 hover:text-gray-500 text-md"
              >
                <FaTimes />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
