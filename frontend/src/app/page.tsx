"use client";

import IntroSlider from "@/components/main/IntroSlider";
import TeamsCarousel from "@/components/main/TeamsCarousel";
import CustomTitle from "@/components/shared/CustomTitle";
import { useFetchEventsQuery } from "@/services/eventService";
import { useFetchAllTeamsQuery } from "@/services/teamService";
import { Skeleton } from "@mui/material";

const textStyles =
  "text-lg sm:text-xl text-white border-r-2 border-red-500 px-2 sm:px-4 w-1/4 uppercase text-center";

export default function Home() {
  const { data, error, isLoading } = useFetchEventsQuery({
    params: "",
    currPage: 1,
  });

  const {
    data: teamsData,
    error: teamsError,
    isLoading: teamsLoading,
  } = useFetchAllTeamsQuery({
    params: "",
    page: 1,
  });

  return (
    <>
      <header className="w-full flex justify-center items-center h-calc-screen bg-fixed bg-cover bg-no-repeat bg-top relative flex-col ">
        <IntroSlider events={data?.events} />
      </header>
      <main>
        <CustomTitle
          title={"ACE BATTLE MILE"}
          subtitle=" RUNNING COMPETITIONS"
        />
        <section className="py-[10%] max-w-4xl flex justify-center mx-auto gap-4 md:gap-10">
          <img
            src="/main-page-img.jpg"
            alt="card"
            className="object-cover object-top mr-6 w-1/2 max-h-[450px]"
          />
          <div className="flex flex-col justify-center w-1/2">
            <h3 className="text-2xl sm:text-4xl font-semibold">
              Welcome to the revolutionary world of Ace Battle Mile.
            </h3>
            <p className="text-xl mt-5 sm:mt-10">
              Running events have been transformed into epic battles between
              teams.
            </p>
          </div>
        </section>
        <section className="w-full my-4 bg-[#1E1C1F] p-4">
          <div className="max-w-7xl mx-auto my-4 flex flex-col items-center justify-center overflow-hidden">
            <h3 className="text-white font-semibold text-2xl uppercase mb-4">
              Teams
            </h3>
            {teamsData ? (
              <TeamsCarousel teams={teamsData.teams} />
            ) : (
              <div className="my-4 w-full sm:w-[400px] h-96">
                <Skeleton variant="rectangular" width="100%" height="100%" />
              </div>
            )}
          </div>
        </section>
        <section className="w-full">
          <div className="w-full bg-[url('/main-sect-bg-sm.jpg')] md:bg-[url('/main-sect-bg.jpg')] bg-fixed bg-cover bg-top min-h-[380px] md:min-h-[480px] lg:min-h-[580px] relative flex items-end">
            <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.4)] z-0"></div>
            <div className="p-5 sm:p-10 sm:bg-[#1E1C1F] w-full sm:w-3/4 md:w-1/2 z-10">
              <div className="max-w-[240px] mb-5">
                <h3 className="text-white text-2xl font-semibold">
                  Join us in this extraordinary journey.
                </h3>
              </div>
              <div className="hidden sm:flex sm:max-w-[300px] ml-auto">
                <p className="text-white text-sm">
                  Join us in this extraordinary journey, where passion meets
                  competition and running transcends its boundaries. Step onto
                  the battlefield, and let the Ace Battle Mile web3 marketplace
                  become your gateway to an unparalleled running experience.
                  Register your team today, and prepare to make history in the
                  realm of running battles.
                </p>
              </div>
            </div>
          </div>
          <div className="block sm:hidden ml-auto p-8 bg-[#1E1C1F]">
            <p className="text-white text-sm">
              Join us in this extraordinary journey, where passion meets
              competition and running transcends its boundaries. Step onto the
              battlefield, and let the Ace Battle Mile web3 marketplace become
              your gateway to an unparalleled running experience. Register your
              team today, and prepare to make history in the realm of running
              battles.
            </p>
          </div>
        </section>
        <section className="m-8 bg-gray-100 p-4 sm:p-10 flex flex-col sm:flex-row justify-between">
          <div className="mr-5 w-full sm:w-1/2">
            <h3 className="text-2xl font-semibold mb-5">Ace Battle Websites</h3>
            <p className="text-sm">
              You can find additional ace battle websites to dive deeper into
              the idea of our organization. “Ace Battle Bet” - betting website
              for our competitions. You can analyse results there and get more
              acquainted with professional teams. “ABA” - website to explore our
              organization and past results
            </p>
          </div>

          <div className="flex w-full mt-5 sm:mt-0 sm:w-1/2 flex-col justify-around items-center">
            <img src="/abb-logo.png" alt="abb" className="w-64 mb-5" />
            <img src="/aba-logo.png" alt="abb" className="w-64" />
          </div>
        </section>
      </main>
    </>
  );
}
