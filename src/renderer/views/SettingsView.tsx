import React from "react";

import { Settings } from "../components/Settings";
import { MainMenu } from "../containers/MainMenu";

export const SettingsView: React.FC = () => {
  return (
    <div>
      <MainMenu />
      <Settings />
    </div>
  );
};
