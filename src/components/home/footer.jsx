import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faYoutube, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between  sm:items-left lg:mx-35 mx-4">
      
          <div className="text-left md:text-left">
            <h3 className="text-xl text-left font-semibold">CivicConect</h3>
            <div className="flex  text-left md:justify-start space-x-4 mt-2">
              <FontAwesomeIcon icon={faFacebook} className="text-blue-500 hover:text-gray-400 text-2xl" />
              <FontAwesomeIcon icon={faYoutube} className="text-red-500 hover:text-gray-400 text-2xl" />
              <FontAwesomeIcon icon={faInstagram} className="text-pink-500 hover:text-gray-400 text-2xl" />
              <FontAwesomeIcon icon={faLinkedin} className="text-blue-400 hover:text-gray-400 text-2xl" />
            </div>
          </div>

          <div className="mt-4 md:mt-0">
            <select className="bg-gray-800 text-white p-2 rounded-md">
              <option value="nellore">Nellore</option>
              <option value="visakhapatnam">Visakhapatnam</option>
              <option value="srikakulam" selected>Srikakulam</option>
              <option value="guntur">Guntur</option>
              <option value="kakinada">Kakinada</option>
              <option value="vizinagaram">Vizianagaram</option>
              <option value="eluru">Eluru</option>
            </select>
          </div>
        </div>

        
        <div className="flex flex-col lg:mx-35 mx-4 justify-center md:justify-between mt-6 text-sm space-x-6">
          <a href="#" className="hover:text-gray-400">About Us</a>
          <a href="#" className="hover:text-gray-400">Achievements</a>
          <a href="#" className="hover:text-gray-400">Services</a>
          <a href="#" className="hover:text-gray-400">Departments</a>
          <a href="#" className="hover:text-gray-400">Privacy & Security</a>
        </div>

        
        <div className="text-center text-gray-500 text-xs mt-4">
          © {new Date().getFullYear()} CivicConnectz. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
