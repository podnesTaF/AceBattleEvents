"use client";

import { Button } from "@/src/shared/ui/button";
import { CustomSlider } from "@/src/shared/ui/custom-slider";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import Image from "next/image";
import { NewsCard } from "../../News";

interface EventArchiveCardProps {
  event: any;
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
                <CalendarDays size={24} />
                <p className="text-lg lg:text-xl font-semibold">{event.date}</p>
              </li>
              <li className="flex items-center gap-2 ">
                <MapPin size={24} />
                <p className="text-lg lg:text-xl font-semibold">
                  {event.location}
                </p>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-4">{event.description}</p>
            <Button
              size="lg"
              className="btn-clip w-full py-3 xl:py-4 rounded-none border-none"
              variant={"destructive"}
            >
              <div className="flex gap-2 items-center text-white font-semibold text-lg lg:text-xl">
                <p className="text-white">View Results</p>
                <ArrowUpRight size={20} />
              </div>
            </Button>
          </div>
        </div>

        <div className="w-full md:w-1/2 max-h-[400px] xl:w-3/5">
          <Image
            src={event.imageUrl}
            alt="Paphos"
            width={600}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full min-h-64 bg-[#333333] p-4 justify-left items-center gap-12">
        <NewsCard
          title="Ukrainians achieved a historic victory in Brussels at Ace Battle Mile"
          date="09-02-2024"
          variant="dark"
          className="max-h-48 md:max-w-96"
        />
        <NewsCard
          title="Ukrainians achieved a historic victory in Brussels at Ace Battle Mile"
          date="09-02-2024"
          variant="dark"
          className="max-h-48 md:max-w-96"
        />
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
