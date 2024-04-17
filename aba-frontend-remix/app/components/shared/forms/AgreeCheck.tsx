import { Checkbox, FormControlLabel } from "@mui/material";
import { green } from "@mui/material/colors";
import React from "react";

interface AgreeCheckProps {
  message?: string;
  name?: string;
  checked?: boolean;
  onChange?: (value: any) => void;
}

const AgreeCheck: React.FC<AgreeCheckProps> = ({
  message,
  checked,
  onChange,
  name,
}) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          name={name}
          onChange={(e) => onChange && onChange(e.target.checked)}
          checked={checked}
          sx={{
            color: green[800],
            "&.Mui-checked": {
              color: green[600],
            },
          }}
        />
      }
      label={message}
    />
  );
};

export default AgreeCheck;
