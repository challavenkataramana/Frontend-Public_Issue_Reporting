import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../Login/login";
import User from "../Userportal/user";

export const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("usertoken");
    setIsLoggedIn(!!token);
  }, []);

  const handleroute = () => {
    navigate("/home");
  };

  return (
    <header className="text-black px-4 py-2 flex justify-between items-center shadow-xl w-full font-poppins">
      <div
        id="report"
        className="text-2xl lg:ml-30  sm:ml-0 font-semibold cursor-pointer"
        onClick={handleroute}
      >
        CivicConnect
      </div>
      <div >
        {isLoggedIn?<User /> : <Login setIsLoggedIn={setIsLoggedIn} />}
      </div>
    </header>
  );
};
