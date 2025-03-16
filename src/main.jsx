import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { AuthProvider } from "./context/AuthContext";
import App from "./App.jsx";
import "./index.css";

// Log the redirect_uri when the app starts
const redirectUri = window.location.origin;
console.log("Auth0 redirect_uri set to:", redirectUri);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      }}
    >
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    </Auth0Provider>
  </StrictMode>
);