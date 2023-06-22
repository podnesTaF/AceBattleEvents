import Image from "next/image";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

const TeamPage: React.FC<Props> = ({ params: { id } }) => {
  return (
    <>
      <header className="w-full flex justify-center h-96 sm:h-[800px] bg-[url('/page-detail.jpg')] bg-cover bg-no-repeat bg-center relative flex-col ">
        <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.4)] z-0"></div>
        <div className="h-3/5 mb-10 sm:mb-0 sm:h-1/2 ml-5 flex flex-col justify-center items-center w-3/4 sm:w-3/5 md:w-[500px] z-10">
          <h2 className="text-white uppercase font-semibold text-3xl sm:text-5xl mb-5">
            Brussels
          </h2>
          <h4 className="text-white text-2xl uppercase">
            club "Royal Runners"
          </h4>
        </div>
      </header>
      <main>
        <div className="px-5 sm:px-10 py-5 bg-red-500">
          <h3 className="text-3xl text-white font-semibold">ABOUT TEAM</h3>
        </div>
        <div className="max-w-7xl my-6 mx-auto">
          <div className="py-4 mb-5 px-4 xl:px-0 border-b-[1px] border-black flex w-full justify-between">
            <div className="mr-4">
              <h4 className="text-xl font-semibold text-gray-400 mb-4">
                Coach
              </h4>
              <h2 className="text-2xl md:text-3xl font-semibold">
                Vitaly Sabulyak
              </h2>
            </div>
          </div>
          <div className="mb-4 px-4 xl:px-0">
            <h4 className="text-xl font-semibold text-gray-400 mb-4">
              Runners
            </h4>
            <div className="flex flex-wrap px-4 xl:px-8 my-4 gap-6">
              <div className="max-w-xs max-h-sm relative">
                <Image
                  src="/avatar.jpg"
                  alt="avatar"
                  width={300}
                  height={300}
                  className="rounded-md object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default TeamPage;
