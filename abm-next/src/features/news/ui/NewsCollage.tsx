"use client";

import { INewsPreview } from "@/src/entities/News";
import { formatDateToDots } from "@/src/shared/lib";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  news: INewsPreview[];
}

export const NewsCollage: React.FC<Props> = ({ news }) => {
  const router = useRouter();
  const collageStyles = {
    firstImage: "w-full md:w-1/2 h-48 md:h-full",
    secondImage:
      news.length >= 2 ? "w-full md:h-1/2 h-48" : "w-full md:h-1/2 h-48 hidden",
    thirdImage:
      news.length === 3
        ? "w-full md:h-1/2 h-48"
        : "w-full md:h-1/2 h-48 hidden",
  };

  return (
    <div className="w-full mt-6 flex flex-col md:flex-row md:h-96 gap-2">
      {news.length >= 1 && (
        <div
          onClick={() => router.push(`/news/${news[0].id}`)}
          className={`flex ${collageStyles.firstImage} overflow-hidden relative cursor-pointer`}
        >
          <Image
            src={news[0]?.previewImageUrl || "/details2.jpg"}
            alt={news[0].title}
            width={400}
            height={400}
            className="absolute left-0 top-0 object-cover object-center w-full h-full hover:scale-105 transition-all"
          />
          <div className="mt-auto w-full p-4 md:p-6 z-10 bg-gradient-to-b from-transparent to-black">
            <h4 className="text-sm font-semibold text-white uppercase">
              {formatDateToDots(news[0].createdAt)}
            </h4>
            <h1 className="text-xl md:text-2xl font-semibold text-white">
              {news[0].title}
            </h1>
          </div>
        </div>
      )}
      <div className="flex flex-col w-full md:w-1/2 gap-2">
        {news.length >= 2 && (
          <div
            onClick={() => router.push(`/news/${news[1].id}`)}
            className={`flex ${collageStyles.secondImage} overflow-hidden relative cursor-pointer`}
          >
            <Image
              src={news[1].previewImageUrl || "/details2.jpg"}
              alt={news[1].title}
              width={400}
              height={200}
              className="absolute left-0 top-0 object-center object-cover w-full h-[188px] hover:scale-105 transition-all"
            />
            <div className="mt-auto w-full p-4 md:p-6 z-10 bg-gradient-to-b from-transparent to-black">
              <h4 className="text-sm font-semibold text-white uppercase">
                {formatDateToDots(news[1].createdAt)}
              </h4>
              <h1 className="text-xl font-semibold text-white">
                {news[1].title}
              </h1>
            </div>
          </div>
        )}
        {news.length === 3 && (
          <div
            onClick={() => router.push(`/news/${news[2].id}`)}
            className={`flex ${collageStyles.thirdImage} overflow-hidden relative cursor-pointer`}
          >
            <Image
              src={news[2].previewImageUrl || "/details2.jpg"}
              alt={news[2].title}
              width={400}
              height={200}
              className="absolute left-0 top-0 object-center object-cover  h-[188px] w-full hover:scale-105 transition-all"
            />
            <div className="mt-auto w-full p-4 md:p-6 z-10 bg-gradient-to-b from-transparent to-black">
              <h4 className="text-sm font-semibold text-white uppercase">
                {formatDateToDots(news[2].createdAt)}
              </h4>
              <h1 className="text-xl font-semibold text-white">
                {news[2].title}
              </h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsCollage;
