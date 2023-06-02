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
    // <div className="flex items-center">
    //   <input
    //     id="link-checkbox"
    //     type="checkbox"
    //     value=""
    //     className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    //   />
    //   <label
    //     htmlFor="link-checkbox"
    //     className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
    //   >
    //     {message}
    //   </label>
    // </div>
  );
};

export default AgreeCheck;
