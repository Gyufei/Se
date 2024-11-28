import { formatTimeObj } from "@/lib/utils/time";
import { useEffect, useState } from "react";
import { useLuckyNFTPageContext } from "../../page-context";
import { Skeleton } from "@/components/ui/skeleton";

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
  const { auctionInfo, isAuctionPending } = useLuckyNFTPageContext();

  const endAt = Number(auctionInfo?.end_time) * 1000;

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (isAuctionPending || !endAt) return;

    function getDuration() {
      const timeObj = calcTimeObj(endAt);
      setHours(timeObj.hours > 0 ? timeObj.hours : 0);
      setMinutes(timeObj.minutes > 0 ? timeObj.minutes : 0);
      setSeconds(timeObj.seconds > 0 ? timeObj.seconds : 0);
    }

    getDuration();

    const interval = setInterval(() => getDuration(), 1000);

    return () => clearInterval(interval);
  }, [endAt, isAuctionPending]);

  return (
    <div className="pt-5 pb-6 px-5 flex flex-col items-center border-b-[2px] border-b-[#ffffff10]">
      <div className="text-white opacity-60 font-medium">
        Nft Vault Will Be Close In
      </div>
      <div className="flex justify-center text-white mt-5">
        <div className="w-[161px] flex justify-end">
          <div className="flex flex-col items-center">
            {isAuctionPending ? (
              <Skeleton className="w-[60px] h-[40px] my-[10px]" />
            ) : (
              <div className="text-[40px] font-bold">{hours}</div>
            )}
            <div className="text-[20px] font-medium">
              Hour{hours > 1 ? "s" : ""}
            </div>
          </div>
        </div>
        <div className="w-[161px] flex flex-col items-center">
          {isAuctionPending ? (
            <Skeleton className="w-[60px] h-[40px] my-[10px]" />
          ) : (
            <div className="text-[40px] font-bold">{minutes}</div>
          )}
          <div className="text-[20px] font-medium">
            minute{minutes > 1 ? "s" : ""}
          </div>
        </div>
        <div className="w-[161px] flex justify-start">
          <div className="flex flex-col items-center">
            {isAuctionPending ? (
              <Skeleton className="w-[60px] h-[40px] my-[10px]" />
            ) : (
              <div className="text-[40px] font-bold">{seconds}</div>
            )}
            <div className="text-[20px] font-medium">
              second{seconds > 1 ? "s" : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
