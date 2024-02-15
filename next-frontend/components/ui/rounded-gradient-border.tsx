import React from "react";

type RoundedGradientBorderProps = {
  children: React.ReactNode;
  padding: string;
  borderRadius: string;
  from: string;
  to: string;
  direction: string;
  className?: string;
};

const RoundedGradientBorder = ({
  children,
  borderRadius,
  padding,
  from,
  to,
  direction,
  className = "",
}: RoundedGradientBorderProps): JSX.Element => {
  return (
    <div
      className={`${padding} ${borderRadius}  ${from} ${to} ${direction} overflow-hidden w-full ${className}`}
    >
      {children}
    </div>
  );
};

export default RoundedGradientBorder;
