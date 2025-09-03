import axios from "axios";

// Replace with your actual Railway URL
const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "parsswim-backend-production.up.railway.app" // ← Replace with your actual Railway URL
    : "http://localhost:4000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 15000, // 15 seconds timeout for production
});

// Add request interceptor to log API calls in development
api.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV !== "production") {
      console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV !== "production") {
      console.log(`API Response: ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    console.error("API Error:", error.response?.data || error.message);

    if (error.response?.status === 401) {
      // Handle authentication errors
      console.log("Authentication required");
    }

    if (error.response?.status >= 500) {
      console.error("Server error - please try again later");
    }

    return Promise.reject(error);
  }
);
