"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ProfileTab } from "../../profileTab.ui";

interface TabsProps {
  tabs: { link: string; label: string }[];
}

export const RunnerTabs = ({ tabs }: TabsProps): JSX.Element => {
  const pathname = usePathname();
  return (
    <div className="w-full flex">
      {tabs.map((tab, index: number) => (
        <Link href={tab.link} key={index}>
          <ProfileTab
            key={index}
            isActive={!!pathname?.includes(tab.link)}
            title={tab.label}
          />
        </Link>
      ))}
    </div>
  );
};
