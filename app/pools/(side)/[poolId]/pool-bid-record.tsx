import { cn } from "@/lib/utils/common";
import { replaceTimeUnitToSingleChar } from "@/lib/utils/time";
import { formatDistanceToNowStrict } from "date-fns";
import { capitalize } from "lodash";

const Records = [
  {
    asset: "NFT123 #444",
    result: "win",
    time: new Date().getTime() - 1000 * 60 * 60 * 3 * 24,
  },
  {
    asset: "NFT123 #444",
    result: "failed",
    time: new Date().getTime() - 1000 * 60 * 60 * 4,
  },
  {
    asset: "NFT123 #444",
    result: "win",
    time: new Date().getTime() - 1000 * 60 * 60 * 4,
  },
];

export default function PoolBidRecord() {
  return (
    <div className="bg-[#281A31] mx-6 mt-5">
      <div className="p-5 border-b-2 border-[#ffffff10]">
        <span className="text-xl font-medium text-white">Bidding Records</span>
      </div>
      <div className="p-5">
        <div className="flex justify-between text-white opacity-60 text-base font-medium mb-[10px]">
          <div className="w-[190px]">Asset</div>
          <div className="w-[165px]">Result</div>
          <div>Time</div>
        </div>
        {Records.map((record, i) => (
          <div
            key={i}
            className="flex justify-between items-center h-10 text-white"
          >
            <div className="w-[190px]">{record.asset}</div>
            <div
              className={cn(
                "w-[165px]",
                record.result === "win" && "text-green",
                record.result === "failed" && "text-red",
              )}
            >
              {capitalize(record.result)}
            </div>
            <div>
              {replaceTimeUnitToSingleChar(
                formatDistanceToNowStrict(record.time),
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
