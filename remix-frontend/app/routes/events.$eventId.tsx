import { Divider } from "@mui/material";
import { LoaderArgs, json } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useNavigate,
  useParams,
  useRouteError,
} from "@remix-run/react";
import axios from "axios";
import {
  CustomTable,
  EventHeader,
  EventUsersAction,
  Map,
  StatisticCards,
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

  return (
    <>
      <EventHeader userRole={user?.role} event={event} />
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
