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
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
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

        setCountdown({ days, hours, minutes });
      } else {
        clearInterval(intervalId);
        setCountdown({ days: 0, hours: 0, minutes: 0 });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  return (
    <div className="flex">
      <div className="clip-right p-1 md:p-2 pr-2 md:pr-4 bg-black">
        <h4 className="text-lg md:text-xl font-semibold text-white">
          {countdown.days} days
        </h4>
      </div>
      <div className="clip-both p-1 md:p-2 px-2 md:px-4 bg-red-500">
        <h4 className="text-lg md:text-xl font-semibold text-white">
          {countdown.hours} hours
        </h4>
      </div>
      <div className="clip-left p-1 md:p-2 pl-2 md:pl-4 bg-black">
        <h4 className="text-lg md:text-xl font-semibold text-white">
          {countdown.minutes} minutes
        </h4>
      </div>
    </div>
  );
};

export default CountDown;
