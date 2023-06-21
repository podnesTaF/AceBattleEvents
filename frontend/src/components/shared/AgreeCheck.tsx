import { Checkbox, FormControlLabel } from "@mui/material";
import { pink } from "@mui/material/colors";
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
            color: pink[800],
            "&.Mui-checked": {
              color: pink[600],
            },
          }}
        />
      }
      label={message}
    />
  );
};

export default AgreeCheck;
