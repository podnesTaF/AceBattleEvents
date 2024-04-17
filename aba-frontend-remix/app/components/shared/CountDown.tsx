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
    <div className="flex justify-center">
      <div className="pr-4">
        <h4 className="text-lg md:text-xl 2xl:text-2xl font-semibold text-white">
          {countdown.days} d
        </h4>
      </div>
      <div className="pr-4">
        <h4 className="text-lg md:text-xl 2xl:text-2xl font-semibold text-white">
          {countdown.hours} h
        </h4>
      </div>
      <div className="pr-4">
        <h4 className="text-lg md:text-xl 2xl:text-2xl font-semibold text-white">
          {countdown.minutes} m
        </h4>
      </div>
      <div className="">
        <h4 className="text-lg md:text-xl 2xl:text-2xl font-semibold text-white w-[42px] md:w-[55px] text-center">
          {countdown.seconds} s
        </h4>
      </div>
    </div>
  );
};

export default CountDown;
