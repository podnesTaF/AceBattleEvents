"use client";

import { useEffect, useState } from "react";

import AnnonceStripe from "@/lib/features/navbar/components/AnnounceStripe";
import AuthStripe from "@/lib/features/navbar/components/AuthStripe";
import { links } from "@/lib/features/navbar/utils/navbar-links";
import { IconButton } from "@mui/material";
import { Menu } from "lucide-react";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const AppBar = ({ session }: { session: Session | null }) => {
  const [open, setOpen] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  const pathname = usePathname();
  let router = useRouter();

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
          <div
            className={`lg:flex justify-between z-30 ${
              isScrollingUp ? "py-1" : "lg:py-2"
            } transition-all bg-[#1E1C1F] items-center w-full z-10 shadow-lg`}
          >
            <div className="lg:flex justify-between items-center w-full px-4 max-w-[1500px] mx-auto">
              <div className={"flex justify-between items-center"}>
                <div className="lg:hidden">
                  <IconButton
                    onClick={() => setOpen(true)}
                    className={"text-white items-center"}
                  >
                    <Menu fontSize={40} color="white" />
                  </IconButton>
                </div>
                <Image
                  onClick={() => router.push("/")}
                  src="/logo/acebattlemile.svg"
                  alt="abe"
                  className={`cursor-pointer h-5 md:h-7 hover:opacity-90 active:scale-[0.97] transition-all`}
                  height={28}
                  width={280}
                />
              </div>
              <nav className={"hidden lg:flex lg:gap-4 xl:gap-6 items-center"}>
                {links.map((link, index) => (
                  <Link key={index} href={link.to} className="hover:opacity-80">
                    <p
                      className={`text-lg uppercase font-semibold ${
                        pathname?.split("/")[1] === link.to.split("/")[1]
                          ? "text-[#FF0000]"
                          : "text-white"
                      }`}
                    >
                      {link.label}
                    </p>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {pathname === "/" && <AnnonceStripe />}
      {/* <CustomDrawer setOpen={setOpen} open={open} user={user} /> */}
    </>
  );
};

export default AppBar;
