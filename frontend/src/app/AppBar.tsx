"use client";

import { useAppDispatch } from "@/hooks/useTyped";
import { addUser } from "@/redux/features/userSlice";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import { Button, IconButton, Skeleton } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CustomDrawer = dynamic(() => import("@/components/CustomDrawer"));

const AppBar = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (session?.user) {
      dispatch(addUser(session.user));
    }
  }, [session]);

  return (
    <>
      <div className="xl:flex justify-between px-5 py-4 bg-[#1E1C1F] items-center">
        <div className={"flex justify-between items-center"}>
          <IconButton
            onClick={() => setOpen(true)}
            className={"text-white xl:hidden items-center"}
          >
            <MenuIcon sx={{ fontSize: 40 }} />
          </IconButton>
          <h2 className={"text-3xl xl:text-4xl uppercase text-white"}>
            Ace Battle Events
          </h2>
        </div>
        <nav className={"hidden xl:flex gap-4 items-center"}>
          <Link className="hover:opacity-80" href="/">
            <p
              className={`text-xl uppercase ${
                pathname === "/" ? "text-[#FF0000]" : "text-white"
              }`}
            >
              Home
            </p>
          </Link>
          <Link className="hover:opacity-80" href="/calendar">
            <p
              className={`text-xl uppercase ${
                pathname === "/calendar" ? "text-[#FF0000]" : "text-white"
              }`}
            >
              Calendar
            </p>
          </Link>
          <Link className="hover:opacity-80" href="/close-events">
            <p
              className={`text-xl uppercase ${
                pathname === "/close-events" ? "text-[#FF0000]" : "text-white"
              }`}
            >
              Close Events
            </p>
          </Link>
          <Link className="hover:opacity-80" href="/results">
            <p
              className={`text-xl uppercase ${
                pathname === "/results" ? "text-[#FF0000]" : "text-white"
              }`}
            >
              Results
            </p>
          </Link>
          {session?.user ? (
            <>
              <Link className="hover:opacity-80" href="/add-team">
                <p
                  className={`text-xl uppercase ${
                    pathname === "/add-team" ? "text-[#FF0000]" : "text-white"
                  }`}
                >
                  Add Your Team
                </p>
              </Link>
              <Button
                variant="contained"
                color="error"
                className={"p-1"}
                onClick={() => router.push("/profile")}
              >
                <PersonIcon className={"text-white"} fontSize={"large"} />
              </Button>
              <Button
                variant="outlined"
                color="error"
                className={"p-1"}
                onClick={() => {
                  signOut().then(() => router.push("/"));
                }}
              >
                <LogoutIcon className={"text-white"} fontSize={"large"} />
              </Button>
            </>
          ) : session === null ? (
            <>
              <Button
                variant="outlined"
                color="error"
                onClick={() => router.push("/auth/register")}
              >
                Sign up
              </Button>
              <Button
                variant="outlined"
                color="warning"
                onClick={() => signIn()}
              >
                Sign In
              </Button>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Skeleton
                variant="circular"
                width={50}
                height={50}
                animation="wave"
                sx={{ marginRight: 4, bgcolor: "lightgray", opacity: 0.4 }}
              />
              <Skeleton
                variant="text"
                height={32}
                width={150}
                animation="wave"
                sx={{ bgcolor: "lightgray", opacity: 0.4 }}
              />
            </div>
          )}
        </nav>
      </div>
      <CustomDrawer setOpen={setOpen} open={open} />
    </>
  );
};

export default AppBar;
