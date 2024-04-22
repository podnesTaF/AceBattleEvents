import { ArrowRight, CalendarMonth } from "@mui/icons-material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Button } from "@mui/material";
import { useNavigate } from "@remix-run/react";
import { IEvent } from "~/lib/types";
import { formatDate } from "~/lib/utils";

interface EventArchiveCardProps {
  event: IEvent;
}

export const EventArchiveCard = ({ event }: EventArchiveCardProps) => {
  const navigate = useNavigate();
  return (
    <div className="max-w-6xl 2xl:max-w-7xl w-full xl:mx-auto bg-white shadow-lg rounded-xl">
      <div className="flex flex-col md:flex-row w-full md:min-h-[360px]">
        <div className="relative flex flex-col gap-4 justify-between py-5 px-4 pl-8 lg:pl-12 xl:py-8 w-full md:w-1/2 xl:w-2/5">
          <div className="absolute left-0 top-0 w-7 lg:w-10 h-1/4 bg-[#EE342C]"></div>
          <div>
            <h3 className="text-xl xl:text-2xl font-semibold mb-3">
              {event.title}
            </h3>
            <ul className="list-none flex flex-col gap-3 ml-6">
              <li className="flex items-center gap-2 ">
                <CalendarMonth className="!text-lg sm:!text-xl md:!text-2xl" />
                <p className="lg:text-xl font-semibold">
                  {formatDate(event.startDateTime, false)}
                </p>
              </li>
              <li className="flex items-center gap-2 ">
                <LocationOnIcon className="!text-lg sm:!text-xl md:!text-2xl" />
                <p className="lg:text-xl font-semibold">
                  {event.location.city}, {event.location.country.name}.
                </p>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-4 text-sm md:text-lg">{event.subtitle}</p>
            <Button
              onClick={() => navigate("/results/" + event.eventCode)}
              color="error"
              variant="contained"
              className="btn-clip w-full !py-1 lg:!py-3 rounded-none border-none"
            >
              <div className="flex gap-2 items-center text-white font-semibold text-lg lg:text-xl">
                <p className="text-white">View Results</p>
                <ArrowRight fontSize={"large"} />
              </div>
            </Button>
          </div>
        </div>
        <div className="w-full md:w-1/2 max-h-[400px] xl:w-3/5">
          <img
            src={event.mainImageUrl || "/abm-logo-black.svg"}
            alt={event.title}
            width={600}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
