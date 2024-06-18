import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Api } from "~/api/axiosInstance";
import { ResultsTable } from "~/components";
import { IRaceRunner } from "~/lib/races/types/runnerResults";
import { getFullDistanceAthletes, getRunnerResultsTable } from "~/lib/utils";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { raceId } = params;

  if (!raceId) {
    throw new Response("No raceId provided");
  }

  const race = await Api().races.getFullRace(raceId);

  if (!race) {
    throw new Response("No race found");
  }

  const atheltes = getFullDistanceAthletes(race);

  return json({ atheltes });
};

export default function RacePage() {
  const { atheltes } = useLoaderData<typeof loader>();

  return (
    <div className="my-6">
      <ResultsTable
        tranformedResults={getRunnerResultsTable(atheltes as IRaceRunner[])}
        position={0}
      />
    </div>
  );
}
