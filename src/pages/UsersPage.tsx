import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateUser, deleteUser } from "../api/userService";
import { getUserCommunities } from "../api/communityMemberService";

import type { CommunityMember } from "../types/communityMember";

export default function UsersPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userCommunities, setUserCommunities] = useState<CommunityMember[]>([]);

  const { user, login, logout } = useAuth();

  const loadUserCommunities = async () => {
    if (!user) return;
    const data = await getUserCommunities(user.userId);
    setUserCommunities(data);
  };

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      loadUserCommunities();
    }
  }, [user]);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!user) return;

    await updateUser({
      username,
      email,
    });

    // Update the user in the auth context
    login({ ...user, username, email, token: user.token });
  };

  const handleDelete = async () => {
    const confirmed = confirm(
      "Delete your account? This action cannot be undone.",
    );

    if (!confirmed) return;

    if (!user) return;

    await deleteUser();
    logout();
  };

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <>
      <h1>Profile</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          required
        />

        <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
          <button type="submit">Update Profile</button>
          <button
            type="button"
            onClick={handleDelete}
            style={{ backgroundColor: "#e74c3c" }}
          >
            Delete Account
          </button>
        </div>
      </form>

      <div style={{ marginTop: "30px" }}>
        <h3>Your Information</h3>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        {user.createdAt && (
          <p>
            <small>
              Account created: {new Date(user.createdAt).toLocaleString()}
            </small>
          </p>
        )}
      </div>

      <div className="user-communities-section">
        <h3>Your Communities</h3>
        {userCommunities.length > 0 ? (
          <div className="user-communities-list">
            <ul>
              {userCommunities.map((community) => (
                <li key={community.communityId} className="user-community-item">
                  <strong>{community.communityName}</strong>
                  <small className="user-community-joined-date">
                    Joined: {new Date(community.joinedAt).toLocaleString()}
                  </small>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>You haven't joined any communities yet.</p>
        )}
      </div>
    </>
  );
}
