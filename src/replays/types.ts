export interface FilesLoadResult {
  files: GameStats[];
  filesOmmitted: number;
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
  IPM: number;
  FileName: string;
}
