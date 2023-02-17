import React from "react";

import { PlayerCodeChangeDialog } from "../containers/Settings/PlayerCodeChangeDialog";
import { SettingItem } from "../containers/Settings/SettingsItem";
import { useReplaysPath, useSettings } from "../lib/hooks/useSettings";
import { PathInput } from "./PathInput";

export const Settings: React.FC = () => {
  const [replaysPath, setReplaysPath] = useReplaysPath();
  const playerCode = useSettings((store) => store.PlayerCode);
  const [openPlayerCodeChangePrompt, setOpenPlayerCodeChangePrompt] = React.useState(false);

  const handleClose = () => {
    setOpenPlayerCodeChangePrompt(false);
  };

  return (
    <div>
      <div>Warning Changing any of these values will clear all data</div>
      <SettingItem name="Replays Path" description="The path to your replays folder">
        <PathInput
          value={replaysPath}
          onSelect={setReplaysPath}
          options={{
            properties: ["openDirectory"],
          }}
          placeholder="No folder set"
        />
      </SettingItem>
      <SettingItem name="Player Code" description="Your personal Slippi Connect code (E.g PLYR#123)">
        <div>{playerCode}</div>
        <PlayerCodeChangeDialog open={openPlayerCodeChangePrompt} handleClose={handleClose} />
        <button onClick={() => setOpenPlayerCodeChangePrompt(true)}>Change Code</button>
      </SettingItem>
    </div>
  );
};
