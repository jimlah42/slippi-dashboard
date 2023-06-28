import electronSettings from "electron-settings";
import merge from "lodash/merge";
import set from "lodash/set";

import { defaultAppSettings } from "./defaultAppSettings";
import { ipc_settingsUpdatedEvent } from "./ipc";
import type { AppSettings } from "./types";

electronSettings.configure({
  fileName: "Settings",
  prettify: true,
});

export class SettingsManager {
  private appSettings: Partial<AppSettings>;

  constructor() {
    const restoredSettings = electronSettings.getSync() as Partial<AppSettings>;
    this.appSettings = restoredSettings;
  }

  public get(): AppSettings {
    return merge({}, defaultAppSettings, this.appSettings);
  }

  public getPlayerCode(): string[] {
    return this.get().PlayerCodes;
  }

  public getReplaysPath(): string {
    return this.get().ReplaysPath;
  }

  public async setPlayerCodes(playerCodes: string[]): Promise<void> {
    await this._set("PlayerCodes", playerCodes);
  }

  public async setReplaysPath(replaysPath: string): Promise<void> {
    console.log("Settings manager pre _set: " + replaysPath);
    await this._set("ReplaysPath", replaysPath);
  }

  private async _set(objectPath: string, value: any) {
    await electronSettings.set(objectPath, value);
    set(this.appSettings, objectPath, value);
    await ipc_settingsUpdatedEvent.main!.trigger(this.get());
  }
}
