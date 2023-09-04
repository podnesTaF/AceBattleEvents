import { useNavigate } from "@remix-run/react";
import React from "react";

interface Props {
  item: any;
}

const CarouselItem: React.FC<Props> = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/${item.gender ? "teams" : "clubs"}/${item.id}`)}
      className="w-full overflow-hidden relative cursor-pointer active:scale-95 flex justify-center items-center"
    >
      <img
        src={item.logo?.mediaUrl || "/abm-logo-white.svg"}
        alt="team logo"
        className="object-contain max-h-[250px] md:max-h-[350px]"
        width={350}
        height={350}
      />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 px-3 py-1 md:px-4 md:py-1 bg-red-500 rounded-md">
        <h3 className="text-lg md:text-xl uppercase font-semibold text-white">
          {item.name}
        </h3>
      </div>
    </div>
  );
};

export default CarouselItem;
