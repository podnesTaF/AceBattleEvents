import { Link } from "@remix-run/react";
import { IEvent, ITeam, IViewer } from "~/lib/types";
import { convertDateFormat, getGoogleMapsLink } from "~/lib/utils";

interface RegistrationsProps {
  event: IEvent;
  viewer?: IViewer;
  team?: ITeam;
  index: number;
}

const TeamRegistrationItem: React.FC<RegistrationsProps> = ({
  event,
  team,
  index,
  viewer,
}) => {
  return (
    <div
      className={`rounded-md relative overflow-hidden w-full sm:w-[640px] ${
        index % 2 ? "ml-auto" : "ml-0"
      }`}
    >
      <h4 className="text-xl font-semibold mb-1">
        {convertDateFormat(event.startDateTime)}
      </h4>
      <div className="rounded-sm h-2 w-full bg-red-500 mb-3"></div>
      <div className="flex w-full gap-4 relative">
        <div className="w-full sm:w-1/2">
          <p className="text-gray-400 border-b-[1px] border-red-500 pb-1 mb-2">
            Event
          </p>
          <Link to={`/events/${event.eventCode}`}>
            <h3 className="text-2xl font-semibold mb-2">{event.title}</h3>
          </Link>
          {team && (
            <>
              <p className="text-gray-400 mb-2">Registered Team:</p>
              <h4 className="text-xl font-semibold mb-2">{team.name}</h4>
              <p className="text-gray-400 mb-2">Coach:</p>
              <h4 className="text-xl font-semibold mb-2">
                {team.coach.name} {team.coach.surname}
              </h4>
            </>
          )}
          {viewer && (
            <>
              <a
                href={viewer.ticket?.mediaUrl || ""}
                download={!!viewer.ticket}
                target="_blank"
                className={`w-full block ${
                  !viewer.ticket
                    ? "text-gray-500 bg-gray-300"
                    : "bg-yellow-300 text-black"
                } font-semibold text-xl px-4 py-2 rounded-md my-4 active:scale-95 hover:opacity-95`}
              >
                Download Ticket
              </a>
            </>
          )}
          <a
            href={getGoogleMapsLink(event.location)}
            className="text-xl text-gray-400 underline mb-2"
          >
            {event.location.address}, {event.location.zipCode}
          </a>
        </div>
        <img
          src={index % 2 === 0 ? `/stadium.png` : "/running.svg"}
          alt="stadium"
          className="absolute bottom-0 right-0 w-1/2 object-contain h-full"
        />
      </div>
    </div>
  );
};

export default TeamRegistrationItem;
