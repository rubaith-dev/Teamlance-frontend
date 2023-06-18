import axios from "axios";
import Router from "next/router";
import { destroyCookie } from "nookies";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if(!error.response){
      toast("Make Sure Backend Server is on")
      return
    }
    if (error.response.status === 401) {
      destroyCookie(null, "access-token");
      Router.push("/")
    }
    toast(error.response?.data.message);
    return error
  }
);

export default axiosInstance;
