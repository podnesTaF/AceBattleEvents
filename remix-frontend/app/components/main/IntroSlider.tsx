import { Skeleton } from "@mui/material";
import React, { useEffect } from "react";
import { IEvent } from "~/lib/events/types";
import IntroSlide from "./IntroSlide";

interface Props {
  events?: IEvent[];
}

const IntroSlider: React.FC<Props> = ({ events }) => {
  const [activeSlide, setActiveSlide] = React.useState<number>(0);
  const [progress, setProgress] = React.useState<number>(0);

  const onChangeSlide = (idx: number) => {
    setActiveSlide(idx);
    setProgress(0);
  };

  useEffect(() => {
    if (!events) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % events.length);
      setProgress(0);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeSlide, events]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => prev + 1);
    }, 30);

    return () => clearInterval(interval);
  }, [activeSlide, events]);

  return (
    <div className="w-full h-calc-screen flex justify-center">
      {events ? (
        events.map((event, idx) => (
          <IntroSlide
            key={event.id}
            slideProgress={progress}
            event={event}
            isActive={idx === activeSlide}
            idx={idx}
            setActiveSlide={onChangeSlide}
            length={events.length}
          />
        ))
      ) : (
        <Skeleton variant="rectangular" width="100%" height="100%" />
      )}
    </div>
  );
};

export default IntroSlider;
