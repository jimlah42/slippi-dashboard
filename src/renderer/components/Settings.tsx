import React from "react";

import { PlayerCodeChangeDialog } from "../containers/Settings/PlayerCodeChangeDialog";
import { SettingItem } from "../containers/Settings/SettingsItem";
import { usePlayerCode, useReplaysPath } from "../lib/hooks/useSettings";
import { PathInput } from "./PathInput";

export const Settings: React.FC = () => {
  const [replaysPath, setReplaysPath] = useReplaysPath();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { playerCode, removePlayerCode } = usePlayerCode();
  const [openPlayerCodeChangePrompt, setOpenPlayerCodeChangePrompt] = React.useState(false);

  const handleClose = () => {
    setOpenPlayerCodeChangePrompt(false);
  };

  const ListCounts = ({ codesArray }: { codesArray: string[] }) => {
    if (!codesArray) {
      return null;
    }

    async function onRemove(toRemove: string) {
      console.log("Settings page: " + playerCode);
      if (playerCode) {
        const array = playerCode;
        const index = playerCode.indexOf(toRemove);

        if (index != -1) {
          array.splice(index, 1);
        }
        await removePlayerCode(array, toRemove);
      } else {
        await removePlayerCode([], toRemove);
      }
    }
    const array = codesArray;
    return (
      <div>
        <ol>
          {array.map((code) => (
            <li key={code}>
              {code}
              <button onClick={() => onRemove(code)}>Remove</button>
            </li>
          ))}
        </ol>
      </div>
    );
  };

  return (
    <div>
      <SettingItem
        name="Replays Path"
        description="The path to your replays folder (changing this will clear all data)"
      >
        <PathInput
          value={replaysPath}
          onSelect={setReplaysPath}
          options={{
            properties: ["openDirectory"],
          }}
          placeholder="No folder set"
        />
      </SettingItem>
      <SettingItem
        name="Player Codes"
        description="Your personal Slippi Connect codes (Ensure if you put in multiple codes they are only your codes)"
      >
        <ListCounts codesArray={playerCode} />
        <PlayerCodeChangeDialog open={openPlayerCodeChangePrompt} handleClose={handleClose} />
        <button onClick={() => setOpenPlayerCodeChangePrompt(true)}>Add Code</button>
      </SettingItem>
      <button
        onClick={async () => {
          await window.electron.replays.clearData();
          await window.electron.dashboard.refreshDB();
        }}
      >
        Clear Data
      </button>
    </div>
  );
};
