export interface Vote {
  postId: number;
  userId: number;
  voteType: number; // -1 = downvote, 0 = neutral, 1 = upvote

  createdAt: string;
}
