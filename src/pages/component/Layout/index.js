import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import axiosInstance from "@/lib/axiosInstance";

const index = ({ children }) => {
  // const isAuthentiated = async () => {
  //   const response = await axiosInstance.get("/auth/isAuthenticated");
  //   console.log(response);
  // };

  // useEffect(() => {
  //   isAuthentiated()
  // }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow">{children}</div>
    </div>
  );
};

export default index;
