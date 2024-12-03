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

export default function PoolBidRecord({
  poolAddress,
}: {
  poolAddress: string;
}) {
  const { data: bidRecord, isPending: isBidRecordPending } =
    usePoolBidRecord(poolAddress);
  const { data: markets, isPending: isMarketsPending } = useMarkets();

  const records = useMemo(() => {
    if (!bidRecord || !markets) return [];

    const newR = bidRecord.map((record) => {
      const market = markets?.find(
        (m) => m.nft_info.token_address === record.token_address,
      );
      return {
        name: `${market?.market_name} #${record.token_id}`,
        ...record,
      };
    });
    return newR;
  }, [bidRecord, markets]);

  const isPending = isBidRecordPending || isMarketsPending;

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

        {isPending ? (
          range(3).map((i) => <Skeleton key={i} className="w-full h-6 my-2" />)
        ) : records.length ? (
          records?.map((record, i) => (
            <div
              key={i}
              className="flex justify-between items-center h-10 text-white"
            >
              <div className="w-[190px]">{record.name}</div>
              <div
                className={cn(
                  "w-[165px]",
                  record.result === "Win" && "text-green",
                  record.result === "Failed" && "text-red",
                )}
              >
                {capitalize(record.result)}
              </div>
              <div>
                {replaceTimeUnitToSingleChar(
                  formatDistanceToNowStrict(Number(record.bid_at) * 1000),
                )}
              </div>
            </div>
          ))
        ) : (
          <Empty className="mt-5 text-base" text="No records" />
        )}
      </div>
    </div>
  );
}
