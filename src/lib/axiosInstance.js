import axios from "axios";
import Router from "next/router";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      toast(error.response?.data.message);
      Router.push("/");
    }
    toast(error.response?.data.message);
  }
);

export default axiosInstance;
