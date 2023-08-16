import { useNavigate } from "@remix-run/react";
import React from "react";
import { IEvent } from "~/lib/events/types";

interface IProps {
  event: IEvent;
  userRole?: string;
}

const EventHeader: React.FC<IProps> = ({ event, userRole }) => {
  const navigate = useNavigate();

  const handleAction = () => {
    if (userRole === "manager") {
      navigate(`/events/${event.id}/register/team`);
    } else {
      navigate(`/events/${event.id}/register`);
    }
  };

  return (
    <header
      className={`w-full flex justify-center h-[400px] sm:h-[640px] md:h-[720px] lg:h-[800px] h-calc-screen-lg relative flex-col`}
    >
      <img
        src={event.introImage?.mediaUrl || "/page-detail.jpg"}
        alt="intro image"
        width={1280}
        height={980}
        className="w-full h-full absolute object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.4)] z-0"></div>
      <div className="h-3/5 mb-10 sm:mb-0 sm:h-1/2 ml-5 flex flex-col justify-center items-center w-3/4 sm:w-3/5 md:w-[500px] z-10">
        <h2 className="text-white uppercase font-semibold text-3xl sm:text-5xl mb-3 sm:mb-5 text-center ml-2 md:ml-0">
          {event.title}
        </h2>
        <h4 className="text-white text-xl sm:text-2xl uppercase">
          Share your energy with us!
        </h4>
      </div>
      <div className="absolute w-full sm:w-1/2 md:w-[500px] sm:h-1/4 bg-black/60 bottom-0 right-0 flex justify-center items-center z-10">
        <h3 className="uppercase text-lg sm:text-xl font-thin text-white w-4/5 my-2">
          {event.description}
        </h3>
      </div>
      {userRole !== "runner" && (
        <button
          onClick={handleAction}
          className="hover:bg-green-500 bg-green-300 text-white font-bold py-2 px-3 sm:py-4 sm:px-6 border border-green-500 rounded absolute top-6 right-6 active:scale-95"
        >
          {userRole === "manager" ? "Register Your Team" : "Attend the event"}
        </button>
      )}
    </header>
  );
};

export default EventHeader;
