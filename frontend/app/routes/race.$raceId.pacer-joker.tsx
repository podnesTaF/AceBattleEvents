import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Api } from "~/api/axiosInstance";
import { ResultsTable } from "~/components";
import { getPacersJokersResultTable } from "~/lib/utils";

export const loader = async ({ request, params }: LoaderArgs) => {
  const { raceId } = params;

  if (!raceId) {
    throw new Response("No raceId provided");
  }

  const race = await Api().races.getFullRace(raceId);

  if (!race) {
    throw new Response("No race found");
  }

  return json({ race });
};

const RacePacerJoker = () => {
  const { race } = useLoaderData<typeof loader>();
  return (
    <div className="my-9">
      <ResultsTable
        tranformedResults={getPacersJokersResultTable(race)}
        position={0}
      />
    </div>
  );
};

export default RacePacerJoker;
