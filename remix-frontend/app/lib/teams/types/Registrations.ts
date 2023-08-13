import { IEvent } from "~/lib/events/types";
import { ITeam } from "./ITeam";

export type ITeamEvent = {
  event: IEvent;
  team: ITeam;
};
