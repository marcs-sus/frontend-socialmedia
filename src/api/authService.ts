import api from "./axios";
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from "../types/auth";

export const registerUser = async (data: RegisterRequest) => {
  const response = await api.post<AuthResponse>("/auth/register", data);

  return response.data;
};

export const loginUser = async (data: LoginRequest) => {
  const response = await api.post<AuthResponse>("/auth/login", data);

  return response.data;
};
