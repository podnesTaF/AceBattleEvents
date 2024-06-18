import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Api } from "~/api/axiosInstance";
import { ResultsTable } from "~/components";
import { IRaceTeam } from "~/lib/races/types/teamResults";
import { IRace } from "~/lib/types";
import { getRunnerResultsTable } from "~/lib/utils";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { raceId } = params;

  if (!raceId) {
    return new Response("No raceId provided");
  }

  const race: IRace | undefined = await Api().races.getFullRace(raceId);

  if (!race) {
    return new Response("Race does not match");
  }

  return json({ race });
};

const RaceOverview = () => {
  const { race }: { race: IRace } = useLoaderData<typeof loader>();

  return (
    <div className="my-6 flex flex-col gap-4">
      {race.raceTeams
        ?.sort(
          (a, b) =>
            (a.totalTimeInMs || Infinity) - (b.totalTimeInMs || Infinity)
        )
        .map((raceTeam: IRaceTeam) => (
          <ResultsTable
            raceTeam={raceTeam}
            tranformedResults={getRunnerResultsTable(raceTeam.raceRunners)}
            key={raceTeam.id}
            position={raceTeam.won ? 1 : 2}
          />
        ))}
    </div>
  );
};

export default RaceOverview;
