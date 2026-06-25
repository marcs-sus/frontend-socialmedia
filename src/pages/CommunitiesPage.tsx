import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getCommunities,
  createCommunity,
  updateCommunity,
  deleteCommunity,
} from "../api/communityService";

import type { Community } from "../types/community";

export default function CommunitiesPage() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const { user } = useAuth();

  useEffect(() => {
    loadCommunities();
  }, []);

  const loadCommunities = async () => {
    const data = await getCommunities();

    setCommunities(data);
  };

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

      {communities.map((community) => (
        <div key={community.id}>
          <h3>{community.name}</h3>

          <p>{community.description}</p>

          {community.ownerId === user?.userId && (
            <>
              <button onClick={() => handleEdit(community)}>Edit</button>
              <button onClick={() => handleDelete(community.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </>
  );
}
