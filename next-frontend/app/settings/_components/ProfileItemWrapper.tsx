import React from "react";

const ProfileItemWrapper = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <div className="flex p-5 border-b-[1px] border-b-gray-500 w-full">
      {children}
    </div>
  );
};

export default ProfileItemWrapper;
