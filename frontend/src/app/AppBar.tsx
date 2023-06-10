"use client";

import CustomDrawer from "@/components/CustomDrawer";
import { useAppDispatch, useAppSelector } from "@/hooks/useTyped";
import { addUser, selectUser } from "@/redux/features/userSlice";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import TollIcon from "@mui/icons-material/Toll";
import { Button, IconButton } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AppBar = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    console.log(session?.user);
    if (session?.user) {
      dispatch(addUser(session.user));
    }
  }, [session]);

  return (
    <>
      <div className="lg:flex justify-between px-5 py-4 bg-[#1E1C1F] items-center">
        <div className={"flex justify-between items-center"}>
          <IconButton
            onClick={() => setOpen(true)}
            className={"text-white lg:hidden items-center"}
          >
            <MenuIcon sx={{ fontSize: 40 }} />
          </IconButton>
          <h2 className={"text-3xl lg:text-4xl uppercase text-white"}>
            Ace Battle Events
          </h2>
        </div>
        <nav className={"hidden lg:flex gap-4 items-center"}>
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
          {session?.user ? (
            <>
              <Link className="hover:opacity-80" href="/register-team">
                <p
                  className={`text-xl uppercase ${
                    pathname === "/register-team"
                      ? "text-[#FF0000]"
                      : "text-white"
                  }`}
                >
                  Register Team
                </p>
              </Link>

              <div className={"flex items-center justify-center"}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => router.push("/add-coins")}
                >
                  <TollIcon className={"text-yellow-400"} />
                  <p className={"ml-2 text-white text-xl"}>
                    {user?.balance} bc
                  </p>
                </Button>
              </div>
              <Button
                variant="outlined"
                color="error"
                className={"p-1"}
                onClick={() => router.push("/profile/1")}
              >
                <PersonIcon className={"text-white"} fontSize={"large"} />
              </Button>
              <Button
                variant="outlined"
                color="error"
                className={"p-1"}
                onClick={() => signOut()}
              >
                <LogoutIcon className={"text-white"} fontSize={"large"} />
              </Button>
            </>
          ) : (
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
          )}
        </nav>
      </div>
      <CustomDrawer setOpen={setOpen} open={open} />
    </>
  );
};

export default AppBar;
