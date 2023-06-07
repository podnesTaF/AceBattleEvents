"use client";
import Map from "@/components/events/Map";
import { useFetchEventQuery } from "@/services/eventService";
import { transformAddress } from "@/utils/transform-data";
import React, { useEffect, useState } from "react";

interface Props {
  params: {
    id: string;
  };
}

const EventDetails: React.FC<Props> = ({ params }) => {
  const { data: event, isLoading, error } = useFetchEventQuery(params.id);
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (event) {
      setAddress(transformAddress(event.location));
    }
  }, [event]);

  return (
    <>
      <header className="w-full flex justify-center h-96 sm:h-[800px] bg-[url('/page-detail.jpg')] bg-cover bg-no-repeat bg-center relative flex-col ">
        <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.4)] z-0"></div>
        <div className="h-3/5 mb-10 sm:mb-0 sm:h-1/2 bg-[#1E1C1F] flex justify-center items-center w-3/4 sm:w-3/5 md:w-[500px]">
          <h2 className="text-white uppercase font-semibold text-3xl sm:text-5xl">
            CLOSE <br />
            EVENTS
          </h2>
        </div>
        <div className="absolute w-full sm:w-1/2 md:w-[500px] h-1/5 sm:h-1/4 bg-black/60 bottom-0 right-0 flex justify-center items-center">
          <h3 className="uppercase text-xl font-thin text-white w-4/5">
            eXPLORE THE CLOSEST EVENTS. rEAD ABOUT STARTS
          </h3>
        </div>
      </header>
      <main>
        <Map address={address} />
      </main>
    </>
  );
};

export default EventDetails;
