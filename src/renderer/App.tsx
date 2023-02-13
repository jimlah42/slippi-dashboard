import "./App.css";

import { MemoryRouter as Router, Navigate, Route, Routes } from "react-router-dom";

import { useAppListeners } from "./lib/hooks/useAppListeners";
import { DashView } from "./views/DashView";
import { ReplayLoadingView } from "./views/ReplayLoadingView";

export default function App() {
  useAppListeners();
  return (
    <Router>
      <Routes>
        <Route path="/replayloading" element={<ReplayLoadingView />} />
        <Route path="/dashboard" element={<DashView />} />
        <Route path="/" element={<Navigate replace to="/dashboard" />} />
      </Routes>
    </Router>
  );
}
