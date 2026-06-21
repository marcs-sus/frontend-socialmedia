import { BrowserRouter, Routes, Route } from "react-router-dom";
import CommunitiesPage from "./pages/CommunitiesPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UsersPage from "./pages/UsersPage";
import PostsPage from "./pages/PostsPage";
import CommentsPage from "./pages/CommentsPage";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CommunitiesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/communities" element={<CommunitiesPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/comments" element={<CommentsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
