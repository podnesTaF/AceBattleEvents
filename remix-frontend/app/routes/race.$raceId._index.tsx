import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Api } from "~/api/axiosInstance";
import { CustomTable } from "~/components";
import { getTransformIntoResultTable } from "~/lib/utils";

export const loader = async ({ params }: LoaderArgs) => {
  const { raceId } = params;

  if (!raceId) {
    return new Response("No raceId provided");
  }

  const race = await Api().races.getFullRace(raceId);

  return json({ tableRows: getTransformIntoResultTable(race) });
};

const RaceOverview = () => {
  const { tableRows } = useLoaderData<typeof loader>();
  return (
    <div className="my-6">
      <CustomTable
        height="h-full"
        titleColor="bg-black"
        isTitleStraight={true}
        rows={tableRows || []}
        isLoading={false}
      />
    </div>
  );
};

export default RaceOverview;
