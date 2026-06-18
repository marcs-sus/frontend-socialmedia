import api from "./axios";
import type { User } from "../types/user";

export const getUsers = async () => {
  const response = await api.get<User[]>("/users");

  return response.data;
};

export const createUser = async (data: { username: string; email: string }) => {
  const response = await api.post("/users", data);

  return response.data;
};

export const updateUser = async (
  id: number,
  data: {
    username: string;
    email: string;
  },
) => {
  await api.put(`/users/${id}`, data);
};

export const deleteUser = async (id: number) => {
  await api.delete(`/users/${id}`);
};
