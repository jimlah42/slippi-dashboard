import { useNavigate } from "react-router-dom";

export const MainMenu = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/dashboard")}>DashBoard</button>
      <button onClick={() => navigate("/replayloading")}>Load Replays</button>
      <button onClick={() => navigate("/settings")}>Settings</button>
    </div>
  );
};
