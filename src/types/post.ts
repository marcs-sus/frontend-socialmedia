export interface Post {
  id: number;
  title: string;
  content: string;

  authorId: number;
  authorUsername: string;

  communityId: number;
  communityName: string;

  voteCount: number;

  createdAt: string;
  updatedAt?: string;
}
