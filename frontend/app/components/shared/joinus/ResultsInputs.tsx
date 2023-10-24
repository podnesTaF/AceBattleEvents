import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { IconButton } from "@mui/material";
import React from "react";
import { FormField, FormSelect } from "../forms";

interface ResultsInputsProps {
  field: {
    distanceInCm: number;
    result: string;
  };
  remove: (index: number) => void;
  i: number;
  name: string;
}

const ResultsInputs: React.FC<ResultsInputsProps> = ({
  field,
  remove,
  i,
  name,
}) => {
  return (
    <div className="flex w-full sm:w-1/2 lg:w-1/4 items-center">
      <div className="mr-3 border-r-[1px] border-black h-4/5 flex items-center ">
        <IconButton
          onClick={() => {
            remove(i);
          }}
        >
          <RemoveCircleOutlineIcon fontSize="large" />
        </IconButton>
      </div>
      <div className="flex sm:flex-col w-full">
        <div className="mb-4 mr-3 sm:mb-2 sm:mr-4 w-full">
          <FormSelect
            name={`${name}.${i}.distanceInCm`}
            label="Distance"
            defaultValue={0}
            placeholder="Choose distance"
            values={Object.entries({
              [80000]: "800m",
              [150000]: "1500m",
              [160934]: "1 mile",
              [300000]: "3000m",
              [500000]: "5000m",
              [1000000]: "10000m",
            })}
            onChangeFilter={() => {}}
          />
        </div>
        <div className="mb-4 sm:mb-2 sm:mr-4  w-full">
          <FormField
            name={`${name}.${i}.result`}
            label="Result"
            placeholder="mm:ss.ms"
            mask="99:99.99"
          />
        </div>
      </div>
    </div>
  );
};

export default ResultsInputs;
