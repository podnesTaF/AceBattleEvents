import { LoaderArgs, json } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import FutureEventCard from "~/components/events/FutureEventCard";
import UpcomingEventDesc from "~/components/events/UpcomingEventDesc";
import { IFutureEvent } from "~/lib/types";
import { authenticator, getEvents } from "~/lib/utils";

export const loader = async ({ request }: LoaderArgs) => {
  const { events } = await getEvents({ params: "" });
  const user = await authenticator.isAuthenticated(request);

  if (!events) {
    throw new Response("Events not found.", {
      status: 404,
    });
  }

  return json({ events, user });
};

const CloseEventsIndex = () => {
  const futureEvents: IFutureEvent[] = [
    {
      id: 1,
      title: "Mace of London",
      description: "The Presentation of Ace Battle Mile in London, UK",
      season: "Spring 2024",
      introImage: {
        id: 1,
        title: "london-mile.jpg",
        mediaUrl:
          "https://storage.googleapis.com/abe_cloud_storage/image/large/cc245307-cc45-44b1-889a-250ef665be8e.jpg",
      },
    },
    {
      id: 2,
      title: "Oxford Roger Bannister Cup",
      description: "Grand competition in Oxford, UK",
      season: "Spring 2024",
      introImage: {
        id: 1,
        title: "roger-bannister.jpeg",
        mediaUrl:
          "https://storage.googleapis.com/abe_cloud_storage/image/large/ce6361b2-9e02-4248-baf9-b82df7cf22a7.jpeg",
      },
    },
    {
      id: 3,
      title: "Washington DC Cup",
      description: "The first competition in the US, Washington DC",
      season: "Summer 2024",
      introImage: {
        id: 2,
        title: "washington-dc.webp",
        mediaUrl:
          "https://storage.googleapis.com/abe_cloud_storage/image/large/a250986b-4910-441d-aba1-01a62e200b72.webp",
      },
    },
  ];
  const { events, user } = useLoaderData<typeof loader>();
  return (
    <main className="max-w-7xl my-5 md:my-8 mx-auto">
      {events.map((item, i) => (
        <UpcomingEventDesc key={item.id} event={item} />
      ))}
      {futureEvents.map((item, i) => (
        <FutureEventCard key={item.id} futureEvent={item} />
      ))}
    </main>
  );
};

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="error-container">
        <div className="max-w-[400px] w-full py-4">
          <h3 className="text-xl font-semibold">
            There was an error loading close events. {error.status}{" "}
            {error.statusText}
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="error-container">
      <div className="max-w-[400px] w-full py-4">
        <h3 className="text-xl font-semibold">
          There was an error loading close events.
        </h3>
      </div>
    </div>
  );
}

export default CloseEventsIndex;
