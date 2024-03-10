"use client";

import { NewsCard } from "@/common/components/news/NewsCard";
import CountDown from "@/src/shared/ui/CountDown";
import { Button } from "@/src/shared/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const news = [
  {
    id: 1,
    headImageSrc: "/images/paphos.jpg",
    title: "New event in Paphos",
    date: "2024-05-11T10:00:00",
    description: "The next event will take place in Paphos, Cyprus",
  },
  {
    id: 2,
    headImageSrc: "/images/paphos.jpg",
    title: "New event in Paphos",
    date: "2024-05-11T10:00:00",
    description: "The next event will take place in Paphos, Cyprus",
  },
  {
    id: 3,
    headImageSrc: "/images/paphos.jpg",
    title: "New event in Paphos",
    date: "2024-05-11T10:00:00",
    description: "The next event will take place in Paphos, Cyprus",
  },
];

const EventPreview = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <Image
        src={"/images/paphos.jpg"}
        alt="event image"
        width={1600}
        height={800}
        className="absolute left-0 top-0 w-full h-[500px] sm:h-[600px] object-cover xl:h-auto max-h-screen z-[2]"
      />
      <div className="p-6 lg:p-20 pt-32 lg:pt-40 bg-main-section flex flex-col lg:flex-row-reverse min-h-screen gap-6 xl:gap-12 justify-between z-[5] relative ">
        <div className="flex flex-col flex-1 justify-between">
          <div className="flex w-full justify-center lg:justify-end mb-10 lg:mb-16">
            <CountDown date={"2024-05-11T10:00:00"} />
          </div>
          <div className="flex-[2] flex flex-col w-full max-w-lg ml-auto">
            <h4 className="text-right w-full gradient-text-light text-2xl lg:text-4xl mb-4">
              Meet
            </h4>
            <h2 className="text-4xl sm:text-5xl 2xl:text-6xl gradient-text-redish text-end">
              Ace Battle Mile <br /> Rating
            </h2>
          </div>
          <div className="flex justify-start lg:justify-end flex-1">
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
              <div className="flex w-72 xl:w-80  2xl:w-96  bg-white/10">
                {news.map(
                  (item, index) =>
                    index === 0 && (
                      <NewsCard
                        key={item.id}
                        headImageSrc={item.headImageSrc}
                        title={item.title}
                        date={item.date}
                        description={item.description}
                        variant={"light"}
                      />
                    )
                )}
              </div>
            </div>
            <div className="flex w-full  gap-8 lg:gap-12">
              {news.map(
                (item, index) =>
                  index !== 0 && (
                    <div
                      key={item.id}
                      className="flex w-72 xl:w-80 2xl:w-96 bg-white/10"
                    >
                      <NewsCard
                        headImageSrc={item.headImageSrc}
                        title={item.title}
                        date={item.date}
                        description={item.description}
                        variant={"light"}
                      />
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPreview;
