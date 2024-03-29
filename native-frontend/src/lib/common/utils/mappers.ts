import { logoBlack } from "@Constants/cloud-images";
import {
  ICoach,
  IManager,
  IRaceRegistration,
  IRunner,
  ITeam,
} from "@lib/models";
import { PickItem } from "../types";
import { getCategoryByDoB } from "./date-utils";

export const mapRunnersToPickItems = (runners?: IRunner[]): PickItem[] => {
  return (
    runners?.map((item: IRunner) => ({
      id: item.id,
      title: item.user.name + " " + item.user.surname,
      additionalInfo: getCategoryByDoB(item.dateOfBirth),
      imageUrl: item.user.image?.mediaUrl || logoBlack,
    })) || []
  );
};

export const mapCoachesToPickItems = (coaches?: ICoach[]): PickItem[] => {
  return (
    coaches?.map((item: ICoach) => ({
      id: item.id,
      title: item.user.name + " " + item.user.surname,
      additionalInfo: "coach",
      imageUrl: item.user.avatar?.mediaUrl,
    })) || []
  );
};

export const mapManagersToPickItems = (managers?: IManager[]): PickItem[] => {
  return (
    managers?.map((item: IManager) => ({
      id: item.id,
      title: item.user.name + " " + item.user.surname,
      additionalInfo:
        item.user.country.name +
        ", " +
        item.user.city +
        " - " +
        item.teams?.reduce(
          (acc, curr, i, arr) =>
            i !== arr.length - 1 ? acc + curr.name + " | " : acc + curr.name,
          ""
        ),
      imageUrl: item.user.avatar?.mediaUrl || item.user.image?.mediaUrl,
    })) || []
  );
};

export const mapRaceRegistrationsToPickItems = (
  raceRegs?: IRaceRegistration[]
): PickItem[] => {
  return (
    raceRegs?.map((item: IRaceRegistration) => ({
      id: item.id,
      title: item.team.name,
      additionalInfo: item.team.city,
      imageUrl: item.team.logo?.mediaUrl,
      addtionalFields: {
        teamId: item.team.id,
      },
    })) || []
  );
};

export const mapTeamsToPickItems = (teams?: ITeam[]): PickItem[] => {
  return (
    teams?.map((item: ITeam) => ({
      id: item.id,
      title: item.name,
      imageUrl: item.logo?.mediaUrl,
      additionalInfo: item.city + ", " + item.country.name,
    })) || []
  );
};
