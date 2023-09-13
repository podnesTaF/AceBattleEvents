import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Api } from "~/api/axiosInstance";
import { CustomTable } from "~/components";
import { getPacersJokersResultTable } from "~/lib/utils";

export const loader = async ({ request, params }: LoaderArgs) => {
  const { raceId } = params;

  if (!raceId) {
    throw new Response("No raceId provided");
  }

  const race = await Api().races.getFullRace(raceId);

  return json({ tableRows: getPacersJokersResultTable(race) });
};

const RacePacerJoker = () => {
  const { tableRows } = useLoaderData<typeof loader>();
  return (
    <div className="my-9">
      <CustomTable
        itemsName="results"
        height="h-full"
        titleColor="bg-black"
        isTitleStraight={true}
        rows={tableRows || []}
        isLoading={false}
      />
    </div>
  );
};

export default RacePacerJoker;
