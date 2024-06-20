"use client";

import { formatDateToDots } from "@/src/shared/lib";
import { CustomSlider } from "@/src/shared/ui/custom-slider";
import { CalendarMonth, CheckCircle } from "@mui/icons-material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Button } from "@mui/material";
import Image from "next/image";
import { IEvent } from "../model";

interface EventArchiveCardProps {
  event: IEvent;
}

export const EventArchiveCard = ({ event }: EventArchiveCardProps) => {
  return (
    <div className="max-w-6xl 2xl:max-w-7xl mx-4 xl:mx-auto">
      <div className="flex flex-col md:flex-row w-full md:min-h-[360px]">
        <div className="relative flex flex-col justify-between py-5 px-4 pl-8 lg:pl-12 xl:py-8 w-full md:w-1/2 xl:w-2/5">
          <div className="absolute left-0 top-0 w-7 lg:w-10 h-1/4 bg-[#EE342C]"></div>
          <div>
            <h3 className="text-xl xl:text-2xl font-semibold mb-3">
              {event.title}
            </h3>
            <ul className="list-none flex flex-col gap-3 ml-6">
              <li className="flex items-center gap-2 ">
                <CalendarMonth className="!text-lg sm:!text-xl md:!text-2xl" />
                <p className="text-lg lg:text-xl font-semibold">
                  {formatDateToDots(event.startDateTime)}
                </p>
              </li>
              <li className="flex items-center gap-2 ">
                <LocationOnIcon className="!text-lg sm:!text-xl md:!text-2xl" />
                <p className="text-lg lg:text-xl font-semibold">
                  {event.location.city}, {event.location.country.name}.
                </p>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-4">{event.subtitle}</p>
            <Button
              color="error"
              variant="contained"
              className="w-full py-1 md:py-3 xl:py-4 rounded-none border-none flex gap-2 items-center text-white font-semibold text-lg lg:text-xl"
            >
              <div className="flex gap-2 items-center text-white font-semibold text-lg lg:text-xl">
                <p className="text-white">View Results</p>
                <CheckCircle className="!text-lg sm:!text-xl md:!text-2xl" />
              </div>
            </Button>
          </div>
        </div>

        <div className="w-full md:w-1/2 max-h-[400px] xl:w-3/5">
          <Image
            src={
              event.introImageUrl ||
              "https://storage.googleapis.com/abe_cloud_storage/events%2Fcyprus_mainimg.jpg"
            }
            alt="Paphos"
            width={600}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export const EventArchiveSlider = ({ events }: { events: any[] }) => {
  return (
    <section>
      <CustomSlider
        childPropName={"event"}
        items={events}
        ItemComponent={EventArchiveCard}
        title={"Archive"}
      />
    </section>
  );
};
