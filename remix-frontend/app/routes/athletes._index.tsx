import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Api } from "~/api/axiosInstance";
import FilterBage from "~/components/shared/forms/FilterBage";
import FilterSelect from "~/components/shared/forms/FilterSelect";
import SearchField from "~/components/shared/forms/SearchField";
import CustomTable from "~/components/shared/tables/CustomTable";
import Pagination from "~/components/shared/tables/Pagination";
import { getNewParams } from "~/lib/events/utils/update-params";
import { countries } from "~/lib/shared/data/countries";
import { useFilter } from "~/lib/shared/hooks/useFilter";
import { genders } from "~/lib/teams/data/options-data";
import { transformDataAthletes } from "~/lib/user/utils/transformIntoTable";

export const loader = async ({ request }: LoaderArgs) => {
  const url = request.url;
  const params = url.split("?")[1];
  const athletesData = await Api().athletes.getAthletes(params);
  const clubsData = await Api().clubs.findClubsSnippet();

  return json({ athletesData, clubsData });
};

const AthletesIndexPage = () => {
  const { athletesData, clubsData } = useLoaderData<typeof loader>();

  const navigate = useNavigate();
  const {
    filters,
    checkValue,
    searchValue,
    onChangeFilter,
    removeFilter,
    setSearchValue,
  } = useFilter();

  const [currPage, setCurrPage] = useState(athletesData.totalPages);

  const onChangeInput = (newValue: string) => {
    setSearchValue(newValue);
    onChangeFilter("name", newValue);
  };

  const changePage = (pageNum: number) => {
    setCurrPage(pageNum);
  };

  useEffect(() => {
    const params = getNewParams(currPage, filters, checkValue);
    navigate(`${location.pathname}?${params}`);
  }, [filters]);

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row w-full p-8 md:p-4 xl:p-2 my-4">
        <div className="w-full md:w-1/2 mr-0 md:mr-5 my-2 md:my-0 flex flex-col justify-center">
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
          <div className="w-full sm:w-2/5 md:w-full lg:w-2/5">
            <FilterSelect
              onChangeFilter={onChangeFilter}
              selected={filters.find((f) => f.type === "club")?.value || ""}
              label="club"
              placeholder="Choose a club"
              values={clubsData.clubs.map((c) => [c.name, c.name])}
            />
          </div>
          <div className="w-full sm:w-2/5 md:w-full lg:w-2/5">
            <FilterSelect
              onChangeFilter={onChangeFilter}
              selected={filters.find((f) => f.type === "country")?.value || ""}
              label="country"
              placeholder="Choose a country"
              values={Object.entries(countries)}
            />
          </div>
          <div className="w-full sm:w-2/5 md:w-full lg:w-2/5">
            <FilterSelect
              onChangeFilter={onChangeFilter}
              selected={filters.find((f) => f.type === "gender")?.value || ""}
              label="gender"
              placeholder="Choose gender"
              values={Object.entries(genders)}
            />
          </div>
        </div>
      </div>
      <div className="my-6">
        <CustomTable
          titleColor="bg-black"
          isTitleStraight={true}
          rows={transformDataAthletes(athletesData.athletes)}
          isLoading={false}
        />
      </div>
      <div className="flex justify-center">
        <Pagination
          pagesCount={athletesData.totalPages}
          onChangePage={changePage}
          currPage={currPage}
        />
      </div>
    </>
  );
};

export default AthletesIndexPage;