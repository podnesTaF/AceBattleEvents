import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import EventCard from "~/components/events/EventCard";
import { authenticator } from "~/lib/auth/utils/auth.server";
import { getEvents } from "~/lib/events/utils/events-requests.server";

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

export default CloseEventsIndex;
