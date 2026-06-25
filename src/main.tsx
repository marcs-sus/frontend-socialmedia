import { AuthProvider } from "./context/AuthContext";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/global.css";
import "./styles/navbar.css";
import "./styles/forms.css";
import "./styles/cards.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <App />
  </AuthProvider>,
);
