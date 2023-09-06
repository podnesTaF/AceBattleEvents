import React from "react";

interface HeaderTabsProps {
  title: string;
  bgImage: string;
  tabs: string[];
  activeTab: number;
  onChangeTab: (tab: number) => void;
}

const HeaderTabs: React.FC<HeaderTabsProps> = ({
  tabs,
  activeTab,
  onChangeTab,
  title,
  bgImage,
}) => {
  return (
    <header
      className={`w-full bg-cover bg-no-repeat bg-center h-[350px] md:h-[200px] relative flex items-end`}
      style={{
        backgroundImage: `url(${bgImage || "/outdoor-sunny.jpg"})`,
      }}
    >
      <div className="w-full absolute bg-gradient-to-b from-transparent via-transparent to-black h-full left-0"></div>
      <div className="max-w-6xl w-full px-4 lg:px-0 lg:mx-auto pt-4 mt-auto z-10">
        <div className="w-full flex gap-4 items-center justify-start pb-4 border-b-2 border-red-500">
          <div className="bg-red-500 w-4 h-12"></div>
          <h3 className="text-white text-2xl font-semibold">{title}</h3>
        </div>
        <div className="flex w-full">
          {tabs.map((tab, index) => (
            <div
              key={index}
              onClick={() => onChangeTab(index)}
              className={`w-1/3 border-r-2 ${
                activeTab === index ? "bg-red-500" : "bg-black"
              } border-red-500 flex justify-center items-center py-2`}
            >
              <h4
                className={`text-xl font-semibold cursor-pointer ${
                  activeTab === index ? "text-white" : "text-gray-400"
                }`}
              >
                {tab}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default HeaderTabs;
