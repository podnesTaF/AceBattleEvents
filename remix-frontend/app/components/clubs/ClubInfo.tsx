import React from "react";
import { IClub } from "~/lib/types";

interface Props {
  club: IClub;
  finishedRaces: number;
}

const ClubInfo: React.FC<Props> = ({ club, finishedRaces }) => {
  return (
    <section className="bg-[#1E1C1F] w-full py-8 md:py-16">
      <div className="max-w-6xl px-6 mx-auto sm:mx-6 lg:mx-auto w-full flex flex-col sm:flex-row justify-between gap-6 ">
        <img
          src={
            club.logo?.mediaUrl ||
            "https://storage.googleapis.com/abe_cloud_storage/image/large/c4bccba0-3f80-4eb5-b50f-63e5cd4f0100.jpg"
          }
          alt={"club logo"}
          width={300}
          height={310}
          className="w-2/3 sm:w-1/3 lg:w-1/4 xl:w-1/5 object-cover"
        />
        <div className="flex flex-col md:flex-row w-1/2 md:w-2/3 justify-between">
          <div className="flex flex-col gap-4 items-center">
            <h4 className="text-white text-lg font-semibold border-b-[1px] border-red-500 w-full">
              Location:
            </h4>
            <div className="flex gap-2 items-center">
              <img src={"/belgium.svg"} alt="country" width={60} height={40} />
              <h3 className="text-xl md:text-2xl text-white">
                {club.country}, <br /> {club.city}
              </h3>
            </div>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <h4 className="text-white text-lg font-semibold border-b-[1px] border-red-500">
              Members:
            </h4>
            <h3 className="text-2xl text-white">{club.members.length}</h3>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <h4 className="text-white text-lg font-semibold border-b-[1px] border-red-500">
              Races Finished:
            </h4>
            <h3 className="text-2xl text-white">{finishedRaces}</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClubInfo;
