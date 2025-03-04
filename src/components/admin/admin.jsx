import React, { useState } from "react";
import { Header } from "../Department-dashboard/department-header";
const AdminPanel = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role: "Department" }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("User registered successfully!");
        handleAddDepartment();
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
    setLoading(false);
  };

  const handleAddDepartment = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (image) formData.append("image", image);

    try {
      const response = await fetch(
        "http://localhost:5000/api/issues/department/add",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert("Department added successfully!");
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error adding department:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md mt-10 border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Admin Panel - Manage Departments
        </h2>
        <p className="text-gray-500 text-center mb-4">
          Add new departments by entering their details below.
        </p>
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Department Name
            </label>
            <input
              type="text"
              placeholder="Enter department name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Department Logo
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full mt-1 p-2 border rounded-lg cursor-pointer"
            />
          </div>
          <button
            type="submit"
            className={`w-full p-3 rounded-lg text-white font-semibold ${
              loading
                ? "bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700 transition"
            }`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Add Department"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminPanel;
