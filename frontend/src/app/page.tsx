"use client";

import CustomTitle from "@/components/shared/CustomTitle";
import { useMoralis } from "react-moralis";

const textStyles =
  "text-lg sm:text-xl text-white border-r-2 border-red-500 px-2 sm:px-4 w-1/4 uppercase text-center";

const supportedChains = ["31337", "5"];

export default function Home() {
  const { isWeb3Enabled, chainId } = useMoralis();
  const chainIdString = chainId ? parseInt(chainId).toString() : "0";

  return (
    <>
      <header className="w-full flex justify-center items-center h-96 h-calc-screen bg-[url('/main-intro.jpg')] bg-fixed bg-cover bg-no-repeat bg-top relative flex-col ">
        <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.4)] z-0"></div>
        <div className="sm:bg-[#1E1C1F] flex flex-col justify-center items-center sm:w-4/5 md:w-3/4 lg:w-3/5 xl:w-1/2 md:p-5 lg:p-10 h-80 z-10">
          <h2 className="text-4xl text-white uppercase font-semibold flex-1 flex items-center">
            ACE BATTLE EVENTS
          </h2>
          <div className="hidden sm:flex justify-center w-full p-4">
            <p className={textStyles}>Buy</p>
            <p className={textStyles}>Analyse</p>
            <p className={textStyles}>Register</p>
            <p className="text-lg sm:text-xl text-white px-2 sm:px-4 w-1/4 uppercase text-center">
              Win
            </p>
          </div>
        </div>
        <div className="flex sm:hidden justify-center w-full py-4 px-2 bg-[#1E1C1F] z-10">
          <p className={textStyles}>Buy</p>
          <p className={textStyles}>Analyse</p>
          <p className={textStyles}>Register</p>
          <p className="text-lg sm:text-xl text-white px-2 sm:px-4 w-1/4 uppercase text-center">
            Win
          </p>
        </div>
      </header>
      <main>
        <CustomTitle title={"BATTLE MILE"} subtitle=" RUNNING COMPETITIONS" />
        <section className="py-[10%] max-w-4xl flex justify-center mx-auto">
          <img
            src="/auth-card.jpg"
            alt="card"
            className="object-cover object-top mr-6 w-1/2 max-h-[450px]"
          />
          <div className="flex flex-col justify-center w-1/2">
            <h3 className="text-xl sm:text-2xl font-semibold">
              Welcome to the revolutionary world of Battle Mile.
            </h3>
            <p className="mt-5 sm:mt-10">
              Running events have been transformed into epic battles between
              teams. We are thrilled to present to you our cutting-edge web3
              marketplace, designed exclusively for running club managers and
              coaches.
            </p>
          </div>
        </section>
        <section className="w-full">
          <div className="w-full bg-[url('/main-sect-bg.jpg')] bg-fixed bg-cover bg-top min-h-[380px] md:min-h-[480px] lg:min-h-[580px] relative flex items-end">
            <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.4)] z-0"></div>
            <div className="p-5 sm:p-10 sm:bg-[#1E1C1F] w-full sm:w-3/4 md:w-1/2 z-10">
              <div className="max-w-[240px] mb-5">
                <h3 className="text-white text-2xl font-semibold">
                  Join us in this extraordinary journey.
                </h3>
              </div>
              <div className="hidden sm:flex sm:max-w-[300px] ml-auto">
                <p className="text-white text-sm">
                  Join us in this extraordinary journey, where passion meets
                  competition and running transcends its boundaries. Step onto
                  the battlefield, and let the Battle Mile web3 marketplace
                  become your gateway to an unparalleled running experience.
                  Register your team today, and prepare to make history in the
                  realm of running battles.
                </p>
              </div>
            </div>
          </div>
          <div className="block sm:hidden ml-auto p-8 bg-[#1E1C1F]">
            <p className="text-white text-sm">
              Join us in this extraordinary journey, where passion meets
              competition and running transcends its boundaries. Step onto the
              battlefield, and let the Battle Mile web3 marketplace become your
              gateway to an unparalleled running experience. Register your team
              today, and prepare to make history in the realm of running
              battles.
            </p>
          </div>
        </section>
        <section className="m-8 bg-gray-100 p-4 sm:p-10 flex flex-col sm:flex-row justify-between">
          <div className="mr-5 w-full sm:w-1/2">
            <h3 className="text-2xl font-semibold mb-5">Ace Battle Websites</h3>
            <p className="text-sm">
              You can find additional ace battle websites to dive deeper into
              the idea of our organization. “Ace Battle Bet” - betting website
              for our competitions. You can analyse results there and get more
              acquainted with professional teams. “ABA” - website to explore our
              organization and past results
            </p>
          </div>

          <div className="flex w-full mt-5 sm:mt-0 sm:w-1/2 flex-col justify-around items-center">
            <img src="/abb-logo.png" alt="abb" className="w-64 mb-5" />
            <img src="/aba-logo.png" alt="abb" className="w-64" />
          </div>
        </section>
      </main>
    </>
  );
}
