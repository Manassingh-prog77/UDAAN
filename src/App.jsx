import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import Layout from "./components/layouts/Layout";
import ProtectedRoute from "./components/layouts/ProtectedRoute";

// Public routes
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Protected routes
import Dashboard from "./pages/portal/Dashboard";
import LegalKnowledge from "./pages/portal/LegalKnowledge";
import DocumentGenerator from "./pages/portal/DocumentGenerator";
import DetectiveEngine from "./pages/portal/DetectiveEngine";
import SurakshaSetu from "./pages/portal/SurakshaSetu";
import RoadmapPage from "./pages/portal/Roadmap";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route path="/dashboard" element={<ProtectedRoute />}>
        <Route path="" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="knowledge" element={<LegalKnowledge />} />
          <Route path="generate" element={<DocumentGenerator />} />
          <Route path="investigation" element={<DetectiveEngine />} />
          <Route path="analysis" element={<SurakshaSetu />} />
          <Route path="investigation/roadmap" element={<RoadmapPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
