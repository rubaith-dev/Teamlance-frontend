import React from "react";

const index = ({ title, className, bgColor }) => {
  return (
    <div
      className={`py-2 px-4 bg-primary-700 w-fit rounded-md text-white ${className} ${bgColor} `}
    >
      {title}
    </div>
  );
};

export default index;
