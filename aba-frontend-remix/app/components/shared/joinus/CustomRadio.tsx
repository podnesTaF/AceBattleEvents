import { FormControlLabel, Radio } from "@mui/material";
import React from "react";

interface CustomRadioProps {
  label: any;
  value: any;
  checked?: boolean;
}

const CustomRadio: React.FC<CustomRadioProps> = ({ label, value, checked }) => {
  return (
    <FormControlLabel
      value={value}
      control={<Radio checked={checked} color="success" />}
      sx={{
        width: "100%",
        "& .MuiFormControlLabel-label": {
          width: "100%",
          "@media (min-width: 640px)": {
            width: "100%",
            maxWidth: "none",
          },
        },
      }}
      label={label}
    />
  );
};

export default CustomRadio;
