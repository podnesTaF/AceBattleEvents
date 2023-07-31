"use client";

import IntroSlider from "@/components/main/IntroSlider";
import TeamsCarousel from "@/components/main/TeamsCarousel";
import CustomTitle from "@/components/shared/CustomTitle";
import { useFetchEventsQuery } from "@/services/eventService";
import { useFetchAllTeamsQuery } from "@/services/teamService";
import { Skeleton } from "@mui/material";

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
