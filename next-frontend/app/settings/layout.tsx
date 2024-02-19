"use client";
import ProfileDropDown from "@/components/profile/ProfileDropDown";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SettingsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
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
          <Button className="bg-white/10 hover:bg-white/5 w-32 py-3 text-white font-semibold">
            Profile
          </Button>
          <Button className="bg-white/10 hover:bg-white/5 w-32 py-3 text-white font-semibold">
            Settings
          </Button>
          <Button className="bg-white/10 hover:bg-white/5 w-32 py-3 text-white font-semibold">
            Membership
          </Button>
        </div>
      </div>
      {children}
    </div>
  );
}
