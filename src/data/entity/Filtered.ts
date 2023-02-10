/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Filtered {
  @PrimaryColumn()
  FileName!: string;
}
