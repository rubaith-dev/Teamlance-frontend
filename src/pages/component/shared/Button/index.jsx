import React from "react";

const index = ({ className, bgColor, children, ...props }) => {
  return (
    <button
      className={`bg-primary-700 text-white ${className} ${bgColor} `}
      {...props}
    >
      {children}
    </button>
  );
};

export default index;
