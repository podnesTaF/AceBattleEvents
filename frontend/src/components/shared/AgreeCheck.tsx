import { Checkbox, FormControlLabel } from "@mui/material";
import { green } from "@mui/material/colors";
import React from "react";

interface AgreeCheckProps {
  message?: string;
}

const AgreeCheck: React.FC<AgreeCheckProps> = ({ message }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
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
