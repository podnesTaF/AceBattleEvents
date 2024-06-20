"use client";

import { SectionTitle } from "@/src/shared/ui";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { EventShortform } from "../model/IEvent";
import EventCardItem from "./EventCardItem";

export const EventItemsCarousel = ({
  events,
}: {
  events: EventShortform[];
}) => {
  return (
    <div className="my-8">
      <SectionTitle title="Events" />
      <Swiper
        spaceBetween={20}
        slidesPerView={2}
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
            slidesPerView: 2.2,
            spaceBetween: 50,
          },
        }}
      >
        {events
          ?.sort(
            (a, b) =>
              new Date(b.startDateTime!).getTime() -
              new Date(a.startDateTime!).getTime()
          )
          ?.map((event, i) => (
            <SwiperSlide key={event.id}>
              <EventCardItem item={event} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default EventItemsCarousel;
