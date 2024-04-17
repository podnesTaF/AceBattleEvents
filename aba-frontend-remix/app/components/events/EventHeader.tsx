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
        className={`w-full relative bg-gradient-to-b from-[#1E1C1F]/0 to-[#1E1C1F] md:bg-none 3xl:bg-gradient-to-b`}
      >
        <img
          src={event.mainImageUrl || "/page-detail.jpg"}
          alt="intro image"
          height={480}
          className="w-full h-full absolute object-cover -z-10"
        />
        <div className="md:bg-[url('/vectors/gradient-half-circle.svg')] relative -bottom-0.5 3xl:bg-none  bg-no-repeat bg-contain bg-bottom h-[380px] md:h-[480px] pb-2 md:pb-4 flex flex-col justify-between items-center z-10 pt-5">
          <h4 className="text-white font-semibold text-lg md:text-xl text-center">
            {event.location.city}, {event.location.country?.name}
          </h4>
          <div className="flex flex-1 flex-col gap-4 items-center justify-center z-10 px-5">
            <h2 className="text-white font-bold text-2xl sm:text-3xl lg:text-5xl mb-3 text-center max-w-3xl">
              {event.title}
            </h2>
          </div>
          <div className="flex flex-col gap-5 md:gap-8">
            {!isEventPast && <CountDown date={event.startDateTime} />}
            <EventButton
              onClick={openModal}
              className="md:!px-5 md:!py-3"
              color="red"
            >
              Register Now
            </EventButton>
          </div>
        </div>
      </header>
      <div className="bg-[url('/vectors/black-half-circle.svg')] bg-no-repeat bg-bottom bg-cover -top-1 py-4 relative">
        <h3 className="text-white capitalize font-semibold text-lg md:text-xl 2xl:text-2xl  text-center">
          {formatEventDateRange(event.startDateTime, event.endDate)}
        </h3>
      </div>
    </>
  );
};

export default EventHeader;
