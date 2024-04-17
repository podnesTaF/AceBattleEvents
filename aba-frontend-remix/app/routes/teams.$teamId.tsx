import { Box } from "@mui/material";
import { LoaderArgs } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Api } from "~/api/axiosInstance";
import {
  CustomTable,
  LastMatchesSideBar,
  MemberCarouseltem,
  Tab,
} from "~/components";
import { IRaceTeam } from "~/lib/races/types/teamResults";
import { IRace, ITeamPlayer } from "~/lib/types";
import { getCountryFlagSrc, transformClubResults } from "~/lib/utils";

export const loader = async ({ params, request }: LoaderArgs) => {
  const { teamId } = params;
  const { url } = request;
  const resultPage = new URL(url).searchParams.get("resultPage") || "1";

  const team = await Api().teams.getTeamById(teamId);

  if (!team) {
    throw new Response("Not Found", { status: 404 });
  }

  const teamResultsData = await Api().teams.getTeamResultsByTeamId(team.id);

  return {
    team,
    teamResultsData,
    currPage: +resultPage,
    tableRows: transformClubResults(teamResultsData?.items || []),
  };
};

const TeamPage = () => {
  const { team, teamResultsData, currPage, tableRows } = useLoaderData<
    typeof loader
  >() as unknown as any;
  const [lastMatches, setLastMatches] = useState<IRace[]>([]);
  const [pbs, setPbs] = useState<IRaceTeam[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  const onChangePage = async (page: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set("resultPage", page.toString());
    url.searchParams.set("scrollY", window.scrollY.toString());
    navigate(url.pathname + url.search);
  };

  useEffect(() => {
    if (!teamResultsData?.items || !teamResultsData.items.length) return;
    const pb = teamResultsData.items.reduce(
      (acc: IRaceTeam, curr: IRaceTeam) => {
        if (!acc.totalTimeInMs || !curr.totalTimeInMs) return acc;

        if (acc.totalTimeInMs > curr.totalTimeInMs) {
          return curr;
        }

        return acc;
      },
      teamResultsData.items[0]
    ) as IRaceTeam;
    setPbs((prev) => [pb]);
  }, []);

  useEffect(() => {
    (async () => {
      const matches = await Api().races.getLastMatches({
        teamId: team.id,
      });
      setLastMatches(matches);
    })();
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    const scrollY = url.searchParams.get("scrollY");
    if (scrollY) {
      window.scrollTo(0, +scrollY);
    }
  }, [currPage]);

  const changeTab = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  return (
    <div className="bg-[#fff9ff]">
      <header className="w-full my-4">
        <div className="flex flex-col md:flex-row relative pt-6 md:pt-0">
          <img
            src={team.imageUrl || "/profile-bg-lg.jpg"}
            alt="team bg image"
            className="flex absolute left-0 top-0 h-[350px] md:h-[300px] lg:h-[350px] xl:h-[420px]  w-full object-cover"
          />
          <div className="flex flex-col md:flex-row w-full max-w-7xl px-4 xl:mx-auto xl:px-0 justify-between md:items-end gap-7 mt-[100px] md:mt-0">
            <div className="relative w-full md:w-auto flex justify-center mt-[30%]  md:mt-[25%]">
              <img
                src={
                  team?.logoUrl ||
                  "https://storage.googleapis.com/abe_cloud_storage/image/large/c4bccba0-3f80-4eb5-b50f-63e5cd4f0100.jpg"
                }
                alt="profile"
                className="rounded object-cover w-[260px] h-[260px]"
                width={300}
                height={300}
              />
            </div>
            <div className="flex-1 w-full flex gap-5 justify-between self-end">
              <div className="flex-1 md:mt-6">
                <h3 className="text-2xl md:text-3xl font-semibold mb-5">
                  {team.name}
                </h3>
                <div className="flex gap-2 items-center mb-5">
                  {team.country.shortName && (
                    <img
                      src={getCountryFlagSrc(team.country.shortName)}
                      alt="flag"
                      width={40}
                    />
                  )}
                  <p className="font-semibold text-xl text-gray-400">
                    {team.city}, {team.country?.name}
                  </p>
                </div>
              </div>
              <div className="w-1/3 sm:w-auto flex flex-col items-center justify-end">
                <div className="rounded-full w-16 h-16 md:w-24 md:h-24 border-green-400 border-4 bg-green-400/50 flex justify-center items-center mb-4">
                  <h3 className="font-semibold text-2xl md:text-3xl">
                    {team.rank && team.rank < 9000 ? team.rank : "-"}
                  </h3>
                </div>
                <p className="font-semibold text-xl">
                  {team.gender.name === "male"
                    ? "Men's team ranking"
                    : "Women's team ranking"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="px-4 w-full max-w-7xl xl:mx-auto xl:px-0 flex gap-8 pb-8">
        <div className="max-w-sm hidden xl:block">
          <LastMatchesSideBar matches={lastMatches} />
        </div>
        <div className="flex-1 w-full">
          <div className="flex">
            {["Runners", "Results"].map((title, index: number) => (
              <Tab
                key={index}
                onClick={() => changeTab(index)}
                isActive={index === activeTab}
                title={title}
              />
            ))}
          </div>
          <div>
            <TabPanel index={0} value={activeTab}>
              <div className="bg-white border-l-2 border-red-500 p-4">
                <div className="mb-6">
                  <h4 className="text-xl font-semibold mb-3 text-gray-400">
                    Coach
                  </h4>
                  <h3 className="text-2xl font-semibold">
                    {team.coach.firstName} {team.coach.lastName}
                  </h3>
                </div>
                <div className="mb-6">
                  <h4 className="text-xl font-semibold mb-3 text-gray-400">
                    Runners
                  </h4>
                  <div className="flex flex-wrap px-4 xl:px-8 my-4 gap-8 justify-center">
                    {team.teamRunners.map((tr: ITeamPlayer) => (
                      <MemberCarouseltem
                        key={tr.id}
                        hideRole={true}
                        item={tr.runner}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel index={1} value={activeTab}>
              <div className="bg-white border-l-2 border-red-500 p-4">
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold capitalize mb-4">
                    Team Best
                  </h3>
                  {pbs.length ? (
                    <CustomTable
                      isTitleStraight={true}
                      isLoading={false}
                      titleColor="bg-black"
                      rows={transformClubResults(pbs)}
                    />
                  ) : (
                    <div className="px-4 py-6 border-red-500 border-l-2">
                      <p className="text-center text-xl font-semibold">
                        The team haven't participated yet
                      </p>
                    </div>
                  )}
                </div>
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold capitalize mb-6">
                    All Results
                  </h3>
                  <CustomTable
                    isTitleStraight={true}
                    isLoading={false}
                    titleColor="bg-black"
                    rows={tableRows}
                  />
                </div>
              </div>
            </TabPanel>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeamPage;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}
