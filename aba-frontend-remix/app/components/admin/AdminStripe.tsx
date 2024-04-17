import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IconButton, Tooltip } from "@mui/material";
import { Link, useLocation } from "@remix-run/react";
import React, { useState } from "react";
import { IAdmin } from "~/lib/types";
interface AdminStripeProps {
  admin: IAdmin;
}

const adminLinks = [
  {
    name: "Dashboard",
    href: "/admin",
  },
  {
    name: "Events",
    href: "/admin/events",
  },
  {
    name: "Clubs",
    href: "/admin/clubs",
  },
  {
    name: "Media",
    href: "/admin/media",
  },
  {
    name: "Races",
    href: "/admin/races",
  },
  {
    name: "Results",
    href: "/admin/results-by-race",
  },
  {
    name: "Admins",
    href: "/admin/users",
  },
  {
    name: "News",
    href: "/admin/news",
  },
];

const AdminStripe: React.FC<AdminStripeProps> = ({ admin }) => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="flex flex-col lg:flex-row justify-between py-0 px-4 w-full gap-4 z-40 bg-white">
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-4">
          <AdminPanelSettingsIcon className="" />
          <h4 className="text-xl md:text-xl font-semibold">
            Welcome, {admin.name} {admin.surname}!
          </h4>
        </div>
        <div className="lg:hidden">
          <IconButton onClick={() => setExpanded((prev) => !prev)}>
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </div>
      </div>
      <div
        className={`gap-4 items-center flex-wrap ${
          expanded ? "flex" : "hidden"
        } transition-all lg:flex`}
      >
        {adminLinks.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className={`text-md sm:text-lg font-semibold hover:text-red-500 transition-all ${
              location.pathname === link.href && "text-red-500"
            }`}
          >
            {link.name}
          </Link>
        ))}
        <Link to={"/admin-logout"}>
          <Tooltip title="Admin Logout">
            <IconButton>
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </Link>
      </div>
    </div>
  );
};

export default AdminStripe;
