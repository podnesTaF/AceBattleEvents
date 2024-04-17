import { IEvent } from "~/lib/types";
import { IRace, IRaceType } from "./races";

export type IEventRaceType = {
  id: number;

  eventId: number;
  event: IEvent;

  raceTypeId: number;
  raceType: IRaceType;

  races: IRace[];

  participantsCount?: number;
};
