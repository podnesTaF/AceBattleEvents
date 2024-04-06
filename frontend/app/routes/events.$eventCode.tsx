import { LoaderArgs, json } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useParams,
  useRouteError,
} from "@remix-run/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Api } from "~/api/axiosInstance";
import {
  EventHeader,
  Map,
  NewsCard,
  SectionTitle,
  TextContent,
  TimeTable,
} from "~/components";
import AwardsSection from "~/components/events/AwardsSection";
import { IPrize } from "~/lib/types";
import {
  authenticator,
  formatDate,
  getGoogleMapsLink,
  timetableDay1,
  timetableDay2,
  transformAddress,
} from "~/lib/utils";

export const loader = async ({ params, request }: LoaderArgs) => {
  const { eventCode } = params;

  if (!eventCode) {
    throw new Response("Event Title is required.", {
      status: 400,
    });
  }

  const event = await Api().events.getEvent(eventCode, "eventCode");

  if (!event) {
    throw new Response("Event not found.", {
      status: 404,
    });
  }

  const user = await authenticator.isAuthenticated(request);

  const { newsPreviews } = await Api().news.getNewsPreviews({ itemsAmount: 4 });
  const isEventPast = new Date(event.startDateTime) < new Date();

  return json({
    event: event,
    startFormated: formatDate(event.startDateTime),
    googleMapsKey: process.env.GOOGLE_MAPS_KEY || "",
    user,
    newsPreview: newsPreviews,
    isEventPast,
  });
};

const getAdditionalPrizes = (prizes: IPrize[], podiumPrizes: IPrize[]) => {
  return prizes.filter(
    (p) => !podiumPrizes.find((podium) => podium.id === p.id)
  );
};

