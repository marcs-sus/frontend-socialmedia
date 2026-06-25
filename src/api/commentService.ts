import api from "./axios";
import type { Comment } from "../types/comment";

export const getCommentsByPost = async (postId: number) => {
  const response = await api.get<Comment[]>(`/comments/post/${postId}`);

  return response.data;
};

export const createComment = async (data: {
  content: string;
  postId: number;
  parentCommentId?: number;
}) => {
  const response = await api.post("/comments", data);

  return response.data;
};

export const deleteComment = async (id: number) => {
  await api.delete(`/comments/${id}`);
};
