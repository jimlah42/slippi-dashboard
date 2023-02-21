import "./App.css";

import { MemoryRouter as Router, Navigate, Route, Routes } from "react-router-dom";

import { useAppListeners } from "./lib/hooks/useAppListeners";
import { DashView } from "./views/DashView";
import { SettingsView } from "./views/SettingsView";

export default function App() {
  useAppListeners();
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<DashView />} />
        <Route path="/settings" element={<SettingsView />} />
        <Route path="/" element={<Navigate replace to="/dashboard" />} />
      </Routes>
    </Router>
  );
}
