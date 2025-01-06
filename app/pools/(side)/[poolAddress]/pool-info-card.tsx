"use client";
import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { usePoolInfo } from "@/lib/api/use-pool-info";
import { formatNumber, formatPercent } from "@/lib/utils/number";
import { truncateAddr } from "@/lib/utils/web3";
import { usePoolRae } from "@/lib/web3/use-pool-rae";
import { add, divide, subtract } from "safebase";
import { RAE } from "@/lib/const/platform";

export default function PoolInfoCard({ poolAddress }: { poolAddress: string }) {
  const { data: pool, isPending: isPoolInfoPending } = usePoolInfo(poolAddress);

  const { data: poolRae, isPending: isPoolRaePending } = usePoolRae(pool?.base.address);

  const poolRaeDisplay = poolRae ? divide(String(poolRae), String(10 ** RAE.decimals)) : "0";

  const myProfit = useMemo(() => {
    if (isPoolRaePending) return "0";
    if (!pool) return "0";

    const all = add(poolRaeDisplay, pool?.user.total_withdraw);
    const profit = subtract(all, pool?.user.total_staked);
    return profit;
  }, [poolRaeDisplay, pool, isPoolRaePending]);

  const poolStakePercent = useMemo(() => {
    if (!pool) return "0";
    const allTotal = pool?.base.total_staked;
    if (Number(allTotal) === 0) return "0";

    return divide(poolRaeDisplay, allTotal);
  }, [poolRaeDisplay, pool]);

  return (
    <div className="mx-0 mt-4 bg-[#281A31] p-5 md:mx-6 md:mt-6">
      <div className="flex justify-between">
        <div>
          <div className="text-sm font-medium text-white opacity-60 md:text-base">Creator</div>
          {isPoolInfoPending ? (
            <Skeleton className="my-2 mt-[10px] h-6 w-[100px]" />
          ) : (
            <div className="mt-[10px] text-xl font-medium text-white md:text-2xl">
              {truncateAddr(pool?.base.creator)}
            </div>
          )}
        </div>

        <div>
          <div className="text-sm font-medium text-white opacity-60 md:text-base">Capacity Saturation</div>
          {isPoolInfoPending || !pool ? (
            <div className="flex items-center">
              <Skeleton className="my-2 mr-1 h-6 w-[60px]" />
              /
              <Skeleton className="my-2 ml-1 h-6 w-[80px]" />
            </div>
          ) : (
            <div className="mt-[10px] text-right text-xl font-medium text-white md:text-2xl">
              <span>N/A</span>
              {/* <span>
                {formatNumber(
                  subtract(pool?.user.total_staked, pool?.user.total_withdraw),
                )}
              </span>
              <span className="opacity-60">
                / {formatNumber(pool?.base.total_staked)}
              </span> */}
            </div>
          )}
        </div>
      </div>

      <div className="mt-[27px] flex justify-between">
        <div>
          <div className="text-sm font-medium text-white opacity-60 md:text-base">My Acc. Profit</div>
          {isPoolInfoPending || isPoolRaePending ? (
            <Skeleton className="my-2 mt-[10px] h-6 w-[100px]" />
          ) : (
            <div className="mt-[10px] text-xl font-medium text-white md:text-2xl">{myProfit} RAE</div>
          )}
        </div>

        <div className="flex flex-col items-end">
          <div className="text-sm font-medium text-white opacity-60 md:text-base">My Delegated</div>
          {isPoolInfoPending || isPoolRaePending ? (
            <div className="flex items-center">
              <Skeleton className="my-2 mr-1 h-6 w-[60px]" />
              &nbsp; (<Skeleton className="my-2 ml-1 h-6 w-[30px]" />)
            </div>
          ) : (
            <div className="mt-[10px] text-right text-xl font-medium text-white md:text-2xl">
              <span>{formatNumber(poolRaeDisplay)} RAE&nbsp;</span>
              <span>({formatPercent(poolStakePercent)})</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
