/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Stats {
  @PrimaryColumn("datetime")
  StartTime!: string;
  @Column()
  GameMode!: number;
  @Column()
  Character!: string;
  @Column()
  OppCharacter!: string;
  @Column()
  Code!: string;
  @Column()
  OppCode!: string;
  @Column()
  Stage!: string;
  @Column()
  Duration!: number;
  @Column()
  DidWin!: number;
  @Column()
  Kills!: number;
  @Column()
  KillsConceded!: number;
  @Column()
  TotalDmgDone!: number;
  @Column()
  TotalDmgTaken!: number;
  @Column()
  Conversions!: number;
  @Column()
  TotalOpenings!: number;
  @Column()
  NeutralWins!: number;
  @Column()
  NeutralLosses!: number;
  @Column()
  CHWins!: number;
  @Column()
  CHLosses!: number;
  @Column({ nullable: true })
  LCancelSuccessRate?: number;
  @Column()
  IPM!: number;
  @Column()
  FileName!: string;
  @Column()
  WavedashCount!: number;
  @Column()
  WavelandCount!: number;
  @Column()
  AirDodgeCount!: number;
  @Column()
  DashDanceCount!: number;
  @Column()
  SpotDodgeCount!: number;
  @Column()
  LedgegrabCount!: number;
  @Column()
  RollCount!: number;
  @Column()
  AvgDeathPercent!: number;
  @Column()
  AvgKillPercent!: number;
  @Column()
  MostCommonKillMove!: string;
  @Column()
  MostCommonMoveKillby!: string;
  @Column()
  SDs!: number;
}
