import React from "react";

const Spinner = ({ size = "w-8 h-8", color = "border-blue-500" }) => {
  return (
    <div className={`flex justify-center items-center pb-10`}>
      <div
        className={`border-4 border-t-transparent ${color} ${size} rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default Spinner;
