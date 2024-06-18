import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { IconButton, Skeleton } from "@mui/material";
import { json, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Api } from "~/api/axiosInstance";
import {
  AnnonceStripe,
  CarouselItem,
  NewsCard,
  SectionTitle,
  VideoItem,
} from "~/components";
import { EventArchiveCard } from "~/components/events/EventArchiveCard";
import { EventCard } from "~/components/events/EventCard";
import { RankingSection } from "~/components/main/RankingSection";
import VideoHeader from "~/components/shared/header/VideoHeader";

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

export const meta: MetaFunction = () => {
  return [
    { title: "Ace Battle Association | Main page" },
    { name: "description", content: "Welcome to the Ace Battle Association" },
  ];
};

export const loader = async () => {
  const data = await Api().events.getEventPreviews("finished=true");

  const { futureEvents: announcedEvents } = await Api().events.getFututeEvents(
    "announced=true"
  );

  const teams = await Api().teams.getPreviewTeams();

  if (!teams) {
    throw new Response("Teams not found.", {
      status: 404,
    });
  }

  const topRunners = await Api().athletes.getTopAthletes(10);

  const newsPreviewsData = await Api().news.getNewsPreviews({ itemsAmount: 4 });

  return json({
    topRunners,
    archive: data.events,
    announcedEvents,
    teams,
    newsPreviewsData,
  });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <main className="w-full">
      {data.announcedEvents.length && (
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          {data.announcedEvents
            ?.sort(
              (a, b) =>
                new Date(a.date!)?.getTime() - new Date(b.date!)?.getTime()
            )
            ?.map((event, i) => (
              <SwiperSlide key={event.id}>
                <AnnonceStripe eventPreview={event} />
              </SwiperSlide>
            ))}
        </Swiper>
      )}
      <div className="2xl:px-[3%] 2xl:py-[2%] [1800px]:py-[3%] max-h-screen relative hidden sm:block">
        <VideoHeader />
      </div>
      <section className="py-6 relative px-4">
        <div className="flex items-center flex-col gqp-2 lg:gap-4">
          <img
            src="/abm-logo-black.svg"
            alt="card"
            className="object-contain object-top w-[150px] md:w-[250px]"
          />
          <h3 className="w-full text-xl capitalize sm:text-2xl lg:text-4xl font-semibold text-[#333] text-center  max-w-2xl 2xl:max-w-3xl mb-2">
            Welcome to the new sports running game!
          </h3>
          <div className="w-32 md:w-48 h-1 lg:h-2 bg-black"></div>
          <p className="w-full text-md md:text-lg lg:text-xl text-[#333] text-center mt-2 lg:mt-6 max-w-2xl 2xl:max-w-3xl">
            Running events have been transformed into epic battles between
            teams.
          </p>
        </div>
      </section>
      <section className="max-w-7xl xl:mx-auto mx-2 mt-4 xl:mt-8">
        <h2 className="font-bold text-center text-2xl sm:text-3xl lg:text-4xl mb-4 lg:mb-6">
          Announcements
        </h2>
        <div className="flex flex-col gap-8">
          {data.announcedEvents.map((event, i) => (
            <EventCard key={i} futureEvent={event} />
          ))}
        </div>
      </section>
      <section className="my-6 lg:my-12 pl-5">
        <div className="max-w-7xl lg:mx-auto">
          <SectionTitle title="News and articles" />
          <Swiper
            spaceBetween={50}
            slidesPerView={3}
            breakpoints={{
              0: {
                slidesPerView: 1.2,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2.2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3.2,
                spaceBetween: 50,
              },
            }}
          >
            {data.newsPreviewsData?.newsPreviews.map((news, i) => (
              <SwiperSlide key={news.id}>
                <NewsCard item={news} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex gap-4 items-center mt-3">
            <div className="text-lg md:text-xl lg:text-2xl font-semibold">
              Read more in{" "}
              <Link to={"/news"} className="text-red-500 underline">
                News
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full mt-4 bg-[#1E1C1F] p-4">
        <div className="max-w-7xl mx-auto my-4">
          <SectionTitle
            title="Ace Battle Teams"
            textColor="text-white"
            borderColor="border-white"
          />
          <Swiper
            className="xl:ml-auto xl:mr-auto xl:max-w-[100vw]"
            spaceBetween={50}
            slidesPerView={3}
            breakpoints={{
              0: {
                slidesPerView: 2.5,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 3.5,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 4.5,
                spaceBetween: 50,
              },
            }}
          >
            {data.teams.map((team, i) => (
              <SwiperSlide key={team.id}>
                <CarouselItem item={team} />
              </SwiperSlide>
            ))}
          </Swiper>
          {!data.teams && (
            <div className="my-4 w-full sm:w-[400px] h-96">
              <Skeleton variant="rectangular" width="100%" height="100%" />
            </div>
          )}
        </div>
      </section>
      <RankingSection topRunners={data.topRunners as any} />
      <section className="max-w-7xl xl:mx-auto mt-8 xl:mt-12">
        <h2 className="font-bold text-3xl lg:text-4xl mx-2 mb-4 lg:mb-6">
          Archive
        </h2>
        <div className="flex flex-col gap-4">
          {data.archive?.map((event, i) => (
            <EventArchiveCard key={i} event={event} />
          ))}
        </div>
      </section>
      <section className="w-full my-6 md:my-10">
        <div className="max-w-7xl w-full px-4 lg:mx-auto">
          <SectionTitle title="Videos" align="justify-end" />
          <Swiper
            spaceBetween={50}
            slidesPerView={3}
            breakpoints={{
              0: {
                slidesPerView: 1.2,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2.2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3.2,
                spaceBetween: 50,
              },
            }}
          >
            <SwiperSlide>
              <VideoItem
                videoId="WSUfPBJf_P4"
                title="What's Battle Mile Structure and Rules"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
      <div className="w-full bg-[#1E1C1F] py-4">
        <div className="max-w-6xl mx-4 lg:mx-auto flex justify-between items-center gap-4">
          <h4 className="text-white text-2xl font-semibold">Follow us</h4>
          <div className="flex gap-4">
            {networksLinks.map((link, i) => (
              <a href={link.href} target="_blank" key={i} rel="noreferrer">
                <IconButton sx={{ bgcolor: "white" }}>
                  <link.icon className="text-red-500" fontSize="large" />
                </IconButton>
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
