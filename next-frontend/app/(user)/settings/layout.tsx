"use client";
import ProfileDropDown from "@/app/(user)/_components/ProfileDropDown";
import StoreProvider from "@/app/StoreProvider";
import { Button } from "@/common/components/ui/button";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";

export default function SettingsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SessionProvider>
      <StoreProvider>
        <div className="h-72 w-full bg-[url('/images/profile-bg.jpg')] bg-no-repeat bg-bottom bg-cover p-4 flex flex-col items-center">
          <div className="flex w-full justify-between items-center gap-6">
            <Link href="/">
              <Button className="bg-white/10 hover:bg-white/5 w-32 py-3 text-white font-semibold">
                Back To ABM
              </Button>
            </Link>
            <div>
              <ProfileDropDown variant="dark" />
            </div>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <h1 className="text-white font-semibold text-5xl">Profile</h1>
          </div>
          <div className="flex gap-4">
            <Link href={"/settings"}>
              <Button className="bg-white/10 hover:bg-white/5 min-w-40 p-5 text-white font-semibold text-xl">
                Profile
              </Button>
            </Link>
            <Link href={"/settings/membership"}>
              <Button className="bg-white/10 hover:bg-white/5 min-w-40 p-5 text-white font-semibold text-xl">
                Membership
              </Button>
            </Link>
          </div>
        </div>
        <div className="max-w-4xl mx-auto my-4">{children}</div>
      </StoreProvider>
    </SessionProvider>
  );
}
