export interface QueryParams {
  startDate?: string;
  endDate?: string;
  Character?: string;
  OppCharacter?: string;
}

export interface DataAvgs {
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
  AvgGoodTrades: number;
  AvgBadTrades: number;
  AvgLCancelSuccessRate: number;
  AvgIPM: number;
}

export interface CountType {
  Name: string;
  Count: number;
}

export interface DataCounts {
  CharacterCount: CountType[];
  OppCharacterCount: CountType[];
  OppCodeCount: CountType[];
  StageCount: CountType[];
}
