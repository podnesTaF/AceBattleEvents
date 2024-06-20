"use client";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import React from "react";

interface FilterBageProps {
  name: string;
  type: string;
  removeFilter?: (filter: string) => void;
  index?: number;
  removeBade?: (index: number) => void;
}

export const FilterBage: React.FC<FilterBageProps> = ({
  name,
  type,
  removeFilter,
  removeBade,
  index,
}) => {
  const hadnleRemove = () => {
    if (removeBade) {
      removeBade(index!);
    }

    if (removeFilter) {
      removeFilter(type);
    }
  };
  return (
    <div className="rounded-2xl bg-red-500 py-1 px-2 flex mr-2">
      <HighlightOffIcon
        className="mr-2 text-white cursor-pointer hover:opacity-80 active:scale-90"
        onClick={hadnleRemove}
      />
      <p className="text-white">{name}</p>
    </div>
  );
};

export default FilterBage;
