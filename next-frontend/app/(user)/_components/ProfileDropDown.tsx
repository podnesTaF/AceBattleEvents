"use client";

import MenuItemGradient from "@/common/components/navbar/MenuItemGradient";
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/common/components/ui/menubar";
import { Menubar } from "@radix-ui/react-menubar";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

type ProfileDropDownProps = {
  variant?: "light" | "dark";
};

const accountItems = [
  { content: "Settings", href: "/settings" },
  { content: "My Ace Battle Mile", href: "/my" },
];

const ProfileDropDown = ({ variant }: ProfileDropDownProps): JSX.Element => {
  return (
    <Menubar className="border-none flex w-full">
      <MenubarMenu>
        <MenubarTrigger
          className={`z-10 w-full lg:w-auto pl-2 pr-12 data-[state=open]:pl-12 data-[state=open]:pr-2 py-1 h-12 bg-red-500 text-white flex data-[state=open]:flex-row-reverse transition-all items-center gap-4 rounded-[30px] relative focus:bg-red-500 focus:text-white data-[state=open]:bg-primary data-[state=open]:text-white`}
        >
          <div className=" bg-white rounded-full p-2 data-[state=open]:right-1">
            <Image
              src={"/icons/running-guy-icon.svg"}
              alt="Running guy"
              width={24}
              height={24}
            />
          </div>
          <h4 className="font-semibold text-xl">Profile</h4>
        </MenubarTrigger>
        <MenubarContent
          align="end"
          className={`px-2 py-3 min-w-64 mt-0 border-2 rounded-xl border-white lg:z-[5] lg:pt-16 relative 
           block lg:-top-16  ${variant === "dark" ? "bg-[#1c1e1f]" : ""}`}
        >
          {accountItems.map((item, index) => (
            <MenubarItem
              key={index}
              className="hover:bg-inherit focus:bg-inherit py-1 font-semibold"
            >
              <MenuItemGradient variant={variant}>
                <Link href={item.href}>
                  <p
                    className={`text-md p-2 text-right  ${
                      variant === "dark" ? "text-white" : ""
                    }`}
                  >
                    {item.content}
                  </p>
                </Link>
              </MenuItemGradient>
            </MenubarItem>
          ))}
          <div className="w-full mt-10">
            <div
              className={`${
                variant === "dark"
                  ? "divider-gradient-dark"
                  : "divider-gradient"
              }  w-full h-[1px]`}
            ></div>
          </div>
          <MenubarItem className="hover:bg-inherit focus:bg-inherit py-1 font-semibold">
            <MenuItemGradient variant={"dark"}>
              <Link href={"/"}>
                <p
                  className={`text-md p-2 text-right  ${
                    variant === "dark" ? "text-white" : ""
                  }`}
                >
                  Membership
                </p>
              </Link>
            </MenuItemGradient>
          </MenubarItem>
          <MenubarItem className="hover:bg-inherit focus:bg-inherit py-1">
            <MenuItemGradient variant={"dark"} direction="left">
              <div
                onClick={() => signOut()}
                className="flex gap-2 items-center text-red-500 p-2"
              >
                <LogOut size={24} />
                <p className={`text-md font-semibold text-left`}>Logout</p>
              </div>
            </MenuItemGradient>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default ProfileDropDown;
