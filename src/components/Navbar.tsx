import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav>
      <Link to="/communities">Communities</Link>
      <Link to="/posts">Posts</Link>
      <Link to="/users">Profile</Link>

      {user && <span className="user-info">Logged as: {user.username}</span>}

      <button className="nav-button" onClick={logout}>
        Logout
      </button>
    </nav>
  );
}
