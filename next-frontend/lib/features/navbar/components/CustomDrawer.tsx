"use client";
import { IUser } from "@/app/(user)/_lib/types";
import { getImageSrc } from "@/common/lib/utils";
import {
  Avatar,
  Button,
  Divider,
  Drawer,
  IconButton,
  Tooltip,
} from "@mui/material";
import { ArrowRightIcon, LogOut, X } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";
import { links } from "../utils/navbar-links";

interface CustomDrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: IUser | null;
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({ open, setOpen, user }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Drawer open={open} onClose={() => setOpen(false)}>
      <div
        className={"flex flex-col items-center h-screen bg-[#1E1C1F] p-2"}
        onClick={() => setOpen(false)}
        onKeyDown={() => setOpen(false)}
      >
        <div className={"flex justify-between w-full items-center"}>
          <Image
            onClick={() => router.push("/")}
            src="/logo.acebattlemile.svg"
            alt="abe"
            className={`cursor-pointer h-5 hover:opacity-90 active:scale-[0.97] transition-all`}
            height={36}
            width={120}
          />
          <IconButton onClick={() => setOpen(false)} className={"text-white"}>
            <X fontSize={"large"} className="text-white" />
          </IconButton>
        </div>

        {user ? (
          <>
            <div className={"py-5 px-3 flex justify-center w-full relative"}>
              <Tooltip title="Profile">
                <IconButton
                  onClick={() => router.push("/settings/" + user.id)}
                  size="small"
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar
                    src={getImageSrc(user.avatarName, `avatars`, user.id)}
                    sx={{ width: 40, height: 40 }}
                  >
                    {user.lastName[0]}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <div className={"flex flex-col justify-between mr-3"}>
                <p className={"text-lg text-white"}>
                  {user.firstName} {user.lastName}
                </p>
              </div>
              <div className={"flex items-end"}>
                <button
                  className={"p-2 rounded-sm border-red-500 bg-red-500"}
                  onClick={() => signOut()}
                >
                  <LogOut className={"text-white"} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className={"flex gap-3 my-5 p-3 w-full"}>
            <Button
              variant="contained"
              color="success"
              className={"w-full"}
              endIcon={<ArrowRightIcon />}
              onClick={() => router.push("/signup")}
            >
              <p className="font-semibold">join us</p>
            </Button>
            <Button
              variant="outlined"
              color="success"
              className={"w-2/5"}
              onClick={() => router.push("/login")}
            >
              <p className="font-semibold">Login</p>
            </Button>
          </div>
        )}
        <Divider sx={{ width: "100%", borderColor: "error.main" }} />
        <div className={"w-full p-3"}>
          {links.map((link, i) => (
            <Link key={i} href={link.to}>
              <p
                className={`hover:opacity-80 py-2 border-b-2 border-solid border-red-300/10 text-lg font-semibold uppercase ${
                  pathname === link.to ? "text-[#FF0000]" : "text-white"
                }`}
              >
                {link.label}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </Drawer>
  );
};

export default CustomDrawer;
