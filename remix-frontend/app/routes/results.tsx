import { useState } from "react";
import CustomTitle from "~/components/shared/CustomTitle";
import FilterBage from "~/components/shared/forms/FilterBage";
import FilterSelect from "~/components/shared/forms/FilterSelect";
import SearchField from "~/components/shared/forms/SearchField";
import { countries } from "~/lib/shared/data/countries";
import { years } from "~/lib/shared/data/date-data";

const ResultsPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState<{ type: string; value: any }[]>([]);

  const onChangeInput = (newValue: string) => {
    setSearchValue(newValue);
    onChangeFilter("name", newValue);
  };

  const onChangeFilter = (filterType: string, selectedValue: string) => {
    if (selectedValue === "") {
      removeFilter(filterType);
      return;
    }
    setFilters((prev) => {
      const typeObj = prev.find((f) => f.type === filterType);
      if (!typeObj) {
        return [...prev, { type: filterType, value: selectedValue }];
      } else {
        return [
          ...prev.filter((f) => f.type !== filterType),
          { type: filterType, value: selectedValue },
        ];
      }
    });
  };

  const removeFilter = (filter: string) => {
    setSearchValue("");
    setFilters((prev) => prev.filter((f) => f.type !== filter));
  };

  const onLoad = () => {
    console.log(document.getElementById("divRRPublish"));
    // @ts-ignore
    var rrp = new RRPublish(
      document.getElementById("divRRPublish"),
      163493,
      "results"
    );
    rrp.ShowTimerLogo = true;
    rrp.ShowInfoText = false;
  };
  return (
    <>
      <header className="w-full flex justify-center items-center h-48 sm:h-56  md:bg-[url('/auth-intro.jpg')] bg-cover bg-no-repeat bg-center relative flex-col ">
        <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.4)] z-0"></div>
      </header>
      <CustomTitle title={"ACE BATTLE MILE"} subtitle="Battles' Results" />
      <main className="max-w-7xl mx-auto">
        <div className="flex flex-col-reverse md:flex-row w-full p-8 md:p-4 xl:p-2 my-4">
          <div className="w-full md:w-1/2 mr-0 md:mr-5 my-5 md:my-0 flex flex-col justify-center">
            <div className="mb-4">
              <SearchField onChangeInput={onChangeInput} value={searchValue} />
            </div>
            <div className="mb-4">
              <div className="border-b-[1px] border-solid border-gray-300 py-1 flex flex-wrap items-center gap-2">
                <h4 className="text-lg font-light uppercase mr-3 py-1">
                  Filters:
                </h4>
                {filters.map((f, i) => (
                  <FilterBage
                    removeFilter={removeFilter}
                    key={i}
                    name={f.value}
                    type={f.type}
                  />
                ))}
                {!filters.length && (
                  <p className="text-lg text-gray-300">No Filters</p>
                )}
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-wrap gap-x-2 justify-around items-center my-4">
            <div className="w-full md:w-2/5">
              <FilterSelect
                onChangeFilter={onChangeFilter}
                selected={
                  filters.find((f) => f.type === "category")?.value || ""
                }
                label="category"
                placeholder="Choose category"
                values={Object.entries(["indoor", "outdoor"])}
              />
            </div>
            <div className="w-full md:w-2/5">
              <FilterSelect
                onChangeFilter={onChangeFilter}
                selected={
                  filters.find((f) => f.type === "country")?.value || ""
                }
                label="country"
                placeholder="Choose a country"
                values={Object.entries(countries)}
              />
            </div>
            <div className="w-full md:w-2/5">
              <FilterSelect
                onChangeFilter={onChangeFilter}
                selected={filters.find((f) => f.type === "year")?.value || ""}
                label="year"
                placeholder="Choose a year"
                values={Object.entries(years)}
              />
            </div>
          </div>
        </div>
        <div className="my-4">
          <iframe
            id="battleFrame"
            src="https://app.battlemile.org/frames/battles.html"
            rel="nofollow"
            width="100%"
            height={"100%"}
            className="min-h-[700px]"
          ></iframe>
        </div>
      </main>
    </>
  );
};

export default ResultsPage;