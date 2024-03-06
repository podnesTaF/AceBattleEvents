"use client";

import FilterBage from "@/common/components/forms/FilterBage";
import FilterSelect from "@/common/components/forms/FilterSelect";
import SearchField from "@/common/components/forms/SearchField";
import CustomTable from "@/common/components/table/CustomTable";
import { useFilter } from "@/common/hooks/useFilter";
import { formatDateToShortMonth } from "@/common/lib/utils";
import { getNewParams } from "@/common/lib/utils/update-filters";
import { useGetAthletesQuery } from "@/lib/features/athletes/services/AthleteService";
import { useGetCountryNamesQuery } from "@/lib/features/countries/CountryService";
import { useGetGendersQuery } from "@/lib/features/genders/services/GenderApi";
import { useGetTeamPreviewsQuery } from "@/lib/features/teams/services/TeamService";
import { useState } from "react";

const AthletesPage = () => {
  const {
    filters,
    checkValue,
    searchValue,
    onChangeFilter,
    removeFilter,
    setSearchValue,
  } = useFilter();

  const [page, setPage] = useState(1);
  console.log(filters);
  const {
    data: atheletesData,
    isLoading,
    error,
  } = useGetAthletesQuery({
    params: `${getNewParams(page, filters)}`,
  });
  const { data: teamPreviews } = useGetTeamPreviewsQuery();
  const { data: countries } = useGetCountryNamesQuery();
  const { data: genders } = useGetGendersQuery();

  const onChangeInput = (newValue: string, newLabel: string) => {
    setSearchValue(newValue);
    onChangeFilter("search", newValue, newLabel);
  };

  const changePage = (pageNum: number) => {
    setPage(pageNum);
  };

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
                  name={f.label}
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
              selected={filters.find((f) => f.type === "teamId")?.value || ""}
              label="teamId"
              placeholder="Choose a team"
              values={
                teamPreviews?.map((t) => ({
                  value: t.id.toString(),
                  label: t.name,
                })) || []
              }
            />
          </div>
          <div className="w-full sm:w-2/5 md:w-full lg:w-2/5">
            <FilterSelect
              onChangeFilter={onChangeFilter}
              selected={filters.find((f) => f.type === "country")?.value || ""}
              label="countryId"
              placeholder="Choose a country"
              values={
                countries?.map((c) => ({
                  value: c.id?.toString(),
                  label: c.name,
                })) || []
              }
            />
          </div>
          <div className="w-full sm:w-2/5 md:w-full lg:w-2/5">
            <FilterSelect
              onChangeFilter={onChangeFilter}
              selected={filters.find((f) => f.type === "gender")?.value || ""}
              label="genderId"
              placeholder="Choose gender"
              values={
                genders?.map((g) => ({
                  value: g.id?.toString(),
                  label: g.name,
                })) || []
              }
            />
          </div>
        </div>
      </div>
      <div className="my-8">
        <div className="flex flex-wrap px-4 xl:px-8 my-4 gap-8 justify-center">
          <CustomTable
            isLoading={isLoading}
            rows={atheletesData?.items.map((runner) => ({
              name: runner.firstName + " " + runner.lastName,
              "Date Of Birth": formatDateToShortMonth(runner.dateOfBirth),
              Gender: runner.gender?.name,
              Team:
                runner.runnerTeams?.find((t) => t.active)?.team.name ||
                "no team",
              Country: runner.country?.name || "no country",
            }))}
            itemsName="Athletes"
          />
        </div>
      </div>
    </>
  );
};

export default AthletesPage;
