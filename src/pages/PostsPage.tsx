import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "../api/postService";
import { getCommunities } from "../api/communityService";
import { vote } from "../api/voteService";
import type { Post } from "../types/post";
import type { Community } from "../types/community";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [communityId, setCommunityId] = useState<number | "">("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const { user } = useAuth();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [postsData, communitiesData] = await Promise.all([
      getPosts(),
      getCommunities(),
    ]);

    setPosts(postsData);
    setCommunities(communitiesData);
  };

  const handleVote = async (postId: number, voteType: number) => {
    if (!user) return;

    try {
      await vote(postId, { voteType });

      loadData();
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!user || !communityId) return;

    if (editingId === null) {
      await createPost({
        title,
        content,
        communityId,
      });
    } else {
      await updatePost(editingId, {
        title,
        content,
      });
    }

    setTitle("");
    setContent("");
    setCommunityId("");
    setEditingId(null);

    loadData();
  };

  const handleEdit = (post: Post) => {
    setEditingId(post.id);
    setTitle(post.title);
    setContent(post.content);
    setCommunityId(post.communityId);
  };

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Delete post?");

    if (!confirmed) return;

    await deletePost(id);
    loadData();
  };

  const handleCommentsClick = (postId: number) => {
    window.location.href = `/comments?postId=${postId}`;
  };

  return (
    <>
      <h1>Posts</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
        />

        <select
          value={communityId}
          onChange={(e) => setCommunityId(Number(e.target.value))}
          required
        >
          <option value="" disabled>
            Select Community
          </option>
          {communities.map((community) => (
            <option key={community.id} value={community.id}>
              {community.name}
            </option>
          ))}
        </select>

        <button type="submit">
          {editingId === null ? "Create" : "Update"}
        </button>

        {editingId !== null && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setTitle("");
              setContent("");
              setCommunityId("");
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <div className="posts-list">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>
              <small>
                Posted by: {post.authorUsername} in {post.communityName}
              </small>
            </p>
            <p>
              <small>
                Created: {new Date(post.createdAt).toLocaleString()}
              </small>
            </p>

            <div className="vote-section">
              <button onClick={() => handleVote(post.id, 1)}>▲</button>
              <span>{post.voteCount}</span>
              <button onClick={() => handleVote(post.id, -1)}>▼</button>
            </div>

            <button onClick={() => handleCommentsClick(post.id)}>
              Comments
            </button>

            {post.authorId === user?.userId && (
              <>
                <button onClick={() => handleEdit(post)}>Edit</button>
                <button onClick={() => handleDelete(post.id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
