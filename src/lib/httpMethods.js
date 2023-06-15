import axiosInstance from "./axiosInstance";

const postRequest = async (url, data) => {
  const response = await axiosInstance.post(url, data);
  return response?.data;
};

const getRequest = async (url) => {
  const response = await axiosInstance.get(url);
  return response?.data;
};

const putRequest = async (url, data) => {
  const response = await axiosInstance.put(url, data);
  return response?.data;
};

const deleteRequest = async (url) => {
  const response = await axiosInstance.delete(url);
  return response?.data;
};

export { getRequest, postRequest, deleteRequest, putRequest };
