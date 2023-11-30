import { ICoach, IEvent, ITeam } from "@lib/models";

// to remove
export type ITeamEvent = {
  event: IEvent;
  team: ITeam;
};

export type ITeamRegistration = {
  id: number;
  team: ITeam;
  event: IEvent;
  coach: ICoach;
  createdAt: string;
};
