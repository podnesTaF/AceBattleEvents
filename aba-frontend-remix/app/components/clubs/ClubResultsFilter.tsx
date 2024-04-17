import React, { useEffect } from "react";
import { useFilter } from "~/lib/hooks";
import { years } from "~/lib/shared/data/date-data";
import { FilterSelect } from "..";

interface Props {
  getFilters: (filters: any) => void;
}

const ClubResultsFilter: React.FC<Props> = ({ getFilters }) => {
  const { filters, onChangeFilter } = useFilter();

  useEffect(() => {
    getFilters(filters);
  }, [filters]);

  return (
    <div className="flex w-full flex-col-reverse md:flex-row justify-between gap-6 py-2 items-center border-b-2 border-gray-300 mb-3">
      {filters.length > 0 ? (
        <h4 className="text-lg font-semibold">
          Season {filters.reduce((acc, curr) => (acc += curr.value + " "), "")}
        </h4>
      ) : (
        <h4 className=" text-lg font-semibold">No Filters Applied</h4>
      )}
      <div className="flex gap-4 md:gap-6 flex-col md:flex-row w-full justify-end">
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
            selected={filters.find((f) => f.type === "category")?.value || ""}
            label="category"
            placeholder="Choose a category"
            values={[
              ["indoor", "Indoor"],
              ["outdoor", "Outdoor"],
            ]}
            labelHidden={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ClubResultsFilter;
