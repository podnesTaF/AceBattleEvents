import React from "react";

const ProfileItemWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): JSX.Element => {
  return (
    <div
      className={`flex p-5 border-b-[1px]  border-b-gray-300 w-full ${className}`}
    >
      {children}
    </div>
  );
};

export default ProfileItemWrapper;
