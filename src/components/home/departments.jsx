import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const navigate=useNavigate();
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/issues/getdepartments"
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch departments");
        }

        const formattedDepartments = data.map((dept) => ({
          _id: dept._id,
          name: dept.name,
          image: `http://localhost:5000/uploadLogos/${dept.image}`,
        }));

        setDepartments(formattedDepartments);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);
  
  const isLogin = () => {
    return localStorage.getItem("usertoken") !== null;
  };
  
  const handleDepartment=(dept)=>{
    if (!isLogin()) {
      alert("You must be logged in to report any problem");
      return;
    }
    navigate(`/departments`,{state:{department:dept}});
  }

  return (
    <div className="px-4 lg:mx-30">
      <div className="w-full p-4 overflow-x-auto bg-gray-200 rounded scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        <div className="flex gap-4 whitespace-nowrap w-max">
          {departments.map((dept) => (
            <div
              key={dept._id}
              className="w-[200px] bg-white rounded-lg shadow-lg p-3 overflow-hidden flex-shrink-0 "
              onClick={()=> handleDepartment(dept)}
            >
              <img
                src={dept.image}
                alt={dept.name}
                className="w-full h-40 object-cover rounded-md"
              />

              <h3 className="text-lg font-semibold mt-2 text-center w-full break-words whitespace-normal">
                {dept.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
