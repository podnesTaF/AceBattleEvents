import { ProfileDropDown } from "@/src/features/profile/user";
import { Menubar } from "@/src/shared/ui/menubar";
import RoundedGradientBorder from "@/src/shared/ui/rounded-gradient-border";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import MenuItem from "./MenuItem";
import { homeItems, runnersMenuItems, statsMenuItems } from "./Navbar";
import EventsExpandMenu from "./NavbarItems/EventsExpandMenu";
import GenericMenubarMenu from "./NavbarItems/GenericMenubarMenu";

interface BurgerMenuProps {
  session: Session | null;
}

const BurgerMenu = ({ session }: BurgerMenuProps): JSX.Element => {
  return (
    <div
      className={`min-h-96 max-w-sm ml-auto flex flex-col gap-16 justify-between lg:hidden border-2 border-red-500 bg-white rounded-[20px] mt-2 p-3`}
    >
      <div className="w-full flex flex-col">
        <Menubar className="border-none flex-col p-0 h-full">
          <GenericMenubarMenu variant="dark" title="Home" items={homeItems} />
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
        <MenuItem className="border-b-[1px] border-gray-200 py-2" href={"/"}>
          News
        </MenuItem>
      </div>
      {session?.user ? (
        <ProfileDropDown variant="dark" />
      ) : (
        <div className="flex flex-col w-full gap-2">
          <Link href={"/auth/signup"}>
            <div className="bg-red-500 text-white flex px-[54px] py-1 items-center h-[52px] rounded-[30px] relative">
              <div className="absolute left-1 top-1 bg-white rounded-full p-2">
                <Image
                  src={"/icons/running-guy-icon.svg"}
                  alt="Running guy"
                  width={28}
                  height={28}
                />
              </div>
              <h4 className="font-semibold text-xl">Sign Up</h4>
            </div>
          </Link>
          <RoundedGradientBorder
            padding="p-[2px]"
            borderRadius="rounded-[30px]"
            from="from-[#fff]"
            to="to-[#ff0000]"
            direction="bg-gradient-to-r"
            className="overflow-hidden"
          >
            <MenuItem
              className="py-2.5 flex justify-end   bg-white rounded-r-full"
              href={"/auth/login"}
            >
              Log In
            </MenuItem>
          </RoundedGradientBorder>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
