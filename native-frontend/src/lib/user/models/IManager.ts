import { ITeam, IClub } from "@lib/models";

export interface IManager {
    id: number;
    teams?: ITeam[];
    club?: IClub;
  }
  