import { Dashboard } from "@mui/icons-material";
import { AppBar, Box, MenuItem, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const MainMenu = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Dashboard></Dashboard>
            <MenuItem key="dashboard" onClick={() => navigate("/dashboard")}>
              <Typography>DashBoard</Typography>
            </MenuItem>
            <MenuItem key="settings" onClick={() => navigate("/settings")}>
              <Typography>Settings</Typography>
            </MenuItem>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};
