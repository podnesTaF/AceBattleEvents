import { Outlet, useNavigate } from "@remix-run/react";
import React, { useEffect, useRef, useState } from "react";
import { IUser } from "~/lib/types";
import { getProfileTabs } from "~/lib/utils";
import { Tab } from ".";

interface Props {
  user?: IUser;
  currentUser: IUser | null;
}

const ProfileTabs: React.FC<Props> = ({ user, currentUser }) => {
  const navigate = useNavigate();
  const [currPage, setCurrPage] = useState<number>(1);
  const [activeTab, setActiveTab] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [tabsByRole, setTabsByRole] = useState<string[]>([]);

  useEffect(() => {
    const tabs = getProfileTabs(currentUser?.id === user?.id, user?.role);
    setTabsByRole(tabs);
  }, [user]);

  useEffect(() => {
    const tabs = getProfileTabs(currentUser?.id === user?.id, user?.role);

    setTabsByRole(tabs);
    navigate(
      "/profile/" + user?.id + "/" + tabs[activeTab] + "?scrollY=" + scrollY
    );
  }, []);

  const changeTab = (tabIndex: number) => {
    setActiveTab(tabIndex);
    navigate(
      "/profile/" +
        user?.id +
        "/" +
        tabsByRole[tabIndex] +
        "?scrollY=" +
        scrollY
    );
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
      <Outlet />
    </main>
  );
};

export default ProfileTabs;
