import { apiClient } from "./apiClient";
const API_URL = import.meta.env.VITE_API_URL;

// REGISTER
export function registerUser(data) {
  return apiClient(`/api/auth/register`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// LOGIN
export function loginUser(data) {
  return apiClient(`/api/auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
