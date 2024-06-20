import { auth } from "@/src/entities/Auth";
import { EventApi, EventArchiveCard } from "@/src/entities/Event";
import { NewsApi } from "@/src/entities/News";
import { RunnerApi } from "@/src/entities/Runner/api/RunnerApi";
import { TeamApi } from "@/src/entities/Team";
import {
  EventCardSlider,
  TeamsSlider,
  VideoHeader,
  networksLinks,
} from "@/src/features/home";
import { NewsCarousel } from "@/src/features/news";
import { RankingSection } from "@/src/features/ranking";
import { CustomSlider } from "@/src/shared/ui";
import { IconButton } from "@mui/material";
import Image from "next/image";

export default async function Home() {
  const session = await auth();

  const eventApi = new EventApi(session);
  const teamApi = new TeamApi(session);
  const newsApi = new NewsApi(session);
  const runnerApi = new RunnerApi(session);

  const { events } = await eventApi.getEventPreviews("finished=true");

  const { futureEvents } = await eventApi.getFututeEvents("announced=true");

  const teams = await teamApi.getPreviewTeams();

  const topRunners = await runnerApi.getTopAthletes(10);

  const { newsPreviews } = await newsApi.getNewsPreviews({ itemsAmount: 4 });

  return (
    <>
      <main className="w-full">
        <div className="2xl:px-[3%] 2xl:py-[2%] [1800px]:py-[3%] max-h-screen relative hidden sm:block">
          <VideoHeader />
        </div>
        <section className="py-6 relative px-4">
          <div className="flex items-center flex-col gqp-2 lg:gap-4">
            <Image
              src="/logo/abm-logo-black.svg"
              alt="card"
              width={980}
              height={600}
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
        <EventCardSlider events={futureEvents} />
        <NewsCarousel newsPreviews={newsPreviews} />
        <TeamsSlider teams={teams} />
        <RankingSection topRunners={topRunners} />
        <section className="my-12">
          <CustomSlider
            childPropName={"event"}
            items={events}
            ItemComponent={EventArchiveCard}
            title={"Past Events"}
          />
        </section>
        <div className="w-full bg-[#1E1C1F] py-4">
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

