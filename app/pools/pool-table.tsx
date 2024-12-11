import { cn } from "@/lib/utils/common";
import { formatNumber, formatPercent } from "@/lib/utils/number";
import { replaceTimeUnitToSingleChar } from "@/lib/utils/time";
import { truncateAddr } from "@/lib/utils/web3";
import { formatDistanceToNowStrict } from "date-fns";
import { capitalize, range } from "lodash";
import { useMemo } from "react";
import { IPoolStatus, usePools } from "@/lib/api/use-pools";
import { Skeleton } from "@/components/ui/skeleton";
import { divide } from "safebase";
import { useRouter } from "next/navigation";
import Empty from "../_common/empty";
import { AddressImg } from "../_common/address-img";

export default function PoolTable({ status }: { status: IPoolStatus }) {
  const { data: pools, isPending: isPoolPending } = usePools();
  const router = useRouter();

  const showList = useMemo(() => {
    if (!pools) return [];

    return pools?.filter((pool) => pool.status === status);
  }, [status, pools]);

  function handlePoolClick(poolAddress: string) {
    router.push(`/pools/${poolAddress}`);
  }

  return (
    <div className="w-full mt-10">
      <div className="text-white text-left leading-[18px] text-sm font-medium opacity-60 flex px-5 mb-[15px]">
        <div className="w-[190px]">Pool</div>
        <div className="w-[120px]">Total Staked</div>
        <div className="w-[110px]">Created By</div>
        <div className="w-[120px]">Creator Bonus</div>
        <div className="w-[110px]">Delegators</div>
        <div className="w-[65px]">LifeTime</div>
        {status === "ACTIVE" && <div></div>}
      </div>
      {isPoolPending ? (
        range(3).map((i) => (
          <Skeleton key={i} className="mb-[15px] h-20 w-full" />
        ))
      ) : showList.length ? (
        showList.map((pool, i) => (
          <div
            className="h-20 bg-[#281A31] p-5 flex items-center mb-[15px]"
            key={i}
          >
            <div className="w-[190px] flex items-center gap-x-[15px] text-sma font-medium text-white">
              <AddressImg
                className="rounded-full"
                address={pool.address}
                width={40}
                height={40}
              />
              <div className=" flex flex-col items-start space-y-[6px]">
                <span>{pool.name}</span>
                <span
                  className={cn(
                    "flex items-center justify-center px-2 text-xs",
                    pool.status === "LIQUIDATING" && "bg-[#EF466F15] text-red",
                    pool.status === "ACTIVE" && "bg-[#AAED4A15] text-green",
                  )}
                >
                  {capitalize(pool.status)}
                </span>
              </div>
            </div>
            <div className="w-[120px]">
              {formatNumber(pool.total_staked)} RAE
            </div>
            <div className="w-[110px]">
              {truncateAddr(pool.creator, [4, 4])}
            </div>
            <div className="w-[120px]">
              {formatPercent(divide(pool.creator_bonus, String(10 ** 4)))}
            </div>
            <div className="w-[110px]">{pool.delegator}</div>
            <div className="w-[65px] text-right">
              {replaceTimeUnitToSingleChar(
                formatDistanceToNowStrict(Number(pool.create_at) * 1000),
              )}
            </div>
            {status === "ACTIVE" && (
              <div
                onClick={() => handlePoolClick(pool.address)}
                className="flex-1 cursor-pointer items-center text-center underline decoration-green underline-offset-4"
              >
                Delegate
              </div>
            )}
          </div>
        ))
      ) : (
        <Empty
          className="mt-[68px] items-center text-2xl"
          text="No Pools found"
        />
      )}
    </div>
  );
}
