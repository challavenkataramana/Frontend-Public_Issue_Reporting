import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "../home/header";
import { ShowIssue } from "./showIssue";
import Footer from "../home/footer";

export const CorrespondingDepartment = () => {
  const location = useLocation();
  const [department, setDepartment] = useState(
    location.state?.department ||
      JSON.parse(localStorage.getItem("department")) ||
      null
  );
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [image, setImage] = useState(null);
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (department) {
      localStorage.setItem("department", JSON.stringify(department));
    }
  }, [department]);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const isLogin = () => {
    return localStorage.getItem("usertoken") !== null;
  };

  const handleSubmit = async (e) => {
    if (!isLogin()) {
      alert("You must be logged in to report any problem");
      return;
    }
    e.preventDefault();
    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("title", title);
    formDataToSend.append("description", description);
    formDataToSend.append("location", locationInput);
    formDataToSend.append("departmentName", department.name);
    formDataToSend.append("userEmail", "rs200070@rguktsklm.ac.in");
    if (image) {
      formDataToSend.append("image", image);
    }

    try {
      const response = await fetch("http://localhost:5000/api/issues/report", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        alert("Issue reported successfully!");
        setTitle("");
        setDescription("");
        setLocationInput("");
        setImage(null);
        setFileInputKey(Date.now());
      } else {
        alert("Failed to report the issue.");
      }
    } catch (error) {
      console.error("Error reporting issue:", error);
      alert("Error submitting the form.");
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <h3 className="text-xl xl:ml-35 md:ml-25 mx-4 font-semibold mt-8  text-left">
        Welcome to {department?.name || "Department"}
      </h3>
      <p className="text-gray-500 mt-1 xl:ml-35 md:ml-25 mx-4 mb-5">
        Make your country green by Participating in CivicConnect Initiative
      </p>
      <div className="flex flex-col md:flex-row justify-between xl:mx-30 md:mx-25 mx-4 items-center p-4  gap-10">
        <div className="w-full md:w-20/40">
          {department ? (
            <div className="bg-white shadow-lg rounded-lg p-0">
              <img
                src={department.image}
                alt={department.name}
                className="w-full h-70 md:h-80 lg:h-90 object-cover rounded-md"
              />
            </div>
          ) : (
            <p className="text-red-500">Department data not available.</p>
          )}
          <ShowIssue department={department} />
        </div>

        <div className="w-full md:w-20/40 bg-white shadow-lg lg:mr-15 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Report the Problem</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                className="w-full mt-1 p-2 border rounded-lg"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Image
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full text-white p-2   cursor-pointer rounded-lg ${loading ? "bg-gray-500" : "bg-blue-500"}`}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
