import React from "react";

interface CustomTitleProps {
  title: string;
  subtitle: string;
}

const CustomTitle: React.FC<CustomTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="flex w-full">
      <div className="w-1/2 flex justify-end p-4 bg-[#1E1C1F] items-center">
        <h3 className="text-2xl sm:text-4xl text-white font-semibold uppercase">
          {title}
        </h3>
      </div>
      <div className="w-1/2 flex justify-start p-4 bg-[#FF0000] clip-title items-center">
        <h3 className="text-xl sm:text-3xl text-white font-semibold uppercase">
          {subtitle}
        </h3>
      </div>
    </div>
  );
};

export default CustomTitle;
