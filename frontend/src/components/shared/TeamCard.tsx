import { playerRows } from "@/utils/tables-dummy-data";
import CustomTable from "./CustomTable";

const TeamCard = () => {
  return (
    <div className="shadow-md rounded-md flex flex-col md:flex-row w-full md:justify-between  bg-[url('/stadium.png')] my-5 bg-no-repeat bg-cover bg-bottom">
      <div className="w-full md:w-1/2 lg:w-1/3 rounded-t-md md:rounded-t-none rounded-tl-md overflow-hidden pb-3 mb-3 md:mb-0">
        <div className="w-full bg-red-500 p-3 md:p-4 mb-3">
          <h3 className="text-white text-xl md:text-2xl font-semibold">
            Team Name
          </h3>
        </div>
        <div className="p-3 w-full">
          <div className="flex justify-between w-full mb-4">
            <h5 className="text-lg font-semibold">Coach</h5>
            <h5 className="text-lg">M.N Razgonov</h5>
          </div>
          <div className="flex justify-between w-full mb-4">
            <h5 className="text-lg font-semibold">Rank</h5>
            <h5 className="text-lg">12</h5>
          </div>
          <div className="flex justify-between w-full mb-4">
            <h5 className="text-lg font-semibold">Personal Best </h5>
            <h5 className="text-lg">16:34.12</h5>
          </div>
          <div className="flex justify-between w-full mb-4">
            <h5 className="text-lg font-semibold">Number of Players</h5>
            <h5 className="text-lg">7</h5>
          </div>
        </div>
      </div>
      <div className="h-[1px] md:hidden w-full bg-black" />
      <div className="w-full md:w-1/2 lg:w-3/5 p-3">
        <h3 className="text-2xl md:text-3xl font-semibold">Players</h3>
        <CustomTable rows={playerRows} isLoading={false} />
      </div>
    </div>
  );
};

export default TeamCard;
