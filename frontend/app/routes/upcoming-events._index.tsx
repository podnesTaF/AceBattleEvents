import { LoaderArgs, json } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { Api } from "~/api/axiosInstance";
import { EventCard } from "~/components/events/EventCard";
import FutureEventCard from "~/components/events/FutureEventCard";
import { authenticator } from "~/lib/utils";

export const loader = async ({ request }: LoaderArgs) => {
  const { events } = await Api().events.getEvents();
  const { futureEvents } = await Api().events.getFututeEvents();
  const user = await authenticator.isAuthenticated(request);

  if (!futureEvents) {
    throw new Response("Events not found.", {
      status: 404,
    });
  }

  return json({ events, futureEvents, user });
};

const CloseEventsIndex = () => {
  const { futureEvents } = useLoaderData<typeof loader>();

  return (
    <main className="max-w-7xl my-5 md:my-8 mx-auto flex flex-col gap-10">
      {futureEvents?.map((item, i) =>
        item.announced ? (
          <EventCard key={item.id} futureEvent={item} />
        ) : (
          <FutureEventCard key={item.id} futureEvent={item} />
        )
      )}
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
