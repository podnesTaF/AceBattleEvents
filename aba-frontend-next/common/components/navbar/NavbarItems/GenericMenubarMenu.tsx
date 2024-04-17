import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/src/shared/ui/menubar";
import Image from "next/image";
import Link from "next/link";
import MenuItem from "../MenuItem";
import MenuItemGradient from "../MenuItemGradient";

type GenericMenubarMenuProps = {
  title: string;
  subtitle?: string;
  items: { content: string; href: string }[];
  iconSrc?: string;
  children?: React.ReactNode;
  variant?: "light" | "dark";
  titleVariant?: "light" | "dark";
};

const GenericMenubarMenu = ({
  title,
  subtitle,
  items,
  iconSrc,
  children,
  variant = "light",
  titleVariant = "dark",
}: GenericMenubarMenuProps): JSX.Element => {
  return (
    <MenubarMenu>
      <MenubarTrigger
        className={`relative w-full lg:w-auto px-0 lg:px-2 2xl:px-3 py-2 border-b-[1px]  lg:border-b-0 border-gray-200  ${
          titleVariant === "dark"
            ? "hover:bg-transparent focus:bg-gray-200"
            : "hover:bg-white/10 focus:bg-white/10 data-[state=open]:bg-white/10"
        }`}
      >
        <MenuItem
          variant={titleVariant}
          className={`w-full h-full hover:bg-transparent`}
        >
          {title}
        </MenuItem>
        <Image
          src={iconSrc || "/icons/open-menu.svg"}
          width={9}
          height={6}
          alt="+"
          className="object-contain absolute right-0 bottom-0"
        />
      </MenubarTrigger>
      <MenubarContent
        className={`px-2 py-3 min-w-80 border-1  ${
          variant === "dark" ? "bg-[#1c1e1f]" : ""
        }`}
      >
        {children ? children : null}
        <div className="w-full mb-2">
          <p
            className={`text-md lg:text-xl font-medium text-center  ${
              variant === "dark" ? "text-white" : ""
            }`}
          >
            {subtitle || title}
          </p>
          <div
            className={`${
              variant === "dark" ? "divider-gradient-dark" : "divider-gradient"
            }  w-full h-[1px]`}
          ></div>
        </div>
        {items.map((item, index) => (
          <MenubarItem
            key={index}
            className="hover:bg-inherit focus:bg-inherit py-1"
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
      </MenubarContent>
    </MenubarMenu>
  );
};

export default GenericMenubarMenu;
