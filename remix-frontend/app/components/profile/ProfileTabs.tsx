import { Divider } from "@mui/material";
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

  const changePage = (pageNum: number) => {
    setCurrPage(pageNum);
    navigate(`/profile/${user?.id}?registrations?page=` + pageNum);
  };

  return (
    <main className="max-w-7xl mx-4 xl-auto mt-4 mb-8 md:mx-auto">
      <Divider className="md:hidden" />
      <div className="flex w-full gap-1 md:gap-2 border-b-[1px] border-b-red-500">
        {tabsByRole.map((title, index: number) => (
          <Tab
            key={index}
            onClick={() => changeTab(index)}
            isActive={index === activeTab}
            title={title}
          />
        ))}
      </div>
      <div className="border-[1px] border-t-0 border-red-500 rounded-b-lg">
        <Outlet />
      </div>
    </main>
  );
};

export default ProfileTabs;
