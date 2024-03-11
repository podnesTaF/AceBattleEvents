import { NewsCard } from "@/common/components/news/NewsCard";
import { Header } from "@/src/app/components/Header";
import { auth } from "@/src/entities/Auth/utils";
import { Button } from "@/src/shared/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import EventPreview from "./(home)/_components/EventPreview";
import Ranking from "./(home)/_components/Ranking";

const fascinatigSport = [
  "Based on the most affordable, and trending human activity running.",
  "Embraces running professionals along with youth generation and amateurs.",
  "Entertaining all the way as the battle is continued till the last moment.",
  "Meets demanding audience requests on more drama in less time.",
];

const entertainment = [
  "Top musical artists.",
  "Immersive activity areas and sponsors activities.",
  "Something to get by all the audience tiers: from the general public and families to top level hospitality.",
];

const tech = [
  "Innovative tracking and telemetry software.",
  "Data driven analytics and forecasts.",
  "All access broadcasts with state-of-art graphics.",
  "Data security.",
];

const news = [
  {
    id: 1,
    headImageSrc: "/images/paphos.jpg",
    title: "New event in Paphos",
    date: "2024-05-11T10:00:00",
    description: "The next event will take place in Paphos, Cyprus",
  },
  {
    id: 2,
    headImageSrc: "/images/paphos.jpg",
    title: "New event in Paphos",
    date: "2024-05-11T10:00:00",
    description: "The next event will take place in Paphos, Cyprus",
  },
  {
    id: 3,
    headImageSrc: "/images/paphos.jpg",
    title: "New event in Paphos",
    date: "2024-05-11T10:00:00",
    description: "The next event will take place in Paphos, Cyprus",
  },
];

