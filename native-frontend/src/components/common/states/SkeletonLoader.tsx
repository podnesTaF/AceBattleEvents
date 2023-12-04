import React, { ReactNode } from "react";
import ErrorBox from "./ErrorBox";
import Skeleton from "./Skeleton";

interface SkeletonLoaderProps<T> {
  data?: T;
  color?: string;
  error?: any;
  children: (data: T) => ReactNode | ReactNode;
  height?: number;
  width?: number;
  isLoading?: boolean;
  loadingComponent?: JSX.Element;
}

const SkeletonLoader = <T extends {}>({
  data,
  children,
  isLoading,
  color,
  error,
  height,
  width,
  loadingComponent,
}: SkeletonLoaderProps<T>): JSX.Element => {
  if (isLoading) {
    if (loadingComponent) {
      return loadingComponent;
    }
    return <Skeleton height={height || 200} width={width} />;
  }

  if (error) {
    return <ErrorBox error={error} width={width} height={height || 200} />;
  }

  if (!data) {
    return <Skeleton height={height} width={width} />;
  }

  return <>{typeof children === "function" ? children(data) : children}</>;
};

export default SkeletonLoader;
