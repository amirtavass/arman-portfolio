import axios from "axios";

// FIXED: Proper API URL detection for static export
const getApiBaseUrl = () => {
  // For static export, we need to determine the API URL dynamically
  if (typeof window !== "undefined") {
    // Client-side: determine based on current environment
    const hostname = window.location.hostname;

    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return "http://localhost:4000";
    } else {
      // Production: Use your actual Railway backend URL
      return "https://parsswim-backend-production.up.railway.app";
    }
  } else {
    // Server-side: fallback for static generation
    return process.env.NODE_ENV === "production"
      ? "https://parsswim-backend-production.up.railway.app"
      : "http://localhost:4000";
  }
};

export const api = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true,
  timeout: 15000, // 15 seconds timeout for production
});

// Simple request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Simple response interceptor - only log actual errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Only log errors that are NOT 401 (unauthorized) for /admin/me and /auth/me
    const isAuthCheck =
      error.config?.url === "/admin/me" || error.config?.url === "/auth/me";
    const is401 = error.response?.status === 401;

    // Don't log expected 401 errors for auth checks
    if (!(isAuthCheck && is401)) {
      if (process.env.NODE_ENV === "development") {
        console.error(
          `API Error: ${error.config?.method?.toUpperCase()} ${
            error.config?.url
          } - Status: ${error.response?.status || "No Response"}`
        );
      }
    }

    return Promise.reject(error);
  }
);

export default api;
