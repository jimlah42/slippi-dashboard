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
  StartTime: string;
  Character: string;
  OppCharacter: string;
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
  GoodTrades: number;
  BadTrades: number;
  LCancelSuccessRate: number;
  IPM: number;
  FileName: string;
}
