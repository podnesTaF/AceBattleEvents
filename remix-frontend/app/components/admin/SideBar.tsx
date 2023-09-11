import React, { useState } from "react";
import SideTab from "./SideTab";

interface SideBarProps {
  tabs: any[];

  title: string;
}

const SideBar: React.FC<SideBarProps> = ({ tabs, title }) => {
  const [tabsControl, setTabsControl] = useState<any>({
    players: false,
    teams: false,
    events: false,
    clubs: false,
  });

  const handleTabClick = (name: string) => {
    setTabsControl((prev: any) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="h-full h-calc-screen-lg fixed md:sticky top-[90px] sm:w-64 flex sm:flex-col bg-[#1E1C1F] overflow-x-scroll sm:overflow-x-auto z-10">
      <div className="py-4 hidden sm:flex px-4">
        <h3 className="text-2xl font-semibold text-white uppercase">{title}</h3>
      </div>
      {tabs.map((tab) => (
        <SideTab
          key={tab.name}
          {...tab}
          isOpened={tabsControl[tab.name]}
          setIsOpened={handleTabClick}
        />
      ))}
    </div>
  );
};

export default SideBar;
