"use client";
import { Menubar } from "@radix-ui/react-menubar";
import { LogOut } from "lucide-react";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import ProfileDropDown from "../../app/settings/_components/ProfileDropDown";
import MenuItem from "../common/navbar/MenuItem";
import GenericMenubarMenu from "../common/navbar/NavbarItems/GenericMenubarMenu";

interface MyNavbarProps {
  session: Session | null;
}

const portalItems = [
  {
    content: "Find a Team",
    href: "/my",
  },
  {
    content: "Find a Runner",
    href: "/my",
  },
];

const MyNavbar = ({ session }: MyNavbarProps): JSX.Element => {
  return (
    <div className="bg-primary py-1 px-3 lg:px-5 flex justify-between relative">
      <nav className="flex items-center gap-4">
        <MenuItem variant="light" href={"/my"}>
          Home
        </MenuItem>
        <Menubar className="border-none hidden lg:flex">
          <GenericMenubarMenu
            variant="dark"
            titleVariant="light"
            title="Home"
            items={portalItems}
          />
        </Menubar>
        <MenuItem variant="light" href={"/my"}>
          My Tickets
        </MenuItem>
      </nav>
      <Image
        src={"/logo/my-abm-logo.png"}
        alt="my abm"
        width={210}
        height={64}
        className="w-36 md:w-52 h-auto"
      />
      <div className="flex gap-4 items-center">
        <ProfileDropDown variant="dark" />
        <Link href={"/"} className="w-full">
          <div className="flex gap-2 items-center text-white rounded-sm hover:bg-white/10">
            <LogOut size={24} />
            <h4 className="text-md font-semibold w-full">
              Back to Ace Battle Mile
            </h4>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MyNavbar;
