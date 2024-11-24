const BASE_URL = "http://localhost:8080"; // Update this to your backend's URL

// Utility function to handle API calls
const apiRequest = async (endpoint, method = "GET", body = null) => {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Request Failed:", error);
    throw error;
  }
};

// Example API methods
export const fetchData = (endpoint) => apiRequest(endpoint);
export const postData = (endpoint, data) => apiRequest(endpoint, "POST", data);
export const deleteData = (endpoint) => apiRequest(endpoint, "DELETE");
export const updateData = (endpoint, data) => apiRequest(endpoint, "PUT");
