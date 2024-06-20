import { EventApi, EventCard, FutureEventCard } from "@/src/entities/Event";

export default async function UpcomingEvents() {
  const eventApi = new EventApi();
  const { futureEvents } = await eventApi.getFututeEvents();

  return (
    <>
      <header className="w-full flex justify-end md:justify-center h-56 md:h-[500px] bg-[url('https://storage.googleapis.com/abe_cloud_storage/events%2Fcyprus_mainimg.jpg')] bg-cover bg-no-repeat bg-center relative flex-col ">
        <div className="h-2/5 sm:h-1/2 bg-[#FCEF3C] flex justify-center items-center w-3/4 sm:w-3/5 md:w-[500px]">
          <h2 className="uppercase font-semibold text-2xl sm:text-3xl md:text-5xl">
            Upcoming <br />
            Events
          </h2>
        </div>
      </header>
      <main className="max-w-7xl my-5 md:my-8 mx-auto">
        <div className="max-w-7xl my-5 md:my-8 mx-auto flex flex-col gap-10">
          {futureEvents?.map((item, i) =>
            item.announced ? (
              <EventCard key={item.id} futureEvent={item} />
            ) : (
              <FutureEventCard key={item.id} futureEvent={item} />
            )
          )}
        </div>
      </main>
    </>
  );
}
