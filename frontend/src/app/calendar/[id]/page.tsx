"use client";
import Map from "@/components/events/Map";
import CustomTable from "@/components/shared/CustomTable";
import { useFetchEventQuery } from "@/services/eventService";
import { formatDate } from "@/utils/date-formater";
import {
  transformAddress,
  transformIntoTeamsTable,
} from "@/utils/transform-data";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import StatisticCards from "./StatisticCards";

interface Props {
  params: {
    id: string;
  };
}

const EventDetails: React.FC<Props> = ({ params }) => {
  const { data: event, isLoading, error } = useFetchEventQuery(params.id);
  const [address, setAddress] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (event) {
      setAddress(transformAddress(event.location));
    }
  }, [event]);

  return (
    <>
      <header className="w-full flex justify-center h-96 sm:h-[800px] bg-[url('/page-detail.jpg')] bg-cover bg-no-repeat bg-center relative flex-col ">
        <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.4)] z-0"></div>
        <div className="h-3/5 mb-10 sm:mb-0 sm:h-1/2 ml-5 flex flex-col justify-center items-center w-3/4 sm:w-3/5 md:w-[500px] z-10">
          <h2 className="text-white uppercase font-semibold text-3xl sm:text-5xl mb-5">
            {event?.title || "loading"}
          </h2>
          <h4 className="text-white text-2xl uppercase">
            Share your energy with us!
          </h4>
        </div>
        <div className="absolute w-full sm:w-1/2 md:w-[500px] h-1/5 sm:h-1/4 bg-black/60 bottom-0 right-0 flex justify-center items-center z-10">
          <h3 className="uppercase text-xl font-thin text-white w-4/5">
            {event?.description || "loading"}
          </h3>
        </div>
        <button
          onClick={() => router.push(`/calendar/${params.id}/register-team`)}
          className="hover:bg-red-800 bg-red-500 text-white font-bold py-4 px-6 border border-red-800 rounded absolute top-6 right-6 active:scale-95"
        >
          Register Your Team
        </button>
      </header>
      <main>
        <div className="px-5 sm:px-10 py-5 bg-red-500">
          <h3 className="text-3xl text-white font-semibold">ABOUT EVENT</h3>
        </div>
        <div className="bg-no-repeat bg-right-top bg-contain h-full relative">
          <Image
            src={"/details2.jpg"}
            width={400}
            height={700}
            alt="pict"
            className="absolute top-0 right-0 -z-10"
          />
          <div className="w-full xl:w-3/4 max-w-[1280px] px-4 py-5 sm:px-8 lg:px-12 lg:py-8">
            {event && <StatisticCards event={event} />}
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between w-full gap-10 md:gap-0">
              <div className="w-full max-w-[500px] min-h-[350px] md:w-2/5 border-[1px] border-red bg-white p-4 flex flex-col justify-between">
                <div className="flex justify-between">
                  <p className="text-xl font-semibold">Country:</p>
                  <p className="text-xl font-light">
                    {event?.location.country || "loading"}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-xl font-semibold">City:</p>
                  <p className="text-xl font-light">
                    {event?.location.city || "loading"}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-xl font-semibold">Address:</p>
                  <p className="text-xl font-light underline">
                    {event?.location.street +
                      ", " +
                      event?.location.postalCode || "loading"}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-xl font-semibold">Date:</p>
                  <p className="text-xl font-light">
                    {event ? formatDate(event.date) : "loading"}
                  </p>
                </div>
              </div>
              <div className="w-full min-w-[400px] max-w-[500px] md:w-3/5 border-[1px] border-red bg-white">
                <Map address={address} />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#1E1C1F] flex justify-center items-center p-4">
          <h3 className="text-white text-3xl uppercase font-semibold">
            Prices and Prizes
          </h3>
        </div>
        <div className="mx-auto max-w-7xl h-full">
          <div className="mt-6 my-20 relative mx-3 sm:mx-6">
            <Image
              src={"/running.svg"}
              width={380}
              height={480}
              alt="running group"
              className="absolute -z-10"
            />
            <div className="ml-auto w-full md:w-[600px]">
              <h3 className="text-2xl text-center mb-3 font-semibold">
                PRIZE FUNDS
              </h3>
              <div className="w-full flex flex-col gap-3">
                <div className="w-full flex bg-red-500 p-3">
                  <div className="w-1/4 border-r-[1px] border-gray-200">
                    <p className="text-xl uppercase text-center text-white">
                      Place
                    </p>
                  </div>
                  <div className="w-3/4">
                    <p className="text-xl uppercase text-center text-white">
                      Award
                    </p>
                  </div>
                </div>
                {event?.prizes.map((prize) => (
                  <div
                    key={prize.id}
                    className={"p-4 shadow w-full flex bg-white/80"}
                  >
                    <div className="w-1/4 border-r-[1px] border-black">
                      <p className="text-2xl uppercase text-center ">
                        {prize.place}
                      </p>
                    </div>
                    <div className="w-3/4">
                      <p className="text-2xl uppercase text-center">
                        {prize.sum} $
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full my-10">
            <h2 className="text-4xl my-3 font-semibold">Registered Teams</h2>
            {event && (
              <CustomTable
                rows={transformIntoTeamsTable(event?.teams)}
                isLoading={false}
              />
            )}
          </div>

          <div className="my-20 mx-4 xl:mx-0 flex flex-col sm:flex-row justify-around gap-3">
            <div className="relative">
              <Image
                src={"/details3.jpg"}
                width={400}
                height={300}
                alt="pict"
              />
              <div className="absolute flex justify-center items-center w-full top-0 left-0 h-full sm:hidden bg-black/50">
                <h2 className="text-3xl uppercase font-semibold p-3 text-white">
                  ADD YOUR TEAM AND BE ABLE TO WIN SUPER PRIZE!
                </h2>
              </div>
            </div>
            <div className="w-full sm:max-w-[400px] flex flex-col items-center">
              <h2 className="text-3xl uppercase font-semibold mb-8 hidden sm:block">
                ADD YOUR TEAM AND BE ABLE TO WIN SUPER PRIZE!
              </h2>
              <button
                onClick={() =>
                  router.push(`/calendar/${params.id}/register-team`)
                }
                className="bg-red-500 text-white uppercase font-semibold rounded-lg w-3/4 py-3"
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default EventDetails;
