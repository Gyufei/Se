import { cn } from "@/lib/utils/common";
import { formatPercent } from "@/lib/utils/number";
import { useLuckyNFTPageContext } from "../page-context";
import { divide, multiply, subtract } from "safebase";
import { Skeleton } from "@/components/ui/skeleton";
import { useRaePrice } from "@/lib/api/use-rae-price";

export default function WinnerPrice() {
  const { isAuctionPending, auctionInfo } = useLuckyNFTPageContext();
  const { data: raePrice, isPending: isRaePricePending } = useRaePrice();

  const winnerPaid = auctionInfo?.winning_bid || "0";
  const totalCap = auctionInfo?.bidding_cap || "0";
  const winnerProfit = subtract(totalCap, winnerPaid);
  const winnerProfitPercent =
    isAuctionPending || !Number(winnerPaid)
      ? "0"
      : divide(subtract(winnerProfit, winnerPaid), winnerPaid);

  const isPercentUp = winnerProfitPercent >= 0;

  const profitValue =
    !isAuctionPending && !isRaePricePending
      ? multiply(winnerProfit, raePrice!.price)
      : "0";

  return (
    <div className="mt-5 flex justify-between space-x-5">
      <div className="bg-[#281A31] p-5 flex-1 font-medium">
        <div className="text-white opacity-60">Winner Paid</div>
        {isAuctionPending ? (
          <Skeleton className="w-[100px] h-[30px] mb-1 mt-[14px]" />
        ) : (
          <div className="mt-[10px] text-[30px] text-white leading-[38px]">
            {winnerPaid} RAE
          </div>
        )}
        <div className="flex items-center mt-[10px] text-sm text-white opacity-80">
          <span>Vault value =&nbsp;</span>
          {isAuctionPending ? (
            <Skeleton className="w-[80px] h-5" />
          ) : (
            <span>{totalCap} RAE</span>
          )}
        </div>
      </div>
      <div className="bg-[#281A31] p-5 flex-1 font-medium">
        <div className="text-white opacity-60">Winner Profit</div>
        {isAuctionPending ? (
          <Skeleton className="w-[100px] h-[30px] mb-1 mt-[14px]" />
        ) : (
          <div
            className={cn(
              "text-[30px] leading-[38px] mt-[10px]",
              isPercentUp ? "text-green" : "text-red",
            )}
          >
            {isPercentUp ? "+" : "-"}
            {formatPercent(winnerProfitPercent)}
          </div>
        )}
        {isAuctionPending || isRaePricePending ? (
          <Skeleton className="w-[100px] h-[24px] mb-1 mt-[10px]" />
        ) : (
          <div className="mt-[10px] text-white opacity-60">${profitValue}</div>
        )}
      </div>
    </div>
  );
}
