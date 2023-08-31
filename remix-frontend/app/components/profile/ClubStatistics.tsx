import { IClub } from "~/lib/types";

const ClubStatistics = ({ club }: { club: IClub }) => {
  return (
    <section className="bg-[#1E1C1F] w-full pt-4 lg:pt-6">
      <h3 className="text-white text-xl font-semibold mx-4 mb-4">Statistic</h3>
      <div className="flex gap-6 flex-col md:flex-row justify-between">
        <div className="rounded-tr-lg bg-yellow-300 p-4 pb-6 w-full md:w-2/5">
          <h3 className="text-2xl font-semibold text-center">Personal Bests</h3>
          <div className="flex justify-between w-full">
            <h3 className="text-2xl font-semibold">male:</h3>
            <h3 className="text-2xl font-semibold">17:00:01.12</h3>
          </div>
          <div className="flex justify-between w-full">
            <h3 className="text-2xl font-semibold">female:</h3>
            <h3 className="text-2xl font-semibold">19:00:01.12</h3>
          </div>
        </div>
        <div className="w-full md:w-3/5 flex mx-6">
          <div className="w-1/3 flex flex-col items-center">
            <div className="border-t-[1px] w-full border-b-[1px] border-l-[1px] border-black rounded-l-md p-3 flex justify-center bg-white">
              <h2 className="text-2xl sm:text-4xl font-semibold ">
                {club.members?.length || 20}
              </h2>
            </div>
            <p className="text-lg sm:text-xl uppercase mt-2 text-white">
              Members
            </p>
          </div>
          <div className="w-1/3 flex flex-col items-center">
            <div className="border-[1px] w-full border-black p-3 flex justify-center bg-white">
              <h2 className="text-2xl sm:text-4xl font-semibold">
                {club.teams?.length || 20}
              </h2>
            </div>
            <p className="text-lg sm:text-xl uppercase mt-2 text-white">
              teams
            </p>
          </div>
          <div className="w-1/3 flex flex-col items-center">
            <div className="border-t-[1px] w-full border-b-[1px] border-r-[1px] border-black rounded-r-md p-3 flex justify-center bg-white">
              <h2 className="text-2xl sm:text-4xl font-semibold">12</h2>
            </div>
            <p className="text-lg sm:text-xl uppercase mt-2 text-white">
              finished races
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClubStatistics;
