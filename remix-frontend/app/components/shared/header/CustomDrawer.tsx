"use client";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Divider, Drawer, IconButton } from "@mui/material";
import { Link, useLocation, useNavigate } from "@remix-run/react";
import React from "react";
import { links } from "~/lib/utils";

interface CustomDrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Drawer open={open} onClose={() => setOpen(false)}>
      <div
        className={"flex flex-col items-center h-screen bg-[#1E1C1F] p-2"}
        onClick={() => setOpen(false)}
        onKeyDown={() => setOpen(false)}
      >
        <div className={"flex justify-between w-full items-center"}>
          <img
            onClick={() => navigate("/")}
            src="/acebattlemile.svg"
            alt="abe"
            className={`cursor-pointer h-5 hover:opacity-90 active:scale-[0.97] transition-all`}
            height={36}
          />
          <IconButton onClick={() => setOpen(false)} className={"text-white"}>
            <CloseIcon fontSize={"large"} className="text-white" />
          </IconButton>
        </div>

        <div className={"flex gap-3 my-5 p-3 w-full"}>
          <Button
            variant="contained"
            color="success"
            className={"w-full"}
            endIcon={<ArrowForwardIosIcon />}
            onClick={() => navigate("/join-us")}
          >
            <p className="font-semibold">join us</p>
          </Button>
        </div>
        <Divider sx={{ width: "100%", borderColor: "error.main" }} />
        <div className={"w-full p-3"}>
          {links.map((link, i) => (
            <Link key={i} to={link.to}>
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
