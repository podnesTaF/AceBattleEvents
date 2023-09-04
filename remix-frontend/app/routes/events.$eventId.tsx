import { Divider, Skeleton } from "@mui/material";
import { LoaderArgs, json } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useNavigate,
  useParams,
  useRouteError,
} from "@remix-run/react";
import axios from "axios";
import { useRef, useState } from "react";
import {
  CarouselItem,
  CustomCarousel,
  CustomTable,
  EventHeader,
  EventUsersAction,
  Map,
  PrizesPodium,
  SectionTitle,
  StatisticCards,
  WideCarousel,
} from "~/components";
import { IEvent } from "~/lib/types";
import {
  authenticator,
  formatDate,
  getGoogleMapsLink,
  transformAddress,
  transformIntoTeamsTable,
} from "~/lib/utils";

export const loader = async ({ params, request }: LoaderArgs) => {
  const { eventId } = params;

  const { data: event } = await axios.get<IEvent>(
    "http://localhost:4000/api/v1/events/" + eventId
  );

  if (!event) {
    throw new Response("Event not found.", {
      status: 404,
    });
  }

  const user = await authenticator.isAuthenticated(request);

  return json({
    event: event,
    googleMapsKey: process.env.GOOGLE_MAPS_KEY || "",
    user,
  });
};

