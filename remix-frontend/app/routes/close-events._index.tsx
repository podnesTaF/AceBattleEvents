import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import EventCard from "~/components/events/EventCard";
import { getEvents } from "~/lib/events/utils/events-requests.server";

export const loader = async () => {
  const { events } = await getEvents({ params: "" });

  if (!events) {
    throw new Response("Events not found.", {
      status: 404,
    });
  }

  return json({ events });
};

const CloseEventsIndex = () => {
  const { events } = useLoaderData<typeof loader>();
  return (
    <main className="max-w-7xl my-5 md:my-8 mx-auto">
      {events.map((item, i) => (
        <EventCard idx={i} key={item.id} event={item} />
      ))}
    </main>
  );
};

export default CloseEventsIndex;
