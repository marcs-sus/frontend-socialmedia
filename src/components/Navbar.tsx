import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <nav>
      <Link to="/communities">Communities</Link>
      <Link to="/posts">Posts</Link>
      <Link to="/comments">Comments</Link>
      <Link to="/users">Users</Link>

      <button onClick={logout}>Logout</button>
    </nav>
  );
}
