export interface QueryParams {
  startDate?: string;
  endDate?: string;
  Character?: string;
  OppCharacter?: string;
}

export interface DataSums {
  TotalGames: number;
  TotalDuration: number;
  TotalKills: number;
  TotalKillsConceded: number;
  TotalDmgDone: number;
  TotalDmgTaken: number;
  TotalConversions: number;
  TotalOpenings: number;
  TotalNeutralWins: number;
  TotalNeutralLosses: number;
  TotalCHWins: number;
  TotalCHLosses: number;
  TotalGoodTrades: number;
  TotalBadTrades: number;
  TotalIPM: number;
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
