import { CustomTable } from "~/components/shared";
import { IRace } from "~/lib/types";
import { transformRaceToTable } from "~/lib/utils";

const LastRacesSection = ({ races }: { races?: IRace[] }) => {
  return (
    <div className="px-4">
      <h2 className="text-3xl font-semibold my-4 text-center">Last Races</h2>
      <div className="mb-4">
        {races?.length ? (
          <CustomTable
            rows={transformRaceToTable(races)}
            isLoading={false}
            titleColor="bg-black"
            isTitleStraight={true}
          />
        ) : (
          <p>Your club haven't finished any races yet</p>
        )}
      </div>
    </div>
  );
};

export default LastRacesSection;
