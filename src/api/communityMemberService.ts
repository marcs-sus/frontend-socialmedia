import api from "./axios";
import type { CommunityMember } from "../types/communityMember";

export const joinCommunity = async (communityId: number) => {
  const response = await api.post<CommunityMember>(`/communitymembers`, {
    communityId,
  });

  return response.data;
};

export const leaveCommunity = async (communityId: number) => {
  const response = await api.delete<CommunityMember>(
    `/communitymembers?communityId=${communityId}`,
  );

  return response.data;
};

export const getCommunityMembers = async (communityId: number) => {
  const response = await api.get<CommunityMember[]>(
    `communitymembers/community/${communityId}`,
  );

  return response.data;
};

export const getUserCommunities = async (userId: number) => {
  const response = await api.get<CommunityMember[]>(
    `communitymembers/user/${userId}`,
  );

  return response.data;
};
