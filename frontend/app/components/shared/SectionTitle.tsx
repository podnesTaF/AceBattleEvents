import React from "react";

interface Props {
  textColor?: string;
  borderColor?: string;
  title: string;
  align?: string;
}

const SectionTitle: React.FC<Props> = ({
  textColor,
  borderColor,
  title,
  align,
}) => {
  return (
    <div className={`w-full my-4 flex ${align}`}>
      <h3
        className={`${textColor} flex border-b-4 border-l-[20px] ${
          borderColor ? borderColor : "border-red-500"
        } rounded-bl-xl pl-2 py-1 text-2xl font-semibold w-fit`}
      >
        {title}
      </h3>
    </div>
  );
};

export default SectionTitle;
