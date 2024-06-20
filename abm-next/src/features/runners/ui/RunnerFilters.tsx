"use client";

import { getNewParams, useFilter } from "@/src/shared/lib";
import { FilterBage, FilterSelect, SearchField } from "@/src/shared/ui";
import { Pagination } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface FilterProps {
  children?: React.ReactNode;
  teamsPreview: { id: number; name: string; logoUrl?: string }[];
  countries: { id: number; name: string }[];
  genders: { id: number; name: string }[];
  totalPages: number;
  page: number;
}

export const RunnerFilters = ({
  teamsPreview,
  countries,
  children,
  genders,
  totalPages,
  page,
}: FilterProps) => {
  const router = useRouter();
  const {
    filters,
    checkValue,
    searchValue,
    onChangeFilter,
    removeFilter,
    setSearchValue,
  } = useFilter();

  const onChangeInput = (newValue: string) => {
    setSearchValue(newValue);
    onChangeFilter("search", newValue);
  };

  const changePage = (pageNum: number) => {
    const params = getNewParams(pageNum, filters, scrollY);
    router.push(`${location.pathname}?${params}`);
  };

  useEffect(() => {
    const params = getNewParams(1, filters, scrollY);
    router.push(`${location.pathname}?${params}`);
  }, [filters, router]);

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
                  name={f.label || f.value}
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
              name="teamId"
              selected={filters.find((f) => f.type === "teamId")?.value || ""}
              label="Team"
              placeholder="Choose a team"
              values={teamsPreview.map((t) => [t.id, t.name])}
            />
          </div>
          <div className="w-full sm:w-2/5 md:w-full lg:w-2/5">
            <FilterSelect
              onChangeFilter={onChangeFilter}
              selected={
                filters.find((f) => f.type === "countryId")?.value || ""
              }
              name="countryId"
              label="country"
              placeholder="Choose a country"
              values={countries.map((c) => [c.id, c.name])}
            />
          </div>
          <div className="w-full sm:w-2/5 md:w-full lg:w-2/5">
            <FilterSelect
              onChangeFilter={onChangeFilter}
              selected={filters.find((f) => f.type === "genderId")?.value || ""}
              label="gender"
              name={"genderId"}
              placeholder="Choose gender"
              values={genders.map((g) => [g.id, g.name])}
            />
          </div>
        </div>
      </div>
      {children}
      <div className="flex justify-center">
        <Pagination
          count={totalPages}
          onChange={(e, page) => changePage(page)}
          page={page}
          variant="outlined"
        />
      </div>
    </>
  );
};

export default RunnerFilters;
