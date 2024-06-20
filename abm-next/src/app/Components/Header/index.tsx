"use client";

import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AnnonceStripe from "./components/AnnounceStripe";
import AuthStripe from "./components/AuthStripe";
import NavBar from "./components/NavBar";

export const Header = ({ session }: { session?: Session | null }) => {
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrollingUp(true);
    } else {
      setIsScrollingUp(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className={`relative w-full mb-[56px] md:mb-[80px]`}>
        <div className="w-full fixed top-0 left-0 z-30">
          <AuthStripe session={session} isScrollingUp={isScrollingUp} />
          <NavBar isScrollingUp={isScrollingUp} />
        </div>
      </div>
      {pathname === "/" && <AnnonceStripe />}
      {/* <CustomDrawer setOpen={setOpen} open={open} user={user} /> */}
    </>
  );
};