export default async function Home() {
  const session = await auth();

  return (
    <>
      <Header session={session} />
      <main>
        <EventPreview />
        <div className="relative w-full">
          <Image
            src={"/images/runners.jpg"}
            alt="runners"
            width={800}
            height={600}
            className="object-cover h-80 lg:h-96 2xl:h-[500px] w-full sticky left-0 top-0 -z-[1]"
          />
          <div className="bg-primary flex flex-col justify-center items-center py-16 lg:py-24 px-12 gap-6 md:gap-12 text-white text-center">
            <Image
              src={"/logo/abm-logo.png"}
              alt="abm"
              width={250}
              height={200}
              className="w-40 h-auto lg:w-64"
            />
            <h2 className="text-4xl lg:text-5xl uppercase">
              A team running game
            </h2>
            <p className="text-white text-xl lg:text-2xl max-w-lg">
              Running events have been transformed into epic battles between
              teams.
            </p>
          </div>
        </div>
        <div className="relative ">
          <div className="bg-[url('/images/stadium-lines-sm.png')] md:bg-[url('/images/stadium-lines.png')] bg-bottom bg-contain bg-no-repeat w-full sticky h-80 lg:h-96 left-0 bottom-0 -z-[1]"></div>
          <div className="flex flex-col lg:flex-row w-full bg-white">
            <div className="clip-pen bg-[#EE342C] w-full lg:w-2/3">
              <h2 className="text-4xl xl:text-5xl py-6 2xl:text-6xl pl-4 lg:pl-6 text-primary uppercase text-center lg:text-left">
                Full scale event
              </h2>
            </div>
            <div className="w-full hidden lg:block bg-gray-300 lg:w-1/3"></div>
          </div>
          <div className="flex flex-col lg:flex-row w-full bg-white">
            <div className="flex-1 bg-[#EE342C] p-6  lg:pt-10 text-white flex flex-col items-center min-h-[520px]">
              <h3 className="text-3xl lg:text-4xl uppercase mb-10 lg:mb-20">
                Fascinating sport
              </h3>
              <ul className="list-none flex flex-col gap-4">
                {fascinatigSport.map((feature, index) => (
                  <li key={index} className="flex gap-2">
                    <Image
                      src={"/icons/point.svg"}
                      width={20}
                      height={20}
                      className="w-4 h-4 lg:w-6 lg:h-6"
                      alt="tick"
                    />
                    <p className=" text-lg xl:text-xl">{feature}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 bg-white p-6 pt-6 lg:pt-10 flex flex-col items-center min-h-[520px]">
              <h3 className="text-3xl lg:text-4xl uppercase mb-10 lg:mb-20">
                entertainment
              </h3>
              <ul className="list-none flex flex-col gap-4">
                {entertainment.map((feature, index) => (
                  <li key={index} className="flex gap-2">
                    <Image
                      src={"/icons/point.svg"}
                      width={20}
                      height={20}
                      className="w-4 h-4 lg:w-6 lg:h-6"
                      alt="tick"
                    />
                    <p className="text-lg 2xl:text-xl">{feature}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 bg-gray-300 p-6 lg:pt-10 flex flex-col items-center min-h-[520px]">
              <h3 className="text-3xl lg:text-4xl uppercase mb-10 lg:mb-20">
                TECHNOLOGY
              </h3>
              <ul className="list-none flex flex-col gap-4">
                {tech.map((feature, index) => (
                  <li key={index} className="flex gap-2">
                    <Image
                      src={"/icons/point.svg"}
                      width={20}
                      height={20}
                      className="w-4 h-4 lg:w-6 lg:h-6"
                      alt="tick"
                    />
                    <p className=" text-lg xl:text-xl">{feature}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="bg-[url('/images/abm_brandwall.jpg')] bg-center sticky top-0 left-0 h-80 lg:h-96  bg-cover bg-no-repeat w-full"></div>
          <div className="absolute bg-black/30 left-0 top-0 h-full w-full z-[0]"></div>
          <div className="bg-primary flex flex-col justify-center items-center py-12 lg:py-20 px-12 gap-6 lg:gap-10 text-white text-center relative z-[2]">
            <h2 className="gradient-text-light text-4xl lg:text-5xl">
              Brussels Mile
            </h2>
            <h4 className="text-xl xl:text-2xl text-white">
              Introduction of ABM in Brussels
            </h4>
          </div>
          <div className="md:min-h-screen relative flex justify-center items-center">
            <Image
              src={"/images/brus-competition.jpg"}
              layout="fill"
              objectFit="cover"
              alt="competitions"
              className="absolute left-0 top-0 h-96 md:h-full w-full z-[1]"
            />
            <div className="absolute bg-black/30 left-0 top-0 h-full w-full z-[2]"></div>
            <div className="max-w-[1500px] md:px-6 lg:px-10 w-full flex flex-col-reverse lg:flex-row justify-between items-end z-[3] ">
              <div className="md:bg-transparent py-10 text-white bg-primary  pl-[10%] lg:pl-0 self-start w-full">
                <h4 className="mb-4">Event news</h4>
                <div className="flex w-full lg:flex-col gap-8 lg:gap-12">
                  {news.map(
                    (item, index) =>
                      index !== 0 && (
                        <div
                          key={item.id}
                          className="flex w-72 xl:w-80 2xl:w-96 bg-white/10"
                        >
                          <NewsCard
                            headImageSrc={item.headImageSrc}
                            title={item.title}
                            date={item.date}
                            description={item.description}
                            variant={"dark"}
                          />
                        </div>
                      )
                  )}
                </div>
              </div>
              <div className="flex items-end min-h-96 p-4 pb-12">
                <div className="flex gap-3 flex-col text-white">
                  <div className="flex gap-2 items-center">
                    <h5 className="text-xl lg:text-2xl">Belgium, Brussels</h5>
                  </div>
                  <h5>24 sep 2023</h5>
                  <Button
                    size="lg"
                    className="btn-clip pl-8 lg:pl-10 pr-10 lg:pr-16 py-6 lg:py-8 rounded-none border-none"
                    variant={"destructive"}
                  >
                    <div className="flex gap-2 items-center text-white font-semibold text-lg lg:text-xl">
                      <p className="text-white">View Results</p>
                      <ArrowUpRight size={20} />
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Ranking />
      </main>
    </>
  );
}

