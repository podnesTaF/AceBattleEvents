import { IRunnerResult, ITeam, IClub, IUser } from "@lib/models";


export interface IRunner {
    id: number;
    gender: string;
    dateOfBirth?: string;
    category: "professional" | "amateur";
    totalPoints?: number;
    rank: number;
    personalBests?: IRunnerResult[];
    results?: IRunnerResult[];
    user: IUser;
    teams?: ITeam[];
    club?: IClub;
  }
  