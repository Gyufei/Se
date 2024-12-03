"use client";
import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { usePoolInfo } from "@/lib/api/use-pool-info";
import { formatNumber, formatPercent } from "@/lib/utils/number";
import { truncateAddr } from "@/lib/utils/web3";
import { usePoolRae } from "@/lib/web3/use-pool-rae";
import { add, divide, subtract } from "safebase";
import { RAE } from "@/lib/const/rae";

export default function PoolInfoCard({ poolAddress }: { poolAddress: string }) {
  const { data: pool, isPending: isPoolInfoPending } = usePoolInfo(poolAddress);

  const { data: poolRae, isPending: isPoolRaePending } = usePoolRae(
    pool?.base.address,
  );

  const poolRaeDisplay = poolRae
    ? divide(String(poolRae), String(10 ** RAE.decimals))
    : 0;

  const myProfit = useMemo(() => {
    if (isPoolRaePending) return "0";
    if (!pool) return "0";

    const all = add(poolRaeDisplay, pool.user.total_withdraw);
    const profit = subtract(all, pool.user.total_staked);
    return profit;
  }, [poolRaeDisplay, pool, isPoolRaePending]);

  const poolStakePercent = useMemo(() => {
    if (!pool) return "0";

    return divide(pool?.user.total_staked, pool?.base.capacity);
  }, [pool]);

  return (
    <div className="bg-[#281A31] mx-6 mt-6 p-5">
      <div className="flex justify-between">
        <div>
          <div className="text-white opacity-60 text-base font-medium">
            Creator
          </div>
          {isPoolInfoPending ? (
            <Skeleton className="w-[100px] h-6 my-2 mt-[10px]" />
          ) : (
            <div className="text-2xl mt-[10px] text-white font-medium">
              {truncateAddr(pool?.base.creator)}
            </div>
          )}
        </div>

        <div>
          <div className="text-white opacity-60 text-base font-medium">
            Capacity Saturation
          </div>
          {isPoolInfoPending ? (
            <div className="flex items-center justify-end">
              <Skeleton className="w-[80px] h-6 my-2 ml-1" />
            </div>
          ) : (
            <div className="text-2xl text-right mt-[10px] text-white font-medium">
              <span className="opacity-60">{pool?.base.capacity}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex mt-[27px] justify-between">
        <div>
          <div className="text-white opacity-60 text-base font-medium">
            My Acc. Profit
          </div>
          {isPoolInfoPending || isPoolRaePending ? (
            <Skeleton className="w-[100px] h-6 my-2 mt-[10px]" />
          ) : (
            <div className="text-2xl mt-[10px] text-white font-medium">
              {myProfit} RAE
            </div>
          )}
        </div>

        <div className="flex flex-col items-end">
          <div className="text-white opacity-60 text-base font-medium">
            My Delegated
          </div>
          {isPoolInfoPending || isPoolRaePending ? (
            <div className="flex items-center">
              <Skeleton className="w-[60px] h-6 my-2 mr-1" />
              &nbsp; (<Skeleton className="w-[30px] h-6 my-2 ml-1" />)
            </div>
          ) : (
            <div className="text-2xl text-right mt-[10px] text-white font-medium">
              <span>{formatNumber(poolRaeDisplay)} RAE&nbsp;</span>
              <span>({formatPercent(poolStakePercent)})</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