const EventPage = () => {
  const {
    event,
    googleMapsKey,
    user,
    startFormated,
    newsPreview,
    isEventPast,
  } = useLoaderData<typeof loader>();

  return (
    <>
      <EventHeader
        userRole={user?.role}
        event={event}
        isEventPast={isEventPast}
      />
      <main className="overflow-hidden">
        <section className="px-3 lg:px-6 max-w-7xl mx-auto">
          <div className="py-4 border-b-2 border-b-[#333] mb-4">
            <h3 className="text-xl font-semibold lg:text-2xl 2xl:text-3xl text-[#333]">
              {event.description}
            </h3>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex flex-[3] flex-col gap-3">
              {event.contents
                ?.filter((c) => c.text)
                ?.map((c) => (
                  <TextContent text={c.text!} key={c.id} />
                ))}
            </div>
            {event.contents?.filter((c) => c.type === "image")?.length && (
              <div className="w-full flex-[2]">
                {event.contents
                  ?.filter((c) => c.type === "image")
                  ?.map((c) => (
                    <img
                      key={c.id}
                      src={c.media?.mediaUrl}
                      alt={"content"}
                      width={500}
                      height={400}
                      className="w-full h-auto"
                    />
                  ))}
              </div>
            )}
          </div>
        </section>
        <section className="my-6 py-5 lg:py-8 bg-[#1c1e1f]">
          <div className="max-w-7xl mx-4 lg:mx-auto">
            <SectionTitle title="News and articles" textColor="text-white" />
            <div className="my-6">
              <Swiper
                spaceBetween={50}
                slidesPerView={3}
                breakpoints={{
                  0: {
                    slidesPerView: 1.2,
                    spaceBetween: 20,
                  },
                  640: {
                    slidesPerView: 2.2,
                    spaceBetween: 30,
                  },
                  1024: {
                    slidesPerView: 3.2,
                    spaceBetween: 50,
                  },
                }}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
              >
                {newsPreview.map((news, i) => (
                  <SwiperSlide key={news.id}>
                    <NewsCard item={news} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>
        <AwardsSection categoryAwards={event.prizeCategories} />
        <section className="bg-[#1E1C1F] py-4 my-6 pt-12 md:my-8">
          <div className="max-w-5xl mx-4 lg:mx-auto">
            <SectionTitle
              title={"Preliminary event schedule"}
              textColor="text-white"
              borderColor="border-white"
            />
            <div className="max-w-4xl flex gap-6 justify-between mx-auto my-6">
              <h1 className="-rotate-90 h-fit translate-y-80 font-bold text-8xl text-[#D9DADB] uppercase hidden lg:block">
                Battle plan
              </h1>
              <div className="flex flex-col gap-6 w-full md:w-2/3">
                <ul>
                  <li className="text-xl font-semibold mb-4 text-white">
                    May 18, Saturday, 9 am - 10 pm
                  </li>
                  <div className="mx-4 overflow-auto">
                    <TimeTable rows={timetableDay1} />
                  </div>
                </ul>
                <ul className="flex flex-col gap-1 w-full">
                  <li className="text-xl font-semibold mb-4 text-white">
                    May 19, Saturday, 9 pm - 9pm
                  </li>
                  <div className="mx-4 overflow-auto">
                    <TimeTable rows={timetableDay2} />
                  </div>
                </ul>
                <div className="flex justify-between my-4">
                  <h2 className="text-xl text-white font-semibold">
                    Download Conditions:
                  </h2>
                  <a
                    href="/eng_mile_of_brussels_regulation_v3.pdf"
                    className="text-white underline text-xl"
                    download
                  >
                    Conditions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full my-6">
          <div className="max-w-7xl mx-4 lg:mx-auto lg:min-h-[700px] bg-none border-[1px] border-red-500  lg:border-none lg:bg-[url('/rect.svg')] bg-no-repeat bg-contain md:py-6 md:pl-8 flex flex-col gap-1 md:gap-8">
            <h3 className="font-semibold uppercase text-xl md:text-3xl text-center lg:text-left mt-3">
              Location and Dates
            </h3>
            <div className="flex gap-6 flex-col md:gap-8 md:flex-row md:p-2 w-full lg:w-4/5 items-center justify-center">
              <div className="w-full md:w-2/5 p-2 md:p-4 flex flex-col justify-center">
                <div className="flex justify-between border-b-[1px] border-[#D9DADB] py-2">
                  <p className="text-xl font-semibold">Country:</p>
                  <p className="text-xl font-light">
                    {event.location.country.name}
                  </p>
                </div>
                <div className="flex justify-between border-b-[1px] border-[#D9DADB] py-2">
                  <p className="text-xl font-semibold">City:</p>
                  <p className="text-xl font-light">{event.location.city}</p>
                </div>
                <div className="flex flex-col border-b-[1px] border-[#D9DADB] py-2">
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
                <div className="flex justify-between border-b-[1px] border-[#D9DADB] py-2">
                  <p className="text-xl font-semibold">Date:</p>
                  <p className="text-xl font-light">{startFormated}</p>
                </div>
              </div>
              <div className="w-full sm:min-w-[400px] max-w-[450px] md:max-h-[400px] md:w-3/5 border-[1px] md:border-black md:rounded-md overflow-hidden">
                <Map
                  address={transformAddress(event.location)}
                  googleMapsKey={googleMapsKey}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="px-5 max-w-7xl w-full mx-auto my-5 mb-12">
          <div className="h-48 lg:h-60 bg-[url('/images/stadium-lines-sm.png')] lg:bg-[url('/images/stadium-lines.png')] bg-no-repeat bg-contain bg-bottom"></div>
          <div className="flex justify-end py-2 lg:py-4 px-6 lg:px-10 bg-[#1E1C1F]">
            <h3 className="text-xl md:text-2xl lg:text-3xl text-white font-semibold">
              Stadium
            </h3>
          </div>
          {event.location.placeImage && (
            <img
              src={event.location.placeImage.mediaUrl}
              alt="stadium"
              className="w-full h-60 lg:h-96 object-cover object-center"
            />
          )}
          <div className="py-4 border-b-2 border-b-[#333] my-4">
            <h3 className="text-xl font-semibold lg:text-2xl 2xl:text-3xl text-[#333]">
              {event.location.stadium}
            </h3>
          </div>
          <p>{event.location.placeDescription}</p>
        </section>
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
