import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { IconButton } from "@mui/material";
import { useRef, useState } from "react";

const WideCarousel = ({
  items,
  ItemCard,
  slideDispance,
}: {
  items: any[];
  ItemCard: any;
  slideDispance?: number;
}) => {
  console.log(items);
  const [translateDistance, setTranslateDistance] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const slide = (direction: "next" | "prev") => {
    const slideDistance =
      (ref.current?.offsetWidth || slideDispance || 550) + 24;
    setTranslateDistance(
      (prev) => prev + (direction === "next" ? -slideDistance : slideDistance)
    );
  };
  return (
    <div className="flex justify-between w-full relative">
      {-translateDistance > 0 && (
        <IconButton
          onClick={() => slide("prev")}
          style={{ position: "absolute", backgroundColor: "red" }}
          className="z-10 left-1 sm:-left-6 top-1/2 transform -translate-y-1/2 opacity-30 rounded-full p-2 hover:opacity-80"
          type="button"
        >
          <ChevronLeftIcon className="text-white text-lg md:text-xl" />
        </IconButton>
      )}
      <div
        className="w-full overflow-x-scroll pb-2 pl-2"
        style={{ scrollbarWidth: "none" }}
      >
        <div
          className="flex flex-nowrap w-max transition-transform ease-in duration-300"
          style={{
            transform: `translateX(${translateDistance}px)`,
          }}
        >
          {items?.map((item, index) => (
            <div
              ref={ref}
              key={item.id}
              className={`w-[350px] sm:w-[550px] mr-6 overflow-hidden`}
              style={slideDispance ? { width: slideDispance } : {}}
            >
              <ItemCard item={item} />
            </div>
          ))}
        </div>
      </div>
      {-translateDistance <
        (items.length - 1) *
          ((ref.current?.offsetWidth || slideDispance || 550) + 24) && (
        <IconButton
          onClick={() => slide("next")}
          style={{ position: "absolute", backgroundColor: "red" }}
          className="z-10 right-1 sm:-right-6 top-1/2 transform -translate-y-1/2 opacity-30 rounded-full p-2  hover:opacity-80"
          type="button"
        >
          <ChevronRightIcon className="text-white text-lg md:text-xl" />
        </IconButton>
      )}
    </div>
  );
};

export default WideCarousel;
