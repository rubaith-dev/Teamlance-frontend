import axiosInstance from "./axiosInstance";
import { toast } from "react-toastify";

const postRequest = async (url, data) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    // Show error alert
    toast(error.response?.data.message);
  }
};

const getRequest = async (url) => {
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    // Show error alert
    toast(error.response?.data.message);
  }
};

const putRequest = async (url, data) => {
  try {
    const response = await axiosInstance.put(url, data);
    return response.data;
  } catch (error) {
    // Show error alert
    toast(error.response?.data.message);
  }
};

const deleteRequest = async (url) => {
  try {
    const response = await axiosInstance.delete(url);
    return response.data;
  } catch (error) {
    // Show error alert
    toast(error.response?.data.message);
  }
};

export { getRequest, postRequest, deleteRequest, putRequest };
