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

export interface GameData {
  original_file: string;
  slippi_version: string;
  parser_version: string;
  analyzer_version: string;
  parse_errors: number;
  game_time: string;
  stage_id: number;
  stage_name: string;
  game_length: number;
  winner_port: number;
  start_minutes: number;
  end_type: number;
  lras: number;
  match_id: string;
  players?: PlayerType[] | null;
}
export interface PlayerType {
  port: number;
  tag_player: string;
  tag_css: string;
  tag_code: string;
  char_id: number;
  char_name: string;
  player_type: number;
  cpu_level: number;
  color: number;
  team_id: number;
  start_stocks: number;
  end_stocks: number;
  end_pct: number;
  airdodges: number;
  spotdodges: number;
  rolls: number;
  dashdances: number;
  l_cancels_hit: number;
  l_cancels_missed: number;
  techs: number;
  walltechs: number;
  walljumps: number;
  walltechjumps: number;
  missed_techs: number;
  ledge_grabs: number;
  air_frames: number;
  wavedashes: number;
  wavelands: number;
  neutral_wins: number;
  pokes: number;
  counters: number;
  powershields: number;
  shield_breaks: number;
  grabs: number;
  grab_escapes: number;
  taunts: number;
  meteor_cancels: number;
  damage_dealt: number;
  hits_blocked: number;
  shield_stabs: number;
  edge_cancel_aerials: number;
  edge_cancel_specials: number;
  teeter_cancel_aerials: number;
  teeter_cancel_specials: number;
  phantom_hits: number;
  no_impact_lands: number;
  shield_drops: number;
  pivots: number;
  reverse_edgeguards: number;
  self_destructs: number;
  stage_spikes: number;
  short_hops: number;
  full_hops: number;
  shield_time: number;
  shield_damage: number;
  shield_lowest: number;
  total_openings: number;
  mean_kill_openings: number;
  mean_kill_percent: number;
  mean_opening_percent: number;
  galint_ledgedashes: number;
  mean_galint: number;
  max_galint: number;
  button_count: number;
  cstick_count: number;
  astick_count: number;
  actions_per_min: number;
  state_changes: number;
  states_per_min: number;
  shieldstun_times: number;
  shieldstun_act_frames: number;
  hitstun_times: number;
  hitstun_act_frames: number;
  wait_times: number;
  wait_act_frames: number;
  used_norm_moves: number;
  used_spec_moves: number;
  used_misc_moves: number;
  used_grabs: number;
  used_pummels: number;
  used_throws: number;
  total_moves_used: number;
  total_moves_landed: number;
  move_accuracy: number;
  actionability: number;
  neutral_wins_per_min: number;
  mean_death_percent: number;
  interaction_frames: InteractionTypes;
  interaction_damage: InteractionTypes;
  moves_landed: any;
  attacks: AttackType[] | null;
  punishes: PunishType[] | null;
}
export interface InteractionTypes {
  EDGEGUARDING: number;
  TECHCHASING: number;
  PUNISHING: number;
  SHARKING: number;
  PRESSURING: number;
  OFFENSIVE: number;
  FOOTSIES: number;
  POSITIONING: number;
  NEUTRAL: number;
  POKING: number;
  TRADING: number;
  DEFENSIVE: number;
  PRESSURED: number;
  GROUNDING: number;
  PUNISHED: number;
  ESCAPING: number;
  RECOVERING: number;
}

export interface AttackType {
  move_id: number;
  move_name: string;
  cancel_type: number;
  cancel_name: string;
  punish_id: number;
  hit_id: number;
  game_frame: number;
  anim_frame: number;
  damage: number;
  opening: string;
  kill_dir: string;
}
export interface PunishType {
  start_frame: number;
  end_frame: number;
  start_pct: number;
  end_pct: number;
  stocks: number;
  num_moves: number;
  last_move_id: number;
  last_move_name: string;
  opening: string;
  kill_dir: string;
}
