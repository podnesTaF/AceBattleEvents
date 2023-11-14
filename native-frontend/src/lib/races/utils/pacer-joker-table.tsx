import JokerResultDetails from "@Components/race/JokerResultDetails";
import { msToMinutesAndSeconds } from "@lib/utils";
import { IRace, ITeamResult } from "../models";

export const getPacersJokersResultTable = (
  race: IRace
): {
  [key: string]: string | JSX.Element;
}[] => {
  if (!race.teamResults) return [];
  return race.teamResults.reduce((acc: any[], curr: ITeamResult) => {
    const pacersJokers = curr.runnerResults.filter((res) => res.runnerType);

    const firstPair = pacersJokers.filter(
      (res) => res.runnerType === "pacer-1" || res.runnerType === "joker-1"
    );

    const secondPair = pacersJokers.filter(
      (res) => res.runnerType === "pacer-2" || res.runnerType === "joker-2"
    );

    const firstPairResult = firstPair.find(
      (res) => res.runnerType === "joker-1"
    )?.finalResultInMs;
    const secondPairResult = secondPair.find(
      (res) => res.runnerType === "joker-2"
    )?.finalResultInMs;

    const firstPairObj = {
      expand: <JokerResultDetails runnerResults={firstPair} />,

      "total result": msToMinutesAndSeconds(firstPairResult),
      sportsmen: firstPair
        .map(
          (res) =>
            res.runner.user.name +
            " " +
            res.runner.user.surname +
            ` (${res.runnerType[0]})`
        )
        .join(" / "),
    };

    const secondPairObj = {
      expand: <JokerResultDetails runnerResults={secondPair} />,
      "total result": msToMinutesAndSeconds(secondPairResult),
      sportsmen: secondPair
        .map(
          (res) =>
            res.runner.user.name +
            " " +
            res.runner.user.surname +
            ` (${res.runnerType.slice(0, -2)})`
        )
        .join(" / "),
    };

    return [...acc, firstPairObj, secondPairObj].sort(
      (a, b) => a.finalResultInMs - b.finalResultInMs
    );
  }, []);
};
