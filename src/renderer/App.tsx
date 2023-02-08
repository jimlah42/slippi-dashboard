import "./App.css";

import { MemoryRouter as Router, Route, Routes } from "react-router-dom";

import { HelloWorld } from "./components/test";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HelloWorld />} />
      </Routes>
    </Router>
  );
}
