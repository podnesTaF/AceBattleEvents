"use client";

import { Button } from "@/src/shared/ui/button";
import { CustomSlider } from "@/src/shared/ui/custom-slider";
import { ArrowUpRight, CalendarDays, CheckCircle, MapPin } from "lucide-react";
import Image from "next/image";

interface EventCardProps {
  event: any;
}

export const EventCard = ({ event }: EventCardProps): JSX.Element => {
  return (
    <div className="max-w-7xl mx-4 xl:mx-auto">
      <div className="flex flex-col md:flex-row w-full md:min-h-[400px]">
        <div className="relative flex justify-center py-5 px-4 pl-8 lg:pl-12 xl:py-8 w-full md:w-1/2 xl:w-2/5">
          <div className="absolute left-0 top-0 w-7 lg:w-10 h-1/4 bg-[#EE342C]"></div>
          <div className="max-w-[380px] w-full flex flex-col justify-between gap-5">
            <h3 className="text-xl xl:text-2xl font-semibold">{event.title}</h3>
            <div className="">
              <p className="mb-4">{event.description}</p>
              <Button
                size="lg"
                className="btn-clip w-full py-3 xl:py-4 rounded-none border-none"
                variant={"destructive"}
              >
                <div className="flex gap-2 items-center text-white font-semibold text-lg lg:text-xl">
                  <p className="text-white">View event website</p>
                  <ArrowUpRight size={20} />
                </div>
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 xl:w-3/5">
          <Image
            src={event.imageUrl}
            alt="Paphos"
            width={600}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full min-h-64">
        <div className="relative flex justify-center items-center py-6 px-6 w-full md:w-1/2 xl:w-2/5 bg-[#333333]">
          <ul className="list-none flex flex-col gap-3">
            <li className="flex items-center gap-2 text-white">
              <CalendarDays size={24} />
              <p className="text-lg lg:text-xl  font-semibold">{event.date}</p>
            </li>
            <li className="flex items-center gap-2 text-white">
              <MapPin size={24} />
              <p className="text-lg lg:text-xl font-semibold">
                {event.location}
              </p>
            </li>
          </ul>
        </div>
        <div className="md:w-1/2 xl:w-3/5 bg-white shadow-md -z-[1] p-3 lg:p-4 flex justify-center items-center">
          <ul className="list-none flex flex-col gap-3">
            {event.points.map((point: string, index: number) => (
              <li key={index} className="flex items-center gap-2 text-[#333]">
                <CheckCircle size={24} />
                <p className="text-lg lg:text-xl font-semibold">{point}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export const EventCardSlider = ({ events }: { events: any[] }): JSX.Element => {
  return (
    <section>
      <CustomSlider
        childPropName={"event"}
        items={events}
        ItemComponent={EventCard}
        title={"Close Events"}
      />
    </section>
  );
};
