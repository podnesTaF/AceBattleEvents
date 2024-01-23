import { Box } from "@gluestack-ui/themed";
import React from "react";
import { useTranslation } from "react-i18next";
import InfoTemplate from "../InfoTemplate";

type ErrorBoxProps = {
  errorMessage: string;
  type?: string;
  height?: any;
  width?: any;
};

const ErrorBox = ({
  errorMessage,
  type = "fetch",
  height = "auto",
  width = "$full",
}: ErrorBoxProps): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Box
      height={height}
      width={width}
      justifyContent="center"
      alignItems="center"
    >
      <InfoTemplate
        title={
          type === "fetch" ? t("error.errorFetching") : t("error.errorOccured")
        }
        text={errorMessage || t("error.defaultErrorMessage")}
        type={"error"}
      />
    </Box>
  );
};

export default ErrorBox;
