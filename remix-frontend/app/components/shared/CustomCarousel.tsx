import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

interface CustomCarouselProps {
  items: any[];
  ItemCard: any;
  initTranslate?: number;
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({
  items,
  ItemCard,
  initTranslate,
}) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [translateDistance, setTranslateDistance] = useState(
    initTranslate || 0
  );
  const [sliderWidth, setSliderWidth] = useState(items.length * 100);

  const sliderRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<any>([]);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(${translateDistance}px)`;
    }
  }, [translateDistance]);

  const slide = (direction: "next" | "prev") => {
    if (!sliderRef.current) return;

    const slideDistance = itemRefs.current[0].offsetWidth;
    setActiveIndex((prev) => prev + (direction === "next" ? 1 : -1));

    setTranslateDistance(
      (prev) => prev + (direction === "next" ? -slideDistance : slideDistance)
    );
  };

  return (
    <div className="my-4 w-full sm:w-[400px] h-80 md:h-96 relative flex justify-center items-center">
      <div
        ref={sliderRef}
        className="slider-carousel"
        style={{ width: `${sliderWidth}%` }}
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => (itemRefs.current[index] = el)}
            className={`w-full  ${
              index === activeIndex
                ? "opacity-100 scale-100"
                : "opacity-60 scale-50"
            }`}
          >
            <ItemCard item={item} />
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
      {activeIndex < items.length - 1 && (
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

export default CustomCarousel;
