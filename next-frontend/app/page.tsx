import { Header } from "@/src/app/components/Header";
import { auth } from "@/src/entities/Auth/utils";
import { EventArchiveSlider, EventCardSlider } from "@/src/entities/Events";
import { RankingSection } from "@/src/features/ranking";
import Image from "next/image";

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

const events = [
  {
    id: 1,
    title: "Ace Battle Mile Rating Cyprus",
    description: `Ace battle Mile orgranizes the first rating competitions in
    Cyprus. Registrations are available!`,
    imageUrl: "/images/paphos.jpg",
    date: "18-19 May 2024",
    location: "Paphos, Cyprus 16 Rue Kostas Linom",
    points: [
      `Runners from Cyprus will compete for prizes fund of about 30000$.`,
      "Get an official rating in Ace Battle Association",
      "Qualify for the Ace Battle League in December 2024",
    ],
  },
  {
    id: 2,
    title: "Ace Battle Mile Rating Cyprus",
    description: `Ace battle Mile orgranizes the first rating competitions in
    Cyprus. Registrations are available!`,
    imageUrl: "/images/paphos.jpg",
    date: "18-19 May 2024",
    location: "Paphos, Cyprus 16 Rue Kostas Linom",
    points: [
      `Runners from Cyprus will compete for prizes fund of about 30000$.`,
      "Get an official rating in Ace Battle Association",
      "Qualify for the Ace Battle League in December 2024",
    ],
  },
  {
    id: 3,
    title: "Ace Battle Mile Rating Cyprus",
    description: `Ace battle Mile orgranizes the first rating competitions in
    Cyprus. Registrations are available!`,
    imageUrl: "/images/paphos.jpg",
    date: "18-19 May 2024",
    location: "Paphos, Cyprus 16 Rue Kostas Linom",
    points: [
      `Runners from Cyprus will compete for prizes fund of about 30000$.`,
      "Get an official rating in Ace Battle Association",
      "Qualify for the Ace Battle League in December 2024",
    ],
  },
];

const archive = [
  {
    id: 1,
    title: "Brussels Mile",
    description: `Ace battle Mile orgranizes the first rating competitions in
    Cyprus. Registrations are available!`,
    imageUrl: "/images/brus-competition.jpg",
    date: "23 September 2023",
    location: "Brussels, Belgium 16 Rue Kostas Linom",
  },
];

export default async function Home() {
  const session = await auth();

  return (
    <>
      <Header session={session} />
      <main>
        <div className="2xl:px-[3%] 2xl:py-[2%] [1800px]:py-[3%] max-h-screen relative">
          <header className="w-full flex justify-center items-center flex-col shadow-lg relative">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full sm:h-[640px] xl:h-[800px] xl:max-h-[70vh] object-cover object-center top-0 left-0 z-[-1]"
            >
              <source src="/video/intro.MP4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
            {/* <IntroSlider events={data.events} /> */}
          </header>
        </div>
        <section className="py-6 relative">
          <div className="flex items-center flex-col gap-4">
            <Image
              src="/logo/abm-logo.png"
              width={250}
              height={250}
              alt="card"
              className="object-contain object-top w-[150px] md:w-[250px]"
            />
            <h3 className="w-full  text-2xl sm:text-4xl font-semibold text-[#333] text-center">
              Welcome to the revolutionary world of <br /> Ace Battle Mile!
            </h3>
            <div className="w-32 md:w-48 h-2 bg-black"></div>
            <p className="w-full  text-xl text-[#333] text-center mt-6">
              Running events have been transformed <br /> into epic battles
              between teams.
            </p>
          </div>
        </section>
        <EventCardSlider events={events} />

        <section className="relative mt-20">
          <div className="bg-[url('/images/stadium-lines-sm.png')] md:bg-[url('/images/stadium-lines.png')] bg-bottom bg-contain bg-no-repeat w-full sticky h-32 lg:h-96 left-0 bottom-0 -z-[1]"></div>
          <RankingSection />
        </section>
        <section className="my-20">
          <EventArchiveSlider events={archive} />
        </section>
        <section></section>
      </main>
    </>
  );
}

