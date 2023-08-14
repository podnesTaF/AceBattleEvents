"use client";

import CloseIcon from "@mui/icons-material/Close";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";

import {
  Avatar,
  Button,
  Divider,
  Drawer,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "@remix-run/react";
import React from "react";
import { IUser } from "~/lib/user/types/IUser";

interface CustomDrawer {
  open: boolean;
  setOpen: Function;
  user: IUser | null;
}

const CustomDrawer: React.FC<CustomDrawer> = ({ open, setOpen, user }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Drawer open={open} onClose={() => setOpen(false)}>
      <div
        className={"flex flex-col items-center h-screen bg-[#1E1C1F] p-2"}
        onClick={() => setOpen(false)}
        onKeyDown={() => setOpen(false)}
      >
        <div className={"flex justify-between w-full item-center"}>
          <h2 className={"text-2xl uppercase text-white"}>Ace Battle Events</h2>
          <IconButton onClick={() => setOpen(false)} className={"text-white"}>
            <CloseIcon fontSize={"large"} />
          </IconButton>
        </div>
        {user ? (
          <>
            <div className={"py-5 px-3 flex justify-center w-full relative"}>
              <Tooltip title="Profile">
                <IconButton
                  onClick={() => navigate("/profile/" + user.id)}
                  size="small"
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar
                    src={user?.image?.smallUrl}
                    sx={{ width: 40, height: 40 }}
                  >
                    {user.surname[0]}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <div className={"flex flex-col justify-between mr-3"}>
                <p className={"text-lg text-gray-600"}>manager</p>
                <p className={"text-lg text-white"}>
                  {user.name} {user.surname}
                </p>
              </div>
              <div className={"flex items-end"}>
                <button
                  className={"p-2 rounded-sm border-red-500 bg-red-500"}
                  onClick={() => navigate("/logout")}
                >
                  <LogoutIcon className={"text-white"} />
                </button>
              </div>
            </div>
            {user.clubId && (
              <button className="text-lg py-1.5 bg-yellow-300 flex gap-2 rounded-md px-4 w-5/6 mx-auto mb-4 hover:bg-yellow-500">
                <GroupIcon />
                <Link to={`/clubs/${user.clubId}`}>My Club</Link>
              </button>
            )}
          </>
        ) : (
          <div className={"flex gap-3 my-5 p-3 w-full"}>
            <Button
              variant="outlined"
              color="error"
              className={"w-full"}
              onClick={() => navigate("/auth/register")}
            >
              Sign up
            </Button>
            <Button
              variant="outlined"
              color="warning"
              className={"w-full"}
              onClick={() => navigate("/auth/login")}
            >
              Sign In
            </Button>
          </div>
        )}
        <Divider sx={{ width: "100%", borderColor: "error.main" }} />
        <div className={"w-full p-3"}>
          <Link to="/">
            <p
              className={`hover:opacity-80 py-2 border-b-2 border-solid border-red-300/10 text-xl uppercase ${
                pathname === "/" ? "text-[#FF0000]" : "text-white"
              }`}
            >
              Home
            </p>
          </Link>
          <Link to="/events">
            <p
              className={`hover:opacity-80 py-2 border-b-2 border-solid border-red-300/10 text-xl uppercase ${
                pathname.split("/")[1] === "events"
                  ? "text-[#FF0000]"
                  : "text-white"
              }`}
            >
              Calendar
            </p>
          </Link>
          <Link to="/close-events">
            <p
              className={`hover:opacity-80 py-2 border-b-2 border-solid border-red-300/10 text-xl uppercase ${
                pathname.split("/")[1] === "close-events"
                  ? "text-[#FF0000]"
                  : "text-white"
              }`}
            >
              Close Events
            </p>
          </Link>
          <Link to="/results">
            <p
              className={`hover:opacity-80 py-2 border-b-2 border-solid border-red-300/10 text-xl uppercase ${
                pathname.split("/")[1] === "results"
                  ? "text-[#FF0000]"
                  : "text-white"
              }`}
            >
              Results
            </p>
          </Link>
          <Link className="hover:opacity-80" to="/clubs">
            <p
              className={`hover:opacity-80 py-2 border-b-2 border-solid border-red-300/10 text-xl uppercase ${
                pathname.split("/")[1] === "clubs"
                  ? "text-[#FF0000]"
                  : "text-white"
              }`}
            >
              Clubs
            </p>
          </Link>
          <Link className="hover:opacity-80" to="/athletes">
            <p
              className={`hover:opacity-80 py-2 border-b-2 border-solid border-red-300/10 text-xl uppercase ${
                pathname.split("/")[1] === "athletes"
                  ? "text-[#FF0000]"
                  : "text-white"
              }`}
            >
              Athletes
            </p>
          </Link>
          <Link className="hover:opacity-80" to="/rules">
            <p
              className={`hover:opacity-80 py-2 border-b-2 border-solid border-red-300/10 text-xl uppercase ${
                pathname.split("/")[1] === "rules"
                  ? "text-[#FF0000]"
                  : "text-white"
              }`}
            >
              Rules
            </p>
          </Link>
          {user && (
            <Link className="hover:opacity-80" to="/add-team">
              <p
                className={`text-xl uppercase py-2 ${
                  pathname.split("/")[1] === "add-team"
                    ? "text-[#FF0000]"
                    : "text-white"
                }`}
              >
                Add team
              </p>
            </Link>
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default CustomDrawer;
