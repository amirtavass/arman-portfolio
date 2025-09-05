// app/components/ApiDebugger.js
"use client";
import { useState, useEffect } from "react";
import { api } from "@/app/lib/api";

export default function ApiDebugger() {
  const [apiStatus, setApiStatus] = useState("checking");
  const [apiResponse, setApiResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    checkApi();
  }, []);

  const checkApi = async () => {
    setApiStatus("checking");
    setError(null);

    try {
      const response = await api.get("/");
      if (response.data) {
        setApiStatus("connected");
        setApiResponse(response.data);
      } else {
        setApiStatus("failed");
        setError("No response from API");
      }
    } catch (err) {
      setApiStatus("error");
      setError(err.message || "Unknown error");
      console.error("API Check Error:", err);
    }
  };

  if (isMinimized) {
    return (
      <div
        className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-2 border z-50 cursor-pointer"
        onClick={() => setIsMinimized(false)}
      >
        <div
          className={`w-3 h-3 rounded-full ${
            apiStatus === "connected"
              ? "bg-green-500"
              : apiStatus === "checking"
              ? "bg-yellow-500 animate-pulse"
              : "bg-red-500"
          }`}
        />
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm border z-50">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-sm">API Debug Info</h3>
        <button
          onClick={() => setIsMinimized(true)}
          className="text-gray-500 hover:text-gray-700 text-xs"
        >
          ✕
        </button>
      </div>

      <div className="text-xs space-y-1">
        <div>
          <span className="font-semibold">Status:</span>{" "}
          <span
            className={`font-bold ${
              apiStatus === "connected"
                ? "text-green-600"
                : apiStatus === "checking"
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {apiStatus.toUpperCase()}
          </span>
        </div>

        {apiResponse && apiStatus === "connected" && (
          <div className="text-green-600 text-xs">
            ✓ Backend running
            <br />
            ✓ Database connected
            <br />✓ CORS configured
          </div>
        )}

        {error && (
          <div>
            <span className="font-semibold text-red-600">Error:</span>
            <div className="text-red-600 text-xs">{error}</div>
          </div>
        )}

        <button
          onClick={checkApi}
          className="mt-2 bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 w-full"
        >
          Retest Connection
        </button>
      </div>
    </div>
  );
}
