import { Skeleton } from "@mui/material";
import { IEvent } from "~/lib/events/types";

interface Props {
  event: IEvent;
}

const StatisticCards: React.FC<Props> = ({ event }) => {
  return (
    <div className="mb-10">
      <p className="text-lg text-right">*Current statistic</p>
      <div className="flex w-full">
        <div className="w-1/3 flex flex-col items-center">
          <div className="border-t-[1px] w-full border-b-[1px] border-l-[1px] border-red-500 rounded-l-md p-4 flex justify-center bg-white">
            <h2 className="text-2xl sm:text-4xl font-semibold">
              {event.teams.reduce((acc, prev) => acc + prev.membersCount, 0)}
            </h2>
          </div>
          <p className="text-lg sm:text-xl uppercase mt-2">Participants</p>
        </div>
        <div className="w-1/3 flex flex-col items-center">
          <div className="border-[1px] w-full border-red-500 p-4 flex justify-center bg-white">
            {event ? (
              <h2 className="text-2xl sm:text-4xl font-semibold">
                {event.teams.length}
              </h2>
            ) : (
              <Skeleton
                variant="rectangular"
                width={100}
                height={40}
                animation="wave"
              />
            )}
          </div>
          <p className="text-lg sm:text-xl uppercase mt-2">teams</p>
        </div>
        <div className="w-1/3 flex flex-col items-center">
          <div className="border-t-[1px] w-full border-b-[1px] border-r-[1px] border-red-500 rounded-r-md p-4 flex justify-center bg-white">
            <h2 className="text-2xl sm:text-4xl font-semibold">12</h2>
          </div>
          <p className="text-lg sm:text-xl uppercase mt-2">races</p>
        </div>
      </div>
    </div>
  );
};

export default StatisticCards;
