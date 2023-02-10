import "./App.css";

import { MemoryRouter as Router, Route, Routes } from "react-router-dom";

import { HelloWorld } from "./components/HelloWorld";
import { useAppListeners } from "./lib/hooks/useAppListeners";

export default function App() {
  useAppListeners();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HelloWorld />} />
      </Routes>
    </Router>
  );
}
