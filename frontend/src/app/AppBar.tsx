"use client";

import AnnonceStripe from "@/components/main/AnnonceStripe";
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
      <div className="xl:flex justify-between px-5 py-2 bg-[#1E1C1F] items-center w-full z-10">
        <div className={"flex justify-between items-center"}>
          <div className="xl:hidden">
            <IconButton
              onClick={() => setOpen(true)}
              className={"text-white items-center"}
            >
              <MenuIcon sx={{ fontSize: 40 }} />
            </IconButton>
          </div>
          <h2
            onClick={() => router.push("/")}
            className={
              "text-2xl xl:text-3xl uppercase text-white cursor-pointer active:scale-95"
            }
          >
            Ace Battle Events
          </h2>
        </div>
        <nav className={"hidden xl:flex gap-4 items-center"}>
          <Link className="hover:opacity-80" href="/">
            <p
              className={`text-lg uppercase ${
                pathname === "/" ? "text-[#FF0000]" : "text-white"
              }`}
            >
              Home
            </p>
          </Link>
          <Link className="hover:opacity-80" href="/calendar">
            <p
              className={`text-lg uppercase ${
                pathname === "/calendar" ? "text-[#FF0000]" : "text-white"
              }`}
            >
              Calendar
            </p>
          </Link>
          <Link className="hover:opacity-80" href="/close-events">
            <p
              className={`text-lg uppercase ${
                pathname === "/close-events" ? "text-[#FF0000]" : "text-white"
              }`}
            >
              Close Events
            </p>
          </Link>
          <Link className="hover:opacity-80" href="/results">
            <p
              className={`text-lg uppercase ${
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
                  className={`text-lg uppercase ${
                    pathname === "/add-team" ? "text-[#FF0000]" : "text-white"
                  }`}
                >
                  Add Your Team
                </p>
              </Link>
              <Button
                variant="contained"
                color="success"
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
              <div className="bg-green-700 rounded-md">
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => router.push("/auth/register")}
                >
                  Sign up
                </Button>
              </div>
              <Button
                variant="outlined"
                color="success"
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
      {pathname === "/" && <AnnonceStripe />}
      <CustomDrawer setOpen={setOpen} open={open} />
    </>
  );
};

export default AppBar;
