import { IEvent } from "@/models/IEvent";
import React from "react";

interface Props {
  events: IEvent[];
}

const IntroSlider: React.FC<Props> = ({ events }) => {
  return <div className="w-full h-calc-screen"></div>;
};

export default IntroSlider;
