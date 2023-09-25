import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Api } from "~/api/axiosInstance";
import { ClubCard, FilterSelect, SearchField } from "~/components";
import { countries, useFilter } from "~/lib/shared";
import { IClub } from "~/lib/types";

export const loader = async () => {
  const clubsData = await Api().clubs.getClubs();

  return json({ clubs: clubsData?.clubs, totalPages: clubsData?.totalPages });
};

const ClubsIndexPage = () => {
  const data = useLoaderData<typeof loader>();

  const { filters, searchValue, setSearchValue, onChangeFilter } = useFilter();

  const onChangeInput = (newValue: string) => {
    setSearchValue(newValue);
    onChangeFilter("name", newValue);
  };

  return (
    <>
      <header className="w-full flex justify-center h-96 sm:h-[600px] bg-[url('/clubs-sm.jpg')] md:bg-[url('/clubs-lg.jpg')] bg-cover bg-no-repeat bg-top relative flex-col ">
        <div className="h-3/5 mb-10 sm:mb-0 sm:h-1/2 flex justify-center items-center w-3/4 sm:w-3/5 md:w-[500px] ml-8 z-10">
          <img src="/aba-clubs.png" width={500} height={400} alt={"logo"} />
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.4)] z-0"></div>
      </header>
      <main className="w-full">
        <div className="px-4 py-2 bg-black flex flex-col gap-4 sm:flex-row justify-between items-center">
          <div className="w-full sm:w-[300px] md:w-[400px]">
            <SearchField onChangeInput={onChangeInput} value={searchValue} />
          </div>
          <div className="w-full sm:w-[300px]">
            <FilterSelect
              onChangeFilter={onChangeFilter}
              selected={filters.find((f) => f.type === "country")?.value || ""}
              label="country"
              placeholder="Choose a country"
              values={Object.entries(countries)}
              labelHidden={true}
            />
          </div>
        </div>
        <div className="max-w-6xl mx-3 md:mx-6 lg:mx-auto my-6">
          {data.clubs?.map((club: IClub, i: number) => (
            <div
              key={club.id}
              className={`w-full sm:w-2/3 ${i % 2 && "ml-auto"} mb-10`}
            >
              <ClubCard club={club} />
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default ClubsIndexPage;
