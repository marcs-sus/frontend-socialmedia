import api from "./axios";
import type { User } from "../types/user";

export const getUsers = async () => {
  const response = await api.get<User[]>("/users");

  return response.data;
};

export const createUser = async (data: {
  username: string;
  email: string;
  password?: string;
}) => {
  const response = await api.post("/users", data);

  return response.data;
};

export const updateUser = async (data: { username: string; email: string }) => {
  await api.put(`/users/`, data);
};

export const deleteUser = async () => {
  await api.delete(`/users/`);
};
