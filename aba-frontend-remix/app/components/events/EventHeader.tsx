import { useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { IEvent } from "~/lib/types";
import { formatEventDateRange } from "~/lib/utils";
import { CountDown } from "../shared";
import EventButton from "./EventButton";

interface IProps {
  event: IEvent;
  openModal: () => void;
  isEventPast: boolean;
}

const EventHeader: React.FC<IProps> = ({ event, isEventPast, openModal }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:780px)");
  return (
    <>
      <header
        className={`w-full relative py-[20%] lg:py-[10%] min-h-[440px] md:min-h-[540px]`}
      >
        <img
          src={event.mainImageUrl || "/page-detail.jpg"}
          alt="intro image"
          className="w-full h-full absolute left-0 top-0 object-cover -z-10"
        />
        <div className="absolute top-0 left-0 w-full h-full backdrop-blur-[2px] bg-[#1E1C1F]/60 -z-10"></div>
        <div className="flex flex-col z-10 px-[5%]">
          <h4 className="text-white font-semibold text-base sm:text-lg md:text-xl lg:text-2xl 2xl:text-3xl mb-1 sm:mb-2 lg:mb-4">
            {formatEventDateRange(event.startDateTime, event.endDate)}.{" "}
            {event.location.city}, {event.location.country?.name}
          </h4>
          <h2 className="text-white font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl leading-none mb-3 md:mb-5 xl:mb-6 max-w-full xs:max-w-[95%] sm:max-w-[80%] md:max-w-[60%] 2xl:max-w-4xl">
            {event.title}
          </h2>
          <EventButton
            onClick={openModal}
            className="w-fit md:!px-5 md:!py-3"
            color="red"
          >
            Register Now
          </EventButton>
        </div>
        <div className="flex justify-center items-center gap-5 md:gap-8 absolute bottom-0 right-0 bg-[#FF1744] rounded-tl-xl rounded-tr-xl md:rounded-tr-none  w-full md:w-1/2 max-w-[740px] h-1/4">
          {!isEventPast && <CountDown date={event.startDateTime} />}
        </div>
      </header>
    </>
  );
};

export default EventHeader;
