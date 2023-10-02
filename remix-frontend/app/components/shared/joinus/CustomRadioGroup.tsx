import { FormControl, RadioGroup } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";
import CustomRadio from "./CustomRadio";

interface CustomRadioGroupProps {
  onChange?: (value: string) => void;
  name: string;
  radioOptions: {
    value: string;
    label: string;
  }[];
}

const CustomRadioGroup: React.FC<CustomRadioGroupProps> = ({
  onChange,
  name,
  radioOptions,
}) => {
  const { register, setValue, getValues } = useFormContext();
  return (
    <FormControl>
      <RadioGroup
        className="flex flex-col md:flex-row justify-between gap-6 w-full flex-nowrap"
        aria-labelledby={name}
        name={name}
        onChange={(e) => {
          if (onChange) onChange(e.target.value);
          setValue(name, e.target.value);
        }}
      >
        {radioOptions.map((item, i) => (
          <div
            key={i}
            className="px-4 py-2 border-[1px] border-gray-300 w-full"
          >
            <CustomRadio
              label={item.label}
              value={item.value}
              checked={getValues(name) === item.value}
            />
          </div>
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default CustomRadioGroup;
