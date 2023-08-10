"use client";

import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { useNavigate } from "@remix-run/react";
import { IEvent } from "~/lib/events/types";
import { formatDate, isPassed } from "~/lib/shared/utils/date-formaters";
import { getGoogleMapsLink } from "~/lib/shared/utils/get-google-maps";
import { ITeam } from "~/lib/teams/types";

interface EventCardProps {
  event: IEvent;
  idx: number;
  isYourRegister?: boolean;
  team?: ITeam;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  idx,
  isYourRegister,
  team,
}) => {
  const navigate = useNavigate();

  return (
    <div className="my-10">
      <h1 className="text-3xl md:text-4xl my-4 text-center font-semibold">
        {event.title}
      </h1>
      {isYourRegister && team && (
        <div className="flex justify-between w-full lg:w-[820px] mx-auto my-3 font-semibold text-xl">
          <p>Registration #{idx}</p>
          <p>Team: {team.name}</p>
          <p>
            Coach: {team.coach.name} {team.coach.surname}
          </p>
        </div>
      )}
      <div
        className={`w-full bg-[url('/card1.jpg')] bg-contain md:bg-cover bg-no-repeat relative flex justify-center drop-shadow-xl`}
      >
        <img
          src={event.introImage?.mediaUrl || "/card1.jpg"}
          alt="event image"
          width={1280}
          height={830}
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        />
        <div className="md:bg-[#F7F7F7] px-5 md:py-5 w-full lg:w-[820px]">
          <h3 className="p-3 bg-black/50 text-white md:bg-none text-xl uppercase text-center w-full mb-10 md:my-5">
            {event.description.length < 100
              ? event.description
              : event.description.slice(0, 97) + "..."}
          </h3>
          <div className="flex flex-col md:flex-row w-full">
            <div className="w-full md:w-1/2 border-red border-[1px] p-4 flex flex-col gap-2 bg-white min-h-[400px] justify-between">
              <div>
                <h3 className="uppercase text-xl">Location:</h3>
                <h4 className="uppercase text-lg underline">
                  <a href={getGoogleMapsLink(event.location)} target="_blank">
                    {event.location?.city}, {event.location?.country.name}{" "}
                  </a>
                  <FmdGoodIcon />
                </h4>
              </div>
              <div>
                <h3 className="uppercase text-xl">Date:</h3>
                <h4 className="uppercase text-lg">
                  {formatDate(event.startDateTime)}
                </h4>
              </div>
              <div>
                <h3 className="uppercase text-xl">teams:</h3>
                <h4 className="uppercase text-lg">{event.teamsCount} male</h4>
              </div>
              <div>
                <h3 className="uppercase text-xl">organisators:</h3>
                <h4 className="uppercase text-lg">Ace Battle Association</h4>
              </div>
            </div>
            <div className="w-full md:w-1/2 border-red border-[1px] p-4 bg-[#1E1C1F] flex flex-col items-center min-h-[300px] sm:min-h-[400px]">
              <h4 className="text-xl uppercase text-white">PRIZE FUNDS</h4>
              <div className="flex-1 flex items-center justify-center">
                <h1 className="uppercase text-7xl text-white">
                  {event.totalPrize} $
                </h1>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-around my-4 gap-3">
            {!isYourRegister && !isPassed(event.startDateTime) && false && (
              <button
                onClick={() => navigate(`/events/${event.id}/register-team`)}
                className="p-4 bg-red-500 text-lg sm:text-xl uppercase text-white rounded hover:bg-red-700 drop-shadow-lg active:scale-95"
              >
                Register your team
              </button>
            )}
            <button
              onClick={() => navigate("/events/" + event.id)}
              className="p-4 border-[1px] border-red-500 text-lg sm:text-xl uppercase rounded hover:bg-gray-100 drop-shadow-lg active:scale-95"
            >
              See details
            </button>
          </div>
        </div>
      </div>
      <div className="border-b-2 border-gray-100"></div>
    </div>
  );
};

export default EventCard;