const EventPage = () => {
  const { event, googleMapsKey, user } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [translateDistance, setTranslateDistance] = useState(0);

  const itemRefs = useRef<any>([]);

  const slide = (direction: "next" | "prev") => {
    const slideDistance = itemRefs.current[0].offsetWidth;

    console.log(slideDistance);

    setTranslateDistance(
      (prev) => prev + (direction === "next" ? slideDistance : -slideDistance)
    );
  };

  return (
    <>
      <EventHeader userRole={user?.role} event={event} />
      <main>
        <section className="my-6">
          <div className="max-w-7xl mx-4 lg:mx-auto">
            <SectionTitle title="News and articles" />
            <div className="my-6">
              <WideCarousel />
            </div>
          </div>
        </section>
        <section className="my-6">
          <div className="max-w-5xl mx-4 lg:mx-auto">
            <div className="flex justify-end bg-red-500 px-4 py-3">
              <h4 className="text-xl text-white font-semibold">
                About the event
              </h4>
            </div>
            <div className="bg-[#F3F3F3] px-6 py-12 md:px-12 clip-rect">
              <div className="flex justify-between gap-4 items-center">
                <div className="w-full md:w-2/3">
                  <p className="mb-6">
                    Just a few years ago, we, as the Ace Battle Mile organizers,
                    set our sights on going international, and this autumn, we
                    are taking confident steps to realize that goal. The
                    European debut will take place on September 23rd in
                    Brussels, where the first races of the{" "}
                    <strong>ACE Battle Mile</strong> teams will unfold.
                  </p>
                  <p className="mb-6">
                    ACE BM is a team racing event where professional athletes
                    engage in unique battles over the course of a mile. Its aim
                    is to create a new subculture and establish a fresh team
                    racing format in Europe, bringing together people from all
                    walks of life and fostering a sense of unity and teamwork
                    among participants.
                  </p>
                  <ul className="list-disc mb-6">
                    <li>
                      Each team consists of five participants and has the right
                      to make two substitutions during the race.
                    </li>
                    <li>
                      At any point on the track, a so-called “joker” can enter,
                      completely changing the course of the competition.
                    </li>
                  </ul>
                </div>
                <img
                  src="/abm-logo-black.svg"
                  alt="logo"
                  width={190}
                  height={180}
                  className="hidden md:block w-1/3 lg:w-1/4 object-contain"
                />
              </div>
              <div className="mb-6">
                <h4 className="font-semibold text-xl mb-8">
                  preliminary teams:
                </h4>
                <div className="flex w-full justify-around gap-8 flex-col md:flex-row items-center md:w-4/5 px-4 md:mx-auto">
                  <div className="flex flex-col gap-4 items-center w-2/5">
                    <h5 className="font-semibold text-2xl">Professionals</h5>
                    <div className="flex items-center w-full">
                      <h3 className="text-2xl font-semibold w-1/2 border-r-2 border-black text-center">
                        4 Male <br /> Teams
                      </h3>
                      <h3 className="text-2xl font-semibold w-1/2 text-center">
                        4 Female <br /> Teams
                      </h3>
                    </div>
                    <p>
                      teams consist of professionals from different clubs and
                      countries
                    </p>
                  </div>
                  <div className="flex flex-col gap-4 items-center w-2/5">
                    <h5 className="font-semibold text-2xl">Kids. U16</h5>
                    <div className="flex items-center w-full">
                      <h3 className="text-2xl font-semibold w-1/2 border-r-2 border-black text-center">
                        2 Boys <br /> Teams
                      </h3>
                      <h3 className="text-2xl font-semibold w-1/2 text-center">
                        2 Girls <br /> Teams
                      </h3>
                    </div>
                    <p>
                      Young athletes from local schools and youth running clubs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full my-8 bg-[#1E1C1F] p-4">
          <div className="max-w-7xl mx-auto my-4 flex flex-col items-center justify-center overflow-hidden">
            <SectionTitle title="Registered teams" textColor="text-white" />
            {event.teams ? (
              <CustomCarousel
                initTranslate={event.teams.length * 200 - 600}
                items={event.teams}
                ItemCard={CarouselItem}
              />
            ) : (
              <div className="my-4 w-full sm:w-[400px] h-96">
                <Skeleton variant="rectangular" width="100%" height="100%" />
              </div>
            )}
          </div>
        </section>
        <section className="max-w-6xl my-8 mx-4 lg:mx-auto">
          <h3 className="text-center text-3xl font-semibold">Prizes</h3>
          <div className="my-4 mb-8">
            <PrizesPodium
              prizes={event.prizes?.sort((a, b) => a.place - b.place)}
            />
            <p className="text-end">prize funds per team</p>
          </div>
        </section>
        <div className="bg-no-repeat bg-right-top bg-contain h-full relative">
          <img
            src={"/details2.jpg"}
            width={400}
            height={700}
            alt="pict"
            className="absolute top-0 right-0 -z-10"
          />
          <div className="w-full xl:w-3/4 max-w-[1280px] px-4 py-5 sm:px-8 lg:px-12 lg:py-8">
            <StatisticCards event={event} />
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between w-full gap-10 md:gap-0">
              <div className="w-full max-w-[500px] min-h-[350px] md:w-2/5 border-[1px] border-red bg-white p-4 flex flex-col justify-between">
                <div className="flex justify-between">
                  <p className="text-xl font-semibold">Country:</p>
                  <p className="text-xl font-light">
                    {event.location.country.name}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-xl font-semibold">City:</p>
                  <p className="text-xl font-light">{event.location.city}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-xl font-semibold">Address:</p>
                  {event.location && (
                    <p className="text-xl font-light underline">
                      <a
                        href={getGoogleMapsLink(event.location)}
                        target="_blank"
                      >
                        {event?.location.address +
                          ", " +
                          event?.location.zipCode}
                      </a>
                    </p>
                  )}
                </div>
                <div className="flex justify-between">
                  <p className="text-xl font-semibold">Date:</p>
                  <p className="text-xl font-light">
                    {event && formatDate(event.startDateTime)}
                  </p>
                </div>
              </div>
              <div className="w-full min-w-[400px] max-w-[500px] md:w-3/5 border-[1px] border-red bg-white">
                <Map
                  address={transformAddress(event.location)}
                  googleMapsKey={googleMapsKey}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#1E1C1F] flex justify-center items-center p-4">
          <h3 className="text-white text-3xl uppercase font-semibold">
            Prices and Prizes
          </h3>
        </div>
        <div className="mx-auto max-w-7xl h-full">
          <div className="mt-6 my-20 relative mx-3 sm:mx-6">
            <img
              src={"/running.svg"}
              width={380}
              height={480}
              alt="running group"
              className="absolute -z-10"
            />
            <div className="ml-auto w-full md:w-[600px]">
              <h3 className="text-2xl text-center mb-3 font-semibold">
                PRIZE FUNDS
              </h3>
              <div className="w-full flex flex-col gap-3">
                <div className="w-full flex bg-red-500 p-3">
                  <div className="w-1/4 border-r-[1px] border-gray-200">
                    <p className="text-xl uppercase text-center text-white">
                      Place
                    </p>
                  </div>
                  <div className="w-3/4">
                    <p className="text-xl uppercase text-center text-white">
                      Award
                    </p>
                  </div>
                </div>
                {event.prizes.map((prize) => (
                  <div
                    key={prize.id}
                    className={"p-4 shadow w-full flex bg-white/80"}
                  >
                    <div className="w-1/4 border-r-[1px] border-black">
                      <p className="text-2xl uppercase text-center ">
                        {prize.place}
                      </p>
                    </div>
                    <div className="w-3/4">
                      <p className="text-2xl uppercase text-center">
                        {prize.amount} $
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="my-10 mx-4 xl:mx-0">
            <h2 className="text-4xl my-3 font-semibold">Registered Teams</h2>
            {event?.teams?.length ? (
              <CustomTable
                titleColor="bg-black"
                isTitleStraight={true}
                rows={transformIntoTeamsTable(event?.teams)}
                isLoading={false}
              />
            ) : (
              <>
                <p className="text-2xl text-center">
                  There are no registered teams yet
                </p>
                <Divider />
              </>
            )}
          </div>

          <EventUsersAction
            eventId={event.id}
            isParticipant={false}
            userRole={user?.role}
          />
        </div>
      </main>
    </>
  );
};

export function ErrorBoundary() {
  const { eventId } = useParams();
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <div className="error-container">
          <h3 className="text-xl font-semibold">
            Cannot find event by with this id: "{eventId}"?
          </h3>
        </div>
      );
    }
  }
  return (
    <div className="error-container">
      <h3 className="text-xl font-semibold">
        There was an error loading event by the id {eventId}. Sorry.
      </h3>
    </div>
  );
}

export default EventPage;
