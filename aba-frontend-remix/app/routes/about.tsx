import HomeIcon from "@mui/icons-material/Home";
import { Breadcrumbs, Typography } from "@mui/material";
import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useState } from "react";
import { HeaderTabs } from "~/components";
import AboutArticle from "~/components/about/AboutArticle";

export const meta: MetaFunction = () => {
  return [{ title: "Ace Battle Events | Rules" }];
};

const RulesPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["About", "Rules", "Structure"];

  const onChangeTab = (tab: number) => {
    setActiveTab(tab);
  };
  return (
    <>
      <HeaderTabs
        title={"About Ace Battle Mile"}
        bgImage={"/outdoor-sunny.jpg"}
        tabs={tabs}
        activeTab={activeTab}
        onChangeTab={onChangeTab}
      />
      <main className="my-4 max-w-6xl mx-4 lg:mx-auto">
        <Breadcrumbs aria-label="breadcrumb" className="mb-6">
          <Link className="hover:underline" color="inherit" to="/">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Home
          </Link>
          <Link to={"/rules"} color="inherit">
            <Typography className="hover:underline">About</Typography>
          </Link>
          <Typography
            color="text.primary"
            className="cursor-pointer hover:underline"
          >
            {tabs[activeTab]}
          </Typography>
        </Breadcrumbs>
        {activeTab === 0 && <AboutArticle />}
        {activeTab === 1 && (
          <>
            <div className="w-full mb-10">
              <h3 className="font-semibold text-2xl sm:text-3xl mb-4">
                Ace Battle Mile Rules
              </h3>
              <div className="flex w-full justify-between gap-6 flex-col md:flex-row">
                <div className="flex flex-col gap-4 max-w-[500px]">
                  <div>
                    <h4 className="font-semibold uppercase">
                      Team competitions.
                    </h4>
                    <p>
                      2 teams of five athletes each go to the start of the race.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold uppercase">
                      distance - 1 mile
                    </h4>
                    <p>
                      The distance that has to be reached is a mile, which in
                      numbers equals 1609 meters and 34 centimeters.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold uppercase">
                      According to the approved chip system
                    </h4>
                    <p>
                      the time of each athlete is recorded every 200 meters, and
                      the results in live mode are displayed on the information
                      panels, which show the total time of each team and the
                      difference between them in a specific time period. This
                      allows the team to control their position and quickly
                      change tactics.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold uppercase">WIN</h4>
                    <p>
                      The team that shows the best combined time of all
                      participants wins!
                    </p>
                  </div>
                </div>
                <div className="clip-heptagon h-[400px] px-6 md:pl-6 md:pr-28 py-8 w-full md:w-[500px] flex md:justify-center items-center bg-gray-200">
                  <div className="max-w-[200px] md:max-w-[300px]">
                    <h4 className="font-semibold uppercase">
                      The most interesting thing
                    </h4>
                    <p>
                      each team has two spare participants, the so-called{" "}
                      <strong>&quot;Jokers&quot;</strong>, who are in the
                      "corridor". They have the right to replace any member of
                      their team at any point of the race, but once a "joker"
                      enters the race they must continue until the finish line.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-3xl md:text-4xl font-semibold mb-6">Team</h2>
              <div className="mb-6">
                <p>
                  The team should consist of 7 athletes (5 starters + 2 jokers).
                </p>
                <p className="mb-4">
                  <strong>
                    Professional teams have one representative of different age
                    categories:
                  </strong>
                </p>
                <div className="flex flex-col gap-3 mb-6">
                  <div>
                    <strong>U-18</strong> <br />- 16-17 years old inclusive on
                    the day of the competition
                  </div>
                  <div>
                    <strong>U-20</strong> <br />- 18-19 years old inclusive on
                    the day of the competition
                  </div>
                  <div>
                    <strong>U-23</strong> <br />- 20-22 years old inclusive on
                    the day of the competition
                  </div>
                  <div>
                    <strong>Adult Athletes</strong> <br />- 23-35 years
                    inclusive on the day of the competition, and jokers, who
                    replaces one of the members of the team over the distance.
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {activeTab === 2 && (
          <div className="w-full my-8 mb-12">
            <h3 className="font-semibold text-2xl sm:text-3xl mb-4">
              Ace Battle Association Structure
            </h3>
            <div className="flex flex-wrap justify-around gap-6">
              <div className="w-full sm:w-1/3 flex flex-col gap-4">
                <h1 className="font-semibold uppercase text-3xl md:text-4xl">
                  Iurii
                  <br />
                  Podnebesnyi
                </h1>
                <p className="text-red-300">President</p>
              </div>
              <div className="w-full md:w-1/3 flex flex-col gap-4">
                <h1 className="font-semibold uppercase text-3xl md:text-4xl">
                  Oleksiy
                  <br />
                  Kulivets
                </h1>
                <p className="text-red-300">Vice President</p>
              </div>
              <div className="w-full md:w-1/3 flex flex-col gap-4">
                <h1 className="font-semibold uppercase text-3xl md:text-4xl">
                  Sergey
                  <br />
                  sek
                </h1>
                <p>Secretary</p>
              </div>
              <div className="w-full md:w-1/3 flex flex-col gap-4">
                <h1 className="font-semibold uppercase text-3xl md:text-4xl">
                  Nikita
                  <br />
                  Sydorenko
                </h1>
                <p>Administrator</p>
              </div>
              <div className="w-full md:w-1/3 flex flex-col gap-4">
                <h1 className="font-semibold uppercase text-3xl md:text-4xl">
                  Oleg
                  <br />
                  Schumacher
                </h1>
                <p>Financial derector</p>
              </div>
              <div className="w-full md:w-1/3 flex flex-col gap-4">
                <h1 className="font-semibold uppercase text-3xl md:text-4xl">
                  Vitaliy
                  <br />
                  sabulyak
                </h1>
                <p>
                  Director of refereeing
                  <br />
                  regulation / sporting regulations officer
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default RulesPage;
