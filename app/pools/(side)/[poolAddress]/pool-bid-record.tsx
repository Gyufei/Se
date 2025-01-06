"use client";
import Empty from "@/app/_common/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { useMarkets } from "@/lib/api/use-markets";
import { usePoolBidRecord } from "@/lib/api/use-pool-bid-record";
import { cn } from "@/lib/utils/common";
import { replaceTimeUnitToSingleChar } from "@/lib/utils/time";
import { formatDistanceToNowStrict } from "date-fns";
import { capitalize, range } from "lodash";
import { useMemo } from "react";

export default function PoolBidRecord({ poolAddress }: { poolAddress: string }) {
  const { data: bidRecord, isPending: isBidRecordPending } = usePoolBidRecord(poolAddress);
  const { data: markets, isPending: isMarketsPending } = useMarkets();

  const records = useMemo(() => {
    if (!bidRecord || !markets) return [];

    const newR = bidRecord.map((record) => {
      const market = markets?.find((m) => m.nft_info.token_address === record.token_address);
      return {
        name: `${market?.market_name} #${record.token_id}`,
        ...record,
      };
    });
    return newR;
  }, [bidRecord, markets]);

  const isPending = isBidRecordPending || isMarketsPending;

  return (
    <div className="mx-0 mt-4 bg-[#281A31] md:mx-6 md:mt-5">
      <div className="border-b-2 border-[#ffffff10] p-5">
        <span className="text-base font-medium text-white md:text-xl">Bidding Records</span>
      </div>
      <div className="p-5">
        <div className="mb-[10px] flex justify-between text-sm font-medium text-white opacity-60 md:text-base">
          <div className="w-[160px]">Asset</div>
          <div className="w-[135px]">Result</div>
          <div>Time</div>
        </div>

        {isPending ? (
          range(3).map((i) => <Skeleton key={i} className="my-2 h-6 w-full" />)
        ) : records.length ? (
          records?.map((record, i) => (
            <div key={i} className="flex h-10 items-center justify-between text-sm text-white md:text-base">
              <div className="w-[190px]">{record.name}</div>
              <div
                className={cn(
                  "w-[165px]",
                  record.result === "WIN" && "text-green",
                  record.result === "FAILED" && "text-red",
                  record.result === "UNKNOWN" && "text-white",
                )}
              >
                {capitalize(record.result)}
              </div>
              <div>{replaceTimeUnitToSingleChar(formatDistanceToNowStrict(Number(record.bid_at) * 1000))}</div>
            </div>
          ))
        ) : (
          <Empty className="mt-5 text-base" text="No records" />
        )}
      </div>
    </div>
  );
}
