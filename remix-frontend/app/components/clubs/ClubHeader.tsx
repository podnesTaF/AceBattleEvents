import React from "react";
import { IClub } from "~/lib/types";

interface Props {
  club: IClub;
}

const ClubHeader: React.FC<Props> = ({ club }) => {
  return (
    <header className="relative w-full h-[400px] md:h-[700px] overflow-hidden">
      <img
        src={club.photo?.mediaUrl || "/clubs-lg.jpg"}
        alt="club photo"
        width={1480}
        height={720}
        className="object-cover w-full"
      />
      <div className="absolute w-full md:w-3/4 lg:w-1/2 bottom-0 left-0 p-4 md:p-6 bg-gradient-to-b from-transparent to-black">
        <h4 className="border-b-2 border-red-500 py-2 mb-4 text-xl font-semibold text-white flex items-center">
          {club.country?.flagIconUrl && (
            <img
              src={club.country.flagIconUrl}
              alt="flag"
              width={50}
              height={30}
              className="mr-2"
            />
          )}
          {club.country.name}
        </h4>
        <h2 className="text-3xl md:text-5xl text-white font-semibold my-4 md:my-6">
          {club.name}
        </h2>
      </div>
    </header>
  );
};

export default ClubHeader;
