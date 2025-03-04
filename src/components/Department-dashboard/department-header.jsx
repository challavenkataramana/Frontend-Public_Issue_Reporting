import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  const handleroute = () => {
    navigate("/department-home");
  };

  return (
    <header className="text-black  bg-gray-300 px-4 py-3 flex justify-between items-center  w-full font-poppins">
      <div
        id="report"
        className="text-3xl ml-3 font-semibold cursor-pointer"
        onClick={handleroute}
      >
        CivicConnect
      </div>
    </header>
  );
};
