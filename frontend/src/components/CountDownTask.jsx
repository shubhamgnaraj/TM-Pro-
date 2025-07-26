import React, { useEffect, useState } from "react";
import { data } from "react-router";

function CountDownTask({ dueDate }) {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const deadLine = new Date(dueDate);
      const diff = deadLine - now;

      if (diff <= 0) {
        setTimeLeft({ stop: "DeadLine Stop" });
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [dueDate]);

  // console.log(timeLeft)
  return (
    <div className="w-full bg-white border border-gray-200 shadow-sm">
      {!timeLeft.stop ? (
        <div className="flex items-center justify-center gap-3 text-base font-medium text-gray-800 tracking-wide">
          <div className="flex flex-col items-center">
            <span className="text-sm font-semibold">{timeLeft.days}</span>
            <span className="text-xs text-gray-500">Days</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm font-semibold">{timeLeft.hours}</span>
            <span className="text-xs text-gray-500">Hours</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm font-semibold">{timeLeft.minutes}</span>
            <span className="text-xs text-gray-500">Minutes</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm font-semibold">{timeLeft.seconds}</span>
            <span className="text-xs text-gray-500">Seconds</span>
          </div>
        </div>
      ) : (
        <div className="text-center text-red-500 font-medium text-sm">
          ⛔ {timeLeft.stop}
        </div>
      )}
    </div>
  );
}

export default CountDownTask;
