import { LoaderArgs, json } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { EventCard } from "~/components";
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
  const { events, user } = useLoaderData<typeof loader>();
  return (
    <main className="max-w-7xl my-5 md:my-8 mx-auto">
      {events.map((item, i) => (
        <EventCard idx={i} key={item.id} event={item} user={user} />
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
