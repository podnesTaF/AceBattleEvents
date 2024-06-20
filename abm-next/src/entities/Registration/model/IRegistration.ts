import { IEventRaceType } from "../../Race";
import { IRunner } from "../../Runner";
import { ITeam } from "../../Team";
import { IParticipant } from "./IParticipant";

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
