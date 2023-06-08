"use client";

import TollIcon from "@mui/icons-material/Toll";
import { Divider } from "@mui/material";
import Image from "next/image";
import React from "react";
import Tab from "./Tab";

interface ProfileProps {
  params: {
    id: string;
  };
}

const Profile: React.FC<ProfileProps> = ({ params: { id } }) => {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <>
      <header className="w-full flex flex-col md:h-[800px] relative">
        <div className="absolute h-64 md:h-full bg-[url('/main-intro.jpg')] left-0 top-0 w-full bg-cover bg-no-repeat bg-top">
          <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.4)] z-0"></div>
        </div>
        <div className="mt-8 mx-auto z-10 h-1/5">
          <h3 className="text-white text-3xl md:text-4xl uppercase font-semibold">
            Personal cabinet
          </h3>
        </div>
        <div className="flex flex-col md:flex-row rounded-lg md:bg-white p-3 md:p-6 mx-auto max-w-5xl w-full md:w-4/5 lg:2/3 z-10">
          <div className="relative w-[300px] rounded-2xl mx-auto">
            <Image
              src="/avatar.jpg"
              alt="profile"
              className="rounded-2xl"
              width={300}
              height={300}
            />
            <div className="absolute -top-4 px-5 py-2 bg-red-700 rounded-md left-1/2 -translate-x-1/2">
              <p className="text-white text-xl font-semibold">manager</p>
            </div>
          </div>
          <div className="flex-1 flex justify-between items-center md:items-start">
            <div className="md:ml-10 flex flex-col md:h-full mt-5 md:mt-0">
              <div className="flex-1">
                <h3 className="text-3xl md:text-4xl font-semibold">
                  Oleksii <br />
                  Pidnebesnyi
                </h3>
              </div>
              <p className="text-xl font-semibold">Club “Muse Run”</p>
              <p className="text-xl font-semibold text-gray-400">
                Brussels | Belgium
              </p>
            </div>
            <div
              className={
                "flex items-center justify-center rounded border-[1px] border-black p-3"
              }
            >
              <TollIcon className={"text-black-400"} />
              <p className={"ml-2 text-xl"}>99 bc</p>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-4 xl-auto mt-4 mb-8 md:mx-auto">
        <Divider className="md:hidden" />
        <div className="flex w-full gap-1 md:gap-2 border-b-[1px] border-b-red-500">
          {["Teams", "Registrations", "Transactions"].map((title, index) => (
            <Tab
              key={index}
              onClick={() => setActiveTab(index)}
              isActive={index === activeTab}
              title={title}
            />
          ))}
        </div>
        <div className="p-4 md:p-6 border-[1px] border-t-0 border-red-500 rounded-b-lg">
          <h2 className="text-3xl font-semibold mb-4 text-center">
            Your teams
          </h2>
        </div>
      </main>
    </>
  );
};

export default Profile;
