import { Center, Spinner } from "@gluestack-ui/themed"; // Replace with your actual imports
import React from "react";

interface WithLoadingProps {
  isLoading: boolean;
  loadingHeight?: any | number;
  children: React.ReactNode;
}

const WithLoading: React.FC<WithLoadingProps> = ({
  isLoading,
  loadingHeight = "auto",
  children,
}) => {
  return (
    <>
      {isLoading ? (
        <Center height={loadingHeight}>
          <Spinner size="large" />
        </Center>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default WithLoading;
