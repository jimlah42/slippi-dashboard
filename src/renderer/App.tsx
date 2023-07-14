import "./App.css";

import { MemoryRouter as Router, Navigate, Route, Routes } from "react-router-dom";

import { PersistentNotification } from "./components/PersistentNotifcation";
import { useAppListeners } from "./lib/hooks/useAppListeners";
import { DashView } from "./views/DashView";
import { MatchupView } from "./views/MatchupView";
import { SettingsView } from "./views/SettingsView";
import { TrackingView } from "./views/TrackingView";

export default function App() {
  useAppListeners();
  return (
    <>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<DashView />} />
          <Route path="/tracking" element={<TrackingView />} />
          <Route path="/matchup" element={<MatchupView />} />
          <Route path="/settings" element={<SettingsView />} />
          <Route path="/" element={<Navigate replace to="/dashboard" />} />
        </Routes>
      </Router>
      <PersistentNotification></PersistentNotification>
    </>
  );
}
