"use client";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import React from "react";

interface FilterBageProps {
  name: string;
}

const FilterBage: React.FC<FilterBageProps> = ({ name }) => {
  return (
    <div className="rounded-2xl bg-red-500 py-1 px-2 flex mr-2 mt-3">
      <HighlightOffIcon className="mr-2 text-white cursor-pointer hover:opacity-80 active:scale-90" />
      <p className="text-white">{name}</p>
    </div>
  );
};

export default FilterBage;
