import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import HomeIcon from "@mui/icons-material/Home";
import { Breadcrumbs } from "@mui/material";
import { LoaderArgs, V2_MetaFunction, json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { Api } from "~/api/axiosInstance";
import { HeaderTabs } from "~/components";
import { getBattle } from "~/lib/utils";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Ace Battle Events | Race Details" }];
};

export const loader = async ({ request, params }: LoaderArgs) => {
  const raceId = params.raceId;

  if (!raceId) {
    throw new Response("No raceId provided");
  }

  const race = await Api().races.getFullRace(raceId);

  return json({ race });
};

const RacePage = () => {
  const { race } = useLoaderData<typeof loader>();
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  const onChangeTab = (tab: number) => {
    setActiveTab(tab);
    navigate(
      `/race/${race.id}/${
        tab === 0 ? "" : tab === 1 ? "runners" : "pacer-joker"
      }`
    );
  };

  return (
    <>
      <HeaderTabs
        bgImage="/auth-intro.jpg"
        tabs={["Overview", "Runners Results", "Pacer-Joker"]}
        title={getBattle(race) || ""}
        activeTab={activeTab}
        onChangeTab={onChangeTab}
      />
      <main className="max-w-6xl mx-4 lg:mx-auto my-6">
        <Breadcrumbs aria-label="breadcrumb">
          <Link className="hover:underline" color="inherit" to="/">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Home
          </Link>
          <Link to={"/race/" + race.id} className="text-red-500">
            <EmojiEventsIcon /> Race
          </Link>
        </Breadcrumbs>
        <Outlet />
      </main>
    </>
  );
};

export default RacePage;
