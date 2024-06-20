"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface CustomSliderProps {
  title: string;
  childPropName: string;
  ItemComponent: React.FC<any>;
  items: any[];
}

export const CustomSlider = ({
  title,
  items,
  ItemComponent,
  childPropName,
}: CustomSliderProps): JSX.Element => {
  const swiperRef = useRef<any>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.params.pagination.el = paginationRef.current;

      swiperRef.current.navigation.destroy();
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();

      swiperRef.current.pagination.destroy();
      swiperRef.current.pagination.init();
      swiperRef.current.pagination.render();
      swiperRef.current.pagination.update();
    }
  }, [swiperRef, prevRef, nextRef, paginationRef]);

  return (
    <section className="max-w-7xl xl:mx-auto mx-2">
      <h2 className="font-bold text-3xl lg:text-4xl 2xl:text-5xl mb-4 lg:mb-6">
        {title}
      </h2>
      <div className="flex gap-4 justify-between items-center mb-4">
        <div ref={prevRef} className="cursor-pointer hover:opacity-90">
          <Image
            src="/icons/arrow-left.svg"
            width={250}
            height={4}
            className="w-full sm:w-64 object-left"
            alt="left"
          />
        </div>
        <div ref={paginationRef} className="flex gap-3 justify-center"></div>
        <div ref={nextRef} className="cursor-pointer hover:opacity-90">
          <Image
            src="/icons/arrow-right.svg"
            width={250}
            height={4}
            className="w-full sm:w-64 object-right"
            alt="right"
          />
        </div>
      </div>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        scrollbar={{ draggable: true }}
        pagination={{ clickable: true, el: paginationRef.current }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={item?.id || index}>
            <ItemComponent {...{ [childPropName]: item }} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
