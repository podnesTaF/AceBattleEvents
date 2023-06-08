import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";
import { useFormContext } from "react-hook-form";

interface FormRadioProps {
  options: {
    value: string;
    label: string;
  }[];
  onChange: () => void;
  selected?: string;
  name: string;
}

const FormRadio: React.FC<FormRadioProps> = ({
  options,
  onChange,
  selected,
  name,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <RadioGroup name={name}>
      {options.map((option, i) => (
        <FormControlLabel
          {...register(name)}
          control={
            <Radio
              value={option.value}
              sx={{
                color: red[600],
                "&.Mui-checked": {
                  color: red[600],
                },
              }}
            />
          }
          label={option.label}
        />
      ))}
      {!!errors[name]?.message && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          {errors[name]?.message as any}
        </p>
      )}
    </RadioGroup>
  );
};

export default FormRadio;
