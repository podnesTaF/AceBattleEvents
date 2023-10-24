import HomeIcon from "@mui/icons-material/Home";
import { LoaderArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Api } from "~/api/axiosInstance";
import {
  CustomCrumbs,
  NewsCard,
  ResultPodium,
  SectionTitle,
} from "~/components";
import { formatDate, msToMinutesAndSeconds } from "~/lib/utils";

const links = [
  {
    title: "Home",
    url: "/",
    icon: HomeIcon,
  },
  {
    title: "Results",
    url: "/results",
  },
];

export const loader = async ({ request, params }: LoaderArgs) => {
  const { eventId } = params;

  if (!eventId) {
    throw new Response("Event not found.", {
      status: 404,
    });
  }

  const eventResults = await Api().events.getEventResults(eventId);
  const newsPreviewsData = await Api().news.getNewsPreviews({ itemsAmount: 4 });

  if (!eventResults) {
    throw new Response("Event not found.", {
      status: 404,
    });
  }

  return json({ eventResults, id: +eventId, newsPreviewsData });
};

const EventResults = () => {
  const { eventResults, id, newsPreviewsData } = useLoaderData<typeof loader>();
  return (
    <>
      <header className="w-full flex justify-center h-96 bg-cover bg-no-repeat bg-top relative flex-col">
        <div className="h-3/5 mb-10 sm:mb-0 sm:h-1/2 bg-[#FCEF3C] flex justify-center items-center w-3/4 sm:w-3/5 md:w-[500px] flex-col">
          <h2 className="uppercase font-semibold text-3xl sm:text-5xl">
            {eventResults.eventTitle}
          </h2>
          <h4 className="text-2xl text-end font-semibold">Results and Stats</h4>
        </div>
        <img
          src={eventResults.introImage.mediaUrl}
          alt="event image"
          className="absolute w-full h-full left-0 top-0 -z-10 object-cover"
        />
      </header>
      <main className="w-full">
        <div className="w-full bg-red-600 relative">
          <img
            src={"/abm-logo-white.svg"}
            width={150}
            className="h-auto absolute top-4 left-4"
          />
          <img
            src={"/abm-logo-white.svg"}
            width={150}
            className="h-auto absolute bottom-4 right-4"
          />
          <div className="max-w-7xl w-full bg-[#1E1C1F] py-6 px-4 z-10 relative mx-auto">
            <CustomCrumbs
              color={"text-white"}
              links={[
                ...links,
                {
                  title: eventResults.eventTitle,
                  url: "/results/" + id,
                  active: true,
                },
              ]}
            />
            <div className="my-6">
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6 text-end">
                Winners
              </h2>
              <div className="flex justify-between gap-6 flex-col lg:flex-row flex-nowrap items-center">
                {["male", "female"].map((gender) => (
                  <div key={gender} className="w-full md:w-2/3 lg:w-1/2">
                    <ResultPodium
                      gender={gender}
                      podium={eventResults.podium}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl md:text-3xl text-white font-semibold mb-6">
                Best Results
              </h2>
              <div className="flex justify-between gap-6 flex-col lg:flex-row items-center">
                {Object.keys(eventResults.bestSportsmen).map((gender) => (
                  <div key={gender} className="w-full sm:max-w-xl">
                    <h3 className="text-white text-2xl font-semibold mb-4 text-center">
                      {gender === "male" ? "Men's" : "Women's"} mile
                    </h3>
                    <div className="bg-white flex w-full flex-nowrap min-h-[266px]">
                      <div className="w-1/2">
                        <img
                          src={
                            eventResults.bestSportsmen[gender].runner.user
                              ?.image?.mediaUrl || "/abm-logo-black.svg"
                          }
                          alt="image"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="w-1/2 p-2 sm:p-4">
                        <h3 className="text-xl font-semibold mb-6 uppercase text-center">
                          {eventResults.bestSportsmen[gender].runner.user
                            ?.name +
                            " " +
                            eventResults.bestSportsmen[gender].runner.user
                              ?.surname}
                        </h3>
                        <div className="flex justify-between gap-4 mb-5 items-center">
                          <h5 className="font-semibold uppercase">
                            Mile Result
                          </h5>
                          <h5 className="font-semibold uppercase">
                            {msToMinutesAndSeconds(
                              eventResults.bestSportsmen[gender].finalResultInMs
                            )}
                          </h5>
                        </div>
                        <div className="flex justify-between gap-4 mb-5 items-center">
                          <h5 className="font-semibold uppercase">Rank</h5>
                          <h5 className="font-semibold uppercase">
                            {eventResults.bestSportsmen[gender].runner.rank}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full my-6 bg-white p-4">
              <h3 className="text-2xl font-semibold uppercase text-center">
                Pacer + Joker
              </h3>
              <div className="mx-auto max-w-4xl my-6 flex justify-between gap-6 items-center flex-col sm:flex-row">
                {Object.keys(eventResults.bestJokerPair).map((gender) => (
                  <div key={gender} className="flex flex-col gap-4">
                    <h4 className="text-xl uppercase font-semibold">Runners</h4>
                    <div className="flex flex-col gap-3">
                      {eventResults.bestJokerPair[gender].runners.map(
                        (runnerRes) => (
                          <Link
                            key={runnerRes.id}
                            to={"/profile/" + runnerRes.runner.id}
                            className="text-xl font-semibold text-gray-400 cursor-pointer hover:text-gray-500"
                          >
                            {runnerRes.runner.user.name +
                              " " +
                              runnerRes.runner.user.surname +
                              " (" +
                              runnerRes.runnerType.slice(0, -2) +
                              ")"}
                          </Link>
                        )
                      )}
                    </div>
                    <h4 className="text-xl uppercase font-semibold">Result:</h4>
                    <h4 className="text-xl uppercase font-semibold text-center">
                      {msToMinutesAndSeconds(
                        eventResults.bestJokerPair[gender].finalResultInMs
                      )}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-6 xl:mx-auto my-8">
          <section className="mb-8">
            <h3 className="text-2xl xl:text-3xl uppercase font-semibold mb-4">
              ALL RESULTS
            </h3>
            <div className="flex flex-wrap gap-6 w-full">
              {Object.keys(eventResults.racesByType).map((raceType, i) => (
                <div key={i} className="max-w-[400px] w-full">
                  <h4 className="text-white bg-red-500 px-4 py-3 uppercase font-semibold">
                    {raceType === "male"
                      ? "Men's"
                      : raceType === "female"
                      ? "Women's"
                      : "Kid's"}{" "}
                    race
                  </h4>
                  {eventResults.racesByType[raceType].map((race) => (
                    <div
                      key={race.id}
                      className="px-4 py-3 border-b-[1px] border-b-black"
                    >
                      <Link
                        to={"/race/" + race.id}
                        className="text-xl font-semibold text-gray-400 hover:text-gray-500 cursor-pointer mb-2"
                      >
                        {race.name}
                      </Link>
                      <p className="text-end">{formatDate(race.startTime)}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>
          <section className="my-6">
            <SectionTitle title="News and articles" />
            <div className="flex flex-wrap gap-8 w-full justify-center items-center mb-6">
              {newsPreviewsData?.newsPreviews.map((news: any) => (
                <NewsCard key={news.id} item={news} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default EventResults;
