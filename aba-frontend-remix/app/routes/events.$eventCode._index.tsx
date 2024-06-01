import { LoaderArgs, json } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useParams,
  useRouteError,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Api } from "~/api/axiosInstance";
import {
  AppBar,
  EventHeader,
  NewsCard,
  TextContent,
  TimeTable,
} from "~/components";
import { EventArchiveCard } from "~/components/events/EventArchiveCard";
import EventButton from "~/components/events/EventButton";
import SponsorScroll from "~/components/events/SponsorScroll";
import EventDrawerMenu from "~/components/events/header/EventDrawerMenu";
import EventNavigation from "~/components/events/header/EventNavigation";
import RegistrationModalLayout from "~/components/registration/RegistrationModalLayout";
import { transformIntoTableRows } from "~/lib/events/utils/timetable";
import { useLayout } from "~/lib/shared/context/LayoutContex";
import {
  authenticator,
  convertDateFormat,
  formatDate,
  formatEventDateRange,
  getEventHeaderItems,
  getStartOfEvent,
} from "~/lib/utils";

export const loader = async ({ params, request }: LoaderArgs) => {
  const { events } = await Api().events.getEventPreviews("finished=true");
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
    pastEvents: events,
    startFormated: formatDate(event.startDateTime),
    googleMapsKey: process.env.GOOGLE_MAPS_KEY || "",
    user,
    newsPreview: newsPreviews,
    isEventPast,
  });
};

const EventPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { event, pastEvents, startFormated, user, newsPreview, isEventPast } =
    useLoaderData<typeof loader>();

  const { setShowNav } = useLayout();

  useEffect(() => {
    setShowNav(false);

    return () => setShowNav(true);
  }, []);

  const openModal = () => {
    if (event.active) {
      setIsModalOpen(true);
    } else {
      alert("Registration isn't available at the moment.");
    }
  };

  return (
    <>
      <AppBar
        user={user}
        NavComponent={EventNavigation}
        navProps={{
          event,
          isEventPast,
          openModal: openModal,
        }}
        DrawerComponent={EventDrawerMenu}
        drawerProps={{
          items: getEventHeaderItems(event),
        }}
        className="mb-[45px] md:mb-[84px]"
      />
      <>
        <EventHeader
          event={event}
          isEventPast={isEventPast}
          openModal={openModal}
        />
        <main className="overflow-hidden">
          <section className="px-3 lg:px-6 max-w-7xl mx-auto my-[5%]">
            <div className="mb-6">
              <p className="uppercase text-xl 2xl:text-2xl font-semibold mb-2">
                {event.location.country.name}{" "}
                {new Date(event.startDateTime).getFullYear()}
              </p>
              <h3 className="text-2xl font-extrabold lg:text-3xl 2xl:text-4xl text-[#333]">
                {event.subtitle}
              </h3>
            </div>
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              <div className="grid grid-cols-1 gap-6 md:gap-12">
                {event.contents
                  ?.filter((c) => c.purpose === "description")
                  ?.map(
                    (c) =>
                      c.text && (
                        <div key={c.id} className="w-full">
                          <TextContent
                            className="font-medium leading-8"
                            text={c.text!}
                            key={c.id}
                          />
                        </div>
                      )
                  )}
              </div>
              <div className="rounded-xl bg-[#1E1C1F]/5 h-full w-full p-[5%] max-w-xl lg:w-2/5 lg:min-w-[460px] flex flex-col justify-around gap-8 2xl:gap-12">
                <div>
                  <p className="mb-2 text-xs text-[#1E1C1F]/50 uppercase font-semibold">
                    where
                  </p>
                  <h4 className="text-lg lg:text-xl font-bold">
                    {event.location.address}. {event.location.country.name},
                    {event.location.city}
                  </h4>
                </div>
                <div>
                  <p className="mb-2 text-xs text-[#1E1C1F]/50 uppercase font-semibold">
                    when
                  </p>
                  <h4 className="text-lg lg:text-xl font-bold">
                    {getStartOfEvent(event.startDateTime)}
                  </h4>
                </div>
                <div>
                  <p className="mb-2 text-xs text-[#1E1C1F]/50 uppercase font-semibold">
                    date
                  </p>
                  <h4 className="text-lg lg:text-xl font-bold">
                    {formatEventDateRange(event.startDateTime, event.endDate)}
                  </h4>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full my-8 md:my-12">
            <SponsorScroll />
          </section>
          {event.timetableByDays?.length && (
            <section className="bg-[#1E1C1F] py-[6%]">
              <div className="max-w-7xl px-4 lg:mx-auto flex flex-wrap gap-6 md:gap-12">
                <div className="flex flex-col lg:justify-center gap-4 font-semibold uppercase text-white lg:-rotate-90 lg:max-w-80 lg:self-end lg:-translate-y-10">
                  <h5 className="text-lg lg:text-xl xl:text-2xl">
                    Preliminary event schedule
                  </h5>
                  <h3 className="font-extrabold text-8xl uppercase hidden lg:block">
                    Action plan
                  </h3>
                </div>
                {event.timetableByDays.map((day, i) => (
                  <div
                    key={i}
                    className={`${i === 0 ? "w-full lg:flex-1" : "w-full"}`}
                  >
                    <h5 className="text-xl lg:text-2xl xl:text-3xl font-extrabold mb-4 text-white text-end">
                      {convertDateFormat(day.date)}
                    </h5>
                    <div className="overflow-auto">
                      <TimeTable rows={transformIntoTableRows(day.rows)} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          <section className="px-3 py-[6%] bg-[#FF1744]">
            <div className="max-w-7xl mx-auto">
              <h3 className="text-xl font-semibold mb-2 lg:text-2xl text-white">
                Rules & Regulations
              </h3>
              <div className="grid grid-cols-1 gap-3 lg:gap-4">
                {event.contents
                  ?.filter((c) => c.text && c.purpose === "rules")
                  ?.map((c) => (
                    <TextContent
                      className="text-white font-medium"
                      text={c.text!}
                      key={c.id}
                    />
                  ))}
              </div>
              {event.contents.find((c) => c.purpose === "regulations")
                ?.mediaUrl && (
                <div className="mt-6 lg:mt-12">
                  <a
                    href={
                      event.contents.find((c) => c.purpose === "regulations")
                        ?.mediaUrl
                    }
                    target="_blank"
                    download
                  >
                    <EventButton color="white">
                      Download Official Regulations
                    </EventButton>
                  </a>
                </div>
              )}
            </div>
          </section>
          <section className="my-[6%]">
            <div className="max-w-7xl w-full mx-auto px-3">
              <div className="mb-4 lg:mb-8">
                <h4 className="font-semibold uppercase text-xl lg:text-2xl">
                  Date & Venue
                </h4>
                <h3 className="text-2xl lg:text-3xl xl:text-4xl font-extrabold">
                  {event.location.stadiumName}
                </h3>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6 lg:mb-8 xl:mb-12">
                <div className="flex flex-col md:flex-row gap-6 xl:gap-12">
                  <div>
                    <p className="text-sm text-black/60 font-medium mb-2 xl:mb-3">
                      Country
                    </p>
                    <p className="font-bold">{event.location.country.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-black/60 font-medium mb-2 xl:mb-3">
                      City
                    </p>
                    <p className="font-bold">{event.location.city}</p>
                  </div>
                  <div>
                    <p className="text-sm text-black/60 font-medium mb-2 xl:mb-3">
                      Address
                    </p>
                    <p className="font-bold">{event.location.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-black/60 font-medium mb-2 xl:mb-3">
                      Date
                    </p>
                    <p className="font-bold">
                      {formatEventDateRange(
                        event.startDateTime,
                        event.endDate,
                        true
                      )}
                    </p>
                  </div>
                </div>
                <EventButton color="red" onClick={openModal}>
                  Register Now
                </EventButton>
              </div>
              {event.location.placeImageUrl && (
                <img
                  src={event.location.placeImageUrl}
                  alt="stadium"
                  className="w-full h-60 lg:h-96 object-cover object-center rounded-xl"
                />
              )}
            </div>
          </section>

          <section className="max-w-7xl xl:mx-auto mb-[6%] px-3">
            <div className="mb-4 lg:mb-12">
              <h4 className="font-semibold text-lg lg:text-xl xl:text-2xl lg:mb-2">
                News
              </h4>
              <h2 className="text-2xl lg:text-3xl xl:text-4xl font-extrabold text-[#333]">
                Articles
              </h2>
            </div>
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
          </section>
          <section className="max-w-7xl xl:mx-auto mb-[6%] px-3">
            <div className="mb-4 lg:mb-12">
              <h2 className="text-2xl lg:text-3xl xl:text-4xl font-extrabold text-[#333]">
                Past Events
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              {pastEvents.map((event, i) => (
                <EventArchiveCard key={i} event={event} />
              ))}
            </div>
          </section>
        </main>

        <RegistrationModalLayout
          event={event}
          open={isModalOpen}
          setOpen={setIsModalOpen}
        />
      </>
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
