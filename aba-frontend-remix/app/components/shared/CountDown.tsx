import React, { useEffect, useState } from "react";

interface IProps {
  date: string;
}

const CountDown: React.FC<IProps> = ({ date }) => {
  const targetDate = new Date(date).getTime();
  const [countdown, setCountdown] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds?: number;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentDate = new Date().getTime();
      const timeDifference = targetDate - currentDate;

      if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );

        const seconds = Math.floor(
          (timeDifference % (1000 * 60)) / 1000 // Calculate seconds
        );

        setCountdown({ days, hours, minutes, seconds });
      } else {
        clearInterval(intervalId);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  return (
    <div className="flex justify-center gap-6 xs:gap-8 sm:gap-12 lg:gap-16 2xl:gap-24 xs:max-w-[90%]">
      <div>
        <h2 className="text-3xl lg:text-5xl xl:text-7xl font-extrabold text-white text-center md:text-start">
          {countdown.days}
        </h2>
        <h4 className="text-white text-base sm:text-lg">days</h4>
      </div>
      <div>
        <h2 className="text-3xl lg:text-5xl xl:text-7xl font-extrabold text-white text-center md:text-start">
          {countdown.hours}
        </h2>
        <h4 className="text-white text-base sm:text-lg">hours</h4>
      </div>
      <div>
        <h2 className="text-3xl lg:text-5xl xl:text-7xl font-extrabold text-white text-center md:text-start">
          {countdown.minutes}
        </h2>
        <h4 className="text-white text-base sm:text-lg">minutes</h4>
      </div>
      <div>
        <h4 className="text-3xl lg:text-5xl xl:text-7xl font-extrabold text-white text-center md:text-start">
          {countdown.seconds}
        </h4>
        <h4 className="text-white text-base sm:text-lg">seconds</h4>
      </div>
    </div>
  );
};

export default CountDown;
