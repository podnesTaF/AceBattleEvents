"use client";

import { INewsPreview } from "@/src/entities/News";
import NewsCard from "@/src/entities/News/ui/NewsCard";
import { SectionTitle } from "@/src/shared/ui";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

export const NewsCarousel = ({
  newsPreviews,
}: {
  newsPreviews: INewsPreview[];
}): JSX.Element => {
  return (
    <section className="my-6 lg:my-12 pl-5">
      <div className="max-w-7xl lg:mx-auto">
        <SectionTitle title="News and articles" />
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          breakpoints={{
            0: {
              slidesPerView: 1.2,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2.2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3.2,
              spaceBetween: 50,
            },
          }}
        >
          {newsPreviews.map((news, i) => (
            <SwiperSlide key={news.id}>
              <NewsCard item={news} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex gap-4 items-center mt-3">
          <div className="text-lg md:text-xl lg:text-2xl font-semibold">
            Read more in{" "}
            <Link href={"/news"} className="text-red-500 underline">
              News
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsCarousel;
