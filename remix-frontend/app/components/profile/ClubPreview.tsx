import React from "react";
import { IClub } from "~/lib/types";

interface ClubPreviewProps {
  club: IClub;
}

const ClubPreview: React.FC<ClubPreviewProps> = ({ club }) => {
  return (
    <section className="relative w-full overflow-hidden">
      <img
        src={club.photo?.mediaUrl || "/clubs-lg.jpg"}
        alt="club photo"
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      />
      <div className="absolute w-full h-full bottom-0 left-0 p-4 md:p-6 bg-gradient-to-b from-transparent to-black -z-10"></div>
      <div className="flex py-6 lg:py-12 items-center">
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
  );
};

export default ClubPreview;
