import React from "react";

import { SettingItem } from "../containers/Settings/SettingsItem";
import { useReplaysPath } from "../lib/hooks/useSettings";
import { PathInput } from "./PathInput";

export const Settings: React.FC = () => {
  const [replaysPath, setReplaysPath] = useReplaysPath();

  return (
    <div>
      <div>{replaysPath}</div>
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
    </div>
  );
};
