import { IRaceRunner } from "~/lib/races/types/runnerResults";
import { msToMinutesAndSeconds } from "~/lib/utils";

export const transformUserResultsToTable = (runnerResults: IRaceRunner[]) => {
  return runnerResults?.map((raceRunner) => {
    const resDate =
      raceRunner.raceTeam?.race.startTime ||
      (raceRunner.race?.startTime as string);

    const event =
      raceRunner.raceTeam?.race?.eventRaceType?.event ||
      raceRunner.race?.eventRaceType?.event;

    return {
      date: new Date(resDate).toLocaleDateString(),
      event: {
        link: "/events/" + event?.eventCode,
        value: event?.title,
      },
      distance: (raceRunner.splits[0]?.distanceInCm / 100).toFixed(2) + " m",
      result: msToMinutesAndSeconds(raceRunner.splits[0]?.resultInMs) || "out",
      place: raceRunner.raceTeam?.won ? "🏆" : "2",
      details: {
        link: "/race/" + raceRunner.id,
        value: "details",
      },
    };
  });
};
