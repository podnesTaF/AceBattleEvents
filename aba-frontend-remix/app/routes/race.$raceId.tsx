import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import HomeIcon from "@mui/icons-material/Home";
import { LoaderArgs, V2_MetaFunction, json } from "@remix-run/node";
import { Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { Api } from "~/api/axiosInstance";
import { CustomCrumbs, HeaderTabs } from "~/components";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Ace Battle Events | Race Details" }];
};

export const loader = async ({ request, params }: LoaderArgs) => {
  const raceId = params.raceId;

  const { url } = request;
  const tabName = url.split("/").pop();
  let tab = 0;

  switch (tabName) {
    case "runners":
      tab = 1;
      break;
    case "pacer-joker":
      tab = 2;
      break;
    default:
      tab = 0;
      break;
  }

  if (!raceId) {
    throw new Response("No raceId provided");
  }

  const race = await Api().races.getFullRace(raceId);

  if (!race) {
    throw new Response("No race found");
  }

  return json({ race, tab });
};

const RacePage = () => {
  const { race, tab } = useLoaderData<typeof loader>();
  const [activeTab, setActiveTab] = useState(tab);
  const navigate = useNavigate();

  const onChangeTab = (tab: number) => {
    setActiveTab(tab);
    navigate(
      `/race/${race.id}/${
        tab === 0 ? "" : tab === 1 ? "runners" : "pacer-joker"
      }`
    );
  };

  const links = [
    {
      title: "Home",
      url: "/",
      icon: HomeIcon,
    },
    {
      title: "Event results",
      url: "/results",
    },
    {
      title: race.eventRaceType.event.title,
      url: "/results/" + race.eventRaceType.event.eventCode,
    },
    {
      title: race.name,
      url: "/race/" + race.id,
      icon: EmojiEventsIcon,
      active: true,
    },
  ];

  return (
    <>
      <HeaderTabs
        bgImage="/outdoor-sunny.jpg"
        tabs={["Overview", "Runners Results", "Pacer-Joker"]}
        title={race.name}
        activeTab={activeTab}
        onChangeTab={onChangeTab}
      />
      <main className="max-w-6xl mx-4 lg:mx-auto my-6 mb-10">
        <CustomCrumbs links={links} />
        <Outlet />
      </main>
    </>
  );
};

export default RacePage;
