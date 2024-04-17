import { IMedia } from "@lib/media/models/IMedia";
import {
  BestJokerPair,
  BestSportsmen,
  EventPodium,
} from "@lib/races/types/EventResults";

export type EventResult = {
  eventTitle: string;
  podium: EventPodium;
  bestSportsmen: BestSportsmen;
  bestJokerPair: BestJokerPair;
  introImage: IMedia;
  racesByType: {
    [type: string]: {
      id: number;
      name: string;
      startTime: string;
    }[];
  };
  notFinished: boolean;
};
