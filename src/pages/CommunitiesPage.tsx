import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getCommunities,
  createCommunity,
  updateCommunity,
  deleteCommunity,
} from "../api/communityService";
import {
  joinCommunity,
  leaveCommunity,
  getCommunityMembers,
  getUserCommunities,
} from "../api/communityMemberService";

import type { Community } from "../types/community";
import type { CommunityMember } from "../types/communityMember";

export default function CommunitiesPage() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [userCommunities, setUserCommunities] = useState<CommunityMember[]>([]);
  const [communityMembers, setCommunityMembers] = useState<
    Record<number, CommunityMember[]>
  >({});
  const [expandedCommunity, setExpandedCommunity] = useState<number | null>(
    null,
  );

  const { user } = useAuth();

  const loadCommunities = async () => {
    const data = await getCommunities();

    setCommunities(data);
  };

  const loadUserCommunities = async () => {
    if (!user) return;
    const data = await getUserCommunities(user.userId);
    setUserCommunities(data);
  };

  const loadMembersForCommunity = async (communityId: number) => {
    if (communityMembers[communityId]) return;
    const data = await getCommunityMembers(communityId);
    setCommunityMembers((prev) => ({
      ...prev,
      [communityId]: data,
    }));
  };

  const handleToggleCommunity = async (communityId: number) => {
    if (!user) return;

    const isMember = userCommunities.some(
      (cm) => cm.communityId === communityId,
    );

    if (isMember) {
      await leaveCommunity(communityId);
      setUserCommunities((prev) =>
        prev.filter((cm) => cm.communityId !== communityId),
      );
    } else {
      const newMember = await joinCommunity(communityId);
      setUserCommunities((prev) => [...prev, newMember]);
    }
  };

  const toggleExpandCommunity = (communityId: number) => {
    if (expandedCommunity === communityId) {
      setExpandedCommunity(null);
    } else {
      setExpandedCommunity(communityId);
      loadMembersForCommunity(communityId);
    }
  };

  useEffect(() => {
    loadCommunities();
    if (user) {
      loadUserCommunities();
    }
  }, [user]);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!user) return;

    if (editingId === null) {
      await createCommunity({
        name,
        description,
      });
    } else {
      await updateCommunity(editingId, {
        name,
        description,
      });
    }

    setName("");
    setDescription("");
    setEditingId(null);

    loadCommunities();
  };

  const handleEdit = (community: Community) => {
    setEditingId(community.id);

    setName(community.name);

    setDescription(community.description ?? "");
  };

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Delete community?");

    if (!confirmed) return;

    await deleteCommunity(id);

    loadCommunities();
  };

  return (
    <>
      <h1>Communities</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />

        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <button type="submit">
          {editingId === null ? "Create" : "Update"}
        </button>
      </form>

      {communities.map((community) => {
        const isMember = userCommunities.some(
          (cm) => cm.communityId === community.id,
        );
        const members = communityMembers[community.id] || [];
        const isExpanded = expandedCommunity === community.id;

        return (
          <div key={community.id} className="community-item">
            <div className="community-header">
              <h3>{community.name}</h3>
              {user && (
                <button onClick={() => handleToggleCommunity(community.id)}>
                  {isMember ? "Leave" : "Join"}
                </button>
              )}
            </div>

            <p>{community.description}</p>

            <button
              onClick={() => toggleExpandCommunity(community.id)}
              className="community-toggle-members"
            >
              {isExpanded ? "Hide Members" : `Show Members (${members.length})`}
            </button>

            {isExpanded && members.length > 0 && (
              <div className="community-members">
                <h4>Members</h4>
                <ul className="community-members-list">
                  {members.map((member) => (
                    <li key={member.userId} className="community-member-item">
                      {member.username}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {community.ownerId === user?.userId && (
              <div className="community-actions">
                <button onClick={() => handleEdit(community)}>Edit</button>
                <button onClick={() => handleDelete(community.id)}>
                  Delete
                </button>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
