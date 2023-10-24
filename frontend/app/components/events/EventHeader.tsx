import { useNavigate } from "@remix-run/react";
import React from "react";
import { IEvent } from "~/lib/types";
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
        <h2 className="text-white uppercase font-semibold text-3xl sm:text-5xl mb-3 text-center">
          {event.title}
        </h2>
        <h3 className="text-white uppercase font-semibold text-2xl sm:text-3xl mb-3 text-center">
          {event.location.city}, {event.location.country.name}
        </h3>
      </div>
      {!isEventPast && (
        <div className="absolute bottom-0 left-0 bg-[url('/event-page-bg.svg')] bg-no-repeat bg-cover bg-bottom w-full pb-4 flex justify-center items-end z-10 h-[150px]">
          {userRole !== "runner" && (
            <button
              onClick={handleAction}
              className="hover:bg-green-500 bg-green-300 text-white font-bold py-2 px-3 sm:py-4 sm:px-6 rounded active:scale-95"
            >
              {userRole === "manager"
                ? "Register Your Team"
                : "Attend the event"}
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default EventHeader;
