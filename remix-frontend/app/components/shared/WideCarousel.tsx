import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { IconButton } from "@mui/material";
import { useState } from "react";

const WideCarousel = ({ items, ItemCard }: { items: any[]; ItemCard: any }) => {
  const [translateDistance, setTranslateDistance] = useState(0);
  const slide = (direction: "next" | "prev") => {
    const slideDistance = 550 + 24;
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
          className="z-10 left-2 sm:-left-6 top-1/2 transform -translate-y-1/2 opacity-60 rounded-full p-2 hover:opacity-100"
          type="button"
        >
          <ChevronLeftIcon className="text-white" fontSize="large" />
        </IconButton>
      )}
      <div className="w-full overflow-x-scroll pb-2 pl-2">
        <div
          className="flex flex-nowrap w-max transition-transform ease-in duration-300"
          style={{
            transform: `translateX(${translateDistance}px)`,
          }}
        >
          {items?.map((item, index) => (
            <div key={item.id} className="w-full sm:w-[550px] mr-6">
              <ItemCard item={item} />
            </div>
          ))}
        </div>
      </div>
      {-translateDistance < (items.length - 1) * 574 && (
        <IconButton
          onClick={() => slide("next")}
          style={{ position: "absolute", backgroundColor: "red" }}
          className="z-10 right-2 sm:-right-6 top-1/2 transform -translate-y-1/2 opacity-60 rounded-full p-2  hover:opacity-100"
          type="button"
        >
          <ChevronRightIcon className="text-white" fontSize="large" />
        </IconButton>
      )}
    </div>
  );
};

export default WideCarousel;