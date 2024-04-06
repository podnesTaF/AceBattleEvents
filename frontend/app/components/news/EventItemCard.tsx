import { useNavigate } from "@remix-run/react";
import React from "react";
import { EventShortform } from "~/lib/types";

interface Props {
  item: EventShortform;
}

const titleStyles = "uppercase font-semibold text-white";
const EventItemCard: React.FC<Props> = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/events/" + item.eventCode)}
      className="relative shadow-md cursor-pointer h-full flex"
    >
      <div className="w-full px-4 py-2 z-20 relative mt-auto">
        <div className="w-full pb-2 border-b-[1px] border-red-500">
          <h5 className={`text-lg ${titleStyles}`}>Team racing game</h5>
        </div>
        <h3 className={`${titleStyles} text-2xl my-4`}>{item.title}</h3>
        <h4 className={`text-gray-300 ${titleStyles}  text-xl mb-2 text-right`}>
          {item.startDateTime}
        </h4>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black z-10 rounded-sm"></div>
      <img
        src={item.introImage?.mediaUrl || "/new4.png"}
        alt="image"
        className="absolute w-full h-auto left-0 top-0 rounded-sm"
      />
    </div>
  );
};

export default EventItemCard;
