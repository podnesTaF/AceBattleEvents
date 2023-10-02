import { useNavigate } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import { IEvent } from "~/lib/types";
import { formatDate } from "~/lib/utils";

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
    <div className="w-full">
      <h3 className="text-3xl md:texl-4xl font-semibold mb-4 text-center">
        {event.title}
      </h3>
      <div className="py-6 px-4 flex justify-center md:h-[400px] items-center relative">
        <img
          src={event.introImage?.mediaUrl}
          alt={"event image"}
          className="absolute w-full h-full left-0 top-0"
        />
        <img
          src={"/abm-logo-white.svg"}
          width={150}
          className="h-auto absolute top-4 right-4"
        />
        <div className="max-w-4xl w-full mx-auto h-full py-4  backdrop-blur-xl flex flex-col gap-4 justify-center items-center px-4 lg:px-6">
          <div className="w-full flex justify-between gap-6 flex-col md:flex-row p-4 border-red-500 border-[1px] bg-white mb-6">
            <div className="flex flex-col gap-5">
              <h4 className="text-xl">Location</h4>
              <h4 className="text-xl font-semibold">
                {event.location.city + ", " + event.location.country.name}
              </h4>
            </div>
            <div className="flex flex-col gap-5">
              <h4 className="text-xl">Teams</h4>
              <h4 className="text-xl font-semibold">
                {event.teamsCount} teams
              </h4>
            </div>
            <div className="flex flex-col gap-5">
              <h4 className="text-xl">Dates</h4>
              <h4 className="text-xl font-semibold">{dates}</h4>
            </div>
          </div>
          <button
            onClick={() => navigate("/results/" + event.id)}
            className="px-4 py-2 bg-green-500 text-white font-semibold text-lg sm:text-xl uppercase rounded drop-shadow-lg active:scale-95"
          >
            See results
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinishedEventCard;
