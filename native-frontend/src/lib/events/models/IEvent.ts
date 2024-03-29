import {
  IContent,
  ILocation,
  IMedia,
  IPrize,
  ITeam,
  ITeamRegistration,
} from "@lib/models";

export type IEvent = {
  id?: number;
  title: string;
  description: string;
  startDateTime: string;
  endDate: string;
  introImage?: IMedia;
  minorImage?: IMedia;
  teamsCount?: number;
  location: ILocation;
  totalPrize?: number;
  attendanceType: "free" | "paid";
  contents: IContent[];
  prizes: IPrize[];
  teams?: ITeam[];
};

export type EventInfo = IEvent & {
  isRegisteredToVisit: boolean;
  isOpenToRegister: boolean;
  managerTeamRegistrations?: ITeamRegistration[];
  runnerTeamRegistrations?: ITeamRegistration[];
  coachTeamRegistrations?: ITeamRegistration[];
  allTeamsRegistered?: boolean;
};

export type EventShortform = {
  id: number;
  title: string;
  startDateTime: string;
  introImage?: IMedia;
};
