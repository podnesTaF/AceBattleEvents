"use client";

import { networksLinks } from "@/src/features/home";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  if (pathname === "/register") return null;

  return (
    <div className="bg-[#1E1C1F] w-full py-6 ">
      <div className="xl:mx-auto lg:max-w-7xl w-full flex flex-col-reverse lg:flex-row gap-8">
        <div className="flex flex-col w-full lg:w-auto items-center lg:items-start gap-6 h-full justify-between">
          <Image
            src="/logo/acebattlemile.svg"
            alt="logo"
            width={240}
            height={50}
            className="w-80 h-auto"
          />
          <div className="flex flex-col w-full justify-center items-center lg:items-start gap-2">
            <p className="text-gray-400">&copy; ACE Battle Mile</p>
            <p className="text-gray-400">All rights reserved.</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row w-full justify-between gap-4">
          <div className="w-full flex flex-col items-center justify-between gap-6 md:items-start">
            <h4 className="bg-red-500 w-full py-2 text-lg font-semibold uppercase text-white text-center">
              call
            </h4>
            <a href="tel:+35794510965" className="text-white text-lg">
              +35794510965
            </a>
            <h4 className="text-lg font-semibold text-white">
              TERM & CONDITION
            </h4>
          </div>
          <div className="w-full flex flex-col items-center justify-between gap-6 md:items-start">
            <h4 className="bg-red-500 w-full py-2 text-lg font-semibold uppercase text-white text-center">
              write
            </h4>
            <a href="tel:+352661754449" className="text-white text-lg">
              info@aba.run
            </a>
            <h4 className="text-lg font-semibold text-white">COOKIE-POLICY</h4>
          </div>
          <div className="w-full flex flex-col items-center justify-between gap-6 md:items-start">
            <h4 className="bg-red-500 w-full py-2 text-lg font-semibold uppercase text-white text-center">
              watch
            </h4>
            <div className="flex gap-2">
              {networksLinks.map((link, index) => (
                <a key={index} href={link.href}>
                  <link.icon
                    fontSize="large"
                    className="text-white hover:opacity-80"
                  />
                </a>
              ))}
            </div>
            <h4 className="text-lg font-semibold text-white">
              TERM & CONDITION
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
