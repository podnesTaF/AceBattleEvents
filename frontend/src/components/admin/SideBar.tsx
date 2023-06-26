"use client";

import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import EventNoteIcon from "@mui/icons-material/EventNote";
import GroupsIcon from "@mui/icons-material/Groups";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import { useState } from "react";
import SideTab from "./SideTab";

const tabs = [
  {
    title: "Events",
    icon: <EventNoteIcon />,
    hiddenTabs: [
      {
        title: "All events",
        link: "/admin/events",
      },
      {
        title: "Add one",
        link: "/admin/events/add",
      },
    ],
    name: "events",
  },
  {
    title: "Clubs",
    icon: <GroupsIcon />,
    hiddenTabs: [
      {
        title: "All clubs",
        link: "/admin/clubs",
      },
      {
        title: "Add one",
        link: "/admin/clubs/add",
      },
    ],
    name: "clubs",
  },
  {
    title: "Teams",
    icon: <DirectionsRunIcon />,
    hiddenTabs: [
      {
        title: "All teams",
        link: "/admin/teams",
      },
      {
        title: "Add one",
        link: "/admin/teams/add",
      },
    ],
    name: "teams",
  },
  {
    title: "Players",
    icon: <PeopleAltIcon />,
    hiddenTabs: [
      {
        title: "All players",
        link: "/admin/players",
      },
      {
        title: "Add one",
        link: "/admin/players/add",
      },
    ],
    name: "players",
  },
  {
    title: "Media files",
    icon: <PermMediaIcon />,
    hiddenTabs: [
      {
        title: "All media",
        link: "/admin/media",
      },
    ],
    name: "media",
  },
];

const SideBar = () => {
  const [tabsControl, setTabsControl] = useState<any>({
    players: false,
    teams: false,
    events: false,
    clubs: false,
  });

  const handleTabClick = (name: string) => {
    setTabsControl((prev: any) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="sm:h-screen fixed sm:sticky bottom-0 sm:w-64 flex sm:flex-col bg-[#1E1C1F] overflow-x-scroll sm:overflow-x-auto z-10">
      <div className="py-4 hidden sm:flex px-4">
        <h3 className="text-2xl font-semibold text-white uppercase">Admin</h3>
      </div>
      {tabs.map((tab) => (
        <SideTab
          key={tab.name}
          {...tab}
          isOpened={tabsControl[tab.name]}
          setIsOpened={handleTabClick}
        />
      ))}
    </div>
  );
};

export default SideBar;
