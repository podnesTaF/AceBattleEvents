"use client";
import { getCountryFlagSrc } from "@/src/entities/Country";
import { IRunner } from "@/src/entities/Runner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  item: IRunner;
  hideRole?: boolean;
}

export const RunnerCardItem: React.FC<Props> = ({ item, hideRole }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/profile/" + item.id)}
      className="max-w-xs max-h-sm mx-auto w-full relative cursor-pointer active:scale-[0.99] flex justify-center items-center shadow-md rounded-md"
    >
      <Image
        src={
          item.avatarUrl
            ? item.avatarUrl
            : "https://storage.googleapis.com/abe_cloud_storage/image/large/c4bccba0-3f80-4eb5-b50f-63e5cd4f0100.jpg"
        }
        alt="avatar"
        width={250}
        height={200}
        className="rounded-md object-cover h-[250px]"
      />
      <div className="absolute bg-black py-1 w-full flex justify-center bottom-0 left-0 gap-2 items-center">
        <Image
          src={getCountryFlagSrc(item.country?.shortName)}
          alt="flag"
          width={50}
          height={30}
        />
        <h4 className={`text-xl text-white`}>
          {item.firstName} {item.lastName}
        </h4>
      </div>
      {!hideRole && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 bg-red-500">
          <h4 className="text-white font-semiblod text-xl"></h4>
        </div>
      )}
    </div>
  );
};

export default RunnerCardItem;
