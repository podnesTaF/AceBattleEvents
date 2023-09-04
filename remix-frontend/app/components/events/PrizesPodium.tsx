import React from "react";
import { IPrize } from "~/lib/types";

interface IProps {
  prizes: IPrize[];
}

const PrizesPodium: React.FC<IProps> = ({ prizes }) => {
  const prizesObj = {
    first: prizes[0],
    second: prizes[1],
    third: prizes[2],
  };
  return (
    <div className="w-full flex items-end">
      <div
        className={`w-1/3 flex flex-col items-center  h-[180px] md:h-[310px] justify-end`}
      >
        <h3 className="text-2xl font-semibold mb-2 text-center">
          {prizesObj.second.amount} &euro;
        </h3>
        <div className="h-3/6 w-full bg-gray-400 flex justify-center pt-4 md:pt-8 rounded-t-2xl">
          <h2 className="text-white font-semibold text-5xl md:text-7xl">
            {prizesObj.second.place}
          </h2>
        </div>
      </div>
      <div
        className={`w-1/3 flex flex-col items-center h-[180px] md:h-[310px] justify-end`}
      >
        <h3 className="text-2xl font-semibold mb-2 text-center">
          {prizesObj.first.amount} &euro;
        </h3>
        <div className="h-4/6 w-full bg-yellow-300 flex justify-center pt-4 md:pt-8 rounded-t-2xl">
          <h2 className="text-white font-semibold text-5xl md:text-7xl">
            {prizesObj.first.place}
          </h2>
        </div>
      </div>
      <div
        className={`w-1/3 flex flex-col items-center h-[180px] md:h-[310px] justify-end`}
      >
        <h3 className="text-2xl font-semibold mb-2 text-center">
          {prizesObj.third.amount} &euro;
        </h3>
        <div className="h-2/6 w-full bg-[#CD7F32]  flex justify-center pt-4 md:pt-8 rounded-t-2xl">
          <h2 className="text-white font-semibold text-5xl md:text-7xl">
            {prizesObj.third.place}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default PrizesPodium;
