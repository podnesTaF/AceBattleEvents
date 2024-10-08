import React from "react";
import { TopPerformer } from "~/lib/types";

interface IProps {
  topPerformers: TopPerformer[];
  title: string;
}

const ResultPodium: React.FC<IProps> = ({ topPerformers, title }) => {
  return (
    <div className="w-full flex flex-col gap-4 md:gap-6 items-center">
      <h3 className="uppercase text-white font-semibold text-2xl">{title}</h3>
      <div className="w-full flex">
        {[2, 1, 3].map((place) => (
          <div
            key={place}
            className="w-1/3 flex flex-col items-center justify-end gap-2 h-[200px] md:h-[310px]"
          >
            {topPerformers.find((tp) => tp.place === place) && (
              <div className="flex flex-col gap-2 items-center">
                <img
                  src={
                    topPerformers.find((tp) => tp.place === place)?.team
                      .logoUrl || "/abm-logo-white.svg"
                  }
                  alt="team logo"
                  className="w-[150px] h-auto"
                />
                <h3 className="text-sm sm:text-xl font-semibold text-center text-white">
                  {topPerformers.find((tp) => tp.place === place)?.team.name}
                </h3>
              </div>
            )}
            <div
              className={`w-full ${
                place === 2
                  ? "h-2/6 bg-red-500 md:pt-8"
                  : place === 1
                  ? "h-3/6 bg-[#1E1F1C] border-[1px] border-white md:pt-8"
                  : "bg-white h-1/4"
              } flex justify-center pt-2 rounded-t-2xl`}
            >
              <h2
                className={`${
                  place === 3 ? "text-black" : "text-white"
                } font-semibold text-3xl md:text-5xl`}
              >
                {place}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultPodium;
