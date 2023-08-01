export interface QueryParams {
  startDate?: string;
  endDate?: string;
  Character?: string;
  OppCharacter?: string;
  NoOfGames?: number;
  period?: string;
  gameMode?: number;
}

export interface MonthlyDataAvgs {
  Month: string;
  TotalGames: number;
  AvgDuration: number;
  AvgKills: number;
  AvgKillsConceded: number;
  AvgTotalDmgDone: number;
  AvgTotalDmgTaken: number;
  AvgConversions: number;
  AvgTotalOpenings: number;
  AvgNeutralWins: number;
  AvgNeutralLosses: number;
  AvgCHWins: number;
  AvgCHLosses: number;
  AvgLCancelSuccessRate: number;
  AvgIPM: number;
}

export interface DataAvgs {
  Period?: string;
  TotalGames: number;
  AvgDuration: number;
  AvgKills: number;
  AvgKillsConceded: number;
  AvgTotalDmgDone: number;
  AvgTotalDmgTaken: number;
  AvgConversions: number;
  AvgTotalOpenings: number;
  AvgOpeningsPerKill: number;
  AvgNeutralWins: number;
  AvgNeutralLosses: number;
  AvgCHWins: number;
  AvgCHLosses: number;
  AvgLCancelSuccessRate: number;
  AvgIPM: number;
}

export interface CountType {
  Name: string;
  Count: number;
  Wins: number;
  Losses: number;
}

export interface DataCounts {
  Period?: string;
  CharacterCount: CountType[];
  OppCharacterCount: CountType[];
  OppCodeCount: CountType[];
  StageCount: CountType[];
}
