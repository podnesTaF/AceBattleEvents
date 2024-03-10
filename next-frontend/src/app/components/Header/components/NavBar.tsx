"use client";

import { Button } from "@/src/shared/ui/button";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { links } from "../utils/navbar-links";

const NavBar = ({ isScrollingUp }: { isScrollingUp: boolean }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className={`lg:flex justify-between z-30 ${
        isScrollingUp ? "py-1" : "lg:py-2"
      } transition-all bg-[#1E1C1F] items-center w-full z-10 shadow-lg`}
    >
      <div className="lg:flex justify-between items-center w-full px-4 max-w-[1500px] mx-auto">
        <div className={"flex justify-between items-center"}>
          <div className="lg:hidden">
            <Button
              variant={"ghost"}
              onClick={() => setOpen(true)}
              className={"text-white items-center"}
            >
              <Menu fontSize={40} color="white" />
            </Button>
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
  );
};

export default NavBar;
