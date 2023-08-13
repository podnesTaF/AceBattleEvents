import React from "react";

interface TabProps {
  isActive: boolean;
  onClick: () => void;
  title: string;
}

const Tab: React.FC<TabProps> = ({ isActive, onClick, title }) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-t-lg flex justify-center items-center cursor-pointer py-4 w-1/3 border-[1px] ${
        !isActive
          ? "bg-red-600"
          : "border-b-0 border-red-600 bg-white scale-y-[1.03]"
      }`}
    >
      <p className={`text-xl font-semibold ${!isActive && "text-white"}`}>
        {title}
      </p>
    </div>
  );
};

export default Tab;
