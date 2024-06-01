import { IEventRaceType } from "~/lib/races/types/IEventRaceType";
import { IParticipant } from "~/lib/registrations/types/IParticipant";
import { IRunner } from "~/lib/types";
import { ITeam } from "./ITeam";

export type IRegistration = {
  id: number;
  active: boolean;

  runnerId?: number;
  runner?: IRunner;

  teamId?: number;
  team?: ITeam;

  participantId?: number;
  participant?: IParticipant;

  type: "team" | "individual";

  eventRaceTypeId: number;
  eventRaceType: IEventRaceType;

  createdAt: string;
};
