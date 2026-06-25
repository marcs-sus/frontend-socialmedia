import api from "./axios";
import type { Post } from "../types/post";

export const getPosts = async () => {
  const response = await api.get<Post[]>("/posts");

  return response.data;
};

export const createPost = async (data: {
  title: string;
  content: string;
  communityId: number;
}) => {
  const response = await api.post("/posts", data);

  return response.data;
};

export const updatePost = async (
  id: number,
  data: {
    title: string;
    content: string;
  },
) => {
  await api.put(`/posts/${id}`, data);
};

export const deletePost = async (id: number) => {
  await api.delete(`/posts/${id}`);
};
