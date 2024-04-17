import React from "react";
import { Tab } from ".";

interface Props {
  activeTab: number;
  setActiveTab: (tabIndex: number) => void;
  children?: React.ReactNode;
  tabsByRole: string[];
}

const ProfileTabs: React.FC<Props> = ({
  children,
  activeTab,
  setActiveTab,
  tabsByRole,
}) => {
  const changeTab = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  return (
    <main className="w-full">
      <div className="w-full flex">
        {tabsByRole.map((title, index: number) => (
          <Tab
            key={index}
            onClick={() => changeTab(index)}
            isActive={index === activeTab}
            title={title}
          />
        ))}
      </div>
      {children}
    </main>
  );
};

export default ProfileTabs;
