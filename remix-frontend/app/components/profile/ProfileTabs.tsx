import { Divider } from "@mui/material";
import { useNavigate } from "@remix-run/react";
import React, { useEffect, useRef, useState } from "react";
import { ITeam } from "~/lib/teams/types";
import { ITeamEvent } from "~/lib/teams/types/Registrations";
import EventCard from "../events/EventCard";
import Pagination from "../shared/tables/Pagination";
import TeamCard from "../teams/TeamCard";
import Tab from "./Tab";

interface Props {
  teams?: ITeam[];
  registrations?: { teamsForEvents: ITeamEvent[]; totalPages: number };
  userId: number;
}

const ProfileTabs: React.FC<Props> = ({ teams, registrations, userId }) => {
  const navigate = useNavigate();
  const [pagesCount, setPageCount] = useState(registrations?.totalPages || 1);
  const [currPage, setCurrPage] = useState<number>(1);
  const [activeTab, setActiveTab] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const changePage = (pageNum: number) => {
    setCurrPage(pageNum);
    navigate(`/profile/${userId}?registrations?page=` + pageNum);
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView();
    }
  }, [currPage]);

  return (
    <main className="max-w-7xl mx-4 xl-auto mt-4 mb-8 md:mx-auto">
      <Divider className="md:hidden" />
      <div className="flex w-full gap-1 md:gap-2 border-b-[1px] border-b-red-500">
        {["Teams", "Registrations", "Last races"].map((title, index) => (
          <Tab
            key={index}
            onClick={() => setActiveTab(index)}
            isActive={index === activeTab}
            title={title}
          />
        ))}
      </div>
      <div className="p-4 md:p-6 border-[1px] border-t-0 border-red-500 rounded-b-lg">
        {activeTab === 0 && (
          <>
            <h2 className="text-3xl font-semibold mb-4 text-center">
              Your teams
            </h2>
            {teams?.length ? (
              teams?.map((team, idx) => <TeamCard key={team.id} team={team} />)
            ) : (
              <p className="text-center text-xl font-semibold">
                You don't have teams yet
                <br />
              </p>
            )}
          </>
        )}
        {activeTab === 1 && (
          <>
            <div className="mx-3 md:mx-5 my-4 p-3 flex justify-center border-b-[1px] w-full">
              <h3 className="text-2xl font-semibold">Your Registrations</h3>
            </div>
            <div className="w-full h-full" ref={ref}>
              {registrations?.teamsForEvents.length ? (
                registrations?.teamsForEvents.map((reg, idx) => (
                  <EventCard
                    key={idx}
                    isYourRegister={true}
                    event={reg.event}
                    team={reg.team}
                    idx={idx + 1 * (currPage * 3 - 3) + 1}
                  />
                ))
              ) : (
                <p className="text-center text-xl font-semibold">
                  You don't have registrations yet
                  <br />
                </p>
              )}
            </div>
            <div className="flex justify-center">
              <Pagination
                pagesCount={pagesCount}
                onChangePage={changePage}
                currPage={currPage}
              />
            </div>
            <div className="my-4 mx-auto flex flex-col items-center">
              <p className="text-xl my-4">
                There are lots of events to register your team!
              </p>
              <button className="px-4 py-2 bg-red-500 text-lg sm:text-xl uppercase text-white rounded hover:bg-red-700 drop-shadow-lg active:scale-95">
                CALENDAR
              </button>
            </div>
          </>
        )}
        {activeTab === 2 && null}
      </div>
    </main>
  );
};

export default ProfileTabs;
