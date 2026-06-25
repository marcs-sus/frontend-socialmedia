import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getCommentsByPost,
  createComment,
  deleteComment,
} from "../api/commentService";
import { getPosts } from "../api/postService";
import { useSearchParams } from "react-router-dom";
import type { Comment } from "../types/comment";
import type { Post } from "../types/post";

export default function CommentsPage() {
  const [searchParams] = useSearchParams();
  const [comments, setComments] = useState<Comment[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [content, setContent] = useState("");
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const postIdParam = searchParams.get("postId");
  const postId = postIdParam ? Number(postIdParam) : 0;

  const { user } = useAuth();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [commentsData, postsData] = await Promise.all([
      getCommentsByPost(postId),
      getPosts(),
    ]);

    setComments(commentsData);
    setPosts(postsData);
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!user || !postId) return;

    await createComment({
      content,
      postId,
    });

    setContent("");
    loadData();
  };

  const handleReply = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!user || !postId || replyTo == null) return;

    await createComment({
      content: replyContent,
      postId,
      parentCommentId: replyTo,
    });

    setReplyTo(null);
    setReplyContent("");
    loadData();
  };

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Delete comment?");

    if (!confirmed) return;

    await deleteComment(id);
    loadData();
  };

  return (
    <>
      <h1>Comments</h1>

      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
        />
        <button type="submit">Create</button>
      </form>

      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment-card">
            <p>{comment.content}</p>
            <p>
              <small>Commented by: {comment.authorUsername}</small>
            </p>
            <p>
              <small>
                On post:{" "}
                {posts.find((p) => p.id === comment.postId)?.title || "Unknown"}
              </small>
            </p>
            <p>
              <small>
                Created: {new Date(comment.createdAt).toLocaleString()}
              </small>
            </p>

            <form onSubmit={handleReply}>
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Reply Content"
                required
              />
              <button type="submit" onClick={() => setReplyTo(comment.id)}>
                Reply
              </button>
            </form>

            {comment.authorId === user?.userId && (
              <button onClick={() => handleDelete(comment.id)}>Delete</button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
