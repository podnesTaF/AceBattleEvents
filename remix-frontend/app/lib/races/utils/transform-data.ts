import { formatDate, getCategoryByDoB } from "~/lib/utils";
import { IRace, ITeamResult } from "../types";

export const transformRaceToTable = (races: IRace[]) => {
  return races.map((race) => ({
    date: new Date(race.startTime).toLocaleDateString(),
    event: race.event.title,
    category: "outdoor",
    battle: getBattle(race),
    details: {
      link: "/race/" + race.id,
      value: "details",
    },
  }));
};

export const transformForAdminRace = (races: IRace[]) => {
  return transformRaceToTable(races).map((r, i) => ({
    ...r,
    battle: !races[i].winner ? "not finished" : r.battle,
    edit: {
      link: "/admin/races/add?raceId=" + races[i].id,
      value: "edit",
    },
  }));
};

export const getTeamResult = (teamResult: ITeamResult, isWinner: boolean) => {
  let res =
    teamResult.team.name + " / " + msToMinutesAndSeconds(teamResult.resultInMs);

  return isWinner ? "🏆 " + res : res;
};

export const getBattle = (race: IRace) => {
  return race.teamResults
    ?.map((teamResult: ITeamResult) =>
      getTeamResult(teamResult, race.winner?.id === teamResult.team.id)
    )
    .join(" vs ");
};

export const getBattleName = (race: IRace) => {
  return race.teamResults
    ?.map((teamResult: ITeamResult) => teamResult.team.name)
    .join(" vs ");
};

export function msToMinutesAndSeconds(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  const formattedMilliseconds = String(ms).padStart(3, "0");

  return `${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds.slice(
    0,
    2
  )}`;
}

export const transformDataToSelect = (
  data: { id: number; name?: string; title?: string }[]
) => {
  return data.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.id]: curr.name || curr.title,
    }),
    {}
  );
};

export const teamResultsTable = (teamResults: ITeamResult[]) => {
  return teamResults.map((teamResult) => ({
    id: teamResult.id,
    team: {
      id: teamResult.team.id,
      name: teamResult.team.name,
      link: "/teams/" + teamResult.team.id,
    },
    date: formatDate(teamResult.race.startTime),
    resultInMs: teamResult.resultInMs,
    race: teamResult.race.teams
      ?.reduce((acc, curr) => (acc += curr.name + " vs "), "")
      .slice(0, -4),
    event: {
      id: teamResult.race?.event.id,
      name: teamResult.race?.event.title,
      link: "/events/" + teamResult.race.event.id,
    },
    runnerResults: teamResult.runnerResults.map((runnerResult) => ({
      runner: runnerResult.runner.name + " " + runnerResult.runner.surname,
      gender: runnerResult.runner.gender,
      category: getCategoryByDoB(runnerResult.runner.dateOfBirth),
      distance: runnerResult.distance,
      finalResultInMs: runnerResult.finalResultInMs,
      records: "",
    })),
  }));
};

export const getResultIsMs = (result: string) => {
  const [minutes, sAndMs] = result.split(":");
  const [seconds, milliseconds] = sAndMs.split(".");

  return (
    Number(minutes) * 60 * 1000 + Number(seconds) * 1000 + Number(milliseconds)
  );
};

