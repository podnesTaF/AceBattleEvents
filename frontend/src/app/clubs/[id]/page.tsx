"use client";
import MemberCarouseltem from "@/components/clubs/MemberCarouseltem";
import FilterSelect from "@/components/events/FilterSelect";
import NewsCard from "@/components/news/NewsCard";
import AgreeCheck from "@/components/shared/AgreeCheck";
import CustomCarousel from "@/components/shared/CustomCarousel";
import CustomTable from "@/components/shared/CustomTable";
import FormButton from "@/components/shared/FormButton";
import { useFilter } from "@/hooks/useFilter";
import { useFetchClubQuery } from "@/services/clubService";
import { years } from "@/utils/events-filter-values";
import { fakeNews, fakeReslts } from "@/utils/tables-dummy-data";
import Image from "next/image";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}
const ClubPage: React.FC<Props> = ({ params: { id } }) => {
  const { filters, searchValue, setSearchValue, onChangeFilter } = useFilter();
  const {
    data: club,
    isLoading,
    error,
  } = useFetchClubQuery({ id: +id || null });

  if (isLoading || !club) return <div>loading...</div>;

  console.log(club.members);

  return (
    <>
      <header className="relative w-full h-[400px] md:h-[700px] overflow-hidden">
        <Image
          src={club.photo?.mediaUrl || "/clubs-lg.jpg"}
          alt="club photo"
          width={1480}
          height={720}
          className="object-cover w-full"
        />
        <div className="absolute w-full md:w-3/4 lg:w-1/2 bottom-0 left-0 p-4 md:p-6 bg-gradient-to-b from-transparent to-black">
          <h4 className="border-b-2 border-red-500 py-2 mb-4 text-lg font-semibold text-white">
            {club.country}
          </h4>
          <h2 className="text-3xl md:text-5xl text-white font-semibold my-4 md:my-6">
            {club.name}
          </h2>
        </div>
      </header>
      <main>
        <section className="bg-[#1E1C1F] w-full py-8 md:py-16">
          <div className="max-w-6xl px-6 mx-auto sm:mx-6 lg:mx-auto w-full flex flex-col sm:flex-row justify-between gap-6 ">
            <Image
              src={
                club.logo?.mediaUrl ||
                "https://storage.googleapis.com/abe_cloud_storage/image/large/c4bccba0-3f80-4eb5-b50f-63e5cd4f0100.jpg"
              }
              alt={"club logo"}
              width={300}
              height={310}
              className="w-2/3 sm:w-1/3 lg:w-1/4 xl:w-1/5 object-cover"
            />
            <div className="flex flex-col md:flex-row w-1/2 md:w-2/3 justify-between">
              <div className="flex flex-col gap-4 items-center">
                <h4 className="text-white text-lg font-semibold border-b-[1px] border-red-500 w-full">
                  Location:
                </h4>
                <div className="flex gap-2 items-center">
                  <Image
                    src={"/belgium.svg"}
                    alt="country"
                    width={60}
                    height={40}
                  />
                  <h3 className="text-xl md:text-2xl text-white">
                    {club.country}, <br /> {club.city}
                  </h3>
                </div>
              </div>
              <div className="flex flex-col gap-4 items-center">
                <h4 className="text-white text-lg font-semibold border-b-[1px] border-red-500">
                  Members:
                </h4>
                <h3 className="text-2xl text-white">23</h3>
              </div>
              <div className="flex flex-col gap-4 items-center">
                <h4 className="text-white text-lg font-semibold border-b-[1px] border-red-500">
                  Races Finished:
                </h4>
                <h3 className="text-2xl text-white">0</h3>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-[url('/club-results.jpg')] bg-cover bg-no-repeat">
          <div className="max-w-5xl mx-4 lg:mx-auto rounded-t-xl overflow-hidden pt-6">
            <div className="bg-red-600 px-3 py-3 md:px-6 flex rounded-t-xl flex-col md:flex-row items-center justify-between">
              <h4 className="text-white font-semibold text-xl mb-4 md:mb-0">
                Results:
              </h4>
              <div className="flex gap-4 flex-col md:flex-row w-full">
                <div className="w-full md:w-[200px]">
                  <FilterSelect
                    onChangeFilter={onChangeFilter}
                    selected={
                      filters.find((f) => f.type === "year")?.value || ""
                    }
                    label="year"
                    placeholder="Choose a year"
                    values={Object.entries(years)}
                    labelHidden={true}
                  />
                </div>
                <div className="w-full md:w-[200px]">
                  <FilterSelect
                    onChangeFilter={onChangeFilter}
                    selected={
                      filters.find((f) => f.type === "type")?.value || ""
                    }
                    label="type"
                    placeholder="Choose a type"
                    values={[
                      ["indoor", "Indoor"],
                      ["outdoor", "Outdoor"],
                    ]}
                    labelHidden={true}
                  />
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-[#1E1C1F]">
              {filters.length > 0 ? (
                <h4 className="text-white text-xl">
                  Season{" "}
                  {filters.reduce((acc, curr) => (acc += curr.value + " "), "")}
                </h4>
              ) : (
                <h4 className="text-white text-xl">
                  Choose Year and category to see results
                </h4>
              )}
            </div>
            <div className="w-full">
              <CustomTable
                rows={fakeReslts}
                isLoading={false}
                titleColor="bg-[#1E1C1F]"
              />
            </div>
          </div>
        </section>
        <section className="my-8">
          <div className="max-w-7xl mx-auto overflow-hidden">
            <h2 className="text-3xl font-semibold">Members</h2>
            <CustomCarousel items={club.members} ItemCard={MemberCarouseltem} />
          </div>
        </section>
        <section className="my-16 w-full">
          <div className="max-w-6xl mx-4 lg:mx-auto flex flex-col md:flex-row justify-between items-center gap-5">
            <div className="w-full md:w-2/5 flex flex-col gap-5">
              <h2 className="text-2xl font-semibold mb-3">
                Join &quot;{club.name}&quot; right now
              </h2>
              <p className="mb-4">
                Fill in an application letter. It will be sent to club&apos;s
                manager / coach. After their approval you become a club of
                &quot;{club.name}&quot;.
              </p>
              <h4 className="text-lg font-semibold underline">
                What does it mean to become a club member?
              </h4>
            </div>
            <div className="w-full md:w-2/5">
              <div className="flex flex-col gap-3">
                <label htmlFor="motivation" className="text-xl font-semibold">
                  Your motivation*
                </label>
                <textarea
                  id="motivation"
                  rows={5}
                  className="w-full border-[1px] border-gray-300 rounded-md p-2"
                  placeholder="Write your motivation to become the club member (min 10 words)..."
                ></textarea>
                <div className="flex items-center">
                  <AgreeCheck />
                  <p className="text-sm">
                    I agree with rules and terms of club membership
                  </p>
                </div>
                <FormButton isLoading={false} title={"Send an application"} />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-[#1E1C1F] p-6">
          <div className="max-w-7xl mx-4 lg:mx-auto">
            <h3 className="text-2xl text-white border-b-2 border-red-500 font-semibold mb-6 md:mb-16">
              Club related news
            </h3>
            <div className="flex flex-wrap gap-8 w-full justify-center items-center">
              {fakeNews.map((news: any) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ClubPage;
