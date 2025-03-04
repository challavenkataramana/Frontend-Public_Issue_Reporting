import React from "react";
import { Header } from "./header";
import { Departments } from "./departments";
import Report from "./report";
import  Footer from "./footer";
import { FaMapMarkerAlt, FaClock, FaUsers, FaCity } from "react-icons/fa";
import "./report.css";
export const Home = () => {
  return (
    <div className="w-full m-0 p-0">
      <Header />
      <h3 className="text-2xl  font-semibold text-left mt-8 lg:ml-35  mx-3">
        Your Voice Matters in Better Communities
      </h3>

      <p className="text-gray-500 mt-1 lg:ml-35  mx-3">
        Report, Track and Resolve Public Infrastucture Together
      </p>
      <Report />
      <h3 className="text-xl lg:ml-35 font-semibold ml-4 text:left my-9">
        Report In Corresponding Department
      </h3>
      <Departments />
      
      <div className="mx-5 mt-12 text-center">
        <h3 className="text-2xl font-semibold text-center">
          Why Choose CivicConnect?
        </h3>
        <p className="text-gray-500 mt-1 ">
          A smart way to report and track public issues for a better community.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 mx-4 sm:mx-3 lg:mx-35 mb-4" >
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center">
          <div className="flex justify-center items-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <FaMapMarkerAlt className="text-blue-500 text-3xl" />
          </div>
          <h4 className="text-lg font-semibold mb-3">Easy Issue Reporting</h4>
          <ul className="text-gray-500 space-y-2 text-left">
            <li>Upload photos of the problem</li>
            <li>Pin exact location using GPS</li>
            <li>Select relevant department</li>
            <li>Provide detailed description</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <div className="flex justify-center items-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <FaClock className="text-green-500 text-3xl" />
          </div>
          <h4 className="text-lg font-semibold mb-3 text-left">Real-time Tracking</h4>
          <ul className="text-gray-500 space-y-2 text-left">
            <li>Monitor issue status</li>
            <li>Receive progress updates</li>
            <li>View resolution timeline</li>
          </ul>
        </div>

        
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <div className="flex justify-center items-center w-16 h-16 bg-purple-100 rounded-full mb-4">
            <FaUsers className="text-purple-500 text-3xl" />
          </div>
          <h4 className="text-lg font-semibold mb-3">Department Integration</h4>
          <ul className="text-gray-500 space-y-2 text-left">
            <li>Direct communication with officials</li>
            <li>Efficient issue assignment</li>
            <li>Transparent resolution process</li>
          </ul>
        </div>

      
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <div className="flex justify-center items-center w-16 h-16 bg-orange-100 rounded-full mb-4">
            <FaCity className="text-orange-500 text-3xl" />
          </div>
          <h4 className="text-lg font-semibold mb-3 text-left">Community Impact</h4>
          <ul className="text-gray-500 space-y-2 text-left">
            <li>View similar reports in your area</li>
            <li>Track community improvements</li>
            <li>Contribute to city development</li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};
