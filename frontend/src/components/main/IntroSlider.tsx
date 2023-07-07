import { IEvent } from "@/models/IEvent";
import React, { useEffect } from "react";
import IntroSlide from "./IntroSlide";

interface Props {
  events: IEvent[];
}

const IntroSlider: React.FC<Props> = ({ events }) => {
  const [activeSlide, setActiveSlide] = React.useState<number>(0);
  const [progress, setProgress] = React.useState<number>(0);

  const onChangeSlide = (idx: number) => {
    setActiveSlide(idx);
    setProgress(0);
  };

  useEffect(() => {
    console.log(events);
  }, [events]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % events.length);
      setProgress(0);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeSlide, events.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => prev + 1);
    }, 30);

    return () => clearInterval(interval);
  }, [activeSlide, events.length]);

  return (
    <div className="w-full h-calc-screen flex justify-center">
      {events.map((event, idx) => (
        <IntroSlide
          key={event.id}
          slideProgress={progress}
          event={event}
          isActive={idx === activeSlide}
          idx={idx}
          setActiveSlide={onChangeSlide}
          length={events.length}
        />
      ))}
    </div>
  );
};

export default IntroSlider;
