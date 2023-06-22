"use client";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { Collapse } from "@mui/material";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
}

const AdminLayout: React.FC<Props> = ({ children }) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  return (
    <div className="flex w-full min-h-screen relative">
      <div className="sm:h-screen fixed sm:sticky bottom-0 sm:w-64 flex sm:flex-col bg-[#1E1C1F] overflow-x-scroll sm:overflow-x-auto">
        <div className="py-4 hidden sm:flex px-4">
          <h3 className="text-2xl font-semibold text-white uppercase">Admin</h3>
        </div>
        <div className="w-1/3 sm:w-full flex flex-col-reverse sm:flex-col relative">
          <div
            onClick={() => setIsOpened(!isOpened)}
            className="w-full bg-[#ff0000] px-2 py-3 sm:py-4 border-b-[1px] border-red-500 hover:opacity-80"
          >
            <h3 className="text-xl font-semibold md:text-2xl text-white">
              <span>
                <EventNoteIcon />
              </span>
              Events
              <span>
                {isOpened ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </span>
            </h3>
          </div>
          <Collapse in={isOpened}>
            <div className="w-full bg-[#ff0000]/20 px-2 py-3 sm:py-4 border-b-[1px] border-white hover:opacity-80 flex justify-center">
              <h4 className="text-xl text-white">All teams</h4>
            </div>
            <div className="w-full bg-[#ff0000]/20 px-2 py-3 sm:py-4 border-b-[1px] border-white hover:opacity-80 flex justify-center">
              <h4 className="text-xl text-white">Add one</h4>
            </div>
          </Collapse>
        </div>
        <div className="w-1/3 sm:w-full bg-[#1E1C1F] px-2 py-3 sm:py-4 border-b-[1px] border-red-500">
          <h3 className="text-xl font-semibold md:text-2xl text-white">
            <span>
              <EventNoteIcon />
            </span>
            Clubs
            <span>
              <ArrowDropDownIcon />
            </span>
          </h3>
        </div>
        <div className="w-1/3 sm:w-full bg-[#1E1C1F] px-2 py-3 sm:py-4 border-b-[1px] border-red-500">
          <h3 className="text-xl font-semibold md:text-2xl text-white">
            <span>
              <EventNoteIcon />
            </span>
            Teams
            <span>
              <ArrowDropDownIcon />
            </span>
          </h3>
        </div>
        <div className="w-[140px] sm:w-full bg-[#1E1C1F] px-2 py-3 sm:py-4 border-b-[1px] border-red-500">
          <h3 className="text-xl font-semibold md:text-2xl text-white">
            <span>
              <EventNoteIcon />
            </span>
            Players
            <span>
              <ArrowDropDownIcon />
            </span>
          </h3>
        </div>
      </div>
      {children}
    </div>
  );
};

export default AdminLayout;
