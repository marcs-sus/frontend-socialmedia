import api from "./axios";
import type { Community } from "../types/community";

export const getCommunities = async () => {
  const response = await api.get<Community[]>("/communities");

  return response.data;
};

export const createCommunity = async (data: {
  name: string;
  description?: string;
  ownerId: number;
}) => {
  const response = await api.post("/communities", data);

  return response.data;
};

export const updateCommunity = async (
  id: number,
  data: {
    name: string;
    description?: string;
  },
) => {
  await api.put(`/communities/${id}`, data);
};

export const deleteCommunity = async (id: number) => {
  await api.delete(`/communities/${id}`);
};
