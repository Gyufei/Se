import { formatTimeObj } from "@/lib/utils/time";
import { useEffect, useState } from "react";

const bidEndAt = new Date().getTime() + 23 * (60 * 60 * 1000);

function calcTimeObj(endOn: number) {
  const timeLeftSeconds = (endOn - new Date().getTime()) / 1000;
  const dayTimeObj = formatTimeObj(timeLeftSeconds);

  return {
    hours: dayTimeObj.hours + dayTimeObj.days * 24,
    minutes: dayTimeObj.minutes,
    seconds: dayTimeObj.seconds,
  };
}

export default function CloseCountdown() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    function getDuration() {
      const timeObj = calcTimeObj(bidEndAt);
      setHours(timeObj.hours);
      setMinutes(timeObj.minutes);
      setSeconds(timeObj.seconds);
    }

    getDuration();

    const interval = setInterval(() => getDuration(), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-5 pb-6 px-5 flex flex-col items-center border-b-[2px] border-b-[#ffffff10]">
      <div className="text-white opacity-60 font-medium">
        Nft Vault Will Be Close In
      </div>
      <div className="flex justify-center text-white mt-5">
        <div className="w-[161px] flex justify-end">
          <div className="flex flex-col items-center">
            <div className="text-[40px] font-bold">{hours}</div>
            <div className="text-[20px] font-medium">
              Hour{hours > 1 ? "s" : ""}
            </div>
          </div>
        </div>
        <div className="w-[161px] flex flex-col items-center">
          <div className="text-[40px] font-bold">{minutes}</div>
          <div className="text-[20px] font-medium">
            minute{minutes > 1 ? "s" : ""}
          </div>
        </div>
        <div className="w-[161px] flex justify-start">
          <div className="flex flex-col items-center">
            <div className="text-[40px] font-bold">{seconds}</div>
            <div className="text-[20px] font-medium">
              second{seconds > 1 ? "s" : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
