import React, { useEffect } from "react";
import { years } from "~/lib/shared/data/date-data";
import { useFilter } from "~/lib/shared/hooks/useFilter";
import FilterSelect from "../shared/forms/FilterSelect";

interface Props {
  getFilters: (filters: any) => void;
}

const ClubResultsFilter: React.FC<Props> = ({ getFilters }) => {
  const { filters, searchValue, setSearchValue, onChangeFilter } = useFilter();

  useEffect(() => {
    getFilters(filters);
  }, [filters]);

  return (
    <>
      <div className="bg-red-600 px-3 py-3 md:px-6 w-full flex rounded-t-xl flex-col gap-5 md:flex-row items-center justify-between">
        <h4 className="text-white font-semibold text-xl mb-4 md:mb-0">
          Results:
        </h4>
        <div className="flex gap-4 flex-col md:flex-row w-full">
          <div className="w-full md:w-[200px]">
            <FilterSelect
              onChangeFilter={onChangeFilter}
              selected={filters.find((f) => f.type === "year")?.value || ""}
              label="year"
              placeholder="Choose a year"
              values={Object.entries(years)}
              labelHidden={true}
            />
          </div>
          <div className="w-full md:w-[200px]">
            <FilterSelect
              onChangeFilter={onChangeFilter}
              selected={filters.find((f) => f.type === "type")?.value || ""}
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
    </>
  );
};

export default ClubResultsFilter;
