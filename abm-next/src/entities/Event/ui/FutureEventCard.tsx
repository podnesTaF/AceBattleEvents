import Image from "next/image";
import { IFutureEvent } from "../model";

export const FutureEventCard = ({
  futureEvent,
}: {
  futureEvent: IFutureEvent;
}) => {
  return (
    <div className="my-10">
      <h1 className="text-3xl md:text-4xl my-4 text-center font-semibold">
        {futureEvent.title}
      </h1>
      <div
        className={`w-full min-h-[400px] bg-contain md:bg-cover bg-no-repeat relative flex justify-center items-end md:items-center py-5 md:py-10`}
      >
        <Image
          src={
            futureEvent.introImageUrl ||
            "https://storage.googleapis.com/abe_cloud_storage/events%2Fcyprus_mainimg.jpg"
          }
          alt="event image"
          width={1280}
          height={830}
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        />
        <Image
          src={"/logo/abm-logo.png"}
          alt="logo"
          width={150}
          height={150}
          className="w-[150px] absolute top-4 right-4 -z-10"
        />
        <div className="px-5 md:py-5 w-full h-fit lg:w-[820px] backdrop-blur-sm">
          {futureEvent.description?.length ? (
            <h3 className="p-3 bg-black/50 text-white md:bg-none  md:text-xl font-semibold text-center mb-5 w-full md:my-5">
              {futureEvent.description
                ? futureEvent.description.length < 100
                  ? futureEvent.description
                  : futureEvent.description.slice(0, 97) + "..."
                : ""}
            </h3>
          ) : null}
          <div className="flex flex-col md:flex-row w-full">
            <div className="md:min-h-[400px] mb-5  w-full flex justify-center items-center">
              <div>
                <h1 className="text-4xl text-white uppercase mb-3 text-center">
                  {futureEvent.season}
                </h1>
                <h3 className="text-2xl text-white text-center">
                  Comming soon...
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b-2 border-gray-100"></div>
    </div>
  );
};

export default FutureEventCard;
