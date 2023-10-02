import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import EventIcon from "@mui/icons-material/Event";
import FeedIcon from "@mui/icons-material/Feed";
import GroupsIcon from "@mui/icons-material/Groups";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import { Outlet, V2_MetaFunction } from "@remix-run/react";
import { SideBar } from "~/components";
import { adminAuthenticator } from "~/lib/utils";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Ace Battle Events | Admin" }];
};

const tabs = [
  {
    title: "Events",
    icon: <EventIcon />,
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
    title: "Results",
    icon: <DirectionsRunIcon />,
    hiddenTabs: [
      {
        title: "All Results",
        link: "/admin/results-by-race",
      },
    ],
    name: "results-by-race",
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
  {
    title: "Admins",
    icon: <AdminPanelSettingsIcon />,
    hiddenTabs: [
      {
        title: "All admins",
        link: "/admin/users",
      },
    ],
    name: "admins",
  },
  {
    title: "News",
    icon: <FeedIcon />,
    hiddenTabs: [
      {
        title: "All News",
        link: "/admin/news",
      },
      {
        title: "Add news",
        link: "/admin/news/add",
      },
    ],
    name: "news",
  },
];

export const loader = async ({ request }: { request: Request }) => {
  return await adminAuthenticator.isAuthenticated(request, {
    failureRedirect: "/auth-admin",
  });
};

const AdminLayout = () => {
  return (
    <div className="flex w-full min-h-screen relative">
      <SideBar tabs={tabs} title={"Admin"} />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
