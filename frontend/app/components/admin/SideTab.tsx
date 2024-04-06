import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Collapse } from "@mui/material";
import { Link, useLocation } from "@remix-run/react";
import React from "react";

interface Props {
  title: string;
  icon: React.ReactNode;
  hiddenTabs: {
    title: string;
    link: string;
  }[];
  name: string;
  isOpened: boolean;
  setIsOpened: Function;
}

const SideTab: React.FC<Props> = ({
  title,
  icon,
  hiddenTabs,
  name,
  isOpened,
  setIsOpened,
}) => {
  const location = useLocation();
  const isActive = hiddenTabs.some(
    (tab) => location.pathname.indexOf(tab.link) !== -1
  );

  return (
    <div className="w-1/3 sm:w-full flex flex-col-reverse sm:flex-col relative">
      <div
        onClick={setIsOpened.bind(null, name)}
        className={`w-full ${
          isActive ? "bg-[#ff0000]" : "bg-[#1E1C1F]"
        } px-2 py-3 sm:py-4 border-b-[1px] border-red-500 hover:opacity-80 flex justify-center`}
      >
        <span className="mr-2 text-white">{icon}</span>
        <h3 className="text-xl font-semibold md:text-2xl text-white cursor-pointer w-full">
          {title}
        </h3>
        <span className="ml-auto  text-white">
          {isOpened ? (
            <ArrowDropUpIcon fontSize="large" />
          ) : (
            <ArrowDropDownIcon fontSize="large" />
          )}
        </span>
      </div>
      <Collapse in={isOpened}>
        {hiddenTabs.map((tab, i) => (
          <div
            key={i}
            className="w-full bg-[#ff0000]/20 px-2 py-3 sm:py-4 border-b-[1px] border-white hover:opacity-80 flex justify-center"
          >
            <Link to={tab.link}>
              <h4 className="text-xl text-white">{tab.title}</h4>
            </Link>
          </div>
        ))}
      </Collapse>
    </div>
  );
};

export default SideTab;
