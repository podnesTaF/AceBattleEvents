"use client";

import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { Button, Divider, Drawer, IconButton } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface CustomDrawer {
  open: boolean;
  setOpen: Function;
}

const CustomDrawer: React.FC<CustomDrawer> = ({ open, setOpen }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

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
        {session?.user ? (
          <div className={"py-5 px-3 flex justify-center w-full relative"}>
            <Button
              variant="outlined"
              color="error"
              className={"p-1 py-2 mr-2"}
              onClick={() => router.push("/profile")}
            >
              <PersonIcon className={"text-white"} sx={{ fontSize: 40 }} />
            </Button>
            <div className={"flex flex-col justify-between mr-3"}>
              <p className={"text-lg text-gray-600"}>manager</p>
              <p className={"text-lg text-white"}>
                {session.user.name} {session.user.surname}
              </p>
            </div>
            <div className={"flex items-end"}>
              <button
                className={"p-2 rounded-sm border-red-500 bg-red-500"}
                onClick={() => signOut()}
              >
                <LogoutIcon className={"text-white"} />
              </button>
            </div>
          </div>
        ) : (
          <div className={"flex gap-3 my-5 p-3 w-full"}>
            <Button
              variant="outlined"
              color="error"
              className={"w-full"}
              onClick={() => signIn()}
            >
              Sign up
            </Button>
            <Button
              variant="outlined"
              color="warning"
              className={"w-full"}
              onClick={() => signIn()}
            >
              Sign In
            </Button>
          </div>
        )}
        <Divider sx={{ width: "100%", borderColor: "error.main" }} />
        <div className={"w-full p-3"}>
          <Link href="/">
            <p
              className={`hover:opacity-80 py-2 border-b-2 border-solid border-red-300/10 text-xl uppercase ${
                pathname === "/" ? "text-[#FF0000]" : "text-white"
              }`}
            >
              Home
            </p>
          </Link>
          <Link href="/calendar">
            <p
              className={`hover:opacity-80 py-2 border-b-2 border-solid border-red-300/10 text-xl uppercase ${
                pathname === "/calendar" ? "text-[#FF0000]" : "text-white"
              }`}
            >
              Calendar
            </p>
          </Link>
          <Link href="/close-events">
            <p
              className={`hover:opacity-80 py-2 border-b-2 border-solid border-red-300/10 text-xl uppercase ${
                pathname === "/close-events" ? "text-[#FF0000]" : "text-white"
              }`}
            >
              Close Events
            </p>
          </Link>
          <Link href="/results">
            <p
              className={`hover:opacity-80 py-2 border-b-2 border-solid border-red-300/10 text-xl uppercase ${
                pathname === "/results" ? "text-[#FF0000]" : "text-white"
              }`}
            >
              Results
            </p>
          </Link>
          {session?.user && (
            <Link className="hover:opacity-80" href="/add-team">
              <p
                className={`text-xl uppercase py-2 ${
                  pathname === "/add-team" ? "text-[#FF0000]" : "text-white"
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
