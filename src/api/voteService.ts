import api from "./axios";
import type { Vote } from "../types/vote";

export const vote = async (postId: number, data: { voteType: number }) => {
  const response = await api.post(`/posts/${postId}/vote`, data);

  return response.data;
};

export const getVoteByPost = async (postId: number) => {
  const response = await api.get<Vote[]>(`/posts/${postId}/vote`);

  return response.data;
};
