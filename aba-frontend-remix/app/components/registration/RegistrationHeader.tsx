import EventIcon from "@mui/icons-material/Event";
import LanguageIcon from "@mui/icons-material/Language";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { IEvent } from "~/lib/types";
import { formatEventDateRange, getGoogleMapsLink } from "~/lib/utils";

const RegistrationHeader = ({ event }: { event: IEvent }) => {
  return (
    <div className="py-2 px-4 flex justify-center gap-4 sm:gap-6 md:gap-8 items-center">
      <img
        src="/abm-logo-black.svg"
        alt="event logo"
        className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 object-contain"
      />
      <div className="flex-1">
        <h4 className="text-sm md:text-lg font-semibold mb-2">{event.title}</h4>
        <ul className="flex flex-col gap-1 sm:gap-2">
          <li className="flex gap-1 sm:gap-2 items-center">
            <EventIcon className="text-gray-400 !text-md sm:!text-lg" />
            <p className="text-gray-400 text-sm sm:text-lg">
              {formatEventDateRange(event.startDateTime, event.endDate)}
            </p>
          </li>
          <li className="flex gap-1 sm:gap-2 text-sm items-center">
            <LocationOnIcon className="text-gray-400 !text-md sm:!text-lg" />
            <p className="text-gray-400 text-sm sm:text-lg">
              <a href={getGoogleMapsLink(event.location)} target="_blank">
                {event.location.address}. {event.location.stadiumName}
              </a>
            </p>
          </li>
          <li className="flex gap-1 sm:gap-2 items-center">
            <LanguageIcon className="text-gray-400 !text-md sm:!text-lg" />
            <p className="text-gray-400 text-sm md:text-md md:text-lg">
              <a href="https://aba-run/events/CyprusRating2024" target="_blank">
                aba-run/events/CyprusRating2024
              </a>
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RegistrationHeader;
