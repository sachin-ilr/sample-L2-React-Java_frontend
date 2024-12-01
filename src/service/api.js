import axios from "axios";

const BASE_URL = "http://localhost:8080/api"; // Updated base URL

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchData = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const postData = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateData = async (endpoint, id, data) => {
  try {
    const response = await api.put(`${endpoint}/${id}`, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteData = async (endpoint, id) => {
  try {
    await api.delete(`${endpoint}/${id}`);
  } catch (error) {
    handleApiError(error);
  }
};

const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error("API Error:", error.response.data);
    throw new Error(error.response.data.message || "An error occurred");
  } else if (error.request) {
    // The request was made but no response was received
    console.error("No response received:", error.request);
    throw new Error("No response from server");
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error("Request error:", error.message);
    throw new Error("Error setting up request");
  }
};
