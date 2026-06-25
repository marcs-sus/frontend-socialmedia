export interface Comment {
  id: number;
  content: string;

  authorId: number;
  authorUsername: string;

  postId: number;
  parentCommentId?: number;

  createdAt: string;
}
