import React from "react";

interface TabProps {
  isActive: boolean;
  title: string;
}

export const ProfileTab: React.FC<TabProps> = ({ isActive, title }) => {
  return (
    <div
      className={`max-w-[200px] w-full flex items-center justify-center py-2 border-b-2 cursor-pointer hover:opacity-80 ${
        isActive ? "border-red-500" : "border-gray-300"
      }`}
    >
      <h3
        className={`text-lg sm:text-xl font-semibold ${
          isActive ? "text-red-500" : "text-gray-300"
        }`}
      >
        {title}
      </h3>
    </div>
  );
};
