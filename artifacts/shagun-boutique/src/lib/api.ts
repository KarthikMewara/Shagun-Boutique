// Centralized axios instance for the Shagun Boutique backend.
// Mirrors the Ecommerce App pattern (Frontend/src/context/ShopContext.jsx)
// but pulls the base URL + auth token out of ShopContext, so any service
// can `import api from "@/lib/api"` and stay clean.
//
// Before this works you must:  npm install axios
//   (axios is NOT yet in package.json — see note at the bottom of ShopContext.tsx)

import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

export const backendUrl = baseURL;

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach the auth token to every request if we have one in localStorage.
// The Ecommerce App passes the token as a `token` header (not the standard
// `Authorization: Bearer ...`) because its middleware/auth.js reads `req.headers.token`.
// We replicate that exact contract so the same Node backend works as-is.
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.token = token;
    }
  }
  return config;
});

// Optional: surface backend error messages uniformly. Services can still
// catch and re-throw / handle as they like.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message || error?.message || "Request failed";
    return Promise.reject(new Error(message));
  }
);

export default api;
