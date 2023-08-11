import { ICountry } from "~/lib/countries/types";
import { IEvent } from "~/lib/events/types";
import { IMedia } from "~/lib/media/types/IMedia";
import { IUser } from "~/lib/user/types/IUser";
import { ICoach } from "./ICoach";

export type ITeam = {
  id: number;
  name: string;
  gender: string;
  country: ICountry;
  city: string;
  membersCount: number;
  manager: IUser;
  club: string;
  coach: ICoach;
  logo: IMedia;
  teamImage: IMedia;
  players: IUser[];
  events: IEvent[];
};
