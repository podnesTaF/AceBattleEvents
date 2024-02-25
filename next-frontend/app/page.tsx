import { auth } from "@/app/(auth)/_lib/utils/auth";
import Navbar from "@/common/components/navbar/Navbar";
import Image from "next/image";
import EventPreview from "./(home)/_components/EventPreview";

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

export default async function Home() {
  const session = await auth();

  return (
    <>
      <div className="fixed w-full left-0 top-0  flex justify-center pt-4 z-50">
        <Navbar session={session} />
      </div>
      <main>
        <EventPreview />
        <div className="relative bg-[url('/images/runners.jpg')] bg-fixed bg-center bg-cover bg-no-repeat w-full pt-64 lg:pt-96">
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
        <div className="relative bg-[url('/images/stadium-lines.png')] bg-fixed bg-bottom bg-contain bg-no-repeat w-full pt-64 lg:pt-96">
          <div className="flex flex-col lg:flex-row w-full">
            <div className="bg-[#EE342C] pt-4 flex-1 lg:pt-6 clip-hep  z-10">
              <h2 className="text-4xl xl:text-6xl pl-4 lg:pl-6 text-primary uppercase">
                Full scale event
              </h2>
              <div className="py-20 mx-auto lg:mx-0 lg:pl-10 text-white w-full lg:w-[70%]">
                <h3 className="text-3xl lg:text-4xl uppercase mb-20">
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
            </div>
            <div className="bg-white flex-1 relative">
              <div className="py-20 mx-auto lg:ml-20 text-black w-full">
                <h3 className="text-3xl lg:text-4xl uppercase mb-20">
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
                      <p className=" text-lg xl:text-xl">{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-gray-300 flex-1 relative ">
              <div className="py-20 mx-auto lg:ml-20 text-black w-full">
                <h3 className="text-3xl lg:text-4xl uppercase mb-20">
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
        </div>
      </main>
    </>
  );
}