export const getTransformIntoResultTable = (race: IRace) => {
  const teamResultCols = race.teamResults?.map((teamResult) => {
    const resultObj: any = {
      name: teamResult.team.name,
      "age group": "",
    };

    teamResult.runnerResults[0].splits.forEach((split, i) => {
      resultObj[`lap ${i + 1}`] = "";
    });

    resultObj.result = msToMinutesAndSeconds(teamResult.resultInMs);

    return resultObj;
  });

  const runnerResultRows = teamResultCols?.map((col, i) => {
    const teamRes = race.teamResults;
    if (!teamRes) return [];
    const runnerResultsCols = teamRes[i].runnerResults.map((result) => {
      const resObj: any = {
        name: {
          link: "/profile/" + result.runner.id,
          value: result.runner.name + " " + result.runner.surname,
        },
        "age group": getCategoryByDoB(result.runner.dateOfBirth) || "-",
      };

      teamRes[0].runnerResults[0].splits.forEach((split, i) => {
        resObj[`lap ${i + 1}`] = "";
      });

      result.splits.forEach((split, i) => {
        if (result.runnerType.indexOf("joker") !== -1) {
          resObj[
            `lap ${
              teamRes[0].runnerResults[0].splits.length -
              (result.splits.length - 1) +
              i
            }`
          ] = msToMinutesAndSeconds(split.resultInMs);
        } else {
          resObj[`lap ${i + 1}`] = msToMinutesAndSeconds(split.resultInMs);
        }
      });

      let res = msToMinutesAndSeconds(result.finalResultInMs);

      if (result.runnerType === "joker1") {
        const pacer1 = teamRes[i].runnerResults.find(
          (r) => r.runnerType === "pacer1"
        );
        res = msToMinutesAndSeconds(
          (pacer1?.finalResultInMs || 0) + result.finalResultInMs
        );
      } else if (result.runnerType === "joker2") {
        const pacer2 = teamRes[i].runnerResults.find(
          (r) => r.runnerType === "pacer2"
        );
        res = msToMinutesAndSeconds(
          (pacer2?.finalResultInMs || 0) + result.finalResultInMs
        );
      }

      resObj["result"] = res;

      return resObj;
    });

    return runnerResultsCols;
  });

  if (!teamResultCols || !runnerResultRows) return [];

  const firstTeam = [teamResultCols[0], ...runnerResultRows[0]];
  const secondTeam = [teamResultCols[1], ...runnerResultRows[1]];

  return [...firstTeam, ...secondTeam] || [];
};

export const getBestAthletesTable = (race: IRace) => {
  return race.teamResults?.reduce((acc: any[], curr: ITeamResult) => {
    const teamAthletes = curr.runnerResults
      .filter((res) => !res.runnerType)
      .map((res) => ({
        name: res.runner.name + " " + res.runner.surname,
        category: getCategoryByDoB(res.runner.dateOfBirth),
        team: curr.team.name,
        club: res.runner.club?.name,
        race: getBattleName(race),
        result: msToMinutesAndSeconds(res.finalResultInMs),
      }));

    return [...acc, ...teamAthletes].sort(
      (a, b) => getResultIsMs(a.result) - getResultIsMs(b.result)
    );
  }, []);
};

export const getPacersJokersResultTable = (race: IRace) => {
  return race.teamResults?.reduce((acc: any[], curr: ITeamResult) => {
    const pacersJokers = curr.runnerResults.filter((res) => res.runnerType);

    const firstPair = pacersJokers.filter(
      (res) => res.runnerType === "pacer1" || res.runnerType === "joker1"
    );

    const secondPair = pacersJokers.filter(
      (res) => res.runnerType === "pacer2" || res.runnerType === "joker2"
    );

    const firstPairResult = firstPair.reduce(
      (acc, curr) => acc + curr.finalResultInMs,
      0
    );

    const secondPairResult = secondPair.reduce(
      (acc, curr) => acc + curr.finalResultInMs,
      0
    );

    const firstPairObj = {
      name: firstPair
        .map(
          (res) =>
            res.runner.name +
            " " +
            res.runner.surname +
            ` (${res.runnerType.slice(0, -1)})`
        )
        .join(" / "),
      category: firstPair
        .map((res) => getCategoryByDoB(res.runner.dateOfBirth))
        .join(" / "),
      team: curr.team.name,
      club: firstPair[0].runner.club?.name,
      result: msToMinutesAndSeconds(firstPairResult),
    };

    const secondPairObj = {
      name: secondPair
        .map((res) => res.runner.name + " " + res.runner.surname)
        .join(" / "),
      category: secondPair
        .map((res) => getCategoryByDoB(res.runner.dateOfBirth))
        .join(" / "),
      team: curr.team.name,
      club: secondPair[0].runner.club?.name,
      result: msToMinutesAndSeconds(secondPairResult),
    };

    return [...acc, firstPairObj, secondPairObj].sort(
      (a, b) => getResultIsMs(a.result) - getResultIsMs(b.result)
    );
  }, []);
};
