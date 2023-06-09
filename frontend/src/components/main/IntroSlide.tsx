import { IEvent } from "@/models/IEvent";
import { formatDate } from "@/utils/date-formater";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  event: IEvent;
  isActive: boolean;
  idx: number;
  length: number;
  setActiveSlide: Function;
  slideProgress: number;
}

const IntroSlide: React.FC<Props> = ({
  event,
  isActive,
  idx,
  length,
  setActiveSlide,
  slideProgress,
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("calendar/" + event.id)}
      className={`${
        isActive ? "block" : "hidden"
      } w-full h-full relative cursor-pointer`}
    >
      <div className="absolute w-full md:w-3/4 lg:w-1/2 bottom-0 left-1/2 -translate-x-1/2 px-4 py-2 bg-gradient-to-b from-transparent to-black">
        <div className="flex justify-between w-full py-2 border-b-[1px] border-red-500 mb-4 w">
          <h4 className="text-xl sm:text-2xl text-white uppercase font-semibold">
            Team racing game
          </h4>
          <h5 className="text-lg sm:text-xl text-white uppercase font-semibold">
            Competitions
          </h5>
        </div>
        <h4 className="text-2xl sm:text-4xl font-semibold text-white mb-2 md:mb-4">
          {event.title}
        </h4>
        <h5 className="text-lg sm:text-2xl text-red-500 mb-4 md:mb-4 font-semibold">
          {formatDate(event.startDateTime)}
        </h5>
        <div
          className="w-full flex justify-around gap-4"
          onClick={(e) => e.stopPropagation()}
        >
          {length > 1 &&
            Array.from({ length }).map((_, i) => (
              <div
                key={i}
                className={`w-full h-[2px] rounded-full bg-white cursor-pointer`}
                onClick={() => setActiveSlide(i)}
              >
                {i === idx && (
                  <div
                    className={`h-[2px] bg-red-500`}
                    style={{
                      width: `${slideProgress}%`,
                    }}
                  ></div>
                )}
              </div>
            ))}
        </div>
      </div>
      <Image
        src={
          event.introImage?.mediaUrl ||
          "https://storage.googleapis.com/abe_cloud_storage/image/large/dccfea3d-a639-4569-9c06-b37bbbb37130.jpg"
        }
        alt="bg"
        className="object-cover xl:object-contain w-full h-full shadow-md"
        width={1920}
        height={980}
      />
    </div>
  );
};

export default IntroSlide;
