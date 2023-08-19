import { Link } from "@remix-run/react";
import React from "react";
import { IClub } from "~/lib/clubs/types";
import { transformIntoMembers } from "~/lib/shared/utils/table-formater";
import CustomTable from "../shared/tables/CustomTable";
import Pagination from "../shared/tables/Pagination";

interface MyClubProps {
  club: IClub;
}

const MyClub: React.FC<MyClubProps> = ({ club }) => {
  return (
    <div className="w-full">
      <section className="relative w-full overflow-hidden">
        <img
          src={club.photo?.mediaUrl || "/clubs-lg.jpg"}
          alt="club photo"
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        />
        <div className="absolute w-full h-full bottom-0 left-0 p-4 md:p-6 bg-gradient-to-b from-transparent to-black -z-10"></div>
        <div className="flex py-6 items-center">
          <img
            src={club.logo?.mediaUrl}
            alt="club logo"
            height={80}
            className="mx-4 md:mx-6 object-contain max-h-[200px]"
          />
          <div className="flex gap-3 items-end mb-4 md:mb-6">
            <div className="w-5 bg-red-500 h-[70px]"></div>
            <div className="flex flex-col gap-4">
              <h4 className="border-b-[1px] border-red-500 text-white text-xl">
                {club.country}
              </h4>
              <h2 className="text-white text-2xl md:text-3xl font-semibold">
                {club.name}
              </h2>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#1E1C1F] w-full pt-4">
        <h3 className="text-white text-xl font-semibold mx-4 mb-4">
          Statistic
        </h3>
        <div className="flex gap-6 flex-col md:flex-row justify-between">
          <div className="rounded-tr-lg bg-yellow-300 p-4 pb-6 w-full md:w-2/5">
            <h3 className="text-2xl font-semibold text-center">
              Personal Bests
            </h3>
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
                <h2 className="text-2xl sm:text-4xl font-semibold text-white">
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
      <section className="m-4">
        <h4 className="text-xl font-semibold mb-5">Club Atheletes</h4>
        <div className="px-4 mb-4 w-full">
          <CustomTable
            rows={transformIntoMembers(
              club.members.filter((m) => m.role === "runner")
            )}
            isLoading={false}
            titleColor="bg-black"
            isTitleStraight={true}
          />
          <div className="flex justify-center mt-4">
            <Pagination onChangePage={() => {}} currPage={1} pagesCount={1} />
          </div>
        </div>
      </section>
      <section className="my-5 mx-4">
        <h4 className="text-xl font-semibold mb-5">
          EDIT CLUB INFORMATION AND MEMBERS
        </h4>
        <h2 className="text-2xl font-semibold my-4 text-center text-green-300 underline">
          <Link to="/profile">OPEN CLUB PREFERENCES</Link>
        </h2>
      </section>
    </div>
  );
};

export default MyClub;
