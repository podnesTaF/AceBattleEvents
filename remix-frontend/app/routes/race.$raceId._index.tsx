import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Api } from "~/api/axiosInstance";
import { ResultsTable } from "~/components";
import { ITeamResult } from "~/lib/types";
import { getRunnerResultsTable } from "~/lib/utils";

export const loader = async ({ params }: LoaderArgs) => {
  const { raceId } = params;

  if (!raceId) {
    return new Response("No raceId provided");
  }

  const race = await Api().races.getFullRace(raceId);

  if (!race) {
    return new Response("Race does not match");
  }

  return json({ race });
};

const RaceOverview = () => {
  const { race } = useLoaderData<typeof loader>();

  return (
    <div className="my-6 flex flex-col gap-4">
      {race.teamResults.map((teamResult: ITeamResult) => (
        <ResultsTable
          teamResult={teamResult}
          tranformedResults={getRunnerResultsTable(teamResult.runnerResults)}
          key={teamResult.id}
          position={race.winner.id === teamResult.team.id ? 1 : 2}
        />
      ))}
    </div>
  );
};

export default RaceOverview;
