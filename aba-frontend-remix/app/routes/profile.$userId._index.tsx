import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useMemo, useState } from "react";
import { Api } from "~/api/axiosInstance";
import {
  PersonalCalendarSection,
  ProfileTabs,
  ResultsSection,
  TeamSection,
} from "~/components";
import { TabReturnData } from "~/lib/types";
import { authenticator, getProfileTabs, isRunner } from "~/lib/utils";

export const loader = async ({ params, request }: LoaderArgs) => {
  const { userId } = params;

  const selectedTab = new URL(request.url).searchParams.get("tab");

  const resultPage = new URL(request.url).searchParams.get("resultPage") || 1;

  const resultYear = new URL(request.url).searchParams.get("year") || "";
  const resultCategory =
    new URL(request.url).searchParams.get("category") || "";

  const authedUser = await authenticator.isAuthenticated(request);
  const user = await Api().users.getUserProfile(userId || "");

  if (!user) throw new Response("No user found", { status: 404 });

  const returnData: TabReturnData = {
    tab: selectedTab,
    user,
    authedUser,
    resultCategory,
  };

  if (isRunner(user)) {
    const runnerTeams = await Api().teams.getTeamsByUserId(user.id.toString());
    const calendar = await Api().teams.getPersonalCalendar(user.id);
    const resultsData = await Api().users.getUserResults({
      id: user.id,
      page: +resultPage,
      resultCategory,
      resultYear: resultYear ? +resultYear : undefined,
    });

    returnData.runnerTeams = runnerTeams;
    returnData.calendar = calendar;
    returnData.resultsData = resultsData;
  }

  return json(returnData);
};

const PublicUserProfile = () => {
  const { user, authedUser, tab, runnerTeams, calendar, resultsData } =
    useLoaderData<typeof loader>() as unknown as TabReturnData;
  const [activeTab, setActiveTab] = useState(0);
  const tabsByRole = useMemo(
    () => getProfileTabs(authedUser?.id === user?.id, user?.roles),
    [user, authedUser]
  );

  return (
    <ProfileTabs
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      tabsByRole={tabsByRole}
    >
      {tabsByRole[activeTab] === "Teams" && (
        <TeamSection runnerTeams={runnerTeams} user={user} />
      )}
      {tabsByRole[activeTab] === "Calendar" && (
        <PersonalCalendarSection user={user} registrations={calendar} />
      )}
      {tabsByRole[activeTab] === "Results" && (
        <ResultsSection user={user} resultsData={resultsData} />
      )}
    </ProfileTabs>
  );
};

export default PublicUserProfile;
