import { LoaderArgs } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { Api } from "~/api/axiosInstance";
import { CustomTable, MemberCarouseltem, Pagination } from "~/components";
import { msToMinutesAndSeconds, transformClubResults } from "~/lib/utils";

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
    tableRows: transformClubResults(teamResultsData?.results || []),
  };
};

const TeamPage = () => {
  const { team, teamResultsData, currPage, tableRows } =
    useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const onChangePage = async (page: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set("resultPage", page.toString());
    url.searchParams.set("scrollY", window.scrollY.toString());
    navigate(url.pathname + url.search);
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const scrollY = url.searchParams.get("scrollY");
    if (scrollY) {
      window.scrollTo(0, +scrollY);
    }
  }, [currPage]);

  return (
    <>
      <header className="w-full flex justify-center h-96 sm:h-[600px] relative flex-col ">
        <img
          src={team.teamImage?.mediaUrl || "/profile-bg-lg.jpg"}
          alt="team-photo"
          className="absolute -z-10 top-0 left-0 w-full h-full object-cover object-top"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.4)] z-0"></div>
        <div className="h-3/5 mb-10 sm:mb-0 sm:h-1/2 md:ml-5 flex flex-row gap-4 justify-center items-center w-full sm:w-3/5 md:w-[600px] z-10">
          <div className="w-1/3">
            <img
              src={team?.logo.mediaUrl || ""}
              alt="avatar"
              width={300}
              height={300}
              className="object-cover "
            />
          </div>
          <h2 className="text-white uppercase font-semibold text-3xl sm:text-5xl mb-5">
            {team.name}
          </h2>
        </div>
      </header>
      <main>
        <div className="px-5 sm:px-10 py-5 bg-[#1E1C1F]">
          <h3 className="text-3xl text-white font-semibold">ABOUT TEAM</h3>
        </div>
        <div className="max-w-7xl my-6 mx-auto">
          <div className="py-4 mb-5 px-4 xl:px-0 border-b-[1px] border-black flex w-full justify-between">
            <div className="mr-4">
              <h4 className="text-xl font-semibold text-gray-400 mb-4">
                Coach
              </h4>
              <h2 className="text-2xl md:text-3xl font-semibold">
                {team.coach?.name} {team.coach?.surname}
              </h2>
            </div>
            {team.personalBest && (
              <div className="mr-4">
                <h4 className="text-xl font-semibold text-gray-400 mb-4">
                  Personal Best
                </h4>
                <h2 className="text-2xl md:text-3xl font-semibold">
                  {msToMinutesAndSeconds(team.personalBest.resultInMs)}
                </h2>
              </div>
            )}
          </div>
          <div className="my-5 px-4 xl:px-0">
            <h4 className="text-2xl font-semibold text-gray-400 mb-5">
              Runners
            </h4>
            <div className="flex flex-wrap px-4 xl:px-8 my-4 gap-8 justify-center">
              {team.players.map((player) => (
                <MemberCarouseltem key={player.id} item={player} />
              ))}
            </div>
          </div>
          <div className="my-5 px-4 xl:px-0">
            <h4 className="text-2xl font-semibold text-gray-400 mb-5">
              Last Races
            </h4>
            <CustomTable rows={tableRows} isLoading={false} />
            <div className="mt-4 flex justify-center">
              <Pagination
                onChangePage={(page) => onChangePage(page)}
                currPage={currPage}
                pagesCount={teamResultsData?.totalPages || 1}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default TeamPage;
