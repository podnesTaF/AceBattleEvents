"use client";

import CountDown from "@/common/components/ui/CountDown";
import { Button } from "@/common/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const EventPreview = () => {
  return (
    <div className="relative w-full">
      <Image
        src={"/images/paphos.jpg"}
        alt="event image"
        width={1600}
        height={800}
        className="absolute left-0 top-0 w-full h-96 sm:h-[500px] object-cover lg:h-auto max-h-screen z-[2]"
      />
      <div className="p-6 sm:p-8 lg:p-20 pt-32 lg:pt-40 bg-main-section flex flex-col lg:flex-row-reverse min-h-screen gap-12 justify-between z-[5] relative ">
        <div className="flex flex-col flex-1 justify-between">
          <div className="flex w-full justify-center lg:justify-end mb-10 lg:mb-16">
            <CountDown date={"2024-05-11T10:00:00"} />
          </div>
          <div className="flex-[2] flex flex-col w-full max-w-lg ml-auto">
            <h4 className="text-left w-full gradient-text-light text-2xl lg:text-4xl mb-4">
              Meet
            </h4>
            <h2 className="text-4xl lg:text-5xl 2xl:text-6xl gradient-text-redish text-end">
              Ace Battle Mile <br /> Rating
            </h2>
          </div>
          <div className="flex justify-end flex-1">
            <Button
              size="lg"
              className="btn-clip pl-8 pr-12 py-6 rounded-none border-none"
              variant={"destructive"}
            >
              <div className="flex gap-2 items-center text-white font-semibold text-lg lg:text-xl">
                <p className="text-white">Visit Event</p>
                <ArrowUpRight size={20} />
              </div>
            </Button>
          </div>
        </div>
        <div className="block">
          <h4 className="text-white mb-4 hidden lg:block">Related news</h4>
          <div className="flex lg:flex-col gap-8 lg:gap-12">
            <div className="flex w-full gap-8">
              <div className="flex w-72 xl:w-80 h-64 xl:h-72 bg-white/10"></div>
            </div>
            <div className="flex w-full  gap-8 lg:gap-12">
              <div className="flex w-72 xl:w-80 h-64 xl:h-72 bg-white/10"></div>
              <div className="flex w-72 xl:w-80 h-64 xl:h-72 bg-white/10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPreview;
