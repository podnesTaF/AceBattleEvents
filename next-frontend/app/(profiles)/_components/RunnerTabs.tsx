"use client";

import Tab from "@/common/components/tabs/Tab";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface TabsProps {
  tabs: { link: string; label: string }[];
}

const RunnerTabs = ({ tabs }: TabsProps): JSX.Element => {
  const pathname = usePathname();
  return (
    <div className="w-full flex">
      {tabs.map((tab, index: number) => (
        <Link href={tab.link} key={index}>
          <Tab
            key={index}
            isActive={!!pathname?.includes(tab.link)}
            title={tab.label}
          />
        </Link>
      ))}
    </div>
  );
};

export default RunnerTabs;
