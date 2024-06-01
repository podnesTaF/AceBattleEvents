import { ArrowRightAlt, CalendarMonth, CheckCircle } from "@mui/icons-material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Button } from "@mui/material";
import { useNavigate } from "@remix-run/react";
import { IFutureEvent } from "~/lib/types";
import { formatDate } from "~/lib/utils";

interface EventCardProps {
  futureEvent: IFutureEvent;
}

export const EventCard = ({ futureEvent }: EventCardProps): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div className="max-w-7xl mx-4 xl:mx-auto">
      <div className="flex flex-col md:flex-row w-full md:min-h-[400px]">
        <div className="relative flex justify-center py-5 px-4 pl-8 lg:pl-12 xl:py-8 w-full md:w-1/2 xl:w-2/5">
          <div className="absolute left-0 top-0 w-4 md:w-7 lg:w-10 h-1/4 bg-[#EE342C]"></div>
          <div className="max-w-[380px] w-full flex flex-col justify-between gap-5">
            <h3 className="text-xl xl:text-2xl font-semibold">
              {futureEvent.title}
            </h3>
            <div className="">
              <p className="mb-4">{futureEvent.description}</p>
              {futureEvent.event ? (
                <Button
                  onClick={() =>
                    navigate("/events/" + futureEvent.event?.eventCode)
                  }
                  color="error"
                  variant="contained"
                  className="w-full py-1 md:py-3 xl:py-4 rounded-none border-none flex gap-2 items-center text-white font-semibold text-lg lg:text-xl"
                >
                  <p className="text-white">Full Event</p>{" "}
                  <ArrowRightAlt fontSize="large" />
                </Button>
              ) : (
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  className="w-full py-3 xl:py-4 rounded-none border-none flex gap-2 items-center text-white font-semibold text-lg lg:text-xl"
                >
                  <p className="text-white">Comming soon...</p>
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 xl:w-3/5">
          {futureEvent.introImageUrl && (
            <img
              src={futureEvent.introImageUrl}
              alt="Paphos"
              width={600}
              height={400}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full min-h-64">
        <div className="relative flex justify-center items-center py-6 px-6 w-full md:w-1/2 xl:w-2/5 bg-[#333333]">
          <ul className="list-none flex flex-col gap-3">
            <li className="flex items-center gap-2 text-white">
              <CalendarMonth className="!text-lg sm:!text-xl md:!text-2xl" />
              <p className="text-lg lg:text-xl  font-semibold">
                {formatDate(futureEvent.date, false)}
              </p>
            </li>
            <li className="flex items-center gap-2 text-white">
              <LocationOnIcon className="!text-lg sm:!text-xl md:!text-2xl" />
              <p className="text-lg lg:text-xl font-semibold">
                {futureEvent.locationInfo}
              </p>
            </li>
          </ul>
        </div>
        <div className="md:w-1/2 xl:w-3/5 bg-white shadow-md -z-[1] p-3 lg:p-4 flex justify-center items-center">
          <ul className="list-none flex flex-col gap-3">
            {futureEvent.contents?.map((content, index: number) => (
              <li
                key={content.id}
                className="flex items-center gap-2 text-[#333]"
              >
                <CheckCircle className="!text-lg sm:!text-xl md:!text-2xl" />
                <p className="text-lg lg:text-xl font-semibold">
                  {content.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
