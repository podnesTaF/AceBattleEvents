import { useNavigate } from "@remix-run/react";
import React from "react";

interface Props {
  item: any;
}

const CarouselItem: React.FC<Props> = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/teams/${item.id}`)}
      className="w-full relative cursor-pointer active:scale-95 flex flex-col justify-center items-center"
    >
      <img
        src={item.logoUrl || "/abm-logo-white.svg"}
        alt="team logo"
        className="object-contain max-h-[250px] md:max-h-[350px]"
        width={350}
        height={350}
      />
      <h3 className="text-lg md:text-xl uppercase font-semibold text-white text-center">
        {item.name}
      </h3>
    </div>
  );
};

export default CarouselItem;
