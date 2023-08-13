import { Divider, Skeleton } from "@mui/material";
import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import axios from "axios";
import Map from "~/components/events/Map";
import StatisticCards from "~/components/events/StatisticCards";
import CustomTable from "~/components/shared/tables/CustomTable";
import { authenticator } from "~/lib/auth/utils/auth.server";
import { IEvent } from "~/lib/events/types";
import { formatDate } from "~/lib/shared/utils/date-formaters";
import {
  getGoogleMapsLink,
  transformAddress,
} from "~/lib/shared/utils/get-google-maps";
import { transformIntoTeamsTable } from "~/lib/shared/utils/table-formater";

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

  return (
    <>
      <header
        className={`w-full flex justify-center h-[400px] sm:h-[640px] md:h-[720px] lg:h-[800px] h-calc-screen-lg relative flex-col`}
      >
        {event ? (
          <img
            src={event.introImage?.mediaUrl || "/page-detail.jpg"}
            alt="intro image"
            width={1280}
            height={980}
            className="w-full h-full absolute object-cover"
          />
        ) : (
          <Skeleton variant="rectangular" width="100%" height="100%" />
        )}
        <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.4)] z-0"></div>
        <div className="h-3/5 mb-10 sm:mb-0 sm:h-1/2 ml-5 flex flex-col justify-center items-center w-3/4 sm:w-3/5 md:w-[500px] z-10">
          <h2 className="text-white uppercase font-semibold text-3xl sm:text-5xl mb-3 sm:mb-5 text-center ml-2 md:ml-0">
            {event.title}
          </h2>
          <h4 className="text-white text-xl sm:text-2xl uppercase">
            Share your energy with us!
          </h4>
        </div>
        <div className="absolute w-full sm:w-1/2 md:w-[500px] sm:h-1/4 bg-black/60 bottom-0 right-0 flex justify-center items-center z-10">
          <h3 className="uppercase text-lg sm:text-xl font-thin text-white w-4/5 my-2">
            {event.description}
          </h3>
        </div>
        {user && (
          <button
            onClick={() => navigate(`/events/${event.id}/register-team`)}
            className="hover:bg-red-800 bg-red-500 text-white font-bold py-2 px-3 sm:py-4 sm:px-6 border border-red-800 rounded absolute top-6 right-6 active:scale-95"
          >
            Register Your Team
          </button>
        )}
      </header>
      <main>
        <div className="px-5 sm:px-10 py-5 bg-red-500">
          <h3 className="text-3xl text-white font-semibold">ABOUT EVENT</h3>
        </div>
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
            {event?.teams.length ? (
              <CustomTable
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

          <div className="my-20 mx-4 xl:mx-0 flex flex-col sm:flex-row justify-around gap-3">
            <div className="relative">
              <img src={"/details3.jpg"} width={400} height={300} alt="pict" />
              <div className="absolute flex justify-center items-center w-full top-0 left-0 h-full sm:hidden bg-black/50">
                <h2 className="text-3xl uppercase font-semibold p-3 text-white">
                  ADD YOUR TEAM AND BE ABLE TO WIN SUPER PRIZE!
                </h2>
              </div>
            </div>
            <div className="w-full sm:max-w-[400px] flex flex-col items-center">
              <h2 className="text-3xl uppercase font-semibold mb-8 hidden sm:block">
                ADD YOUR TEAM AND BE ABLE TO WIN SUPER PRIZE!
              </h2>
              <button
                onClick={() => {
                  if (user) {
                    navigate(`/events/${event.id}/register-team`);
                  } else {
                    navigate(`/auth/login`);
                  }
                }}
                className="bg-red-500 text-white uppercase font-semibold rounded-lg w-3/4 py-3"
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default EventPage;
