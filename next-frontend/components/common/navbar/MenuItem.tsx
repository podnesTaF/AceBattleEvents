"use client";
import { useRouter } from "next/navigation";
import React from "react";

type MenuItemProps = {
  children: React.ReactNode;
  href?: string;
  className?: string;
};

const MenuItem = ({
  href,
  children,
  className,
}: MenuItemProps): JSX.Element => {
  const router = useRouter();

  return (
    <div className={`h-full`} onClick={() => href && router.push(href)}>
      <div
        className={`hover:bg-gray-100 cursor-pointer h-full px-3 flex items-center ${
          className ?? ""
        }`}
      >
        <h4 className="font-semibold text-xl select-none">{children}</h4>
      </div>
    </div>
  );
};

export default MenuItem;
