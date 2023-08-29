import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import EventNoteIcon from "@mui/icons-material/EventNote";
import GroupsIcon from "@mui/icons-material/Groups";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import { Outlet } from "@remix-run/react";
import { SideBar } from "~/components";

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
    title: "Races",
    icon: <DirectionsRunIcon />,
    hiddenTabs: [
      {
        title: "All races",
        link: "/admin/races",
      },
      {
        title: "Add one",
        link: "/admin/races/add",
      },
    ],
    name: "races",
  },
  {
    title: "Players",
    icon: <PeopleAltIcon />,
    hiddenTabs: [
      {
        title: "All players",
        link: "/admin/players",
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

const AdminLayout = () => {
  return (
    <div className="flex w-full min-h-screen relative">
      <SideBar tabs={tabs} title={"Admin"} />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
