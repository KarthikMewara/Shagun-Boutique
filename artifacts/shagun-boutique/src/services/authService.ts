// Maps to Ecommerce App → Backend/controllers/userController.js
//   POST /api/user/register  → registerUser
//   POST /api/user/login     → loginUser
//   POST /api/user/admin     → adminLogin
//
// Request/response shapes (from the Ecommerce App backend):
//   register({ name, email, password }) → { success, token }
//   login({ email, password })          → { success, token }
//   adminLogin({ email, password })     → { success, token }
//
// All endpoints return `{ success: boolean, message?: string, token?: string }`.

import api from "@/lib/api";

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterPayload extends AuthCredentials {
  name: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
}

export async function registerUser(
  payload: RegisterPayload
): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>("/api/user/register", payload);
  return data;
}

export async function loginUser(
  payload: AuthCredentials
): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>("/api/user/login", payload);
  return data;
}

export async function adminLogin(
  payload: AuthCredentials
): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>("/api/user/admin", payload);
  return data;
}

export const authService = {
  register: registerUser,
  login: loginUser,
  adminLogin,
};

export default authService;
