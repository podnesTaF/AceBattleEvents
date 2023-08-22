import { json, type LoaderArgs, type V2_MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import axios from "axios";

import { IEvent, ITeam } from "~/lib/types";
import { fakeNews } from "~/lib/utils";

import { Skeleton } from "@mui/material";
import {
  CarouselItem,
  CustomCarousel,
  CustomTitle,
  IntroSlider,
  NewsCard,
} from "~/components";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Ace Battle Events | Main page" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderArgs) => {
  const { data } = await axios.get<{ events: IEvent[]; totalPages: number }>(
    "http://localhost:4000/api/v1/events"
  );

  const { data: teamsData } = await axios.get<{ teams: ITeam[] }>(
    "http://localhost:4000/api/v1/teams"
  );

  return json({ events: data.events, teams: teamsData.teams });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <header className="w-full flex justify-center items-center h-calc-screen bg-fixed bg-cover bg-no-repeat bg-top relative flex-col ">
        <IntroSlider events={data.events} />
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
            {data.teams ? (
              <CustomCarousel
                initTranslate={data.teams.length * 200 - 600}
                items={data.teams}
                ItemCard={CarouselItem}
              />
            ) : (
              <div className="my-4 w-full sm:w-[400px] h-96">
                <Skeleton variant="rectangular" width="100%" height="100%" />
              </div>
            )}
          </div>
        </section>
        <section>
          <div className="max-w-7xl mx-4 lg:mx-auto">
            <h3 className="text-2xl border-b-2 border-red-500 font-semibold mb-6 md:mb-16">
              Latest news
            </h3>
            <div className="flex flex-wrap gap-8 w-full justify-center items-center mb-6">
              {fakeNews.map((news: any) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
            <div className="flex gap-4 items-center">
              <div className="w-4 h-6 bg-red-500"></div>
              <div className="text-2xl font-semibold">
                Read more in{" "}
                <Link to={"/news"} className="text-red-500 underline">
                  News
                </Link>
              </div>
            </div>
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
