import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { json, type V2_MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { IconButton, Skeleton } from "@mui/material";
import { Api } from "~/api/axiosInstance";
import {
  CarouselItem,
  CustomCarousel,
  IntroSlider,
  NewsCard,
  SectionTitle,
  VideoItem,
  WideCarousel,
} from "~/components";

const networksLinks = [
  {
    title: "Youtube",
    href: "https://www.youtube.com/channel/UCMdyoMWNkZZ1UCTnarBnhcg",
    icon: YouTubeIcon,
  },
  {
    title: "Instagram",
    href: "https://www.instagram.com/ace_battle_mile/",
    icon: InstagramIcon,
  },
  {
    title: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100043279343057",
    icon: FacebookIcon,
  },
];

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Ace Battle Events | Main page" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const data = await Api().events.getEvents("finished=true");

  const teams = await Api().teams.getPreviewTeams();

  if (!teams) {
    throw new Response("Teams not found.", {
      status: 404,
    });
  }

  const newsPreviewsData = await Api().news.getNewsPreviews({ itemsAmount: 4 });

  return json({ events: data.events, teams, newsPreviewsData });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <header className="w-full flex justify-center items-center h-calc-screen bg-fixed bg-cover bg-no-repeat bg-top relative flex-col ">
        <IntroSlider events={data.events} />
      </header>
      <main className="w-full">
        <section className="w-screen py-10 md:py-16 relative">
          <div className="flex max-w-4xl justify-center md:justify-end mx-4 lg:mx-auto gap-4 md:gap-10 flex-wrap">
            <img
              src="/abm-logo-white.svg"
              alt="card"
              className="object-contain object-top w-[150px] md:w-[250px]"
            />
            <h3 className="w-full sm:w-2/5 md:w-1/2 text-2xl sm:text-4xl font-semibold text-white text-center">
              Welcome to the revolutionary world of Ace Battle Mile!
            </h3>
            <p className="w-full sm:w-2/5 md:w-1/2 text-xl text-white text-center">
              Running events have been transformed into epic battles between
              teams.
            </p>
          </div>
          <img
            src={"/main-page-rect.svg"}
            className="absolute bottom-0 left-0 z-[-1] object-cover object-bottom w-screen h-full"
          />
        </section>
        <section className="my-6">
          <div className="max-w-7xl mx-4 lg:mx-auto">
            <SectionTitle title="News and articles" />
            <WideCarousel
              ItemCard={NewsCard}
              items={data.newsPreviewsData?.newsPreviews}
            />
            <div className="flex gap-4 items-center">
              <div className="w-4 h-6 bg-red-500"></div>
              <div className="text-2xl font-semibold">
                Read more in{" "}
                <Link to={"/news"} className="text-red-500 underline">
                  News
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full my-4 bg-[#1E1C1F] p-4">
          <div className="max-w-7xl mx-auto my-4 flex flex-col items-center justify-center overflow-hidden">
            <SectionTitle
              title="Ace Battle Teams"
              textColor="text-white"
              borderColor="border-white"
            />
            {data.teams ? (
              <CustomCarousel
                initTranslate={data.teams.length * 200 - 600}
                items={data.teams}
                ItemCard={CarouselItem}
              />
            ) : (
              <div className="my-4 w-full sm:w-[400px] h-96">
                <Skeleton variant="rectangular" width="100%" height="100%" />
              </div>
            )}
          </div>
        </section>
        <section className="w-full my-6 md:my-10">
          <div className="max-w-6xl w-full px-4 lg:mx-auto">
            <SectionTitle title="Videos" align="justify-end" />
            <div className="w-full flex gap-6 flex-col lg:flex-row">
              <div className="w-full md:w-1/3 border-b-4 rounded-bl-2xl border-red-500 shadow-md">
                <VideoItem
                  videoId="WSUfPBJf_P4"
                  title="What's Battle Mile Structure and Rules"
                />
              </div>
              <div className="w-full md:w-1/3 border-b-4 rounded-bl-2xl border-red-500 shadow-md">
                <VideoItem
                  videoId="RRs8Z7GQmdk"
                  title="What's Battle Mile? Structure and Rules."
                />
              </div>
              <div className="w-full md:w-1/3 border-b-4 rounded-bl-2xl border-red-500 shadow-md">
                <VideoItem
                  videoId="kehD79rNiyU"
                  title="
                  Signing of the Memorandum between Battle Mile and Sport for All"
                />
              </div>
            </div>
          </div>
        </section>
        <div className="w-full bg-red-500 py-4">
          <div className="max-w-6xl mx-4 lg:mx-auto flex justify-between items-center gap-4">
            <h4 className="text-white text-2xl font-semibold">Follow us</h4>
            <div className="flex gap-4">
              {networksLinks.map((link, i) => (
                <a href={link.href} target="_blank" key={i}>
                  <IconButton sx={{ bgcolor: "white" }}>
                    <link.icon className="text-red-500" fontSize="large" />
                  </IconButton>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
