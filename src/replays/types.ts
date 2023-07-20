export interface FilesLoadResult {
  filesLoaded: number;
  filesOmmitted: number;
}

export interface FileWithPath {
  path: string;
  fileName: string;
}

export interface Progress {
  current: number;
  total: number;
}

export interface GameStats {
  //Geneal
  StartTime: string;
  Character: string;
  OppCharacter: string;
  Code: string;
  OppCode: string;
  Stage: string;
  Duration: number;
  DidWin: number;
  Kills: number;
  KillsConceded: number;
  TotalDmgDone: number;
  TotalDmgTaken: number;
  Conversions: number;
  TotalOpenings: number;
  NeutralWins: number;
  NeutralLosses: number;
  CHWins: number;
  CHLosses: number;
  LCancelSuccessRate: number;
  IPM: number;
  FileName: string;
  //Actions
  WavedashCount: number;
  WavelandCount: number;
  AirDodgeCount: number;
  DashDanceCount: number;
  SpotDodgeCount: number;
  LedgegrabCount: number;
  RollCount: number;

  AvgDeathPercent: number;
  AvgKillPercent: number;

  MostCommonKillMove: string;
  MostCommonMoveKillby: string;

  SDs: number;
}
