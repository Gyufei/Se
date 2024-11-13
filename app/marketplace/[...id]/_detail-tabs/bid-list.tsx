import { useMemo } from "react";
import Image from "next/image";
import { truncateAddr } from "@/lib/utils/web3";
import { formatDistanceToNowStrict } from "date-fns";
import { cn } from "@/lib/utils/common";
import { capitalize } from "lodash";

const bidArr = [
  {
    avatar: "/images/mock-avatar.png",
    bidType: "pool",
    address: "0x1234567890abcdef",
    at: new Date().getTime() - 1000 * 60 * 60 * 18,
    bidValue: 250,
    bidPercent: 0.25,
    isSuccess: true,
  },
  {
    avatar: "/images/mock-avatar.png",
    bidType: "wallet",
    address: "0x1234567890abcdef",
    at: new Date().getTime() - 1000 * 60 * 60 * 2,
    bidValue: 250,
    bidPercent: 0.25,
    isSuccess: false,
  },
];

export default function BidList({ onlyMe }: { onlyMe: boolean }) {
  const displayArr = useMemo(() => {
    if (!onlyMe) return bidArr;
    return bidArr.filter((bid) => bid.bidType === "wallet");
  }, [onlyMe]);

  return (
    <div className="mt-8 flex flex-col space-y-[15px]">
      <div className="flex justify-between items-center px-6 font-medium">
        <div className="text-sm text-white opacity-60">User / Wallet</div>
        <div className="text-sm text-white opacity-60">Amount</div>
      </div>
      {displayArr.map((bid) => (
        <BidItem key={bid.at} bid={bid} />
      ))}
    </div>
  );
}

function BidItem({ bid }: { bid: Record<string, any> }) {
  return (
    <div
      className={cn(
        "flex justify-between items-center px-6 py-4 h-20 border-[1.5px] transition-all space-x-5 border-transparent hover:border-green",
        bid.isSuccess ? "bg-[#281A3160]" : "bg-[#281A31]",
      )}
      style={{
        backgroundImage: bid.isSuccess
          ? "url(/images/bid-success-shading.png)"
          : "",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Image
        src={bid.avatar}
        width={48}
        height={48}
        className="rounded-full"
        alt="avatar"
      />
      <div className="flex flex-col flex-1 space-y-[10px] font-medium">
        <div className="text-white text-lg flex justify-between items-center">
          <div>
            {capitalize(bid.bidType)}: {truncateAddr(bid.address, [5, 5])}
          </div>
          <div>{bid.bidValue} RAEs</div>
        </div>

        <div className="flex justify-between text-xs text-white">
          <div>
            <span className="opacity-60">Bid</span>
            <span className="inline-block ml-2">
              {formatDistanceToNowStrict(bid.at)} ago
            </span>
          </div>
          <span className="opacity-60">
            {bid.bidPercent * 100}% of the vault
          </span>
        </div>
      </div>
    </div>
  );
}
