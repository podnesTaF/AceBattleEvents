import { useNavigate } from "@remix-run/react";
import React from "react";
import { IEvent } from "~/lib/types";
import { formatDate } from "~/lib/utils";
import { CountDown } from "../shared";

interface IProps {
  event: IEvent;
  userRole?: string;
  isEventPast: boolean;
}

const EventHeader: React.FC<IProps> = ({ event, userRole, isEventPast }) => {
  const navigate = useNavigate();

  const handleAction = () => {
    if (userRole === "manager") {
      navigate(`/events/${event.id}/register-team`);
    } else {
      navigate(`/events/${event.id}/register`);
    }
  };

  return (
    <header
      className={`w-full flex justify-center items-center h-[380px] md:h-[480px] relative`}
    >
      <img
        src={event.introImage?.mediaUrl || "/page-detail.jpg"}
        alt="intro image"
        height={480}
        className="w-full h-full absolute object-cover"
      />
      <div className="flex flex-col gap-4 items-center z-10">
        {!isEventPast && <CountDown date={event.startDateTime} />}
        <h2 className="text-white text-shadowed uppercase font-bold text-2xl sm:text-3xl lg:text-5xl mb-3 text-center max-w-3xl">
          {event.title}
        </h2>
      </div>
      <div className="absolute bottom-0 left-0 bg-[url('/event-page-bg.svg')] bg-no-repeat bg-cover bg-bottom w-full pb-4 flex justify-center items-end z-10 h-[150px]">
        <h3 className="text-white uppercase font-semibold text-2xl sm:text-3xl mb-3 text-center">
          {event.location.city}, {event.location.country.name}.{" "}
          {formatDate(event.startDateTime, false)}
        </h3>
      </div>
    </header>
  );
};

export default EventHeader;
