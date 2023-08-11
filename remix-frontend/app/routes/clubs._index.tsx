import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import axios from "axios";
import ClubCard from "~/components/clubs/ClubCard";
import FilterSelect from "~/components/shared/forms/FilterSelect";
import SearchField from "~/components/shared/forms/SearchField";
import { IClub } from "~/lib/clubs/types";
import { countries } from "~/lib/shared/data/countries";
import { useFilter } from "~/lib/shared/hooks/useFilter";

export const loader = async () => {
  const { data: clubsData } = await axios.get<IClub[]>(
    "http://localhost:4000/api/v1/clubs"
  );

  return json({ clubs: clubsData });
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
        <div className="px-4 py-2 bg-black flex flex-col sm:flex-row justify-between items-center">
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
        <div className="max-w-6xl mx-6 lg:mx-auto my-6">
          {data.clubs.map((club: IClub, i: number) => (
            <div
              key={club.id}
              className={`w-full sm:w-2/3 ${i % 2 && "ml-auto"} mb-8`}
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
