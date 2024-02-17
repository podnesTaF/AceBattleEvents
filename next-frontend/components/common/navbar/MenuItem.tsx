import Link from "next/link";
import React from "react";

type MenuItemProps = {
  children: React.ReactNode;
  href: string;
  className?: string;
};

const MenuItem = ({
  href,
  children,
  className,
}: MenuItemProps): JSX.Element => {
  return (
    <Link className={`h-full`} href={href}>
      <div
        className={`hover:bg-gray-100 h-full px-3 flex items-center ${
          className ?? ""
        }`}
      >
        <h4 className="font-semibold text-xl">{children}</h4>
      </div>
    </Link>
  );
};

export default MenuItem;
