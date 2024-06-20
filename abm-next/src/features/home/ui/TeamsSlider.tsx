"use client";
import { SectionTitle } from "@/src/shared/ui";
import { Skeleton } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

export const TeamsSlider = ({
  teams,
}: {
  teams: { logoUrl?: string; name: string; id: number }[];
}) => {
  const router = useRouter();
  return (
    <section className="w-full mt-4 bg-[#1E1C1F] p-4">
      <div className="max-w-7xl mx-auto my-4">
        <SectionTitle
          title="Ace Battle Teams"
          textColor="text-white"
          borderColor="border-white"
        />
        <Swiper
          className="xl:ml-auto xl:mr-auto xl:max-w-[100vw]"
          spaceBetween={50}
          slidesPerView={3}
          breakpoints={{
            0: {
              slidesPerView: 2.5,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 3.5,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4.5,
              spaceBetween: 50,
            },
          }}
        >
          {teams.map((team, i) => (
            <SwiperSlide key={team.id}>
              <div
                onClick={() => router.push(`/teams/${team.id}`)}
                className="w-full relative cursor-pointer active:scale-95 flex flex-col justify-center items-center"
              >
                <Image
                  src={team.logoUrl || "/abm-logo-white.svg"}
                  alt="team logo"
                  className="object-contain max-h-[250px] md:max-h-[350px]"
                  width={350}
                  height={350}
                />
                <h3 className="text-lg md:text-xl uppercase font-semibold text-white text-center">
                  {team.name}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {!teams.length && (
          <div className="my-4 w-full sm:w-[400px] h-96">
            <Skeleton variant="rectangular" width="100%" height="100%" />
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamsSlider;
