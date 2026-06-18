import api from "./axios";
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from "../types/auth";

export const register = async (data: RegisterRequest) => {
  const response = await api.post<AuthResponse>("/auth", data);

  return response.data;
};

export const login = async (data: LoginRequest) => {
  const response = await api.post<AuthResponse>("/auth/login", data);

  return response.data;
};
