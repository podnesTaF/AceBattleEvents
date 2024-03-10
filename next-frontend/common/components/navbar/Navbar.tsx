"use client";
import ProfileDropDown from "@/app/(user)/_components/ProfileDropDown";
import { Button } from "@/src/shared/ui/button";
import Divider from "@/src/shared/ui/divider";
import { Menubar } from "@/src/shared/ui/menubar";
import RoundedGradientBorder from "@/src/shared/ui/rounded-gradient-border";
import { AlignJustify, X } from "lucide-react";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Element } from "react-scroll";
import BurgerMenu from "./BurgerMenu";
import MenuItem from "./MenuItem";
import EventsExpandMenu from "./NavbarItems/EventsExpandMenu";
import GenericMenubarMenu from "./NavbarItems/GenericMenubarMenu";

export const runnersMenuItems = [
  { content: "Teams", href: "/" },
  { content: "Runners Profiles", href: "/" },
  { content: "Ranking", href: "/" },
];

export const statsMenuItems = [
  { content: "Ranking", href: "/" },
  { content: "Top Results", href: "/" },
  { content: "Ranking Criteria", href: "/" },
  { content: "Results Archive", href: "/" },
];

export const homeItems = [
  { content: "Home", href: "/" },
  { content: "Memberships", href: "/memberships" },
  { content: "About ABM", href: "/" },
  { content: "Support", href: "/" },
];

export const Navbar = ({ session }: { session: Session | null }) => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.scrollY;
      const scrollingDown = currentScrollTop > lastScrollTop;
      const scrolledEnough = Math.abs(currentScrollTop - lastScrollTop) > 200;

      if (scrollingDown && scrolledEnough) {
        setShowNavbar(false);
        setExpanded(false);
      } else if (!scrollingDown && scrolledEnough) {
        setShowNavbar(true);
      }

      if (scrolledEnough) {
        setLastScrollTop(currentScrollTop);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  return (
    <Element name="navbar" className="w-full px-4 relative">
      <RoundedGradientBorder
        padding="p-[2px]"
        borderRadius="rounded-[30px]"
        from="from-[#ff00001a]"
        to="to-[#000]"
        direction="bg-gradient-to-r"
        className={`max-w-[1400px] 2xl:max-w-none w-full 2xl:mx-auto  transition-all ${
          showNavbar
            ? "scale-100 opacity-100 translate-y-0"
            : "transform scale-[0.9] opacity-0 -translate-y-12"
        }`}
      >
        <div className="w-full bg-background rounded-[30px] flex justify-between px-4 py-1 2xl:py-2">
          <div className="flex items-center gap-4">
            <Image
              src="/logo/abe-logo-black.svg"
              alt="Ace Battle Mile"
              width={80}
              height={30}
              className="w-16 2xl:w-20"
            />
            <Divider size="w-[1px]" />
            <Menubar className="border-none hidden lg:flex">
              <GenericMenubarMenu
                variant="dark"
                title="Home"
                items={homeItems}
              />
              <EventsExpandMenu variant="dark" />
              <GenericMenubarMenu
                variant="dark"
                title="Runners"
                items={runnersMenuItems}
              />
              <GenericMenubarMenu
                variant="dark"
                title="Stats"
                items={statsMenuItems}
              />
            </Menubar>
            <MenuItem className="hidden lg:flex" href={"/"}>
              News
            </MenuItem>
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <Divider size="w-[1px]" />
            {session?.user ? (
              <ProfileDropDown variant="dark" />
            ) : (
              <>
                <MenuItem href={"/login"}>Log In</MenuItem>
                <Link href={"/signup"}>
                  <div className="bg-red-500 text-white flex px-12 py-1 items-center h-12 rounded-[30px] relative">
                    <h4 className="font-semibold text-lg 2xl:text-xl">
                      Sign Up
                    </h4>
                    <div className="absolute left-1 top-1 bg-white rounded-full p-2">
                      <Image
                        src={"/icons/running-guy-icon.svg"}
                        alt="Running guy"
                        width={24}
                        height={24}
                      />
                    </div>
                  </div>
                </Link>
              </>
            )}
          </div>
          <div className="flex bg-red-500 w-12 h-12 rounded-full justify-center items-center lg:hidden">
            <Button
              onClick={() => setExpanded((prev) => !prev)}
              variant="outline"
              size="icon"
              className="rounded-full"
            >
              {expanded ? (
                <X className="h-6 w-6" />
              ) : (
                <AlignJustify className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </RoundedGradientBorder>
      {expanded && <BurgerMenu session={session} />}
    </Element>
  );
};

export default Navbar;
