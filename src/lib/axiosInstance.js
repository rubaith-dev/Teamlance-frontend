import axios from "axios";
import Router from "next/router";


const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
   
    if (error.response.status === 401) {
      Router.push("/");
    }
  }
);

export default axiosInstance;
