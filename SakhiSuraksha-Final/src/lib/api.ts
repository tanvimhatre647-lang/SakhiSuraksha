export const API_BASE = 
  typeof window !== "undefined" && 
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "http://localhost:5000"
    : typeof window !== "undefined"
      ? `http://${window.location.hostname}:5000`
      : "http://localhost:5000";
