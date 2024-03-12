import { AthleteApi } from "@/src/entities/Athletes";
import { InfoContainer, RunnerTabs } from "@/src/features/profile/runner";
import {
  formatDateToDots,
  getCountryFlagSrc,
  getImageSrc,
} from "@/src/shared/lib";
import Image from "next/image";
import React from "react";

const RunnerProfileLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) => {
  const atheleteApi = new AthleteApi();
  const runner = await atheleteApi.getAthlete(params.id);

  const tabs = [
    {
      label: "Teams",
      link: `/runner/${params.id}/teams`,
    },
  ];

  if (!runner) {
    return null;
  }

  return (
    <>
      <header className="w-full my-4">
        <div className="flex flex-col md:flex-row relative pt-6 md:pt-0 min-h-96 3xl:min-h-[580px]">
          <Image
            src="/images/profile-bg-lg.jpg"
            alt="profile bg image"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            quality={100}
            className="hidden md:flex absolute left-0 top-0 h-full w-full object-cover"
          />
          <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b-light">
            <div className="flex flex-col md:flex-row w-full h-full mx-auto px-[5%] 3xl:px-[10%] justify-between md:items-end gap-7">
              <div className="relative w-full md:w-auto flex justify-center mt-4">
                <Image
                  src={getImageSrc(runner.avatarName, "images", runner.id)}
                  alt="profile"
                  className="rounded object-cover w-[300px] h-[300px] md:w-[260px] md:h-[260px]"
                  width={300}
                  height={300}
                />
              </div>
              <div className="flex-1 w-full flex gap-5 justify-between self-end">
                <div className="flex-1 md:mt-6">
                  <h3 className="text-2xl md:text-3xl font-semibold mb-5">
                    {runner.firstName} {runner.lastName}
                  </h3>
                  <div className="flex gap-2 items-center mb-5">
                    <Image
                      src={getCountryFlagSrc(runner.country?.shortName)}
                      alt="flag"
                      width={40}
                      height={60}
                      className="h-auto"
                    />
                    <p className="font-semibold text-xl text-gray-400">
                      {runner.city} {runner.country?.name}
                    </p>
                  </div>
                  <p className="font-semibold text-xl">
                    {runner.dateOfBirth
                      ? formatDateToDots(runner.dateOfBirth)
                      : "No DOB provided"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="px-4 w-full xl:px-[5%] 3xl:px-[10%] xl:mx-auto flex gap-8 pb-8">
        <div className="max-w-sm hidden xl:block">
          <InfoContainer
            title="Runner Info"
            items={[
              {
                label: "Category",
                value: runner.category?.name || "No category provided",
              },
              {
                label: "Total points",
                value: 1000,
              },
              {
                label: "Category Rank",
                value: 10,
              },
              {
                label: "Total Rank:",
                value: 100,
              },
            ]}
          />
        </div>
        <div className="w-full">
          <RunnerTabs tabs={tabs} />
          {children}
        </div>
      </main>
    </>
  );
};

export default RunnerProfileLayout;
