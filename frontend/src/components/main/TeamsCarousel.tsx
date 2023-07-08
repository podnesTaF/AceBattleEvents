import { ITeam } from "@/models/ITeam";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { IconButton } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  teams: ITeam[];
}
const TeamsCarousel: React.FC<Props> = ({ teams }) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [translateDistance, setTranslateDistance] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<any>([]);

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
    <div className="my-4 w-full sm:w-3/4 md:w-1/2 h-96 relative flex justify-center items-center">
      <div
        ref={sliderRef}
        className="slider-carousel"
        style={{ width: `${sliderWidth}%` }}
      >
        {teams.map((team, index) => (
          <div
            key={team.id}
            ref={(el) => (itemRefs.current[index] = el)}
            className={`w-full overflow-hidden relative ${
              index === activeIndex
                ? "opacity-100 scale-100"
                : "opacity-60 scale-50"
            }`}
          >
            <Image
              src={team.logo.mediaUrl}
              alt="team logo"
              className="object-cover"
              width={400}
              height={400}
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
          className="absolute -left-12 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 rounded-full p-2"
          type="button"
        >
          <ChevronLeftIcon />
        </IconButton>
      )}
      {activeIndex < itemRefs.current.length - 1 && (
        <IconButton
          onClick={() => slide("next")}
          className="absolute -right-12 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 rounded-full p-2"
          type="button"
        >
          <ChevronRightIcon />
        </IconButton>
      )}
    </div>
  );
};

export default TeamsCarousel;
