import { IEvent } from "@/models/IEvent";
import React from "react";

interface Props {
  event: IEvent;
  isActive: boolean;
  idx: number;
  length: number;
}

const IntroSlide: React.FC<Props> = ({ event, isActive, idx, length }) => {
  return (
    <div
      className={`${isActive ? "block" : "hidden"} w-full h-full bg-[url(${
        event.introImage
      })] bg-no-repeat bg-center bg-cover relative`}
    >
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 px-4 py-2 bg-[linear-gradient(360deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)]">
        <div className="flex justify-between w-full py-2 border-b-[1px] border-red-500 mb-4">
          <h4 className="text-xl text-white uppercase font-semibold">
            Team racing game
          </h4>
          <h5 className="text-lg text-white uppercase font-semibold">
            Competitions
          </h5>
        </div>
        <h4 className="text-2xl text-white underline mb-2 md:mb-4">
          {event.title}
        </h4>
        <h5 className="text-lg text-red-500 mb-4 md:mb-4">
          {event.startDateTime}
        </h5>
        {length > 1 &&
          new Array(length).map((_, i) => (
            <div
              key={i}
              className={`w-2/5 h-2 rounded-full ${
                i === idx ? "bg-red-500" : "bg-white"
              }`}
            ></div>
          ))}
      </div>
    </div>
  );
};

export default IntroSlide;
