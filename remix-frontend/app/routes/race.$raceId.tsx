import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import HomeIcon from "@mui/icons-material/Home";
import { Breadcrumbs } from "@mui/material";
import { LoaderArgs, json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { Api } from "~/api/axiosInstance";
import { getBattle } from "~/lib/utils";

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
      <header className="w-full bg-[url('/auth-intro.jpg')] bg-cover bg-no-repeat bg-center h-[350px] md:h-[200px] relative flex items-end">
        <div className="w-full absolute bg-gradient-to-b from-transparent via-transparent to-black h-full left-0"></div>
        <div className="max-w-6xl w-full px-4 lg:px-0 lg:mx-auto pt-4 mt-auto z-10">
          <div className="w-full flex gap-4 items-center justify-start pb-4 border-b-2 border-red-500">
            <div className="bg-red-500 w-4 h-12"></div>
            <h3 className="text-white text-2xl font-semibold">
              {getBattle(race)}
            </h3>
          </div>
          <div className="flex w-full">
            <div
              onClick={() => onChangeTab(0)}
              className={`w-1/3 border-r-2 ${
                activeTab === 0 ? "bg-red-500" : "bg-black"
              } border-red-500 flex justify-center items-center py-2`}
            >
              <h4
                className={`text-xl font-semibold cursor-pointer ${
                  activeTab === 0 ? "text-white" : "text-gray-400"
                }`}
              >
                Overview
              </h4>
            </div>
            <div
              onClick={() => onChangeTab(1)}
              className={`w-1/3 border-r-2 ${
                activeTab === 1 ? "bg-red-500" : "bg-black"
              } border-red-500 flex justify-center items-center py-2`}
            >
              <h4
                className={`text-xl font-semibold cursor-pointer ${
                  activeTab === 1 ? "text-white" : "text-gray-400"
                }`}
              >
                Runners Results
              </h4>
            </div>
            <div
              onClick={() => onChangeTab(2)}
              className={`w-1/3 flex ${
                activeTab === 2 ? "bg-red-500" : "bg-black"
              } justify-center items-center py-2`}
            >
              <h4
                className={`text-xl font-semibold cursor-pointer ${
                  activeTab === 2 ? "text-white" : "text-gray-400"
                }`}
              >
                Pacers-Jokers Results
              </h4>
            </div>
          </div>
        </div>
      </header>
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
