"use client";

import FmdGoodIcon from "@mui/icons-material/FmdGood";

const EventCard = () => {
  return (
    <div className="my-10">
      <h1 className="text-4xl md:text-5xl my-4 text-center font-semibold">
        BATTLE MILE CUP BENELUX
      </h1>
      <div className="w-full bg-[url('/card1.jpg')] bg-contain md:bg-cover bg-no-repeat relative flex justify-center drop-shadow-xl">
        <div className="md:bg-[#F7F7F7] px-5 md:py-5 w-full lg:w-[820px]">
          <h3 className="p-3 bg-black/50 text-white md:bg-none text-xl uppercase text-center w-full mb-10 md:my-5">
            First battle mile competitions
          </h3>
          <div className="flex flex-col md:flex-row w-full">
            <div className="w-full md:w-1/2 border-red border-[1px] p-4 flex flex-col gap-2 bg-white min-h-[400px] justify-between">
              <div>
                <h3 className="uppercase text-xl">Location:</h3>
                <h4 className="uppercase text-lg underline">
                  BRUSSELS, RUE Camille Lemonnier 78 <FmdGoodIcon />
                </h4>
              </div>
              <div>
                <h3 className="uppercase text-xl">Date:</h3>
                <h4 className="uppercase text-lg">23 / 06 / 2023, 18:00</h4>
              </div>
              <div>
                <h3 className="uppercase text-xl">teams:</h3>
                <h4 className="uppercase text-lg">4 male | 4 female</h4>
              </div>
              <div>
                <h3 className="uppercase text-xl">organisators:</h3>
                <h4 className="uppercase text-lg">Ace Battle Association</h4>
              </div>
            </div>
            <div className="w-full md:w-1/2 border-red border-[1px] p-4 bg-[#1E1C1F] flex flex-col items-center min-h-[300px] sm:min-h-[400px]">
              <h4 className="text-xl uppercase text-white">PRIZE FUNDS</h4>
              <div className="flex-1 flex items-center justify-center">
                <h1 className="uppercase text-7xl text-white">100000$</h1>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-around my-4 gap-3">
            <button className="p-4 bg-red-500 text-lg sm:text-xl uppercase text-white rounded hover:bg-red-700 drop-shadow-lg active:scale-95">
              Register your team
            </button>
            <button className="p-4 border-[1px] border-red-500 text-lg sm:text-xl uppercase rounded hover:bg-gray-100 drop-shadow-lg active:scale-95">
              Register your team
            </button>
          </div>
        </div>
      </div>
      <div className="border-b-2 border-gray-100"></div>
    </div>
  );
};

export default EventCard;
