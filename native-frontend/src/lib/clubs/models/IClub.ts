import { ICountry, IManager, IMedia, IRunner, ITeam } from "@lib/models";

export type IClub = {
  id: number;
  name: string;
  country: ICountry;
  runners: IRunner[];
  manager: IManager;
  createdAt: string;
  city: string;
  teams: ITeam[];
  logo?: IMedia;
  photo?: IMedia;
};
