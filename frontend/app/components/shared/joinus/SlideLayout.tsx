import { Fade } from "@mui/material";
import React from "react";

interface SlideLayoutProps {
  question: string;
  children: React.ReactNode;
  fadeIn?: boolean;
  extraInfo?: string;
}

const SlideLayout: React.FC<SlideLayoutProps> = ({
  question,
  children,
  fadeIn,
  extraInfo,
}) => {
  return (
    <Fade in={fadeIn} easing={"ease-in-out"}>
      <div className="flex-1 flex flex-col md:justify-center max-w-5xl mx-auto gap-6 w-full">
        <h4 className="font-semibold text-sm sm:text-lg md:text-xl">
          {question}
        </h4>
        {children}
        <p>{extraInfo}</p>
      </div>
    </Fade>
  );
};

export default SlideLayout;
