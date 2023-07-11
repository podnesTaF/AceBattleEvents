import { ITeam } from "@/models/ITeam";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { IconButton } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  teams: ITeam[];
}
const TeamsCarousel: React.FC<Props> = ({ teams }) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [translateDistance, setTranslateDistance] = useState(200);
  const [sliderWidth, setSliderWidth] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<any>([]);

  const router = useRouter();

  const slide = (direction: "next" | "prev") => {
    if (!sliderRef.current) return;

    const slideDistance = itemRefs.current[0].offsetWidth;
    setActiveIndex((prev) => prev + (direction === "next" ? 1 : -1));

    setTranslateDistance(
      (prev) => prev + (direction === "next" ? -slideDistance : slideDistance)
    );
  };

  useEffect(() => {
    if (teams) {
      setSliderWidth(teams.length * 100);
    }
  }, [teams]);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(${translateDistance}px)`;
    }
  }, [translateDistance]);

  return (
    <div className="my-4 w-full sm:w-[400px] h-96 relative flex justify-center items-center">
      <div
        ref={sliderRef}
        className="slider-carousel"
        style={{ width: `${sliderWidth}%` }}
      >
        {teams.map((team, index) => (
          <div
            key={team.id}
            onClick={() => router.push(`/team/${team.id}`)}
            ref={(el) => (itemRefs.current[index] = el)}
            className={`w-full overflow-hidden relative cursor-pointer active:scale-95 ${
              index === activeIndex
                ? "opacity-100 scale-100"
                : "opacity-60 scale-50"
            } flex justify-center items-center`}
          >
            <Image
              src={team.logo.mediaUrl}
              alt="team logo"
              className="object-contain max-h-[350px]"
              width={350}
              height={350}
            />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 px-4 py-2 bg-red-500">
              <h3 className="text-xl uppercase font-semibold text-white">
                {team.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
      {activeIndex > 0 && (
        <IconButton
          onClick={() => slide("prev")}
          style={{ position: "absolute", backgroundColor: "white" }}
          className="left-2 sm:-left-6 top-1/2 transform -translate-y-1/2 opacity-60 rounded-full p-2 hover:opacity-100"
          type="button"
        >
          <ChevronLeftIcon />
        </IconButton>
      )}
      {activeIndex < itemRefs.current.length - 1 && (
        <IconButton
          onClick={() => slide("next")}
          style={{ position: "absolute", backgroundColor: "white" }}
          className="right-2 sm:-right-6 top-1/2 transform -translate-y-1/2 opacity-60 rounded-full p-2  hover:opacity-100"
          type="button"
        >
          <ChevronRightIcon />
        </IconButton>
      )}
    </div>
  );
};

export default TeamsCarousel;
