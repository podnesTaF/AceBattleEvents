import { useNavigate } from "@remix-run/react";
import React from "react";
import { EventShortform } from "~/lib/types";

interface Props {
  item: EventShortform;
}

const titleStyles = "font-semibold text-white";
const EventItemCard: React.FC<Props> = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/events/" + item.eventCode)}
      className="relative shadow-md cursor-pointer flex h-48"
    >
      <div className="w-full px-4 py-2 z-20 relative flex flex-col">
        <div className="w-full pb-2 border-b-[1px] border-red-500">
          <h5 className={`text-md ${titleStyles}`}>Team racing game</h5>
        </div>
        <h3 className={`${titleStyles} text-lg md:text-xl my-4 flex-1`}>
          {item.title}
        </h3>
        <h4 className={`text-gray-300 ${titleStyles} text-lg  mb-2 text-right`}>
          {item.startDateTime}
        </h4>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black z-10 rounded-sm"></div>
      <img
        src={item.mainImageUrl || "/new4.png"}
        alt="image"
        className="absolute w-full h-auto left-0 top-0 rounded-sm object-center"
      />
    </div>
  );
};

export default EventItemCard;
