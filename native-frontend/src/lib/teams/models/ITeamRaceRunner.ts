import { IRunner } from "@lib/models";
import { IRaceRegistration } from "@lib/races/models/IRaceRegistration";

export type ITeamRaceRunner = {
  id: number;
  raceRegistration?: IRaceRegistration;
  runner: IRunner;
};
