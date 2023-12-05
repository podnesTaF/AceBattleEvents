import { Box } from "@gluestack-ui/themed";
import React from "react";
import InfoTemplate from "../InfoTemplate";

type ErrorBoxProps = {
  error: any;
  type?: string;
  height?: any;
  width?: any;
};

const ErrorBox = ({
  error,
  type = "fetch",
  height = "auto",
  width = "$full",
}: ErrorBoxProps): JSX.Element => {
  return (
    <Box
      height={height}
      width={width}
      justifyContent="center"
      alignItems="center"
    >
      <InfoTemplate
        title={type === "fetch" ? "Error Fetching" : "Error occured"}
        text="There is an error occured while fething"
        type={"error"}
      />
    </Box>
  );
};

export default ErrorBox;