import { IEvent } from "../../Event";
import { IRace, IRaceType } from "./IRace";

export type IEventRaceType = {
  id: number;

  eventId: number;
  event: IEvent;

  raceTypeId: number;
  raceType: IRaceType;

  races: IRace[];

  participantsCount?: number;
};
