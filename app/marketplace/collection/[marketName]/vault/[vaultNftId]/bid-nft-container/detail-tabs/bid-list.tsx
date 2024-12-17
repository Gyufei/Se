import { useMemo } from "react";
import { checkIsSameAddress, truncateAddr } from "@/lib/utils/web3";
import { formatDistanceToNowStrict } from "date-fns";
import { cn } from "@/lib/utils/common";
import { range } from "lodash";
import { useLuckyNFTPageContext } from "../../page-context";
import { divide } from "safebase";
import { useAccount } from "wagmi";
import { Skeleton } from "@/components/ui/skeleton";
import { useCheckIsPool } from "@/lib/api/use-pools";
import Empty from "@/app/_common/empty";
import { AddressImg } from "@/app/_common/address-img";
import { formatPercent, maybeSmallNumber } from "@/lib/utils/number";

export default function BidList({ onlyMe }: { onlyMe: boolean }) {
  const { address } = useAccount();
  const { isAuctionPending, auctionInfo } = useLuckyNFTPageContext();

  const bidArr = useMemo(() => {
    if (isAuctionPending) return [];
    if (!auctionInfo) return [];

    const bidArr = auctionInfo.bidder_infos.map((bidInfo) => {
      const bidPercent = divide(bidInfo.bid_amount, auctionInfo.bidding_cap);
      const isWinner = checkIsSameAddress(auctionInfo.winner, bidInfo.bidder);

      return {
        at: Number(bidInfo.bid_at) * 1000,
        address: bidInfo.bidder,
        bidValue: bidInfo.bid_amount,
        isWinner,
        bidPercent,
      };
    });

    return bidArr;
  }, [isAuctionPending, auctionInfo]);

  const displayArr = useMemo(() => {
    if (!onlyMe) return bidArr;
    return bidArr.filter((bid) =>
      checkIsSameAddress(bid.address, address || ""),
    );
  }, [onlyMe, bidArr, address]);

  return (
    <div className="mt-8 flex flex-col space-y-[15px]">
      <div className="flex justify-between items-center px-6 font-medium">
        <div className="text-sm text-white opacity-60">User / Wallet</div>
        <div className="text-sm text-white opacity-60">Amount</div>
      </div>
      {isAuctionPending ? (
        range(2).map((i) => <Skeleton key={i} className="w-full h-16" />)
      ) : !displayArr.length ? (
        <Empty text="No bids data" />
      ) : (
        displayArr.map((bid) => <BidItem key={bid.at} bid={bid} />)
      )}
    </div>
  );
}

function BidItem({ bid }: { bid: Record<string, any> }) {
  const { data: isPool, isPending: isPoolPending } = useCheckIsPool(
    bid.address,
  );

  return (
    <div
      className={cn(
        "flex justify-between items-center px-6 py-4 h-20 border-[1.5px] transition-all space-x-5 border-transparent hover:border-green",
        bid.isWinner ? "bg-[#281A3160]" : "bg-[#281A31]",
      )}
      style={{
        backgroundImage: bid.isWinner
          ? "url(/images/bid-success-shading.png)"
          : "",
        backgroundRepeat: "no-repeat",
      }}
    >
      <AddressImg
        className="rounded-full"
        address={bid.address}
        width={48}
        height={48}
      />
      <div className="flex flex-col flex-1 space-y-[10px] font-medium">
        <div className="text-white text-lg flex justify-between items-center">
          {isPoolPending ? (
            <Skeleton className="w-[150px] h-5" />
          ) : (
            <div className="flex items-center">
              <span>{isPool ? "Pool" : "Wallet"}:&nbsp;</span>
              <span>{truncateAddr(bid.address, [5, 5])}</span>
            </div>
          )}
          <div>{maybeSmallNumber(bid.bidValue, 0.01)} RAEs</div>
        </div>

        <div className="flex justify-between text-xs text-white">
          <div>
            <span className="opacity-60">Bid</span>
            <span className="inline-block ml-2">
              {formatDistanceToNowStrict(bid.at)} ago
            </span>
          </div>
          <span className="opacity-60">
            {formatPercent(bid.bidPercent)} of the vault
          </span>
        </div>
      </div>
    </div>
  );
}
