import { useNavigate } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import { IEvent } from "~/lib/types";
import { formatDate, getCountryFlagSrc } from "~/lib/utils";

interface FinishedEventCardProps {
  event: IEvent;
}

const FinishedEventCard: React.FC<FinishedEventCardProps> = ({ event }) => {
  const [dates, setDates] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setDates(
      formatDate(event.startDateTime).split(", ")[0] +
        " - " +
        formatDate(event.endDate).split(", ")[0]
    );
  }, []);

  return (
    <div className="w-full flex flex-col-reverse md:flex-row">
      <div className="w-[90%] md:w-3/5">
        <img
          src={event.mainImageUrl || "/results1.jpg"}
          alt="event image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full md:w-2/5 flex flex-col">
        <div className="clip-heptagon-lg bg-red-500 px-6 sm:px-8 py-4 sm:py-6">
          <h3 className="text-2xl sm:text-3xl text-white font-semibold capitalize">
            {event.title}
          </h3>
        </div>
        <div className="px-4 sm:px-6 py-4 flex flex-col gap-4 w-[90%] flex-1 bg-white border-r-2 border-l-2 md:border-l-0 md:border-b-2 border-gray-300">
          <div className="flex gap-2 items-center">
            <img
              src={getCountryFlagSrc(event.location.country.shortName)}
              alt="flag"
              className="h-8"
            />
            <p className="font-semibold text-xl">
              {event.location.city + ", " + event.location.country.name}
            </p>
          </div>
          <div className="text-xl font-semibold text-gray-400">
            {formatDate(event.startDateTime, false)}
          </div>
          <button
            onClick={() => navigate("/results/" + event.eventCode)}
            className="bg-black py-3 pl-4 pr-8 font-semibold text-white uppercase text-xl hover:opacity-90 clip-arrow w-fit"
          >
            See results
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinishedEventCard;
