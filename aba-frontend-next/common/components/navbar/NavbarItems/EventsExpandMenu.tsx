import { Badge } from "@/src/shared/ui/badge";
import { MenubarItem } from "@/src/shared/ui/menubar";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import GenericMenubarMenu from "./GenericMenubarMenu";

const eventsMenuItems = [
  { content: "Rules and Regulations", href: "/" },
  { content: "About the Ace Battle Events", href: "/" },
];

const EventsExpandMenu = ({
  variant = "light",
}: {
  variant?: "light" | "dark";
}) => {
  return (
    <GenericMenubarMenu
      title="Events"
      subtitle="All events"
      variant={variant}
      items={eventsMenuItems}
    >
      <div className="w-full">
        <p
          className={`text-md lg:text-xl font-medium text-center ${
            variant === "dark" ? "text-white" : ""
          } `}
        >
          Events
        </p>
        <div
          className={`${
            variant === "dark" ? "divider-gradient-dark" : "divider-gradient"
          }  w-full h-[1px]`}
        ></div>
      </div>
      <MenubarItem className="hover:bg-[#242628] focus:bg-[#242628]">
        <div className="flex gap-2 items-center">
          <Image
            src={"/icons/abm-logo-white.svg"}
            width={40}
            height={38}
            alt="abm"
            className="object-contain"
          />
          <div className="flex-1">
            <h5
              className={`text-md font-semibold leading-tight ${
                variant === "dark" ? "text-white" : ""
              } `}
            >
              International Rating <br /> Mile Cyprus
            </h5>
            <div className="flex gap-2 w-full mt-1">
              <Badge className=" bg-red-500 hover:bg-red-400">Rating</Badge>
              <Badge
                className={`${
                  variant === "dark"
                    ? "bg-white text-black hover:bg-[#1c1e1f] hover:text-white"
                    : "bg-[#1c1e1f] text-white"
                }`}
              >
                11-12 May 2024
              </Badge>
            </div>
          </div>
        </div>
      </MenubarItem>
      <MenubarItem className="hover:bg-[#242628] focus:bg-[#242628]">
        <div className="flex gap-2 items-center">
          <h5
            className={`text-md ${
              variant === "dark" ? "text-red-300" : "text-red-500"
            } font-semibold leading-tight `}
          >
            All Events
          </h5>
          <ArrowRight
            className={variant === "dark" ? "text-red-300" : "text-red-500"}
            size={20}
          />
        </div>
      </MenubarItem>
    </GenericMenubarMenu>
  );
};

export default EventsExpandMenu;
