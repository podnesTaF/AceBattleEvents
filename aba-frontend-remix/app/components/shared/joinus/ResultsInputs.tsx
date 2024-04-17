import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { IconButton } from "@mui/material";
import React from "react";
import { FormField, FormSelect } from "../forms";

interface ResultsInputsProps {
  field: {
    distanceId: number;
    result: string;
    type: string;
  };
  remove: (index: number) => void;
  i: number;
  name: string;
  distances: { id: number; name: string }[];
}

const ResultsInputs: React.FC<ResultsInputsProps> = ({
  field,
  remove,
  i,
  name,
  distances,
}) => {
  return (
    <div className="flex gap-3 w-full">
      <div className="h-4/5 flex items-center ">
        <IconButton
          onClick={() => {
            remove(i);
          }}
        >
          <RemoveCircleOutlineIcon fontSize="large" />
        </IconButton>
      </div>
      <div className="flex flex-col w-full">
        <div className="mb-4 sm:mb-2 w-full">
          <FormSelect
            className="w-full"
            name={`${name}.${i}.distanceId`}
            label="Distance"
            defaultValue={0}
            placeholder="Choose distance"
            values={distances.map((d) => [d.id, d.name])}
            onChangeFilter={() => {}}
          />
        </div>
        <div className="mb-4 sm:mb-2 w-full">
          <FormField
            className="w-full"
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
